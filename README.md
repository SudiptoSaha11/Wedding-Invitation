# 💍 Suchandra & Aditya — Wedding Invitation

A premium, mobile-first interactive Bengali wedding invitation website built with React + Vite + Tailwind CSS + GSAP.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Customization

All wedding details live in one file:

**`src/data/weddingData.js`**

Edit this file to change:
- Bride & groom names (Bengali + English)
- Wedding date (and Bengali calendar date)
- Event details (Gaye Holud, Wedding, Reception)
- Venue information and Google Maps URLs
- Family names
- Gallery image paths
- Invitation message text

---

## 📧 EmailJS Setup (RSVP)

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** → copy the Service ID
3. Create an **Email Template** with these variables:
   - `{{guest_name}}` — Guest's name
   - `{{response}}` — Accepted / Declined
   - `{{event_name}}` — Wedding event name
   - `{{wedding_date}}` — Wedding date
   - `{{submitted_at}}` — Timestamp
4. Copy your **Public Key** from Account → API Keys
5. Create `.env.local` in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> ⚠️ Never commit `.env.local` — it's already in `.gitignore`

---

## 🎵 Background Music

Place your wedding music file at:

```
public/assets/music/wedding-theme.mp3
```

Any `.mp3` file works. Music starts only when the guest clicks **"আমন্ত্রণে প্রবেশ করুন"** (browser autoplay policy).

---

## 🖼️ Replacing Illustrations

Place illustration images in:

```
public/assets/images/
  bride.png         ← Bride illustration
  groom.png         ← Groom illustration
  couple.png        ← Couple together (used on hero + opening)
  opening-bg.png    ← Opening screen background
  hero-bg.png       ← Hero section background
  ornament.png      ← Decorative divider

public/assets/flowers/
  marigold.png      ← Marigold decoration
  petal.png         ← Rose petal (falling animation)
```

Update the couple section's placeholder SVGs to `<img>` tags once real assets are ready.

---

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```
Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Netlify
```bash
npm run build
# Drag the `dist/` folder into Netlify dashboard
# Or use: netlify deploy --prod --dir dist
```
Add environment variables in **Site Configuration → Environment Variables**.

---

## 📁 Project Structure

```
src/
├── animations/          GSAP animation utilities
├── components/
│   ├── Closing/         Closing section
│   ├── Countdown/       Live countdown timer
│   ├── Couple/          Bride & groom introduction
│   ├── Effects/         Petal shower animation
│   ├── Events/          Gaye Holud / Wedding / Reception cards
│   ├── Family/          Family section
│   ├── Gallery/         Photo gallery
│   ├── Hero/            Hero section after entering
│   ├── Invitation/      Traditional invitation message
│   ├── Music/           Floating music controller
│   ├── Opening/         Landing cover screen + Enter button
│   ├── RSVP/            EmailJS RSVP form
│   └── Venue/           Venue details + map link
├── data/
│   └── weddingData.js   ← ALL wedding content here
├── hooks/
│   └── useCountdown.js  Live countdown logic
├── App.jsx              Root orchestrator
└── index.css            Design system + global styles
```

---

## 🎨 Color Palette

| Role       | Color      | Variable                |
|------------|------------|-------------------------|
| Primary    | Deep Maroon | `--color-maroon`       |
| Gold       | Warm Gold  | `--color-gold`          |
| Background | Warm Cream | `--color-cream`         |
| Accent     | Vermilion  | `--color-vermilion`     |
| Text       | Dark Brown | `--color-text`          |

---

## 📱 Mobile-First

Designed primarily for **375px–430px** screens (WhatsApp sharing).
Also responsive at 768px, 1024px, 1280px+.

---

*Made with ❤️ for Suchandra & Aditya · ২৬শে নভেম্বর, ২০২৬*
