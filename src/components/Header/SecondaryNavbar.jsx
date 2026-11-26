import useSWR from "swr";
import { memo } from "react";
import { toBengaliNumber } from "../../utils/articleContent.utils";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CITY_BN_MAP = {
  dhaka: "ঢাকা",
  dacca: "ঢাকা",
  chittagong: "চট্টগ্রাম",
  chattogram: "চট্টগ্রাম",
  sylhet: "সিলেট",
  rajshahi: "রাজশাহী",
  khulna: "খুলনা",
  barisal: "বরিশাল",
  barishal: "বরিশাল",
  rangpur: "রংপুর",
  mymensingh: "ময়মনসিংহ",
  comilla: "কুমিল্লা",
  cumilla: "কুমিল্লা",
  gazipur: "গাজীপুর",
  narayanganj: "নারায়ণগঞ্জ",
  bogra: "বগুড়া",
  bogura: "বগুড়া",
  jessore: "যশোর",
  jashore: "যশোর",
  "cox's bazar": "কক্সবাজার",
  coxsbazar: "কক্সবাজার",
  dinajpur: "দিনাজপুর",
  tangail: "টাঙ্গাইল",
  faridpur: "ফরিদপুর",
  noakhali: "নোয়াখালী",
  feni: "ফেনী",
  brahmanbaria: "ব্রাহ্মণবাড়িয়া",
  pabna: "পাবনা",
  kushtia: "কুষ্টিয়া",
  kolkata: "কলকাতা",
  calcutta: "কলকাতা",
  london: "লন্ডন",
  "new york": "নিউ ইয়র্ক",
  riyadh: "রিয়াদ",
  makkah: "মক্কা",
  mecca: "মক্কা",
  madinah: "মদীনা",
  medina: "মদীনা",
  jeddah: "জেদ্দা",
  dubai: "দুবাই",
  doha: "দোহা",
  kuala_lumpur: "কুয়ালালামপুর",
  "kuala lumpur": "কুয়ালালামপুর",
  singapore: "সিঙ্গাপুর",
};

const GREGORIAN_MONTHS_BN = {
  1: "জানুয়ারি",
  2: "ফেব্রুয়ারি",
  3: "মার্চ",
  4: "এপ্রিল",
  5: "মে",
  6: "জুন",
  7: "জুলাই",
  8: "আগস্ট",
  9: "সেপ্টেম্বর",
  10: "অক্টোবর",
  11: "নভেম্বর",
  12: "ডিসেম্বর",
  january: "জানুয়ারি",
  february: "ফেব্রুয়ারি",
  march: "মার্চ",
  april: "এপ্রিল",
  may: "মে",
  june: "জুন",
  july: "জুলাই",
  august: "আগস্ট",
  september: "সেপ্টেম্বর",
  october: "অক্টোবর",
  november: "নভেম্বর",
  december: "ডিসেম্বর",
};

const HIJRI_MONTHS_BY_NUMBER_BN = {
  1: "মুহাররম",
  2: "সফর",
  3: "রবিউল আউয়াল",
  4: "রবিউস সানি",
  5: "জুমাদাল উলা",
  6: "জুমাদাস সানি",
  7: "রজব",
  8: "শাবান",
  9: "রমজান",
  10: "শাওয়াল",
  11: "জিলকদ",
  12: "জিলহজ্জ",
};

const toBanglaCity = (city) => {
  if (!city) return "ঢাকা";
  const cleaned = String(city).trim();
  // If already in Bengali script, return as-is
  if (/[\u0980-\u09FF]/.test(cleaned)) return cleaned;
  const normalized = cleaned.toLowerCase();
  return CITY_BN_MAP[normalized] || "ঢাকা";
};

const toBanglaGregorianMonth = (monthEn, monthNumber) => {
  if (monthNumber && GREGORIAN_MONTHS_BN[monthNumber]) {
    return GREGORIAN_MONTHS_BN[monthNumber];
  }
  if (!monthEn) return "";
  const normalized = String(monthEn).trim().toLowerCase();
  return GREGORIAN_MONTHS_BN[normalized] || monthEn;
};

