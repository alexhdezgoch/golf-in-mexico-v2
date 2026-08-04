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
    datePublished: "2026-05-01",
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
    datePublished: "2026-05-01",
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
  // ------- PLANNING · PUNTA MITA ACCESS & COURSES (DESTINATION PLANNER) -------
  // Prose is the client's draft, copied verbatim from
  // ~/work/akeep/clients/mexico-golf/content/articles/how-to-plan-golf-trip-punta-mita.md
  // (status: draft — awaiting Pablo's sign-off). Only structure, meta, and
  // internal links are ours.
  {
    slug: "how-to-plan-golf-trip-punta-mita",
    title: "How to Plan a Golf Trip to Punta Mita: The Courses, the Access, and the Tail of the Whale",
    h1: "How to Plan a Golf Trip to Punta Mita: The Courses, the Access, and the Tail of the Whale",
    subtitle: "How to plan a golf trip to Punta Mita \u2014 the two Jack Nicklaus courses, the Tail of the Whale island green, and the one thing that decides your trip before pricing ever does: access.",
    metaTitle: "How to Plan a Golf Trip to Punta Mita | Golf in Mexico\u00b0",
    metaDescription: "How to plan a golf trip to Punta Mita: the two Jack Nicklaus courses, the Tail of the Whale island green, and why access \u2014 not price \u2014 decides your trip.",
    excerpt: "How to plan a golf trip to Punta Mita \u2014 the two Jack Nicklaus courses, the Tail of the Whale island green, and the one thing that decides your trip before pricing ever does: access.",
    heroImage: "/images/jdd69nak-punta-mita-drone.webp",
    author: {
      name: "Pablo De La Mora",
      role: "Founder \u00b7 GIM",
      photo: "/founders/pablo/01.jpg",
    },
    destination: "punta-mita",
    destinationLabel: "Punta Mita",
    articleType: "planning",
    isGIMProperty: false,
    searchVolume: 880,
    readTimeMinutes: 10,
    updated: "August 2026",
    datePublished: "2026-08-04",
    body: [
      { type: "lead", text: "Everyone comes to Punta Mita for the same photograph. A par-3 green sitting alone on a rock in the Pacific, the mainland tee a long carry behind you, an amphibious cart idling at the water's edge. It's called the Tail of the Whale, and it's the shot most people have seen long before they know its name." },
      { type: "p", text: "Here's what the photograph doesn't tell you: you can't just show up and play it." },
      { type: "p", text: "That's the first thing to understand about planning a golf trip to Punta Mita, and it changes everything that comes after. Most planning advice starts with tee times. In Punta Mita, tee times are the last problem you'll solve — not the first. The real question is whether you can get on the property at all." },
      { type: "h2", text: "Punta Mita Is a Gate Before It's a Golf Course" },
      { type: "p", text: "Punta Mita is a private peninsula on the northern edge of Banderas Bay, in the Riviera Nayarit, about 40 minutes north of the [Puerto Vallarta](/destinations/puerto-vallarta) airport. Behind the gate sit 36 holes of Jack Nicklaus Signature golf across two courses, spread over roughly 380 acres of Pacific and bay frontage. None of it is public." },
      { type: "p", text: "The [Punta Mita Golf Club](/destinations/punta-mita) is open to exactly four kinds of people: members of Club Punta Mita and their guests, guests of the Four Seasons Resort Punta Mita, guests of the St. Regis Punta Mita, and guests staying in villas whose rental program carries [authorized club access](/trip-builder) inside the gated community." },
      { type: "p", text: "Read that last one again, because it's where most trips go wrong." },
      { type: "p", text: "Access here is tied to the property, not to the price. Two villas on the same street, at the same nightly rate, can offer completely different golf access depending on the membership attached to each home. One gets you on the Pacífico with a phone call to the pro shop. The other doesn't get you through the gate. Nothing on a listing photo tells you which is which. It's the most expensive mistake a first-time Punta Mita golfer makes: booking the villa for the view, then finding out the golf was never included." },
      { type: "p", text: "So the planning order is simple, and it's the opposite of how people usually do it. Confirm your access first. Then choose your dates. Then worry about tee times." },
      { type: "h2", text: "The Two Courses" },
      { type: "h3", text: "Pacífico" },
      { type: "p", text: "The Pacífico opened in 1999, a Nicklaus design that plays to a par 72 and stretches just past 7,000 yards from the back tees. Eight of its holes run directly along or facing the Pacific, which means the wind is a permanent member of your foursome — it shapes club selection more than the yardage book does." },
      { type: "p", text: "This is the course that holds the Tail of the Whale. It's also, hole for hole, the one people remember: the ocean is not a backdrop here, it's in play, and the sound of it never leaves you across the back nine." },
      { type: "h3", text: "Bahía" },
      { type: "p", text: "The Bahía came a decade later, opening in 2009 — the second Nicklaus course on the peninsula, par 72 at just over 7,000 yards. It trades some of the Pacífico's raw ocean exposure for 360-degree views of Banderas Bay, with five holes playing along the water and two more looking down on it." },
      { type: "p", text: "The hole worth the trip sits down near the sand, steps from El Faro, the surf break at the tip of the point. You play a stretch of golf with surfers working the same water off to your side — a combination the Baja courses in [Cabo](/destinations/los-cabos) can't give you, because the geography here is different: this is bay and beach and jungle, not desert and cliff." },
      { type: "p", text: "We tell people who have the time to play both. The Pacífico is the one you brag about; the Bahía is the one that quietly grows on you by the seventeenth." },
      { type: "h2", text: "The Tail of the Whale" },
      { type: "p", text: "The Tail of the Whale is an optional hole — a par-3 the club counts as a \"19th,\" not part of either card. You play it because you want to, usually after the round — a par-3 that plays about 199 yards from the mainland tee to a green sitting on a natural rock outcropping, one used for whale watching long before it held a putting surface. The club bills it as the only natural island green in the world, and we've never found a credible challenger to that claim." },
      { type: "p", text: "Getting to the green is part of the hole. When the tide is low, a submerged stone path surfaces and you can cross to the island on foot or by cart. When it's high, you take an amphibious cart across the water. Either way, you are putting on a rock in the ocean, which is not a sentence you get to write about many golf holes." },
      { type: "p", text: "One honest note: it's an add-on, and access to it depends on conditions and the club's schedule that day. Build it into your plans as the thing you hope to do, not the thing you've paid to guarantee. The ocean has a vote." },
      { type: "h2", text: "What It Actually Costs" },
      { type: "p", text: "We believe in printing real numbers. Punta Mita makes that harder than most places, because the club doesn't publish its green fees — and it doesn't need to. You're not shopping a rack rate here; you're playing as a resort guest, a member's guest, or a villa guest, and the fee gets confirmed through the pro shop when your access is already established. Anyone quoting you a firm public green fee for the Pacífico online is guessing." },
      { type: "p", text: "What the club does publish is the small stuff, and it's worth knowing: private lessons run $75 for a half hour and $125 for the hour for one or two players, and group clinics are $45 per golfer, on Tuesday and Thursday mornings. Golf packages come in 3-, 5-, and 7-day blocks, and they're non-refundable and non-transferable — bought for the visit you're on, not bankable for later." },
      { type: "p", text: "A few costs that are easy to forget:" },
      {
        type: "list",
        items: [
          { title: "Caddies and carts", text: "Confirm what your package or guest rate includes before you play — it varies. On tipping, we use [the same logic we use for everything in Mexican golf](/journal/how-to-plan-a-golf-trip-to-mexico): 10% for standard service, 15% for good, 20% for exceptional. Apply it to your caddie the way you would to a waiter." },
          { title: "Tee time timing", text: "The club takes reservations up to 30 days out, and in high season the good morning slots go fast. If you're a villa or resort guest, have the concierge or pro shop lock your times the day your window opens — not the week you arrive." },
          { title: "Food and the dollar", text: "This is a dollarized corner of Mexico. A casual lunch and a couple of drinks at the turn will not feel like Mexican prices. Budget for it the way you would at any resort golf destination, not the way you would at a municipal course in Guadalajara." },
        ],
      },
      { type: "h2", text: "When to Go" },
      { type: "p", text: "The Riviera Nayarit runs on the Pacific's calendar, not the Caribbean's. The dry season — roughly November through May — is when you want to be here: warm days, low rain, the conditions the courses were built to show off. December through March is peak, which means the best weather and the tightest tee sheets at the same time." },
      { type: "p", text: "June through October is the rainy season. Mornings often open clear, but afternoon storms become the rule from July on, and the humidity is a real factor this close to the water. Rates soften and the peninsula empties out, and if you're willing to tee off early and accept the occasional washed-out afternoon, it's a quieter, cheaper way to play." },
      { type: "p", text: "One bonus the Pacific side gives you that Cabo can't: from December through March, humpback whales migrate through Banderas Bay. It is entirely possible to watch whales breach off the coast from a hole on the Pacífico — the outcrop that holds the Tail of the Whale earned its name honestly." },
      { type: "h2", text: "If You Can't Get On the Peninsula" },
      { type: "p", text: "Sometimes the access doesn't line up — the villa's membership doesn't include golf, the resort's booked, the timing's wrong. It happens, and it's not the end of a golf trip to this coast." },
      { type: "p", text: "Right outside the Punta Mita gate, between the entrance and Sayulita, is **Litibú** — a Greg Norman course tied to the Iberostar Playa Mita resort and, crucially, open to the public. No gate, no membership, no resort stay required. Seven of its holes play links-style, another eight thread through jungle, and the closing three run along the Pacific with the Punta Mita point in view. Green fees run roughly $150 to $200 in peak season, with twilight rates below that. It's the honest answer to \"I couldn't get on the Nicklaus courses but I still want to play great golf on this coast.\"" },
      { type: "p", text: "Widen the circle to the Puerto Vallarta side, 30 to 60 minutes south, and the options multiply: Vista Vallarta's two mountain courses, the flatter resort layouts around Nuevo Vallarta, the Greg Norman course at Vidanta. [We cover that whole corridor separately](/destinations/puerto-vallarta) — but the short version is that the region has real golf well beyond the gate, at prices that are actually published." },
      { type: "h2", text: "Before You Confirm Anything" },
      { type: "p", text: "Run these in order. The order is the whole point." },
      {
        type: "list",
        ordered: true,
        items: [
          { title: "Confirm your access first", text: "Are you staying at the Four Seasons or St. Regis, coming in as a member's guest, or renting a villa? If it's a villa, get it in writing that the property's membership includes golf club access — not \"near the golf,\" *access to the golf.*" },
          { title: "Pick your dates against the Pacific season", text: "November to May for conditions; December to March if you also want whales, and don't mind the crowds." },
          { title: "Lock tee times the day your 30-day window opens", text: "Especially in high season. Let the concierge or pro shop do it." },
          { title: "Budget honestly", text: "Green fees confirm through the club, not online; add caddie tips, dollarized food, and any package terms." },
          { title: "Treat the Tail of the Whale as a hope, not a guarantee", text: "Conditions and the club's schedule decide. When it's open, don't skip it." },
          { title: "Have a plan B outside the gate", text: "Litibú and the PV corridor mean a bad access break never has to mean a bad trip." },
        ],
      },
      { type: "h2", text: "The Peninsula Rewards the People Who Plan It Right" },
      { type: "p", text: "Punta Mita is not a hard place to enjoy. It's a hard place to get *wrong* only in one way — showing up assuming the golf is part of the deal when it isn't. Get the access right, and the rest of it is as good as golf travel gets in Mexico: two Nicklaus courses on a peninsula with the ocean on both sides, a par-3 on a rock in the sea, and whales in the bay while you play." },
      { type: "p", text: "Start with the gate. Everything else on this peninsula opens once you're through it." },
      { type: "divider" },
      {
        type: "cta",
        heading: "Planning a trip and not sure whether your villa actually includes golf?",
        text: "That's the exact question we answer for people every week. We know which properties on the peninsula carry real club access and which just sit near it, and we can build the trip around the golf instead of hoping it lines up. Tell us your dates and we'll take it from there.",
        href: "/trip-builder",
        label: "Get in touch and we'll help you plan it",
      },
    ],
    faqItems: [],
    relatedArticles: ["how-to-plan-a-golf-trip-to-mexico"],
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
