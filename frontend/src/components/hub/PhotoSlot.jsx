/* ═══════════════════════════════════════════════════════════════════
   PhotoSlot — Production-ready placeholder system
   ─────────────────────────────────────────────────────────────────
   • Renders a styled dark-green placeholder with diagonal texture,
     gold "°" mark, and a bottom-left mono label.
   • Drops in a real <img> the moment `src` is provided — placeholder
     glyphs hide automatically.
   • Never shows broken images or empty white space.
   ═══════════════════════════════════════════════════════════════════ */

const PhotoSlot = ({
  label,
  src,
  alt,
  className = "",
  imgClassName = "",
  showLabel = true,
  children,
  testid,
}) => {
  return (
    <div
      data-testid={testid}
      data-has-img={src ? "true" : "false"}
      className={`photo-slot ${className}`}
    >
      {src && (
        <img
          src={src}
          alt={alt || label}
          loading="lazy"
          className={`photo-slot-img ${imgClassName}`}
        />
      )}
      {showLabel && label && (
        <span className="photo-slot-label">{label}</span>
      )}
      {children}
    </div>
  );
};

export default PhotoSlot;
