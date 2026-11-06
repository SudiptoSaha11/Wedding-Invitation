/**
 * Vercel Serverless Function Proxy for Google Apps Script
 * Endpoint: /api/rsvp
 * 
 * This proxy is a lightweight fallback for Vercel deployments.
 * Since Node.js server-to-server requests have no browser CORS restrictions,
 * it forwards the request directly to Google Apps Script and returns the verified JSON response.
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const scriptUrl =
    process.env.GOOGLE_SCRIPT_URL ||
    process.env.VITE_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return res.status(500).json({
      success: false,
      message: 'Server error: GOOGLE_SCRIPT_URL is not configured.',
    });
  }

  try {
    const rawBody =
      typeof req.body === 'string'
        ? req.body
        : JSON.stringify(req.body || {});

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: rawBody,
      redirect: 'follow',
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (error) {
    console.error('Proxy Error forwarding to Google Apps Script:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error communicating with Google Apps Script',
    });
  }
}
