/**
 * Floating WhatsApp Business contact.
 * Number is a placeholder — replace with the real Business number when ready.
 * Stays editorial: small ink pill bottom-left, slim gold dot, mono caps.
 */
const WHATSAPP_NUMBER = "5215555550000"; // TODO: replace with real GIM WhatsApp Business number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola — I'd like to plan a trip with Golf in Mexico°."
);

const WhatsApp = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      aria-label="Plan a trip via WhatsApp"
      className="group fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[90] inline-flex items-center gap-3 pl-3 pr-4 py-2.5 bg-ink text-cream rounded-full shadow-[0_6px_24px_-8px_rgba(0,0,0,0.35)] hover:bg-forest transition-colors duration-500"
    >
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-gold opacity-70 animate-ping" />
        <span className="relative inline-block h-2 w-2 rounded-full bg-gold" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial">
        Plan a trip
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wide-editorial opacity-60 transition-transform duration-500 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
};

export default WhatsApp;
