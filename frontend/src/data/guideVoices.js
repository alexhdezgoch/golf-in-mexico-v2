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

/* The same lines in Spanish (user, 2026-11-16). */
const AGENT_ES = { role: "El agente", name: "Pablo De La Mora" };
const PLAYER_ES = { role: "El jugador", name: "José Islas" };
export const GUIDE_VOICES_ES = {
  "los-cabos": [
    { ...AGENT_ES, text: "Los Cabos se siente elegante, con un clima y un tipo de desarrollo que no vas a encontrar en ningún otro lado. Yo le diría el paraíso del golf de México y Latinoamérica: el nivel más alto de logística y calidad para el viajero, y uno de los destinos más premium de México." },
    { ...PLAYER_ES, text: "Los Cabos tiene parte del golf más espectacular de México, y las mejores rondas dependen de dónde te hospedes." },
  ],
  "cancun-riviera-maya": [
    { ...AGENT_ES, text: "Cancún funciona como reloj. Aeropuerto, hotel y tee times están pensados alrededor del viajero, y muchos hoteles incluyen el golf en la estancia. Todo incluido, boutique o de lujo, lo tiene todo." },
    { ...PLAYER_ES, text: "No decepciona. El golf aquí está perfeccionado, desde los diseños hasta el mantenimiento, y cada campo cumple con lo que esperas." },
  ],
  "punta-mita": [
    { ...AGENT_ES, text: "Punta Mita se construyó como una península privada y cerrada, y vive sin prisa: espacio para respirar, ninguna torre a la vista, lujo relajado desde que cruzas la entrada." },
    { ...PLAYER_ES, text: "Se siente como una joya escondida. Es un espectáculo desde que cruzas la entrada: gran comida, gran golf, y nadie del grupo se queda sin algo que hacer." },
  ],
  "mexico-city": [
    { ...AGENT_ES, text: "La Ciudad de México tiene vida propia: arte, música, comida, cultura, partidos de la NBA y la NFL, hasta ruinas. Ningún otro viaje combina el golf con tanto." },
    { ...PLAYER_ES, text: "Si puedes jugar los clubes privados, es una de las mejores experiencias de golf de México, y una oportunidad que los golfistas de aquí valoran de verdad." },
  ],
  "puerto-vallarta": [
    { ...AGENT_ES, text: "Vallarta es un viaje fácil y confiable: un pueblo con verdadero carácter mexicano, una marina y sus playas, con el golf muy cerca." },
    { ...PLAYER_ES, text: "Golf de resort grande y generoso, y el tipo de viaje en el que juegas una ronda extra solo por gusto." },
  ],
  "unique-destinations": [
    { ...AGENT_ES, text: "Más allá de los corredores conocidos están los viajes con más carácter: pueblos coloniales, valles de vino, bahías tranquilas. A algunos cuesta un poco más llegar, y eso es parte de la recompensa." },
    { ...PLAYER_ES, text: "Cada uno es un viaje de golf completo por sí mismo, y el golf sorprende." },
  ],
};
