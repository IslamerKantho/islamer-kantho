const CITY_COORDINATES = {
  dhaka: { lat: 23.8103, lng: 90.4125, tz: 6 },
  chittagong: { lat: 22.3569, lng: 91.7832, tz: 6 },
  chattogram: { lat: 22.3569, lng: 91.7832, tz: 6 },
  sylhet: { lat: 24.8949, lng: 91.8687, tz: 6 },
  rajshahi: { lat: 24.3745, lng: 88.6042, tz: 6 },
  khulna: { lat: 22.8456, lng: 89.5403, tz: 6 },
  barisal: { lat: 22.701, lng: 90.3535, tz: 6 },
  barishal: { lat: 22.701, lng: 90.3535, tz: 6 },
  rangpur: { lat: 25.7439, lng: 89.2752, tz: 6 },
  mymensingh: { lat: 24.7471, lng: 90.4203, tz: 6 },
};

const HIJRI_MONTH_NAMES_EN = {
  1: "Muharram",
  2: "Safar",
  3: "Rabi al-Awwal",
  4: "Rabi al-Thani",
  5: "Jumada al-Ula",
  6: "Jumada al-Thani",
  7: "Rajab",
  8: "Sha'ban",
  9: "Ramadan",
  10: "Shawwal",
  11: "Dhu al-Qi'dah",
  12: "Dhu al-Hijjah",
};

const degToRad = (d) => (d * Math.PI) / 180;
const radToDeg = (r) => (r * 180) / Math.PI;

const formatTime24 = (decimalHours) => {
  let h = ((decimalHours % 24) + 24) % 24;
  let hours = Math.floor(h);
  let minutes = Math.round((h - hours) * 60);
  if (minutes === 60) {
    hours = (hours + 1) % 24;
    minutes = 0;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/**
 * Computes accurate daily Islamic prayer times using standard astronomical solar equations
 * (University of Islamic Sciences, Karachi angles: Fajr 18 deg, Isha 18 deg)
 */
const calculateAstronomicalPrayerTimes = (date, cityKey = "dhaka") => {
  const coords =
    CITY_COORDINATES[String(cityKey || "dhaka").toLowerCase()] ||
    CITY_COORDINATES.dhaka;
  const { lat, lng, tz } = coords;

  // Day of year
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / 86400000);

  // Fractional year gamma (radians)
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);

  // Equation of time (in minutes) and Solar declination (in radians)
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = degToRad(lat);

  // Solar noon in local time (hours)
  const noon = 12 + tz - lng / 15 - eqTime / 60;

  // Hour angle helper for a given zenith/depression angle below horizon (degrees)
  const getHourAngle = (angleBelowHorizonDeg) => {
    const zenithRad = degToRad(90 + angleBelowHorizonDeg);
    const cosH =
      (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) /
      (Math.cos(latRad) * Math.cos(decl));
    const clamped = Math.max(-1, Math.min(1, cosH));
    return radToDeg(Math.acos(clamped)) / 15;
  };

  // Asr hour angle (shadow factor = 1 for standard / Shafi'i, or 1.5 balanced)
  const getAsrHourAngle = (shadowFactor = 1) => {
    const targetAlt = Math.atan(1 / (shadowFactor + Math.tan(Math.abs(latRad - decl))));
    const sinAlt = Math.sin(targetAlt);
    const cosH =
      (sinAlt - Math.sin(latRad) * Math.sin(decl)) /
      (Math.cos(latRad) * Math.cos(decl));
    const clamped = Math.max(-1, Math.min(1, cosH));
    return radToDeg(Math.acos(clamped)) / 15;
  };

  const fajrOffset = getHourAngle(18);
  const sunsetOffset = getHourAngle(0.833);
  const ishaOffset = getHourAngle(18);
  const asrOffset = getAsrHourAngle(1);

  return {
    Fajr: formatTime24(noon - fajrOffset),
    Dhuhr: formatTime24(noon + 0.03), // 2 min after zenith
    Asr: formatTime24(noon + asrOffset),
    Maghrib: formatTime24(noon + sunsetOffset + 0.03),
    Isha: formatTime24(noon + ishaOffset),
  };
};

/**
 * Computes the current Hijri and Gregorian calendar dates using Intl.DateTimeFormat
 */
const calculateCalendarDates = (date) => {
  const gregorian = {
    day: String(date.getDate()),
    monthNumber: date.getMonth() + 1,
    monthEn: date.toLocaleString("en-US", { month: "long" }),
    year: String(date.getFullYear()),
  };

  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).formatToParts(date);

    const dayPart = parts.find((p) => p.type === "day")?.value || "15";
    const monthNum =
      parseInt(parts.find((p) => p.type === "month")?.value || "5", 10) || 5;
    const yearPart =
      (parts.find((p) => p.type === "year")?.value || "1448").replace(
        /[^0-9]/g,
        ""
      ) || "1448";

    return {
      gregorian,
      hijri: {
        day: dayPart,
        monthNumber: monthNum,
        monthEn: HIJRI_MONTH_NAMES_EN[monthNum] || "Jumada al-Ula",
        monthAr: "",
        year: yearPart,
        designation: "AH",
      },
    };
  } catch {
    return {
      gregorian,
      hijri: {
        day: "15",
        monthNumber: 5,
        monthEn: "Jumada al-Ula",
        monthAr: "",
        year: "1448",
        designation: "AH",
      },
    };
  }
};

export default async function handler(req, res) {
  const rawCity = req.headers["x-vercel-ip-city"];
  const city = rawCity ? decodeURIComponent(rawCity) : "Dhaka";
  const country = req.headers["x-vercel-ip-country"] || "Bangladesh";

  // Cache the response at the edge for 1 hour, stale while revalidate for 1 day
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const timings = data?.data?.timings;
    const hijri = data?.data?.date?.hijri;
    const gregorian = data?.data?.date?.gregorian;

    if (!timings || !hijri || !gregorian) {
      throw new Error("Incomplete timing payload");
    }

    return res.status(200).json({
      location: { city, country },
      prayers: {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      },
      hijri: {
        day: hijri.day,
        monthNumber: hijri.month?.number || null,
        monthEn: hijri.month?.en || "",
        monthAr: hijri.month?.ar || "",
        year: hijri.year,
        designation: hijri.designation?.abbreviated || "AH",
      },
      gregorian: {
        day: gregorian.day,
        monthNumber: gregorian.month?.number || null,
        monthEn: gregorian.month?.en || "",
        year: gregorian.year,
      },
    });
  } catch {
    const { gregorian, hijri } = calculateCalendarDates(now);
    const prayers = calculateAstronomicalPrayerTimes(now, city);

    return res.status(200).json({
      location: { city: city || "Dhaka", country },
      prayers,
      hijri,
      gregorian,
    });
  }
}
