import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import clsx from "clsx";

const CATEGORY_LINKS = [
  { title: "তাফসীর", url: "/category/tafsir" },
  { title: "হাদীস", url: "/category/hadith" },
  { title: "সীরাত", url: "/category/sirath" },
  { title: "আকাঈদ", url: "/category/aqaidh" },
  { title: "সালাত", url: "/category/salath" },
  { title: "পারিবারিক জীবন", url: "/category/paribarik-jibon" },
];

const QUICK_LINKS = [
  { title: "প্রচ্ছদ", url: "/" },
  { title: "আর্কাইভ", url: "/archive" },
  { title: "মিডিয়া গ্যালারি", url: "/gallery" },
  { title: "সম্পাদকীয়", url: "/sompadokiyo" },
  { title: "আমাদের পরিচিতি", url: "/amader-porichithi" },
  { title: "লেখা পাঠানোর নিয়মাবলী", url: "/lekha-patanur-niyomaboli" },
  { title: "যোগাযোগের মাধ্যম", url: "/jugajuger-maddyom" },
  { title: "অনুসন্ধান", url: "/search" },
];

/**
 * Reusable Hanging Islamic Fanous Lantern SVG group
 */
const HangingLantern = ({
  x,
  anchorY = 22,
  cordLength = 50,
  scale = 1,
  swayClass = "animate-lantern-slow",
}) => {
  return (
    <g transform={`translate(${x}, ${anchorY})`} aria-hidden="true">
      {/* Mounting Hook Ring on the Pole Arm */}
      <circle
        cx="0"
        cy="0"
        r="3"
        fill="#044f4f"
        stroke="#D1BB9E"
        strokeWidth="1.6"
      />
      <g className={swayClass}>
        {/* Hanging Cord */}
        <line
          x1="0"
          y1="2"
          x2="0"
          y2={cordLength}
          stroke="#044f4f"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <line
          x1="0"
          y1="2"
          x2="0"
          y2={cordLength}
          stroke="#D1BB9E"
          strokeWidth="0.85"
          opacity="0.7"
        />

        {/* Lantern Body Group */}
        <g transform={`translate(0, ${cordLength}) scale(${scale})`}>
          {/* Top Ring */}
          <circle
            cx="0"
            cy="3"
            r="3"
            fill="none"
            stroke="#044f4f"
            strokeWidth="1.8"
          />
          {/* Lantern Dome Cap */}
          <path
            d="M-7 13 C-7 7, 7 7, 7 13 L11 16 L-11 16 Z"
            fill="#044f4f"
            stroke="#D1BB9E"
            strokeWidth="1"
          />
          {/* Upper Neck Trim */}
          <rect
            x="-12"
            y="16"
            width="24"
            height="3"
            rx="1"
            fill="#D1BB9E"
          />
          {/* Main Lantern Frame */}
          <path
            d="M-11 19 L11 19 L9 44 L-9 44 Z"
            fill="#044f4f"
            stroke="#044f4f"
            strokeWidth="1.5"
          />
          {/* Glowing Arched Windows (3 Panes) */}
          <path
            d="M-8 23 C-8 20.5, -4 20.5, -4 23 L-4 40 L-8 40 Z"
            fill="#FDFBF7"
            stroke="#D1BB9E"
            strokeWidth="0.9"
          />
          <path
            d="M-2.5 22 C-2.5 19.5, 2.5 19.5, 2.5 22 L2.5 40 L-2.5 40 Z"
            fill="#FDFBF7"
            stroke="#D1BB9E"
            strokeWidth="1"
          />
          <path
            d="M4 23 C4 20.5, 8 20.5, 8 23 L8 40 L4 40 Z"
            fill="#FDFBF7"
            stroke="#D1BB9E"
            strokeWidth="0.9"
          />
          {/* Inner Warm Candle Glow Accent */}
          <circle cx="0" cy="32" r="2.2" fill="#D1BB9E" opacity="0.85" />
          {/* Lower Base & Pointed Finial */}
          <rect
            x="-10"
            y="44"
            width="20"
            height="2.5"
            rx="1"
            fill="#D1BB9E"
          />
          <path
            d="M-8 46.5 L8 46.5 L4 52 L0 57 L-4 52 Z"
            fill="#044f4f"
            stroke="#D1BB9E"
            strokeWidth="0.9"
          />
        </g>
      </g>
    </g>
  );
};

/**
 * Ornate Islamic Architectural Supporting Pole & Cantilever Bracket for Right Lanterns
 */
