import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 border-t hairline bg-cream"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <p className="font-display italic text-3xl md:text-4xl text-ink leading-tight max-w-md">
            A journal about <br /> the courses, the <br /> people, the trips.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Index
          </span>
          <Link
            to="/"
            data-testid="footer-link-home"
            className="font-body text-base text-ink editorial-link self-start"
          >
            Home
          </Link>
          <Link
            to="/about"
            data-testid="footer-link-about"
            className="font-body text-base text-ink editorial-link self-start"
          >
            About
          </Link>
          <Link
            to="/journal"
            data-testid="footer-link-journal"
            className="font-body text-base text-ink editorial-link self-start"
          >
            Journal
          </Link>
        </div>

        <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Correspondence
          </span>
          <a
            href="mailto:hello@golf-in-mexico.com"
            data-testid="footer-link-email"
            className="font-body text-base text-ink editorial-link self-start"
          >
            hello@golf-in-mexico.com
          </a>
          <a
            href="#"
            data-testid="footer-link-instagram"
            className="font-body text-base text-ink editorial-link self-start"
          >
            Instagram
          </a>
        </div>

        <div className="col-span-12 md:col-span-2 flex flex-col gap-3 md:items-end">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Origin
          </span>
          <p className="font-body text-base text-ink md:text-right">
            México <br /> 19°N · 99°W
          </p>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <img
            src="/logo-wordmark.png"
            alt="Golf in Mexico°"
            data-testid="footer-wordmark"
            className="w-full h-auto invert"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      <div className="border-t hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            © {year} Golf in Mexico° · golf-in-mexico.com
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide-editorial text-muted">
            Pablo De La Mora · José Islas
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
