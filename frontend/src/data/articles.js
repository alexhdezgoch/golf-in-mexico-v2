// Editorial article dataset for /journal (no integrations).
// Ordering: destination filter > type priority > searchVolume desc.
// Type priority: property > courses > packages > comparison > planning.

export const DESTINATIONS = [
  { slug: "all", label: "All" },
  { slug: "los-cabos", label: "Los Cabos" },
  { slug: "punta-mita", label: "Punta Mita" },
  { slug: "mexico-city", label: "Mexico City" },
];

export const TYPES = [
  { slug: "all", label: "All" },
  { slug: "courses", label: "Courses" },
  { slug: "packages", label: "Packages" },
  { slug: "planning", label: "Planning" },
  { slug: "properties", label: "Properties" },
];

// articleType: courses | packages | planning | property | comparison
export const ARTICLES = [
  // ------- FEATURED · BACHELOR TRIP (FIRST-PERSON ESSAY) -------
  {
    slug: "the-bachelor-trip-cabo",
    title: "How I Planned My Bachelor Golf Trip in Cabo San Lucas as a Tour Agent",
    h1: "How I Planned My Bachelor Golf Trip in Cabo San Lucas as a Tour Agent",
    subtitle: "Twelve men. Four days. Two rounds at Solmar and Diamante Dunes. How this trip became the exact operational blueprint for Golf in Mexico.",
    metaTitle: "Bachelor Golf Trip Cabo — Solmar & Diamante Dunes | Golf in Mexico°",
    metaDescription: "A Tour agent's first-person account of a twelve-man bachelor golf trip to Cabo — Solmar Links and members-only Diamante Dunes — and how it sparked Golf in Mexico.",
    excerpt: "Twelve men. Four days. Two rounds at Solmar and Diamante Dunes. How this trip became the exact operational blueprint for Golf in Mexico.",
    heroImage: "/images/0wyp4brb-cabo-photo.webp",
    author: {
      name: "Pablo De La Mora",
      role: "Founder · GIM",
      photo: "/founders/pablo/01.jpg",
    },
    destination: "los-cabos",
    destinationLabel: "Los Cabos",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 480,
    readTimeMinutes: 7,
    updated: "May 2026",
    body: [
      { type: "lead", text: "Planning a bachelor golf trip to Cabo San Lucas for a large group? This is how I did it. From securing tee times at Diamante Dunes (the #1 golf course in Mexico according to Golf Digest) to running a 12-man Ryder Cup format with prizes." },
      { type: "p", text: "Every brand has an origin story. Ours did not start in a boardroom. It started at the end of my own bachelor trip in August 2025." },
      { type: "p", text: "I began looking for options for my closest friends to have a great time. At some point the idea hit me: I have been inside the professional golf ecosystem building relationships for years, why not put one of these trips together for my own bachelor party?" },
      { type: "p", text: "Cabo was the clear answer. I wanted to build the entire itinerary around excellent golf, quality hospitality, and the right setting for a bachelor golf trip in Cabo San Lucas." },
      { type: "p", text: "I ran the numbers and saw that the nightly room rate was the heaviest part of the cost breakdown. So I reached out to the husband of my wife's best friend, and he rented us his childhood home. The very first house built in Cabo del Sol. A twenty-five-year-old property that has belonged to his family the whole time." },
      { type: "p", text: "Twelve guys, four days, and a dedicated house staff that included a private chef, the house caretaker, and daily cleaning service. The house is called Naah Payill." },
      { type: "p", text: "The personal touch of the service was the part that made it work. They knew exactly when to serve dinner and when to leave the group alone. That caliber of hospitality is what elevates a standard itinerary into a premium experience, and it is what Mexican hospitality looks like when it is lived through locals." },
      { type: "image", src: "/articles/bachelor-trip/01-house.jpg", caption: "Naah Payill · Cabo del Sol · The first house ever built on the property", alt: "Naah Payill house entry with flamboyán tree" },

      { type: "h2", text: "Thursday: Solmar Links" },
      { type: "p", text: "A few of the guys flew in with me for the first tee time at Solmar. We caught the 7:00 AM flight from Mexico City, arrived for breakfast at the house, and headed straight to the course." },
      { type: "p", text: "When we arrived, the property felt brand new. The pro shop was immaculate and fully stocked." },
      { type: "p", text: "A friend of mine knew the starter from his time at Mayakoba. They used to play soccer together during the pandemic. That is exactly how premium access works down here. Relationships built in unexpected places." },
      { type: "p", text: "Solmar delivered for a large group starting at the practice range. The routing takes you through massive sand dunes where the horizon is nothing but sky and sand, and then suddenly drops onto the Pacific coastline. They filmed scenes from Troy near these dunes, and walking the fairways you understand why." },
      { type: "image", src: "/articles/bachelor-trip/02-solmar-dunes.jpg", caption: "Solmar Links · #14 dropping into the Pacific", alt: "Solmar Links hole 14 with Pacific Ocean and sand dunes" },
      { type: "p", text: "A note for anyone planning a group: Solmar is the most logistically friendly course on the Cabo corridor. Comfort stations and drinks are bundled directly into the green fee, which matters when you are managing 10 to 12 people across multiple carts. No one is running back to the clubhouse. The round stays tight." },
      { type: "p", text: "We finished the round and I hosted the official kickoff to the trip with a surf and turf dinner back at the house, with the whole group finally together." },

      { type: "h2", text: "Friday: A 12-Man Tournament at Diamante Dunes" },
      { type: "p", text: "Friday was the anchor of the trip. A twelve-man tournament at Diamante Dunes. I had contacted the Head Pro months in advance to request access, and he allowed three foursomes. I knew him from the PGA Tour event they host at El Cardonal, so my approach was to go through Tournament Operations and have them introduce me." },
      { type: "p", text: "This is the part most group organizers get wrong. Diamante Dunes is a private course. You cannot book it through any OTA. The only way in is a direct relationship with the club, or working through an operator who already has one. I reached out four months before the trip. That window matters." },
      { type: "image", src: "/articles/bachelor-trip/05-diamante-tee.jpg", caption: "Diamante Dunes · Davis Love III · #1 in Mexico per Golf Digest", alt: "Player teeing off at Diamante Dunes with sand dunes behind" },
      { type: "p", text: "The Dunes course sits on a different tier. Golf Digest consistently ranks it as the number one course in Mexico and I would not argue the point. The links-style layout works with the natural topography in a way I had not experienced before. The higher-handicap players in my group preferred Solmar because it was more forgiving, but Diamante is a demanding, shot-maker's layout. For me, it is one of the most extraordinary golf courses I have ever played in Mexico." },
      { type: "image", src: "/articles/bachelor-trip/04-diamante-group.jpg", caption: "The twelve-man tournament walking the fairway", alt: "Group of golfers walking a Diamante Dunes fairway" },
      { type: "p", text: "I chose a Ryder Cup format, six against six. The losing group paid for dinner. I also handed out individual prizes: a course flag from my years working on Tour, and a few premium polos I acquired for the event." },
      { type: "p", text: "A note on format. Ryder Cup works better than stroke play for mixed-handicap groups because it keeps everyone invested even after a bad hole. We ran 6 v 6 with net scoring. The 22-handicapper contributed as much as the scratch player. If your group has a wide handicap spread, that format saves the day." },
      { type: "p", text: "After the round we went back to the house, where the chef served a spread of fresh seafood he had bought at the market that morning. We rested, then headed out to Mezcal Bar and Bagatelle." },
      { type: "image", src: "/articles/bachelor-trip/03-bagatelle.jpg", caption: "Mezcal Bar · Copper lamps over the tequila bar", alt: "Mezcal Bar in Cabo with copper hanging lights" },

      { type: "divider" },

      { type: "h2", text: "What This Trip Actually Cost" },
      { type: "p", text: "Several people asked me after the trip what we spent. The real number was around $3,000 USD per person, all-in, for 4 nights. That includes everything: golf, house, food, flights, nights out." },
      { type: "p", text: "The house. We split Naah Payill 12 ways. Each person paid roughly 11,000 MXN for 3 nights, which landed at about the same nightly rate as a mid-corridor hotel room, except we had a private chef, a caretaker, and daily cleaning. We ran 3 breakfasts, 2 lunches, and 1 dinner at the house, built around the nights we went out. Total food and alcohol at the house came to around 35,000 MXN." },
      { type: "p", text: "Solmar. $400 USD green fee. That sounds steep until you understand what is bundled: two drinks per comfort station, four stations on the course, so eight drinks total, plus food at each stop. For a bachelor group, the value is real." },
      { type: "p", text: "Diamante Dunes. Private course. No public rate. We got in through a direct relationship with the Head Pro and four months of advance planning. I will not quote a price because it varies, but this is exactly the kind of access that requires an operator, not a booking platform." },
      { type: "p", text: "Flights. Most of the group flew Mexico City to SJD on the early morning flight. Under $200 round trip." },
      { type: "p", text: "Nights out. This is where Cabo gets you. Dinner and bars accounted for the biggest variable cost in the budget. The chef-at-home model absorbed a lot of it. We only went out for two full evenings." },
      { type: "p", text: "For context: a standard premium trip on the Cabo corridor runs around $3,600 USD per person in double occupancy at a corridor hotel, before a single green fee. We came in $600 under that number, played Solmar and Diamante, ate better, and had a private house. The math works when you build the logistics correctly from the start." },

      { type: "h2", text: "Why I Started Golf in Mexico" },
      { type: "p", text: "Sitting around the table for our final dinner, the realization hit me. I had just executed a bucket-list trip where my friends did not break the bank to experience one of the best golf destinations in Mexico. The feedback from the group was unanimous." },
      { type: "p", text: "For me, it unlocked exactly what I had been looking for. A way to stay within the golf industry and build a real business. That was the moment the concept for Golf in Mexico was born." },

      { type: "divider" },

      { type: "h2", text: "Plan Your Bachelor Golf Trip to Cabo" },
      { type: "faq", q: "How far in advance should I book tee times for a bachelor group in Cabo?", a: "For peak season (November through April), book 60 to 90 days out for public courses. For private or semi-private courses like Diamante you need a direct relationship with the club, or an operator who has one. Do not leave this until 30 days before." },
      { type: "faq", q: "What is the best course format for a large mixed-handicap group?", a: "Ryder Cup or better ball. Stroke play punishes higher handicappers and kills the energy by hole 12. Team formats keep everyone in the game through 18." },
      { type: "faq", q: "How many rounds is realistic for a 4-day bachelor trip?", a: "Two rounds is the sweet spot. One day to settle in, two full days on the course, one day for recovery and nightlife. Three rounds in four days is doable but exhausting. We did two and nobody wanted to leave." },

      { type: "cta", eyebrow: "Running a group trip to Cabo?", heading: "Tell us your group, your courses, your dates.", text: "We will handle the tee times, the access, and the logistics. You just show up.", href: "/trip-builder?type=bachelor", label: "Start planning your Cabo trip" },
    ],
    faqItems: [],
    relatedArticles: ["how-to-plan-a-golf-trip-to-mexico"],
  },

  // ------- PLANNING · HOW TO PLAN A GOLF TRIP TO MEXICO (STAFF GUIDE) -------
  {
    slug: "how-to-plan-a-golf-trip-to-mexico",
    title: "How to Plan a Golf Trip to Mexico: The Complete Guide for US Golfers",
    h1: "How to Plan a Golf Trip to Mexico: The Complete Guide for US Golfers",
    subtitle: "Region first — then budget, season, and access. The planning framework we use after hundreds of these trips, and the mistakes it saves you from.",
    metaTitle: "How to Plan a Golf Trip to Mexico — Complete Guide | Golf in Mexico°",
    metaDescription: "Region first, then budget, season, and access. How to plan a golf trip to Mexico — from Cabo's three corridors to Mexico City's private clubs — by the Golf in Mexico team.",
    excerpt: "Region first — then budget, season, and access. The planning framework we use after hundreds of these trips, and the mistakes it saves you from.",
    heroImage: "/images/plan-golf-trip-mexico.webp",
    author: {
      name: "Pablo De La Mora",
      role: "Founder · GIM",
      photo: "/founders/pablo/01.jpg",
    },
    destination: "planning",
    destinationLabel: "Planning",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 1600,
    readTimeMinutes: 10,
    updated: "July 2026",
    body: [
      { type: "lead", text: "Most golf trip planning advice about Mexico gets it backward. People start with the course they want to play and try to build everything else around it — and after planning hundreds of these trips, we can tell you: it just doesn't work that way. The best planning starts with a different question entirely." },
      { type: "p", text: "Which Mexico do you want to be inside of for a week? The region, the vibe, the pace. Not all of Mexico is the same." },
      { type: "p", text: "Once that question is answered, everything becomes much simpler. Mexico is more than one golf destination, and understanding that can completely change your trip. Think of this as the Mexico golf trip planning guide we wish had existed when we started. It's built around how good trips come together." },

      { type: "h2", text: "Mexico Is Not One Golf Destination — It's Several" },
      { type: "p", text: "Mexico has a little bit of everything — desert, jungle, forest, rainforest, all inside a single country. And that geography changes everything: the climate, the courses, the pace of the round, what you're eating at the turn, what you're doing when the golf is done for the day." },
      { type: "p", text: "The mistake most US golfers make is treating Mexico like a single market. It isn't." },
      { type: "p", text: "The tourist corridor — Cabo, Cancún, Riviera Maya, [Punta Mita](/destinations/punta-mita) — is built for the traveling golfer. Resort infrastructure, English-speaking staff, stay-and-play packages, 15 or more courses within 30 miles. These destinations are built for visitors and the planning is relatively straightforward once you know which corridor zone you're in." },
      { type: "p", text: "What many golf travelers to Mexico don't know is that Cabo alone has [three distinct regions](/destinations/los-cabos), each with its own courses, price points, and feel." },
      { type: "p", text: "The same goes for [Cancún versus the Riviera Maya](/destinations/cancun-riviera-maya). They share a geography but not a golf identity. And the Valle de México is a good example too. There are courses just one hour from Mexico City that sit in a completely different state." },
      { type: "p", text: "The local destinations — Mexico City, Guadalajara, Monterrey — operate on a different model. These cities have a strong private club culture, more personalized service, and access that runs through networks rather than booking engines." },
      { type: "p", text: "The niche destinations — Mérida, La Paz, Valle de Bravo — are places where golf is tied to something specific that only that region offers." },
      {
        type: "columns",
        columns: [
          {
            heading: "Tourist Corridor",
            items: [
              { title: "Los Cabos", note: "20+ courses, 3 zones" },
              { title: "Cancún & Riviera Maya", note: "Resort-bundled access" },
              { title: "Punta Mita", note: "Premium Pacific coast" },
              { title: "Riviera Nayarit", note: "PGA Tour host venue" },
            ],
          },
          {
            heading: "Local City Golf",
            items: [
              { title: "Mexico City", note: "Invitation only" },
              { title: "Guadalajara", note: "Invitation only" },
              { title: "Monterrey", note: "Invitation only" },
            ],
          },
          {
            heading: "Niche Destination",
            items: [
              { title: "Mérida", note: "Yucatán, colonial feel" },
              { title: "La Paz", note: "Desert meets sea" },
              { title: "Valle de Bravo", note: "Mountain, forest, altitude" },
            ],
          },
        ],
      },

      { type: "h2", text: "Now, Build Your Budget Around the Region" },
      { type: "p", text: "Once you've chosen your region, that's when pricing enters the conversation. And in Mexico, the range is wide enough that how you build your budget matters as much as how much you have to spend." },
      { type: "p", text: "The framework is simple: green fees are the base. Lodging and meals build from there. What you'll find is that the same standard of quality exists across very different price points, depending on the destination, the dates, and knowing where to look." },
      { type: "p", text: "Green fees in Mexico average anywhere from $150 to $300+ depending on the region and course tier." },
      { type: "p", text: "Mexico has flagship courses from iconic designers — Jack Nicklaus, Greg Norman, Tiger Woods — and it also has hidden gems built by entrepreneurs to showcase their regions that carry no PGA or TPC stamp but will surprise you." },
      { type: "h3", text: "The hidden costs to know about" },
      {
        type: "list",
        items: [
          { title: "Cart fees vary", text: "some courses include them, some don't. Confirm before you book." },
          { title: "Caddie fees vary by course", text: "we tip 10% for standard service, 15% for good, and 20% for exceptional. Apply that the same way you would at a restaurant." },
          { title: "Food in tourist destinations is heavily inflated or dollarized", text: "in Cabo, a beer and a sandwich at the turn can run $60 USD. In Mexico City, tacos and a beer run $20 USD. Those costs add up across a 4-night trip." },
        ],
      },
      {
        type: "priceCards",
        items: [
          { title: "Los Cabos", tag: "Mid-range to premium", price: "$2,030–$5,580", unit: "per person · 4 nights · 3 rounds", note: "Widest range on the list — driven entirely by which corridor zone you stay in." },
          { title: "Punta Mita", tag: "Most expensive", price: "$3,995–$9,515", unit: "per person · 4 nights · 3 rounds", note: "Accommodation — not golf — drives the total here more than anywhere else." },
          { title: "Mexico City", tag: "Most affordable", price: "$1,170–$3,500", unit: "per person · 4 nights · 3 rounds", note: "Most affordable by a wide margin. Access, not cost, is the real planning variable." },
          { title: "Cancún & Riviera Maya", tag: "Beginner-friendly", price: "$2,200–$6,590", unit: "per person · 4 nights · 3 rounds", note: "Green fees frequently bundled into resort room rates. Easiest cost structure to plan around." },
        ],
      },

      { type: "h2", text: "When to Go — and Why It Depends on Where" },
      { type: "p", text: "The advice most commonly offered to travelers planning a golf trip to Mexico is that November through April is the window. As people who have lived and played here, we can tell you that's not wrong, but it doesn't give you the whole story." },
      { type: "p", text: "The summer months bring rain and strong winds across much of the country. Summer draws mostly domestic families on school vacation, not golf travelers. The courses are quieter, but the rain and wind explain that quickly enough." },
      { type: "p", text: "Seasonality is regional. The Baja Peninsula — Los Cabos — runs on a different calendar than the Yucatán. The Valle de México has its own rhythm. The Pacific coast can get hit by tropical weather that doesn't touch the Caribbean side at all. Our best advice is to first understand the region you're targeting in full, then narrow down the dates that work for your schedule and the best playing conditions. A one-size window won't serve you as well as knowing your destination." },

      { type: "h2", text: "Resort Golf vs. Local Golf — Two Very Different Trips" },
      { type: "p", text: "Book a tee time in Cabo through your resort and it probably takes about ten minutes. Try to do the same thing in Mexico City and you'll quickly realize the game works differently there." },
      { type: "p", text: "In the tourist corridors, planning is relatively seamless. Resorts have experienced staff who handle golfers specifically — equipment, tee times, transportation between properties. Access to courses is generally tied to where you stay: many courses require you to be a hotel guest, and while the green fee costs a certain amount, lodging and food generate the bulk of their revenue. Book where you want to play, and most of the logistics take care of themselves." },
      { type: "p", text: "In the local destinations — Mexico City (CDMX), Guadalajara, and Monterrey — the golf culture is members-only. These cities are used to private clubs where you play by invitation through your network. The fewer tourists and the more locals a destination has, the harder it is to get tee time access without a connection. The service, when you do get access, is more personalized than almost anything in the resort corridor. But access is the variable, not cost." },
      { type: "p", text: "If you want to play local golf in Mexico City, the right move isn't searching for tee times. It's [finding someone who plays there](/destinations/mexico-city)." },

      { type: "h2", text: "What to Know Before Golfing in Mexico" },
      { type: "p", text: "These are the questions we hear most from foreign golfers playing golf in Mexico for the first time. The concerns are typically dress code, caddies, tipping, and the language barrier." },
      { type: "h3", text: "Dress code" },
      { type: "p", text: "The dress code for golf in Mexico is generally the same as anywhere else in the world. Collared shirt, golf trousers or shorts, proper footwear. Where it gets stricter is at private, members-only courses in the local cities. If you're getting access through a member's invitation, dress accordingly. A good outfit isn't optional at those clubs — it signals you understand where you are." },
      { type: "h3", text: "Caddies and carts" },
      { type: "p", text: "In tourist destinations, you'll be prompted on cart and caddie options at check-in. In local destinations, you may need to ask — and knowing the right phrases helps." },
      {
        type: "callout",
        title: "Essential Spanish for Golfers",
        items: [
          { term: "¿Necesita carrito?", def: "Do you need a cart?" },
          { term: "¿Necesita caddie?", def: "Do you need a caddie?" },
          { term: "¿Cuántos golfistas?", def: "How many golfers?" },
          { term: "La tarifa es de mil doscientos pesos", def: "The green fee is 1,200 pesos" },
        ],
        note: "Even a basic knowledge of golf Spanish in the local destinations goes a long way. These regions are more traditional — the interaction is appreciated.",
      },
      { type: "h3", text: "Tipping" },
      { type: "p", text: "Tipping at golf courses in Mexico follows the same logic as restaurants. As a standard: 10% for service, 15% for good service, 20% for exceptional service. Apply that to your caddie, and where applicable, to other staff who handle your equipment and experience. It's simple, it's consistent, and it's the right way to engage with the people making your round good." },

      { type: "h2", text: "The Food Is Part of the Round" },
      { type: "p", text: "One of the most underrated parts of a golf trip to Mexico is the food. The culture around the game here is inseparable from the cuisine, and paying attention to that can shape where you go and what you remember most." },
      { type: "p", text: "Cancún, Cabo, and the [Riviera Nayarit](/destinations/puerto-vallarta) lead in seafood. For traditional tacos, Mexico City and Tijuana are in a category of their own. At [Club de Golf México, hole 15](/destinations/mexico-city) has some of the best tacos in the city. For the members, it's just a stop on the back nine. For a visitor, it's one of those moments you don't see coming." },
      { type: "p", text: "We've had people come back to Mexico because of a meal they couldn't stop thinking about — and the golf was almost secondary. That's just the kind of trip this country puts together." },

      { type: "h2", text: "How to Choose Your Destination" },
      { type: "p", text: "Once you've settled your budget and your travel window, the final variable is trip personality." },
      { type: "p", text: "If you want variety and volume of golf: [Cabo](/destinations/los-cabos) and the [Riviera Maya](/destinations/cancun-riviera-maya). More than 15 courses for every type of golfer in each corridor. Designer names, hidden gems, resort play, arroyo-style courses, cliffside layouts with ocean views. These are the destinations that reward longer trips — a 7-day Mexico golf trip itinerary built around either corridor will not run out of options." },
      { type: "p", text: "If you want golf as part of a city experience: Mexico City. The golf here is harder to access but deeply rewarding when you get it — and it sits inside one of the most active cultural destinations in the world. CDMX is more of a workaround for golf, with dozens of activities surrounding that experience. Build the trip around the city and let the golf be a highlight, not the entire itinerary." },
      { type: "p", text: "If you want something specific that only one place offers: look at Mérida, La Paz, or Valle de Bravo. These are authentic destinations for golfers who know what they're looking for. Not the easiest to plan, but the most memorable for the right traveler." },
      { type: "p", text: "What matters most beyond the golf itself is what kind of trip you want — and once that's clear, the rest tends to fall into place." },

      { type: "h2", text: "Before You Book: A Planning Checklist" },
      { type: "p", text: "Before you confirm anything, run through these in order:" },
      {
        type: "list",
        ordered: true,
        items: [
          { title: "Choose your region", text: "tourist corridor, local city, or niche destination" },
          { title: "Build your budget around it", text: "green fees are the base; lodging and food follow" },
          { title: "Identify your travel window", text: "cross-reference with that specific region's season" },
          { title: "Confirm course access", text: "resort guest requirement, stay-and-play, or member invitation needed?" },
          { title: "Factor hidden costs", text: "cart included or not, caddie fee, food pricing by location" },
          { title: "Know the dress code in advance", text: "standards vary significantly between resorts and private clubs" },
        ],
      },

      { type: "h2", text: "Mexico Has a Way of Bringing You Back" },
      { type: "p", text: "We've seen it happen over and over. Someone comes for a week, plays three rounds, and leaves already thinking about when they can return. Sometimes to shoot a better score, sometimes to hit a shot they didn't get right the first time, and sometimes simply because of how the country made them feel during the round." },
      { type: "p", text: "That's the thing about Mexico that no planning guide can fully prepare you for. You can map out the region, the courses, the budget, the season. But when it comes to golf culture in Mexico — what to expect from the hospitality, the food, the pace of the game — that part shows up on its own." },
      { type: "p", text: "So go back to that first question: which Mexico do you want to be inside of for a week? Start there, use this guide to build around it, and the trip tends to take care of the rest." },

      { type: "divider" },

      { type: "h2", text: "Planning Your Trip: Quick Answers" },
      { type: "faq", q: "When is the best time for a golf trip to Mexico?", a: "November through April is the common advice, and it's not wrong — but seasonality is regional. The Baja Peninsula runs on a different calendar than the Yucatán, and the Pacific coast can get tropical weather that never touches the Caribbean side. Pick your region first, then narrow the dates around that region's season." },
      { type: "faq", q: "How much do green fees cost in Mexico?", a: "Green fees average anywhere from $150 to $300+ depending on the region and course tier. Watch the hidden costs: cart fees are sometimes included and sometimes not, caddie fees vary by course, and food in tourist corridors is heavily inflated — a beer and a sandwich at the turn in Cabo can run $60 USD." },
      { type: "faq", q: "Can visitors play golf in Mexico City?", a: "Mexico City's golf culture is members-only — private clubs where you play by invitation through a network, not a booking engine. Access is the variable, not cost. The right move isn't searching for tee times; it's finding someone who plays there, or working with an operator who already has the relationships." },

      { type: "cta", eyebrow: "Not sure where to start?", heading: "Need access to courses you can't book online?", text: "That's exactly what we do. Whether you're looking to get on a private course in Mexico City, find the right corridor in Cabo for your budget, or build a full itinerary from scratch — we've planned hundreds of these trips and we know where to look.", href: "/trip-builder", label: "Get in touch and we'll help you plan it" },
    ],
    faqItems: [],
    relatedArticles: ["the-bachelor-trip-cabo"],
  },
];

