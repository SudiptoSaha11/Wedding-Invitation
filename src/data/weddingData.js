// ============================================================
// Central Wedding Configuration
// Update all wedding details here — no need to touch components
// ============================================================

export const weddingData = {
  // ── Bride ────────────────────────────────────────────────
  bride: {
    nameBn: 'সুচন্দ্রা সুর',
    nameEn: 'Suchandra Sur',
    image: '/assets/images/bride.png', // replace with actual asset
  },

  // ── Groom ────────────────────────────────────────────────
  groom: {
    nameBn: 'আদিত্য সাহা',
    nameEn: 'Aditya Saha',
    image: '/assets/images/groom.png', // replace with actual asset
  },

  // ── Wedding Date / reception ─────────────────────────────────────────
  weddingDate: '2026-11-26T19:00:00', // ISO format — for countdown
  weddingDateBn: '২৬শে নভেম্বর, ২০২৬',
  weddingDateEn: '26th November 2026',
  receptionDateBn: '২৮শে নভেম্বর, ২০২৬',
  receptionDateEn: '28th November 2026',
  receptionDateBengaliCal: '১৩ অগ্রহায়ণ, ১৪৩৩ বঙ্গাব্দ',
  weddingDateBengaliCal: '১১ অগ্রহায়ণ, ১৪৩৩ বঙ্গাব্দ',
  // ── Family ───────────────────────────────────────────────
  brideFamily: {
    fatherBn: 'শ্রী স্বপন সুর',
    motherBn: 'শ্রীমতী শিবানী সুর',
    note: '',
  },
  groomFamily: {
    fatherBn: 'শ্রী গৌড় চন্দ্র সাহা',
    motherBn: 'শ্রীমতী সীমা সাহা',
    note: '',
  },

  // ── Invitation Message ───────────────────────────────────
  invitationMessage: {
    line1: 'ঈশ্বরের আশীর্বাদে এবং পরিবারের সম্মতিতে',
    line2: 'আমরা আপনাকে সাদর আমন্ত্রণ জানাচ্ছি',
    line3: 'আমাদের শুভ বিবাহ অনুষ্ঠানে',
    closing: 'আপনার উপস্থিতি আমাদের আনন্দকে সম্পূর্ণ করবে।',
  },

  // ── Events ───────────────────────────────────────────────
  events: [
    {
      id: 'gaye-holud',
      nameBn: 'গায়ে হলুদ',
      nameEn: 'Gaye Holud',
      dateBn: '২৬শে নভেম্বর, ২০২৬',
      dateEn: '26th November 2026',
      timeBn: 'বিকেল ৪টা',
      timeEn: '12:00 PM',
      venueBn: 'মনিন্দ্র ভবন',
      venueEn: 'Manindra Bhavan',
      address: 'কলকাতা, পশ্চিমবঙ্গ',
      description: 'হলুদের আনন্দে মেতে উঠুন আমাদের সাথে।',
      mapUrl: 'https://www.google.com/maps/place/Bilayet+Ali+Rd,+Math+Para,+Titagarh,+Barrackpore,+West+Bengal+700123/@22.7490409,88.3724789,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89bb22b2208d7:0xc3bcc9140f352829!8m2!3d22.7490409!4d88.3750538!16s%2Fg%2F12vr2lxfc?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D',
      emoji: '💛',
    },
    {
      id: 'wedding',
      nameBn: 'বিবাহ অনুষ্ঠান',
      nameEn: 'Wedding Ceremony',
      dateBn: '২৬শে নভেম্বর, ২০২৬',
      dateEn: '26th November 2026',
      timeBn: 'সন্ধ্যা ৭টা',
      timeEn: '7:00 PM',
      venueBn: 'জামিনী ভবন',
      venueEn: 'Jamini Bhavan',
      address: 'আনন্দপুরি, ব্যারাকপুর',
      description: 'পবিত্র সাত পাকের বন্ধনে আবদ্ধ হওয়ার শুভ মুহূর্তে আপনার আশীর্বাদ কামনা করি।',
      mapUrl: 'https://www.google.com/maps/place/Jamini+Bhavan/@22.7655264,88.375367,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89a4f76b3c3a7:0xb7736983be1fc936!8m2!3d22.7655264!4d88.375367!16s%2Fg%2F11gzxpypl?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D',
      emoji: '🌸',
    },
    {
      id: 'reception',
      nameBn: 'বিবাহ বাসর',
      nameEn: 'Reception',
      dateBn: '২৮শে নভেম্বর, ২০২৬',
      dateEn: '28th November 2026',
      timeBn: 'সন্ধ্যা ৭টা',
      timeEn: '7:00 PM',
      venueBn: 'আম্রিত আশ্রম',
      venueEn: 'Amrita shram',
      address: 'তালপুকুর, ব্যারাকপুর',
      description: 'আনন্দের এই বিশেষ সন্ধ্যায় আমাদের সাথে উপস্থিত থাকুন।',
      mapUrl: 'https://www.google.com/maps/place/Amrita+Ashram+Wedding+House/@22.750788,88.375036,19.62z/data=!4m15!1m8!3m7!1s0x39f89bb22b2208d7:0xc3bcc9140f352829!2sBilayet+Ali+Rd,+Math+Para,+Titagarh,+Barrackpore,+West+Bengal+700123!3b1!8m2!3d22.7490409!4d88.3750538!16s%2Fg%2F12vr2lxfc!3m5!1s0x39f89bb3b1ffe9df:0x8a8fdf4b562bc819!8m2!3d22.7509366!4d88.3752277!16s%2Fg%2F1q6jzg3tn?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D',
      emoji: '✨',
    },
  ],

  // ── Venue (main ceremony) ────────────────────────────────
  venue: {
    nameBn: 'বৌভাত',
    nameEn: 'Wedding Venue',
    addressBn: 'তালপুকুর ব্যারাকপুর',
    addressEn: 'Talpukur, Barrackpore',
    venueNameBn: 'আম্রিত আশ্রম',
    mapUrl: 'https://www.google.com/maps/place/Amrita+Ashram+Wedding+House/@22.750788,88.375036,19.62z/data=!4m15!1m8!3m7!1s0x39f89bb22b2208d7:0xc3bcc9140f352829!2sBilayet+Ali+Rd,+Math+Para,+Titagarh,+Barrackpore,+West+Bengal+700123!3b1!8m2!3d22.7490409!4d88.3750538!16s%2Fg%2F12vr2lxfc!3m5!1s0x39f89bb3b1ffe9df:0x8a8fdf4b562bc819!8m2!3d22.7509366!4d88.3752277!16s%2Fg%2F1q6jzg3tn?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D',
  },

  // ── Gallery ──────────────────────────────────────────────
  gallery: [
    { src: '/assets/images/2.png', alt: 'বিবাহের সাজসজ্জা' },
    { src: '/assets/images/5.jpeg', alt: 'মণ্ডপ সজ্জা' },
    { src: '/assets/images/img1.jpeg', alt: 'বর ও কনে' },
    { src: '/assets/images/6.jpeg', alt: 'ফুলের সাজ' },
    { src: '/assets/images/4.jpeg', alt: 'আলোকসজ্জা' }
  ],

  // ── Music ────────────────────────────────────────────────
  music: '/assets/music/new 2.mp3', // replace with actual .mp3 file

  // ── RSVP Config ──────────────────────────────────────────
  rsvp: {
    sheetName: 'RSVP',
    eventName: 'Suchandra & Aditya Wedding',
  },
};
