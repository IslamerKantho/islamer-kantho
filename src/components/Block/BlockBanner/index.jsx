import clsx from "clsx";
import { memo } from "react";

const BlockBanner = ( { className } ) => {
  return (
    <section className={ clsx( "py-20 bg-slate-50/50 border-y border-slate-100", className ) }>
      <div className="container max-w-230! text-center px-6">

        {/* Arabic Verse */ }
        <blockquote
          className="text-center text-2xl leading-[2.5] text-primary/95 font-bold mb-4 tracking-wide"
          lang="ar"
          dir="rtl"
          style={ { fontFamily: '"Amiri", "Scheherazade New", "Traditional Arabic", serif' } }
        >
          كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ ۖ فَمَنْ زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الْجَنَّةَ فَقَدْ فَازَ ۗ وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ
        </blockquote>

        {/* Divider accent */ }
        <div className="h-[2px] w-12 bg-secondary/50 mx-auto my-4 rounded-full"></div>

        {/* Bengali Translation */ }
        <blockquote className="text-base md:text-lg leading-relaxed text-slate-700 italic font-medium mb-4">
          "জীবমাত্রই মৃত্যুর স্বাদ গ্রহণ করবে। কেবলমাত্র কেয়ামতের দিনই তোমাদেরকে তোমাদের কর্মফল পূর্ণ মাত্রায় দেয়া হবে। অতঃপর যাকে আগুন থেকে দূরে রাখা হবে এবং জান্নাতে প্রবেশ করানো হবে সেই সফলকাম। আর পার্থিব জীবন ছলনাময় ভোগ ছাড়া আর কিছু নয়।"
        </blockquote>

        {/* Source citation */ }
        <cite className="block text-xs font-bold uppercase tracking-wider text-primary mt-4 not-italic">
          — সূরা আল-ইমরান: ১৮৫
        </cite>
      </div>
    </section>
  );
};

export default memo( BlockBanner );
