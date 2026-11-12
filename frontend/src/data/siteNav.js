/* What the menu, the search and the footer link to. Guides and experiences that do not exist yet stay out until their
   pages ship (the five smaller destinations still live inside Unique Destinations). */

export const DESTINATIONS = [
  { label: "Mexico City", region: "Valle de México", to: "/destinations/mexico-city", image: "/images/g6r7fp45-golfinmexico-062.webp" },
  { label: "Los Cabos", region: "Baja California Sur", to: "/destinations/los-cabos", image: "/images/rg2d4m8m-gim-stills-41.webp" },
  { label: "Cancún · Riviera Maya", region: "Quintana Roo", to: "/destinations/cancun-riviera-maya", image: "/images/xg8drvr6-img-3947.webp" },
  { label: "Punta Mita", region: "Riviera Nayarit", to: "/destinations/punta-mita", image: "/images/0wmultbm-dji-0048.webp" },
  { label: "Puerto Vallarta", region: "Bahía de Banderas", to: "/destinations/puerto-vallarta", image: "/images/gyf4bofm-d104455e-21a3-4a8e-8a51-72fdb3b5b227-1-105-c.webp" },
  { label: "Unique Destinations", region: "San Miguel · Mérida · Costalegre · Ensenada · Loreto", to: "/destinations/unique-destinations", image: "/images/dhz92vfa-golfinmexico-001-2.webp" },
];

import TRIPS from "@/data/rtrips.json";

/* Curated Trips replaced the Experience page (2026-11-03): one link per trip, named by its type and place. */
export const TRIP_LINKS = TRIPS.map((t) => ({ label: `${t.type} · ${t.destination}`, to: `/trips/${t.slug}`, title: t.title }));

export const COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Gallery", to: "/gallery" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", to: "/contact" },
];

/** Every "Book with Golf Concierge" / "Begin Planning" button opens the call landing, not Calendly directly (user, 2026-11-05). */
export const START_PLANNING_URL = "/start-planning";
export const CONCIERGE_CALL_URL = "https://calendly.com/pablo-golf-in-mexico/trip-builder";
export const EMAIL = "hello@golf-in-mexico.com";
export const PHONE_DISPLAY = "+52 720 677 4653";
export const PHONE_TEL = "+527206774653";
export const WHATSAPP_URL = "https://wa.me/527206774653";
