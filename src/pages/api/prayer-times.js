export default async function handler(req, res) {
  // Extract location from headers, fallback to Dhaka, Bangladesh
  const rawCity = req.headers["x-vercel-ip-city"];
  const city = rawCity ? decodeURIComponent(rawCity) : "Dhaka";
  const country = req.headers["x-vercel-ip-country"] || "Bangladesh";

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        city
      )}&country=${encodeURIComponent(country)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    const data = await response.json();
    const timings = data.data.timings;
    const hijri = data.data.date.hijri;
    const gregorian = data.data.date.gregorian;

    // We only need Fajr, Dhuhr, Asr, Maghrib, Isha
    const prayerTimes = {
      Fajr: timings.Fajr,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha,
    };

    const hijriDate = {
      day: hijri.day,
      monthNumber: hijri.month?.number || null,
      monthEn: hijri.month?.en || "",
      monthAr: hijri.month?.ar || "",
      year: hijri.year,
      designation: hijri.designation?.abbreviated || "AH",
    };

    const gregorianDate = {
      day: gregorian.day,
      monthNumber: gregorian.month?.number || null,
      monthEn: gregorian.month?.en || "",
      year: gregorian.year,
    };

    // Cache the response at the edge for 1 hour, stale while revalidate for 1 day
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    res.status(200).json({
      location: { city, country },
      prayers: prayerTimes,
      hijri: hijriDate,
      gregorian: gregorianDate,
    });
  } catch (error) {
    console.warn("Prayer times API fallback activated:", error?.message);
    const now = new Date();
    res.status(200).json({
      location: { city: city || "Dhaka", country: "Bangladesh" },
      prayers: {
        Fajr: "05:02",
        Dhuhr: "12:04",
        Asr: "15:35",
        Maghrib: "17:14",
        Isha: "18:32",
      },
      hijri: {
        day: "15",
        monthNumber: 5,
        monthEn: "Jumada al-Ula",
        year: "1448",
        designation: "AH",
      },
      gregorian: {
        day: String(now.getDate()),
        monthNumber: now.getMonth() + 1,
        monthEn: now.toLocaleString("en-US", { month: "long" }),
        year: String(now.getFullYear()),
      },
    });
  }
}

