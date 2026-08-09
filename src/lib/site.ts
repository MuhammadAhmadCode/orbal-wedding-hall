// Business details for Orbal Shadi Hall.
// TODO: fill in the real address once confirmed.
export const SITE = {
  name: "Orbal Shadi Hall",
  shortName: "Orbal",
  city: "Pakistan",
  tagline: "The Art of the Welcome",
  addressLine: "Pakistan",
  phoneDisplay: "+92 313 0086000",
  phoneTel: "+923130086000",
  email: "bookings@orbalshadihall.pk",
  hours: "Open daily, 10 AM to 10 PM",
  // WhatsApp number in international format without + or spaces.
  whatsappNumber: "923130086000",
  // Placeholder — Orbal's location is TBD.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Orbal+Shadi+Hall+Pakistan",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsappNumber}`;

// The trilingual welcome — the hall's signature greeting, used as a design
// accent across the site: پخیر راغلے (Pashto) · خوش آمدید (Urdu) · Welcome.
export const WELCOME = {
  pashto: "پخیر راغلے",
  urdu: "خوش آمدید",
  english: "Welcome",
} as const;

// Placeholder imagery until the real Orbal photography is provided.
// Swap the URLs below with Orbal's own photos — nothing else needs to change.
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2400&auto=format&fit=crop",
  hallMain: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1600&auto=format&fit=crop",
  hallDetail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
  decor: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1400&auto=format&fit=crop",
  lighting: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1400&auto=format&fit=crop",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
      caption: "First dance under warm light",
      alt: "Wedding couple sharing their first dance",
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
      caption: "Round-table banquet setting",
      alt: "Elegant wedding reception table setting",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      caption: "The ring moment",
      alt: "Wedding rings held during a ceremony",
    },
    {
      src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop",
      caption: "Grand hall reception",
      alt: "Grand wedding hall reception with guests",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      caption: "A dance to remember",
      alt: "Wedding couple dancing among guests",
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop",
      caption: "A quiet moment together",
      alt: "Wedding couple sharing a quiet moment",
    },
    {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop",
      caption: "Decor in bloom",
      alt: "Floral wedding decoration",
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      caption: "Aisle ready for the entrance",
      alt: "Wedding ceremony aisle decorated",
    },
  ],
};

export const NAV_LINKS = [
  { label: "The Hall", href: "#hall" },
  { label: "Packages", href: "#packages" },
  { label: "Gallery", href: "#gallery" },
  { label: "Availability", href: "#availability" },
  { label: "Contact", href: "#contact" },
] as const;

// Real guest reviews published on Orbal Shadi Hall's Google listing.
export const REVIEWS = [
  {
    quote:
      "It's my third time at Orbal Shadi Hall. I really love the services, the food, and the location — absolutely perfect!",
    name: "Mushtaq Ahmad",
    meta: "Local Guide · 9 reviews",
    time: "8 months ago",
  },
  {
    quote:
      "The hall was beautiful and the space for parking is also big. The location and scenery are amazing — the view of the surrounding mountains and the greenery is awesome.",
    name: "Mazhar Ali Shah",
    meta: "Local Guide · 46 reviews",
    time: "6 months ago",
  },
  {
    quote:
      "Orbal marquee is a great place for functions and events — weddings, walimas and all kinds of get-togethers. It has a good open area along with one big hall that can occupy 1,000 guests at a time. Best place for events at affordable prices.",
    name: "Jamal Shahzad",
    meta: "Local Guide · 30 reviews",
    time: "a month ago",
  },
  {
    quote:
      "Best place for a wedding or any other event. Having a large parking space and a peaceful environment.",
    name: "Mushtaq Ahmad",
    meta: "Local Guide · 13 reviews",
    time: "2 years ago",
  },
  {
    quote:
      "Orbal is a very good and open wedding hall. Big car parking and a separate space for both male and female. Generator and other necessary facilities are also available — you can use your own.",
    name: "Muhammad Suliman",
    meta: "Local Guide · 16 reviews",
    time: "11 months ago",
  },
] as const;