const LanternSupportPole = () => (
  <g aria-hidden="true">
    {/* Vertical Pillar anchored into the right side of the emerald wave */}
    <rect
      x="1392"
      y="16"
      width="8"
      height="165"
      rx="3"
      fill="#044f4f"
      stroke="#D1BB9E"
      strokeWidth="1.4"
    />
    {/* Pillar Base Collar on the Wave */}
    <rect
      x="1388"
      y="142"
      width="16"
      height="6"
      rx="2"
      fill="#D1BB9E"
    />
    {/* Decorative Mid-Pillar Ring */}
    <rect
      x="1390"
      y="76"
      width="12"
      height="4"
      rx="1.5"
      fill="#D1BB9E"
    />
    {/* Pillar Top Finial Dome & Spire */}
    <circle
      cx="1396"
      cy="12"
      r="5"
      fill="#044f4f"
      stroke="#D1BB9E"
      strokeWidth="1.5"
    />
    <path
      d="M1396 3 L1398 8 L1394 8 Z"
      fill="#D1BB9E"
    />

    {/* Horizontal Cantilever Support Beam extending left over the 3 lanterns */}
    <path
      d="M 1218 22 L 1396 22"
      stroke="#044f4f"
      strokeWidth="5.5"
      strokeLinecap="round"
    />
    <path
      d="M 1218 22 L 1396 22"
      stroke="#D1BB9E"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Decorative Left Scroll Tip on the Cantilever Arm */}
    <path
      d="M 1218 22 C 1211 22, 1209 15, 1215 13 C 1220 11, 1222 17, 1218 18"
      fill="none"
      stroke="#044f4f"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M 1218 22 C 1211 22, 1209 15, 1215 13 C 1220 11, 1222 17, 1218 18"
      fill="none"
      stroke="#D1BB9E"
      strokeWidth="1.3"
      strokeLinecap="round"
    />

    {/* Ornate Islamic Arch Gusset / Bracket supporting the horizontal beam from the vertical pole */}
    <path
      d="M 1354 22 C 1372 22, 1392 40, 1392 64"
      fill="none"
      stroke="#044f4f"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M 1354 22 C 1372 22, 1392 40, 1392 64"
      fill="none"
      stroke="#D1BB9E"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Inner Arabesque Scroll inside the Gusset Bracket */}
    <path
      d="M 1368 24 C 1375 34, 1382 40, 1392 45"
      fill="none"
      stroke="#D1BB9E"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="1378" cy="33" r="2.2" fill="#D1BB9E" />
  </g>
);

/**
 * Crescent Finial atop Mosque Domes and Minarets
 */