const toBanglaHijriMonth = (monthEn, monthNumber) => {
  if (monthNumber && HIJRI_MONTHS_BY_NUMBER_BN[Number(monthNumber)]) {
    return HIJRI_MONTHS_BY_NUMBER_BN[Number(monthNumber)];
  }
  if (!monthEn) return "";
  const normalized = String(monthEn)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("muharram")) return "মুহাররম";
  if (normalized.includes("safar")) return "সফর";
  if (normalized.includes("rabi") && (normalized.includes("awwal") || normalized.includes("i")))
    return "রবিউল আউয়াল";
  if (normalized.includes("rabi")) return "রবিউস সানি";
  if (normalized.includes("jumada") && (normalized.includes("ula") || normalized.includes("i")))
    return "জুমাদাল উলা";
  if (normalized.includes("jumada")) return "জুমাদাস সানি";
  if (normalized.includes("rajab")) return "রজব";
  if (normalized.includes("sha") && normalized.includes("ban")) return "শাবান";
  if (normalized.includes("ramadan") || normalized.includes("ramazan")) return "রমজান";
  if (normalized.includes("shawwal")) return "শাওয়াল";
  if (normalized.includes("qa") || normalized.includes("qidah")) return "জিলকদ";
  if (normalized.includes("hijjah") || normalized.includes("hijja")) return "জিলহজ্জ";

  return "জুমাদাল উলা";
};

const formatBanglaTime12Hour = (time24) => {
  if (!time24) return "";
  const [time] = String(time24).split(" ");
  const parts = time.split(":");
  if (parts.length < 2) return toBengaliNumber(time);
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  if (Number.isNaN(hours)) return toBengaliNumber(time);
  hours = hours % 12 || 12;
  return `${toBengaliNumber(hours)}:${toBengaliNumber(minutes)}`;
};

const SecondaryNavbar = () => {
  const { data, error, isLoading } = useSWR("/api/prayer-times", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const prayerItems = data?.prayers
    ? [
        { key: "Fajr", label: "ফজর", time: formatBanglaTime12Hour(data.prayers.Fajr) },
        { key: "Dhuhr", label: "যোহর", time: formatBanglaTime12Hour(data.prayers.Dhuhr) },
        { key: "Asr", label: "আসর", time: formatBanglaTime12Hour(data.prayers.Asr) },
        { key: "Maghrib", label: "মাগরিব", time: formatBanglaTime12Hour(data.prayers.Maghrib) },
        { key: "Isha", label: "ইশা", time: formatBanglaTime12Hour(data.prayers.Isha) },
      ]
    : [];

  const cityBn = toBanglaCity(data?.location?.city);

  const gregorianDateBn = data?.gregorian
    ? `${toBengaliNumber(parseInt(data.gregorian.day, 10) || data.gregorian.day)} ${toBanglaGregorianMonth(
        data.gregorian.monthEn,
        data.gregorian.monthNumber
      )} ${toBengaliNumber(data.gregorian.year)}`
    : "";

  const hijriDateBn = data?.hijri
    ? `${toBengaliNumber(parseInt(data.hijri.day, 10) || data.hijri.day)} ${toBanglaHijriMonth(
        data.hijri.monthEn,
        data.hijri.monthNumber
      )} ${toBengaliNumber(data.hijri.year)} হিজরি`
    : "";

  return (
    <div
      className="sticky top-0 z-40 bg-primary text-white w-full max-w-full border-t border-white/10 border-b border-secondary/30 shadow-sm"
      style={{ fontFamily: 'var(--font-hnt), "Arial", sans-serif' }}
    >
      <div className="container-lg mx-auto w-full max-w-full px-3 sm:px-4 py-1.5 flex flex-row items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap text-[clamp(0.74rem,0.71rem+0.18vw,0.84rem)] leading-snug">
        {/* Left Group: Location & Five Daily Prayer Times */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {isLoading ? (
            <span className="animate-pulse bg-white/20 h-4 w-56 rounded" />
          ) : error ? (
            <span className="text-white/90">নামাজের সময়সূচি লোড করা যাচ্ছে না</span>
          ) : data?.prayers ? (
            <>
              <span className="inline-flex items-center gap-1 text-secondary font-bold pr-2 border-r border-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 shrink-0 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{cityBn}</span>
              </span>

              <div className="flex items-center gap-3 sm:gap-4 text-white/95 font-medium">
                {prayerItems.map((item) => (
                  <span
                    key={item.key}
                    className="inline-flex items-center gap-1 shrink-0 tabular-nums"
                  >
                    <strong className="font-bold text-secondary">{item.label}:</strong>
                    <span>{item.time}</span>
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Right Group: Gregorian & Hijri Date in Bangla */}
        <div className="flex items-center justify-end font-semibold text-white/95 shrink-0 pl-2 border-l border-white/15">
          {isLoading ? (
            <span className="animate-pulse bg-white/20 h-4 w-44 rounded" />
          ) : error ? (
            <span>তারিখ লোড করা যাচ্ছে না</span>
          ) : gregorianDateBn && hijriDateBn ? (
            <span className="inline-flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 shrink-0 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {gregorianDateBn} · {hijriDateBn}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(SecondaryNavbar);

