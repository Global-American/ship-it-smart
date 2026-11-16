// Each brand's own site. Freight, Return and Fulfill itSmart currently show
// an under-maintenance page that sends visitors to the contact form. Used by
// the footer's Our Brands links. Mirrors Central-Hub-Site's lib/brands.ts.
export const BRAND_URLS = {
  ship: "https://ship-it-smart.vercel.app/",
  freight: "https://freight-it-smart.vercel.app/",
  return: "https://return-it-smart.vercel.app/",
  fulfill: "https://fulfill-it-smart.vercel.app/",
} as const;