const CrescentFinial = ({ cx, cy, scale = 1 }) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale})`} aria-hidden="true">
    {/* Spire Rod */}
    <line
      x1="0"
      y1="0"
      x2="0"
      y2="14"
      stroke="#D1BB9E"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="0" cy="8" r="2.2" fill="#D1BB9E" />
    {/* Upward Crescent Moon */}
    <path
      d="M-7 -4 A 7.5 7.5 0 1 0 7 -4 A 5.8 5.8 0 1 1 -7 -4 Z"
      fill="#044f4f"
      stroke="#D1BB9E"
      strokeWidth="1.5"
    />
  </g>
);

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  // Combined Mosque Domes, Minarets, and Sweeping Horizon Wave Silhouette Path
  const mosqueAndWavePath = `
    M 0 218
    L 22 218
    C 20 198, 42 180, 68 175
    L 76 175
    L 76 126
    L 72 126
    L 75 118
    L 84 110
    L 93 118
    L 96 126
    L 92 126
    L 92 182
    L 106 182
    C 95 142, 134 106, 185 95
    L 190 85
    L 195 95
    C 246 106, 285 142, 274 182
    L 288 182
    L 288 140
    L 285 140
    L 288 133
    L 295 126
    L 302 133
    L 305 140
    L 302 140
    L 302 192
    C 324 192, 344 204, 348 218
    C 362 216, 378 223, 376 234
    C 660 246, 1040 222, 1440 135
    L 1440 265
    L 0 265
    Z
  `;

  // Golden Rim Accent Stroke Path following the upper edge of the Mosque & Wave
  const mosqueGoldenRimPath = `
    M 0 218
    L 22 218
    C 20 198, 42 180, 68 175
    L 76 175
    L 76 126
    L 72 126
    L 75 118
    L 84 110
    L 93 118
    L 96 126
    L 92 126
    L 92 182
    L 106 182
    C 95 142, 134 106, 185 95
    L 190 85
    L 195 95
    C 246 106, 285 142, 274 182
    L 288 182
    L 288 140
    L 285 140
    L 288 133
    L 295 126
    L 302 133
    L 305 140
    L 302 140
    L 302 192
    C 324 192, 344 204, 348 218
    C 362 216, 378 223, 376 234
    C 660 246, 1040 222, 1440 135
  `;

  return (
    <footer
      className={clsx(
        "relative w-full overflow-hidden text-white select-none sm:select-auto",
        className
      )}
    >
      {/* 1. Upper Scenic Mosque Silhouette, Sweeping Golden Wave & Right Lanterns on Supporting Pole */}
      <div
        className="relative w-full pointer-events-none overflow-hidden -mb-1"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[145px] sm:h-[190px] md:h-[235px] lg:h-[260px] block"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Traditional Islamic Geometric Star & Lattice Pattern */}
            <pattern
              id="footer-islamic-arabesque-crest"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              {/* Octagram Star & Interlocking Lattice */}
              <path
                d="M24 2 L30 18 L46 24 L30 30 L24 46 L18 30 L2 24 L18 18 Z"
                fill="none"
                stroke="#D1BB9E"
                strokeWidth="0.75"
                strokeOpacity="0.18"
              />
              <path
                d="M10 10 L38 10 L38 38 L10 38 Z"
                fill="none"
                stroke="#D1BB9E"
                strokeWidth="0.6"
                strokeOpacity="0.12"
                transform="rotate(45 24 24)"
              />
              <circle
                cx="24"
                cy="24"
                r="4"
                fill="none"
                stroke="#D1BB9E"
                strokeWidth="0.65"
                strokeOpacity="0.16"
              />
              <path
                d="M0 0 L10 10 M48 0 L38 10 M0 48 L10 38 M48 48 L38 38"
                stroke="#D1BB9E"
                strokeWidth="0.6"
                strokeOpacity="0.14"
              />
            </pattern>

            {/* Golden Rim Glow Filter */}
            <linearGradient
              id="golden-rim-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#E6D2B5" />
              <stop offset="35%" stopColor="#D1BB9E" />
              <stop offset="70%" stopColor="#E8D6BC" />
              <stop offset="100%" stopColor="#D1BB9E" />
            </linearGradient>
          </defs>

          {/* Supporting Architectural Pole & Cantilever Beam on the Right */}
          <LanternSupportPole />

          {/* Right Cluster of 3 Swaying Hanging Lanterns suspended from the Pole Beam (y=22) */}
          <HangingLantern
            x={1236}
            anchorY={22}
            cordLength={36}
            scale={0.74}
            swayClass="animate-lantern-gentle"
          />
          <HangingLantern
            x={1288}
            anchorY={22}
            cordLength={22}
            scale={0.84}
            swayClass="animate-lantern-medium"
          />
          <HangingLantern
            x={1344}
            anchorY={22}
            cordLength={46}
            scale={1.05}
            swayClass="animate-lantern-slow"
          />

          {/* Golden Crescent Finials atop Domes & Minarets */}
          {/* Left Small Dome Crescent */}
          <CrescentFinial cx={56} cy={166} scale={0.68} />
          {/* Left Minaret Spire Tip */}
          <circle cx={84} cy={107} r="2.5" fill="#D1BB9E" />
          {/* Main Central Mosque Dome Crescent */}
          <CrescentFinial cx={190} cy={72} scale={1.15} />
          {/* Right Minaret Spire Tip */}
          <circle cx={295} cy={123} r="2" fill="#D1BB9E" />
          {/* Right Secondary Dome Crescent */}
          <CrescentFinial cx={322} cy={184} scale={0.68} />
          {/* Far Right Mini Dome Crescent */}
          <CrescentFinial cx={362} cy={210} scale={0.5} />

          {/* Primary Emerald Fill for Mosque Silhouette & Sweeping Wave */}
          <path d={mosqueAndWavePath} fill="#044f4f" />

          {/* Subtle Islamic Geometric Pattern Overlay inside the Mosque & Wave */}
          <path
            d={mosqueAndWavePath}
            fill="url(#footer-islamic-arabesque-crest)"
          />

          {/* Golden Rim Outline along Domes, Minarets, and Horizon Wave */}
          <path
            d={mosqueGoldenRimPath}
            fill="none"
            stroke="url(#golden-rim-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. Main Emerald Footer Body with Matching Arabesque Pattern Backdrop */}
      <div className="relative w-full bg-primary">
        {/* Continuous Subtle Arabesque Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-90"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id="footer-islamic-arabesque-body"
                x="0"
                y="0"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M28 3 L35 21 L53 28 L35 35 L28 53 L21 35 L3 28 L21 21 Z"
                  fill="none"
                  stroke="#D1BB9E"
                  strokeWidth="0.7"
                  strokeOpacity="0.11"
                />
                <rect
                  x="12"
                  y="12"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="#D1BB9E"
                  strokeWidth="0.55"
                  strokeOpacity="0.08"
                  transform="rotate(45 28 28)"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="4.5"
                  fill="none"
                  stroke="#D1BB9E"
                  strokeWidth="0.55"
                  strokeOpacity="0.1"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#footer-islamic-arabesque-body)"
            />
          </svg>
        </div>

        {/* Footer Content Columns */}
        <div className="container relative z-10 pt-6 pb-12 md:pt-8 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Column 1: Brand & Mission */}
            <div className="lg:col-span-5 space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 no-underline"
              >
                <div className="w-[184px]">
                  <Image
                    className="w-full h-auto brightness-0 invert"
                    src="/img/branding/logo.png"
                    alt="ইসলামের কন্ঠ"
                    height={35}
                    width={184}
                  />
                </div>
              </Link>

              <p className="text-white/90 text-sm leading-relaxed max-w-md mb-0">
                “ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত’
                এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে
                অপব্যাখ্যা ও ভ্রান্ত ধারণা নিরসনের লক্ষ্যে কাজ করা আমাদের
                একমাত্র উদ্দেশ্য। বাংলা ভাষায় বিশুদ্ধ ইসলামী জ্ঞানের নির্ভরযোগ্য
                ক্ষেত্র।
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-secondary font-medium">
                <span>কুরআন ও সুন্নাহ ভিত্তিক গবেষণা</span>
                <span aria-hidden="true">·</span>
                <span>আহলে সুন্নাত ওয়াল জামাআত</span>
              </div>
            </div>

            {/* Column 2: Key Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-sm font-bold text-secondary tracking-wider uppercase pb-2 border-b border-secondary/30">
                প্রধান বিভাগসমূহ
              </h3>
              <ul className="list-none p-0 m-0 space-y-2">
                {CATEGORY_LINKS.map((item) => (
                  <li key={item.url} className="m-0">
                    <Link
                      href={item.url}
                      className="text-sm text-white/90 hover:text-secondary transition-colors no-underline inline-block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-secondary tracking-wider uppercase pb-2 border-b border-secondary/30">
                গুরুত্বপূর্ণ লিংক
              </h3>
              <ul className="list-none p-0 m-0 space-y-2">
                {QUICK_LINKS.map((item) => (
                  <li key={item.url} className="m-0">
                    <Link
                      href={item.url}
                      className="text-sm text-white/90 hover:text-secondary transition-colors no-underline inline-block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Editorial Contribution */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-secondary tracking-wider uppercase pb-2 border-b border-secondary/30">
                যোগাযোগ ও লেখা
              </h3>
              <p className="text-xs text-white/85 leading-relaxed mb-3">
                ইসলামের কন্ঠে আপনার প্রবন্ধ বা অনুবাদ প্রকাশের জন্য আমাদের
                নীতিমালা অনুসরণ করে লেখা পাঠান।
              </p>
              <div className="space-y-1.5 text-xs text-white/90">
                <p className="mb-1">
                  <span className="text-secondary font-semibold">ই-মেইল: </span>
                  <a
                    href="mailto:info@islamerkantho.com"
                    className="text-white hover:text-secondary underline transition-colors"
                  >
                    info@islamerkantho.com
                  </a>
                </p>
                <p className="mb-0">
                  <span className="text-secondary font-semibold">ফেসবুক: </span>
                  <a
                    href="https://www.facebook.com/islamerkantho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-secondary underline transition-colors"
                  >
                    fb.com/islamerkantho
                  </a>
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/lekha-patanur-niyomaboli"
                  className="inline-block px-4 py-2 rounded-md bg-secondary text-primary text-xs font-bold hover:bg-white transition-colors no-underline whitespace-nowrap shadow-xs"
                >
                  লেখা পাঠানোর নিয়মাবলী
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Attribution Bar */}
        <div className="relative z-10 w-full bg-black/25 border-t border-secondary/25">
          <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/80">
            <p className="m-0">
              © ২০২০–{currentYear}{" "}
              <strong className="text-secondary">ইসলামের কন্ঠ</strong>।
              সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="m-0">
              কারিগরি সহযোগিতায়{" "}
              <a
                className="text-secondary font-bold hover:underline"
                href="https://dot9.dev/"
                target="_blank"
                rel="noreferrer"
              >
                Dot9.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
