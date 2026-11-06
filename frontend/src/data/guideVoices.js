/* "The agent and the player" (user, 2026-11-05): each guide's own take, in general terms (no course named), from what
   Pablo and José said about each destination on their call of 2026-11-04. Los Cabos: Pablo's line added 2026-11-05. */

const AGENT = { role: "The agent", name: "Pablo De La Mora" };
const PLAYER = { role: "The player", name: "José Islas" };

export const GUIDE_VOICES = {
  "los-cabos": [
    { ...AGENT, text: "Los Cabos feels elegant, with a climate and a kind of development you won't find anywhere else. I'd call it the golf paradise of Mexico and Latin America: the highest level of logistics and quality for travelers, and one of the most premium destinations in Mexico." },
    { ...PLAYER, text: "Los Cabos has some of the most dramatic golf in Mexico, and the best rounds depend on where you stay." },
  ],
  "cancun-riviera-maya": [
    { ...AGENT, text: "Cancún works like clockwork. Airport, hotel and tee times are built around the traveler, and many hotels bundle golf into the stay. All-inclusive, boutique or luxury, it offers it all." },
    { ...PLAYER, text: "It doesn't under-deliver. The golf here has been perfected, from the designs to the upkeep, and every course meets the expectation." },
  ],
  "punta-mita": [
    { ...AGENT, text: "Punta Mita was built as a private, gated peninsula, and it lives slowly: room to breathe, no towers in sight, soft luxury from the gate in." },
    { ...PLAYER, text: "It feels like a hidden gem. It's a show from the moment you cross the gate: great food, great golf, and nobody in the group without something to do." },
  ],
  "mexico-city": [
    { ...AGENT, text: "Mexico City has a life of its own: art, music, food, culture, NBA and NFL games, even ruins. No other trip pairs golf with this much." },
    { ...PLAYER, text: "If you can play the private clubs, it's one of the best golf experiences in Mexico, and an opportunity golfers here truly value." },
  ],
  "puerto-vallarta": [
    { ...AGENT, text: "Vallarta is an easy, dependable trip: a small town with real Mexican character, a marina and its beaches, with the golf close by." },
    { ...PLAYER, text: "Big, generous resort golf, and the kind of trip where you play an extra round just for the fun of it." },
  ],
  "unique-destinations": [
    { ...AGENT, text: "Beyond the headline corridors are the trips with the most character: colonial towns, wine country, quiet bays. Some take a little more getting to, and that is part of the reward." },
    { ...PLAYER, text: "Each one is a complete golf trip of its own, and the golf surprises." },
  ],
};
