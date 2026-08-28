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

  /* ═══════════════════════════════════════════════════════════════════
     PUNTA MITA CLUSTER — six answer-first spokes.

     Copy by Pablo De La Mora ("UX Redesign v5 · The Dossier", 2026-08).
     Prose is the client's under scope v2; structure, meta and internal
     links are ours (precedent: 15e48b8).

     Every question is a `faq` block on purpose — Article.jsx builds
     FAQPage schema from those blocks only, and this cluster exists to be
     cited by AI engines. Keep faq answers link-free: `a` is emitted raw
     into JSON-LD, so markdown in it would ship as literal text.

     GREEN FEE BASIS (Alex, 2026-08-27): the club publishes USD 250–320
     before 16% tax and 10% service; 250×1.26≈315 and 320×1.26≈403, which
     is the site's $325–$400 all-in. Both numbers are true. The
     fourseasons.com citation attaches ONLY to the pre-tax figure.

     PHOTO CAPTIONS stay course-neutral — shoot attribution is unconfirmed
     except for 3B, which is definitively Pacifico (see landings.js).

     searchVolume traces to the 2026-07-08 DataForSEO + Autocomplete pull;
     0 means "verified ~0 measurable US volume", which is why these are
     GEO plays rather than head-term SEO plays.
     ═══════════════════════════════════════════════════════════════════ */

  {
    slug: "how-to-play-punta-mita-golf-access",
    title: "How to Actually Play Golf in Punta Mita",
    h1: "How to Actually Play Golf in Punta Mita",
    subtitle: "Access is tied to the property, not the price — two identical villas can have completely different golf access.",
    metaTitle: "Punta Mita Golf Access & Tee Times | Golf in Mexico°",
    metaDescription: "Punta Mita golf is private. The four ways on: Club member's guest, Four Seasons guest, St. Regis guest, or a villa rental that carries authorized club access.",
    excerpt: "Access is tied to the property, not the price — two identical villas can have completely different golf access.",
    heroImage: "/images/punta-mita/punta-mita-clubhouse-terrace-course-view.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 720,
    readTimeMinutes: 4,
    updated: "August 2026",
    body: [
      { type: "lead", text: "You can play Punta Mita's courses as a Club Punta Mita member's guest, a Four Seasons guest, a St. Regis guest, or a villa guest whose rental carries authorized club access. Access is tied to the property, not the price — two identical villas can have completely different golf access." },
      { type: "image", src: "/images/punta-mita/punta-mita-clubhouse-terrace-course-view.webp", caption: "Clubhouse terrace · Punta Mita", alt: "Clubhouse terrace overlooking the course at Punta Mita" },

      { type: "faq", q: "Is Punta Mita golf public?", a: "No. Confirmed directly on golfpuntamita.com: the private Punta Mita Golf Club is open exclusively to Club Punta Mita Members and their guests, and guests of the Four Seasons and St. Regis resorts. There is a fourth path documented on puntamita.com's own property pages — a villa rental that carries authorized club access." },
      { type: "list", items: [
        { text: "As a Club Punta Mita member's invited guest" },
        { text: "As a Four Seasons Punta Mita guest" },
        { text: "As a St. Regis Punta Mita guest" },
        { text: "As a villa guest whose specific rental carries authorized club access" },
      ] },

      { type: "faq", q: "Can you play if you stay at the Four Seasons or St. Regis?", a: "Yes — as a resort guest, tee times are confirmed through the Golf Pro Shop staff, per golfpuntamita.com. The first tee time is at 7:30 a.m. (subject to sunrise), with tee times available at 10-minute intervals." },

      { type: "faq", q: "Is renting a villa or condo actually cheaper than a hotel?", a: "Yes — the best way to get resort-level golf access at a fraction of hotel pricing is to rent a villa or condo instead of booking a hotel room. Because villas are built for groups, the same trip splits across 4–8 players in one property instead of 4–8 separate hotel rooms, and the math changes completely: green fees, staff, and amenities get shared across the group rather than paid per room." },
      { type: "columns", columns: [
        { heading: "Punta Mita Rentals", items: [
          { title: "The official rental agency", note: "They own and operate the inventory of villas and condos on the peninsula, and can confirm which specific properties carry authorized golf club access." },
        ] },
        { heading: "Golf in Mexico", items: [
          { title: "An official partner agency", note: "Builds the itinerary golf-first — arranging tee times, access, and the golf side of the trip around the villa stay, rather than treating golf as an afterthought to the accommodation." },
        ] },
      ] },
      { type: "p", text: "Booking through either the official agency or a recognized partner is what actually protects your access — confirm \"access to the golf,\" in writing, before paying anything." },

      { type: "faq", q: "How do you book tee times?", a: "Per golfpuntamita.com: resort guests confirm tee times through the Golf Pro Shop; singles are accepted and may be paired upon request; and groups can confirm tee times up to two years in advance through a Golf Club representative. In high season, morning slots go quickly, so book as early as your access window allows." },

      { type: "faq", q: "What if you can't get on?", a: "If access falls through, Higuera Golf Club — a public Greg Norman design 10 minutes from the gate — is the closest alternative, along with courses in Nuevo Vallarta and Vista Vallarta." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Cost Guide](/journal/punta-mita-golf-cost-green-fees) · [Luxury / Stay & Play](/journal/luxury-golf-trip-punta-mita)" },
      { type: "cta", eyebrow: "Not sure your villa includes golf?", heading: "That's the exact question we answer every week.", text: "Tell us your dates and group, and we'll confirm what your property actually carries before you pay anything.", href: "/trip-builder", label: "Tell us your dates" },
    ],
    faqItems: [],
    relatedArticles: [],
  },

  {
    slug: "punta-mita-golf-cost-green-fees",
    title: "How Much Does It Cost to Golf in Punta Mita?",
    h1: "How Much Does It Cost to Golf in Punta Mita?",
    subtitle: "The club's published rate card, what tax and service add on top, and what a full trip actually costs per player.",
    metaTitle: "Punta Mita Green Fees & Golf Costs 2026 | Golf in Mexico°",
    metaDescription: "Punta Mita publishes USD 250–320 for 18 holes before 16% tax and 10% service — about $325–$400 all-in. The full 2026 cost breakdown, carts, caddies and trip totals.",
    excerpt: "The club's published rate card, what tax and service add on top, and what a full trip actually costs per player.",
    heroImage: "/images/punta-mita/punta-mita-practice-range-balls.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 0,
    readTimeMinutes: 4,
    updated: "August 2026",
    body: [
      { type: "lead", text: "Four Seasons Punta Mita publishes USD 320 for 18 holes in high season (Nov 1–May 31) and USD 250 in low season (Jun 1–Oct 31), before 16% tax and 10% service charge. Once those are added, expect roughly $325–$400 all-in as a resort guest. Rates confirmed as current for 2026." },
      { type: "image", src: "/images/punta-mita/punta-mita-practice-range-balls.webp", caption: "Practice range · Punta Mita", alt: "Range balls on the practice range at Punta Mita" },

      { type: "faq", q: "How much are green fees?", a: "Per Four Seasons Resort Punta Mita's official golf page, current 2026 guest rates are USD 320 for 18 holes in high season and USD 250 in low season. Those are the published rates before 16% tax and 10% service charge — added on, an 18-hole round lands at roughly $325–$400 all-in, which is the range we quote across our Punta Mita guides." },
      { type: "table",
        caption: "Published guest rates · 2026",
        head: ["Rate", "High Season (Nov 1–May 31)", "Low Season (Jun 1–Oct 31)"],
        rows: [
          ["18 holes", "USD 320", "USD 250"],
          ["9 holes", "USD 200", "USD 175"],
          ["Twilight (after 1:00 pm)", "USD 250", "USD 210"],
          ["Guest 15 & under", "USD 185", "USD 175"],
          ["Guest under 12", "USD 95", "USD 95"],
        ],
        note: "Rates are subject to 16% tax and 10% service charge, and include a shared golf cart and use of the driving range. Villa-based group bookings can cost less per person once split across a group." },

      { type: "faq", q: "What does the club publish?", a: "Confirmed directly on golfpuntamita.com's official rates: private lessons run $75 per half-hour and $125 per hour for 1–2 players (plus $35/hour per additional player); clinics are $45 per golfer, held Tuesdays and Thursdays; and a two-hour playing lesson runs $260 plus green fee. Golf clinics pause from December 15–January 15 and March 14–31." },

      { type: "faq", q: "Is a caddie required, and how much do you tip?", a: "Confirm exactly what your quoted rate includes before you tee off. As a general guide: 10% is standard, 15% for good service, and 20% for exceptional service — on a $325–$400 round that works out to roughly $35–$80 per bag. The standard range we quote across our Punta Mita guides is $40–$60 per bag per round." },

      { type: "faq", q: "Do you need a golf cart, and what does it cost?", a: "Green fees at Four Seasons Punta Mita include a shared golf cart, confirmed directly on the resort's golf page. An extra cart runs USD 55, and the 3B Experience — cart, clubs, guide, and access to the Tail of the Whale hole — runs USD 60, per the same official source." },

      { type: "faq", q: "What does a full trip cost per person?", a: "Based on a real sample trip built through Golf in Mexico, a villa-based group booking has run roughly $3,460 per player, versus about $7,070 per player for an equivalent hotel booking. The gap is almost entirely accommodation and food." },
      { type: "table",
        caption: "Per player · USD",
        head: ["", "Golf in Mexico booking", "Hotel booking"],
        rows: [
          ["Flights", "$300–$520", "Same either way"],
          ["Accommodation", "$1,140", "$2,200–$6,000"],
          ["Green fees", "$760", "$1,000"],
          ["Club rentals", "$150", "$150"],
          ["Caddies & carts", "$210", "$210"],
          ["Ground transport", "$0", "$0"],
          ["Food", "$790", "$1,200"],
          ["Total", "$3,460 avg", "$7,070 avg"],
        ],
        note: "These are illustrative sample figures for a villa-based group trip, shown in USD — your final quote depends on your group size and dates." },

      { type: "faq", q: "Cheaper ways nearby?", a: "Higuera Golf Club, the public Greg Norman course 10 minutes from the gate, runs $150–$285 rack rate with packages available around $180 per round. Nuevo Vallarta and Vista Vallarta are also worth considering." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Access Guide](/journal/how-to-play-punta-mita-golf-access)" },
      { type: "cta", eyebrow: "Want a real number?", heading: "We'll price the trip for your dates and group.", text: "Tell us when you want to play and how many of you there are, and we'll send the whole thing back costed.", href: "/trip-builder", label: "Get a real quote" },
    ],
    faqItems: [],
    relatedArticles: [],
  },

  {
    slug: "luxury-golf-trip-punta-mita",
    title: "Luxury Golf in Punta Mita",
    h1: "Luxury Golf in Punta Mita",
    subtitle: "Where you stay decides whether — and how — you play.",
    metaTitle: "Luxury Punta Mita Golf: Villas, Resorts & Stay-and-Play | Golf in Mexico°",
    metaDescription: "A luxury Punta Mita golf trip comes down to one decision: where you stay decides whether you play. Four Seasons, St. Regis, or the right villa rental.",
    excerpt: "Where you stay decides whether — and how — you play.",
    heroImage: "/images/punta-mita/punta-mita-oceanfront-hole-pier-aerial.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "packages",
    isGIMProperty: false,
    searchVolume: 70,
    readTimeMinutes: 3,
    updated: "August 2026",
    body: [
      { type: "lead", text: "A luxury golf trip to Punta Mita comes down to one decision: where you stay decides whether — and how — you play. Four Seasons and St. Regis guests get the courses; the right villa rental does too. Get the stay right and the rest of the trip is Mexico's best golf, arranged." },
      { type: "image", src: "/images/punta-mita/punta-mita-oceanfront-hole-pier-aerial.webp", caption: "Oceanfront hole · Punta Mita", alt: "Aerial view of an oceanfront hole at Punta Mita" },

      { type: "faq", q: "Where do you stay to golf Punta Mita in style?", a: "Three paths get you on Pacifico and Bahia, confirmed directly on golfpuntamita.com: staying at the Four Seasons, staying at the St. Regis, or booking a villa with confirmed club access." },
      { type: "p", text: "See our full breakdown in the [Access Guide](/journal/how-to-play-punta-mita-golf-access)." },

      { type: "faq", q: "What is a stay-and-play package here?", a: "A stay-and-play package bundles accommodation with green fees, ground transport, and often meals into a single arranged trip rather than booking each piece separately. Based on our own sample trip data, villa-based group packages have run roughly $3,460 per player on average, versus $7,070 per player for an equivalent hotel-based booking." },

      { type: "faq", q: "How do you plan the whole trip?", a: "Lock your accommodation first — it determines your access. Confirm golf access in writing before you book. Reserve tee times as early as your access window allows; groups can book up to two years out, per golfpuntamita.com. Then layer in the extras — dining, transport, non-golf activities." },
      { type: "list", ordered: true, items: [
        { title: "Lock your accommodation first", text: "it determines your access" },
        { title: "Confirm golf access in writing", text: "before you book" },
        { title: "Reserve tee times early", text: "groups can book up to two years out, per golfpuntamita.com" },
        { title: "Layer in the extras", text: "dining, transport, non-golf activities" },
      ] },

      { type: "faq", q: "What makes it worth it?", a: "Two Jack Nicklaus courses on one peninsula, the Tail of the Whale, and a jungle-and-bay setting on Banderas Bay — a very different feel from the desert golf destinations like Los Cabos." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Access Guide](/journal/how-to-play-punta-mita-golf-access) · [Cost Guide](/journal/punta-mita-golf-cost-green-fees)" },
      { type: "cta", eyebrow: "Tell us your dates and group", heading: "We'll design the trip — stay, access, tee times, and the rest.", text: "Package pricing figures above are Golf in Mexico's own sample trip data, shown as illustrative averages. Your quote is built for your group.", href: "/trip-builder", label: "Design my trip" },
    ],
    faqItems: [],
    relatedArticles: [],
  },

  {
    slug: "best-time-to-golf-punta-mita",
    title: "The Best Time to Golf in Punta Mita",
    h1: "The Best Time to Golf in Punta Mita",
    subtitle: "Weather, seasons, and the whale window — Punta Mita runs on the Pacific's calendar.",
    metaTitle: "Best Time to Golf Punta Mita: Weather, Seasons & Whales | Golf in Mexico°",
    metaDescription: "The dry season runs November to May; December to March is peak weather, peak rates and whale season. June to October is rainy, quieter and cheaper.",
    excerpt: "Weather, seasons, and the whale window — Punta Mita runs on the Pacific's calendar.",
    heroImage: "/images/punta-mita/punta-mita-sunset-fairway-palms.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 0,
    readTimeMinutes: 3,
    updated: "August 2026",
    body: [
      { type: "lead", text: "Punta Mita runs on the Pacific's calendar. The dry season — November to May — is when you want to be here: warm days, low rain, the conditions the courses were built for. December to March is peak (best weather, tightest tee sheets) and whale season. June to October is rainy and cheaper." },
      { type: "image", src: "/images/punta-mita/punta-mita-sunset-fairway-palms.webp", caption: "Fairway and palms at last light · Punta Mita", alt: "Fairway lined with palms at sunset in Punta Mita" },

      { type: "faq", q: "What's the best time of year to golf Punta Mita?", a: "The dry season runs roughly November through May. Within that window, December through March is peak — matching Four Seasons Punta Mita's own published high-season golf rates (Nov 1–May 31), which reflect the same demand window." },

      { type: "faq", q: "What's the weather like month to month?", a: "Mornings are typically clear year-round. From July onward, expect afternoon storms as the rainy season builds. Humidity runs high near the water regardless of season." },

      { type: "faq", q: "When can you see whales?", a: "Humpback whales pass through Banderas Bay roughly December through March. Punta Mita Gourmet & Golf's own 2026 event program includes a dedicated whale-watching activity for non-golfing guests during this same window, confirmed on puntamita.com." },

      { type: "faq", q: "Is the rainy season worth it?", a: "Yes, for the right traveler. Rainy season (June–October) means lower prices — Four Seasons Punta Mita's own low-season green fee, USD 250 for 18 holes before tax and service, runs $70 less than high season — plus a much quieter peninsula, at the cost of an occasional lost afternoon." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Access Guide](/journal/how-to-play-punta-mita-golf-access)" },
      { type: "cta", eyebrow: "Tell us your dates", heading: "We'll tell you what to expect — and lock your tee times.", text: "Seasonal pricing verified directly on fourseasons.com/puntamita/golf; whale-watching timing corroborated by puntamita.com's own Gourmet & Golf event program.", href: "/trip-builder", label: "Tell us your dates" },
    ],
    faqItems: [],
    relatedArticles: [],
  },

  {
    slug: "tail-of-the-whale-punta-mita",
    title: "The Tail of the Whale: Punta Mita's Island Green",
    h1: "The Tail of the Whale: Punta Mita's Island Green",
    subtitle: "Pacifico's optional extra — a par-3 played to a green set on a natural rock in the Pacific.",
    metaTitle: "The Tail of the Whale — Punta Mita's Island Green | Golf in Mexico°",
    metaDescription: "Pacifico's optional 19th is a par-3 to a green on a natural rock in the Pacific. How to reach it, what the 3B Experience costs, and when the ocean says no.",
    excerpt: "Pacifico's optional extra — a par-3 played to a green set on a natural rock in the Pacific.",
    heroImage: "/images/punta-mita/punta-mita-pacifico-tail-of-the-whale-island-green-aerial.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "courses",
    isGIMProperty: false,
    searchVolume: 0,
    readTimeMinutes: 2,
    updated: "August 2026",
    body: [
      { type: "lead", text: "The Tail of the Whale is Pacifico's optional 19-hole extra — a par-3 played to a green set on a natural rock in the Pacific. The Punta Mita Golf Club restaurant is named after this signature hole. Reach it by amphibious cart, or on foot at low tide." },
      { type: "image", src: "/images/punta-mita/punta-mita-pacifico-tail-of-the-whale-island-green-aerial.webp", caption: "The Tail of the Whale, hole 3B · Pacifico Course", alt: "Aerial view of the Tail of the Whale island green at Pacifico Course, Punta Mita, ringed by surf" },

      { type: "faq", q: "What is the Tail of the Whale?", a: "It's Pacifico's signature optional hole — a par-3 played to a green set on a natural rock formation in the Pacific Ocean. Punta Mita Golf Club's own clubhouse restaurant, Tail of the Whale, is named directly after this signature island green, confirmed on golfpuntamita.com." },

      { type: "faq", q: "How do you get to the green?", a: "Golfers reach the island green by amphibious cart, or on foot along a stone path when tide conditions allow. Four Seasons Punta Mita's own golf page lists a dedicated 3B Experience package — cart, clubs, guide, and access to the hole — at USD 60, per the same official source." },

      { type: "faq", q: "Can you always play it?", a: "No — access depends on ocean and tide conditions at the time of your round, plus the club's operating schedule that day. As we put it: the ocean has a vote." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Cost Guide](/journal/punta-mita-golf-cost-green-fees)" },
      { type: "cta", eyebrow: "Want a shot at 3B?", heading: "We'll build your Punta Mita round around it.", text: "Confirm current tide and operating conditions with the club before your round — we'll handle the tee time either way.", href: "/trip-builder", label: "Plan my round" },
    ],
    faqItems: [],
    relatedArticles: [],
  },

  {
    slug: "things-to-do-punta-mita",
    title: "Punta Mita for Non-Golfers",
    h1: "Punta Mita for Non-Golfers",
    subtitle: "Beaches, spas and Sayulita — what the rest of the group does while you play.",
    metaTitle: "Punta Mita for Non-Golfers: Beaches, Sayulita & What to Do | Golf in Mexico°",
    metaDescription: "A Punta Mita golf trip doesn't have to strand the people who don't play. Calm Banderas Bay beaches, resort spas, and Sayulita 20 minutes north.",
    excerpt: "Beaches, spas and Sayulita — what the rest of the group does while you play.",
    heroImage: "/images/punta-mita/punta-mita-oceanfront-green-palms.webp",
    author: { name: "Pablo De La Mora", role: "Founder · GIM", photo: "/founders/pablo/01.jpg" },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 0,
    readTimeMinutes: 3,
    updated: "August 2026",
    body: [
      { type: "lead", text: "A Punta Mita golf trip doesn't have to strand the people who don't play. The peninsula sits on Banderas Bay with calm beaches, world-class spas, and Sayulita — a surf-and-art town 20 minutes north — all within reach while the rest of the group is on the course." },
      { type: "image", src: "/images/punta-mita/punta-mita-oceanfront-green-palms.webp", caption: "Banderas Bay from the property · Punta Mita", alt: "Oceanfront green framed by palms above Banderas Bay in Punta Mita" },

      { type: "faq", q: "What is there to do in Punta Mita besides golf?", a: "Beyond the two courses, Punta Mita offers calm beaches on Banderas Bay, resort spas, strong local dining, and seasonal whale watching from December to March. Punta Mita's own Gourmet & Golf event program confirms whale watching and cooking classes as standing non-golf activities during peak season." },

      { type: "faq", q: "Is Sayulita worth a day trip?", a: "Yes — it's a surf-and-art town about 20 minutes north of Punta Mita, a natural half-day escape for anyone not on the course." },

      { type: "faq", q: "What can non-golfers do while the group plays?", a: "A half-day plan — beach time, a spa morning, or a Sayulita run — fits neatly around a single round of golf, so the group reconnects by the afternoon." },

      { type: "faq", q: "Where to eat and relax?", a: "El Faro, the point's surf break, is a well-known landmark near the peninsula's tip." },

      { type: "p", text: "Related: [Golf in Punta Mita](/destinations/punta-mita) · [Best Time to Go](/journal/best-time-to-golf-punta-mita)" },
      { type: "cta", eyebrow: "Not everyone golfs?", heading: "We build both sides of the trip.", text: "Tell us who's coming and what they want out of the week, and we'll plan around the tee times.", href: "/trip-builder", label: "Plan the whole trip" },
    ],
    faqItems: [],
    relatedArticles: [],
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
