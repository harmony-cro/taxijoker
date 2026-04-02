// ─── Site config ────────────────────────────────────────────────────────────
// Taxi Joker — taxijoker.hr

export const site = {
  name: 'Taxi Joker',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taxijoker.hr',
  phone: { display: '091 3330 308', tel: '+385913330308' },
  email: 'taxijoker2018@gmail.com',
  address: 'Ivana Belostenca 101, Slavonski Brod',
  social: {
    facebook: 'https://www.facebook.com/JOKER-TAXI-474442513051543',
    instagram: 'https://www.instagram.com/taxijoker/',
    linkedin: '',
  },
} as const
