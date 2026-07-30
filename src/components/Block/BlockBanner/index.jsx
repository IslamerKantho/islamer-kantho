import clsx from "clsx";
import { memo } from "react";

const BlockBanner = ({ className }) => {
  return (
    <section className={clsx("py-28", className)}>
      <div className="container max-w-230! text-center">
        <blockquote className="mb-4 text-lg font-semibold leading-relaxed">
          کُلُّ نَفۡسٍ ذَآئِقَۃُ الۡمَوۡتِ - وَاِنَّمَا تُوَفَّوۡنَ
          اُجُوۡرَکُمۡ یَوۡمَ الۡقِیٰمَۃِ - فَمَنۡ زُحۡزِحَ عَنِ النَّارِ
          وَاُدۡخِلَ الۡجَنَّۃَ فَقَدۡ فَازَ - وَمَا الۡحَیٰوۃُ الدُّنۡیَاۤ
          اِلَّا مَتَاعُ الۡغُرُوۡرِ.
        </blockquote>

        <blockquote className="mb-4 text-lg leading-8 font-semibold mt-4">
          জীবমাত্রই মৃত্যুর স্বাদ গ্রহণ করবে। কেবলমাত্র কেয়ামতের দিনই
          তোমাদেরকে তোমাদেরকে কর্মফল পূর্ণ মাত্রায় দেয়া হবে। অতঃপর যাকে আগুন
          থেকে দূরে রাখা হবে এবং জান্নাতে প্রবেশ করানো হবে সেই সফলকাম। আর
          পার্থিব জীবন ছলনাময় ভোগ ছাড়া আর কিছু নয়।
        </blockquote>

        <blockquote className="mb-1 text-[14px] leading-[170%] font-extrabold mt-4 text-[#055547]">
          (সূরা আল-ইমরানের ১৮৫ নম্বর আয়াতে)
        </blockquote>
      </div>
    </section>
  );
};

export default memo(BlockBanner);