// Helper: ordered list of destinations to render
export const DESTINATION_ORDER = [
  { slug: "los-cabos", label: "Los Cabos" },
  { slug: "punta-mita", label: "Punta Mita · Riviera Nayarit" },
  { slug: "mexico-city", label: "Mexico City" },
  { slug: "planning", label: "Planning" },
];

const TYPE_PRIORITY = {
  property: 0,
  courses: 1,
  packages: 2,
  comparison: 3,
  planning: 4,
};

// Sort: isGIMProperty first within destination → type priority → searchVolume desc
export const sortArticles = (articles) => {
  return [...articles].sort((a, b) => {
    if (a.isGIMProperty !== b.isGIMProperty) return a.isGIMProperty ? -1 : 1;
    if (a.articleType !== b.articleType) return (TYPE_PRIORITY[a.articleType] ?? 99) - (TYPE_PRIORITY[b.articleType] ?? 99);
    return (b.searchVolume || 0) - (a.searchVolume || 0);
  });
};

export const filterArticles = (articles, destination, type) => {
  let pool = [...articles];
  if (destination !== "all") pool = pool.filter((a) => a.destination === destination);
  if (type !== "all") {
    if (type === "properties") pool = pool.filter((a) => a.articleType === "property");
    else pool = pool.filter((a) => a.articleType === type);
  }
  return pool;
};

export const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);
export const getRelatedArticles = (slugs = []) => slugs.map(getArticleBySlug).filter(Boolean);
