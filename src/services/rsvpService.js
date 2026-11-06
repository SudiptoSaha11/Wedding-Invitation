/**
 * Service for submitting RSVP responses to Google Sheets via Google Apps Script.
 * 
 * Architecture & Reliability Strategy:
 * 1. Direct fetch using 'Content-Type: text/plain;charset=utf-8':
 *    - In the W3C / WHATWG Fetch specification, 'text/plain' is a CORS-safelisted simple request.
 *    - This avoids the browser sending an OPTIONS preflight request (which Google Apps Script does not support).
 *    - Google Apps Script receives the raw JSON string via e.postData.contents and parses it with JSON.parse.
 *    - Google Apps Script returns a 302 redirect to script.googleusercontent.com with Access-Control-Allow-Origin: *.
 *    - The browser automatically follows this redirect (redirect: 'follow') and receives the verified JSON output.
 * 2. Response verification:
 *    - We NEVER use mode: 'no-cors' (which produces opaque, unverified responses).
 *    - The response body is parsed and response.success === true is explicitly verified.
 * 3. Proxy Fallback (Vercel Serverless /api/rsvp):
 *    - If direct browser fetch is blocked by strict client network policies or adblockers,
 *      it gracefully falls back to the lightweight /api/rsvp proxy endpoint.
 */

export async function submitRSVP({ name, response, foodPreference }) {
  // ── 1. Client-Side Input Validation ──────────────────────────
  const cleanName = String(name || '').trim();
  if (!cleanName) {
    throw new Error('অনুগ্রহ করে আপনার নাম লিখুন।');
  }

  if (cleanName.length > 100) {
    throw new Error('নামটি সর্বোচ্চ ১০০ অক্ষরের মধ্যে হতে হবে।');
  }

  if (!['Accepted', 'Declined'].includes(response)) {
    throw new Error('অনুগ্রহ করে আপনার উপস্থিতি নিশ্চিত করুন (হ্যাঁ অথবা না)।');
  }

  let finalFoodPreference = 'N/A';
  if (response === 'Accepted') {
    if (!['Veg', 'Non-Veg'].includes(foodPreference)) {
      throw new Error('অনুগ্রহ করে আপনার খাবারের পছন্দ (নিরামিষ / আমিষ) নির্বাচন করুন।');
    }
    finalFoodPreference = foodPreference;
  }

  const payload = {
    name: cleanName,
    response,
    foodPreference: finalFoodPreference,
  };

  const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    throw new Error(
      'Google Apps Script URL কনফিগার করা নেই। অনুগ্রহ করে .env.local ফাইলে VITE_GOOGLE_SCRIPT_URL সেট করুন।'
    );
  }

  let result = null;
  let directError = null;

  // ── 2. Primary: Direct Fetch to Google Apps Script ──────────
  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (res.ok) {
      result = await res.json();
    } else {
      throw new Error(`সার্ভার প্রতিক্রিয়া ত্রুটি: HTTP ${res.status}`);
    }
  } catch (err) {
    directError = err;
    console.warn('Direct Google Apps Script fetch failed; attempting /api/rsvp proxy fallback...', err);

    // ── 3. Fallback: Serverless Proxy (/api/rsvp) ──────────────
    try {
      const proxyRes = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (proxyRes.ok) {
        result = await proxyRes.json();
      }
    } catch {
      // Proxy not available or failed; re-throw original error
      throw new Error(
        directError.message && !directError.message.includes('Failed to fetch')
          ? directError.message
          : 'ইন্টারনেট বা সার্ভার ত্রুটি। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।'
      );
    }
  }

  // ── 4. Verify Server Confirmation ────────────────────────────
  if (!result || result.success !== true) {
    let msg = result?.message || 'গুগল শিটে উত্তর নথিভুক্ত করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।';
    if (msg.includes("reading 'appendRow'")) {
      msg = 'গুগল শিটের ট্যাবের নাম খুঁজে পাওয়া যায়নি। অনুগ্রহ করে গুগল শিটের নিচের ট্যাবের নামটি "Wedding RSVP" অথবা "RSVP" রাখুন।';
    }
    throw new Error(msg);
  }

  return result;
}
