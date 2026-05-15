import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Editorial Pieces", to: "/journal" },
  { label: "Destinations", to: "/journal" },
  { label: "About", to: "/about" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 bg-ink text-cream"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-40 pb-12 md:pb-16 grid grid-cols-12 gap-y-16 gap-x-8">
        {/* Brand column */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <img
            src="/logo-wordmark.png"
            alt="Golf in Mexico°"
            data-testid="footer-wordmark"
            className="h-5 md:h-6 w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          <p className="mt-20 md:mt-28 font-body font-light text-cream/55 text-base leading-[1.75] max-w-sm">
            An editorial dedicated to golf, culture, and the experience of
            playing México's finest courses.
          </p>
        </div>

        {/* Navigation */}
        <nav className="col-span-6 md:col-span-3 lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            Navigation
          </span>
          <ul className="mt-16 md:mt-24 space-y-10 md:space-y-12">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/ /g, "-")}`}
                  className="font-body font-light text-cream/85 text-base hover:text-cream editorial-link"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="col-span-6 md:col-span-4 lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-gold">
            Contact
          </span>
          <ul className="mt-16 md:mt-24 space-y-10 md:space-y-12">
            <li>
              <a
                href="mailto:hello@golf-in-mexico.com"
                data-testid="footer-link-email"
                className="font-body font-light text-cream/85 text-base hover:text-cream editorial-link"
              >
                hello@golf-in-mexico.com
              </a>
            </li>
            <li className="font-body font-light text-cream/85 text-base">
              Los Cabos, B.C.S., México
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-cream/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            © {year} Golf in Mexico° · golf-in-mexico.com
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-cream/45">
            Pablo De La Mora · José Islas
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
