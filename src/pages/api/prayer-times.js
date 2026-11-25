export default async function handler(req, res) {
  // Extract location from Vercel headers, fallback to Dhaka, Bangladesh
  const city = req.headers["x-vercel-ip-city"] || "Dhaka";
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
      monthEn: hijri.month.en,
      monthAr: hijri.month.ar,
      year: hijri.year,
      designation: hijri.designation.abbreviated,
    };

    const gregorianDate = {
      day: gregorian.day,
      monthEn: gregorian.month.en,
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
    console.error("Prayer times API error:", error);
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
}
