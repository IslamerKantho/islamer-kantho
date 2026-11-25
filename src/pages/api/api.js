import client, { previewClient, hasSanityConfig } from "./sanity";

// Initialization
const MAX_POSTS = 10;
const MIN_POSTS = 0;

const createPortableText = (paragraphs, verse, callout) => {
  const blocks = paragraphs.map((text, idx) => ({
    _key: `block-${idx}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span-${idx}`,
        _type: "span",
        marks: [],
        text,
      },
    ],
  }));

  if (verse) {
    blocks.splice(1, 0, {
      _key: "quran-verse-1",
      _type: "quranVerse",
      arabicText: verse.arabicText,
      translation: verse.translation,
      source: verse.source,
    });
  }

  if (callout) {
    blocks.push({
      _key: "callout-1",
      _type: "callout",
      type: callout.type || "tip",
      title: callout.title,
      content: callout.content,
    });
  }

  return blocks;
};

const MOCK_POSTS = [
  {
    _id: "post-1",
    name: "কুরআন ও সুন্নাহর আলোকে তাকওয়ার গুরুত্ব",
    title: "কুরআন ও সুন্নাহর আলোকে মানবজীবনে তাকওয়া ও আত্মশুদ্ধির গুরুত্ব",
    publishedAt: "2025-02-20T08:00:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "তাফসীর",
      slug: "tafsir",
    },
    categories: [
      {
        title: "তাফসীর",
        slug: "tafsir",
      },
    ],
    date: {
      createdAt: "2025-02-20T08:00:00Z",
      updatedAt: "2025-02-20T08:00:00Z",
    },
    excerpt:
      "তাকওয়া বা আল্লাহভীতি মুমিনের জীবনের সর্বশ্রেষ্ঠ পাথেয়। পবিত্র কুরআন ও রাসূলুল্লাহ (ﷺ)-এর সুন্নাহর আলোকে আত্মশুদ্ধি অর্জনের উপায় ও তাকওয়ার তাৎপর্য নিয়ে বিস্তারিত আলোচনা।",
    slug: "importance-of-taqwa-in-quran-and-sunnah",
    coverImage: "/img/banner.jpg",
    author: {
      _id: "author-1",
      name: "মাওলানা আবদুল হালিম",
      picture: "/img/branding/favicon.png",
      designation: "প্রধান মুফাসসির ও গবেষক",
    },
    referenceLinks: [
      { title: "সূরা আল-হুজুরাত: আয়াত ১৩ (তাফসীরে ইবনে কাসীর)", url: "" },
      { title: "সহীহ মুসলিম, কিতাবুল বিররি ওয়াস সিলাহ", url: "" },
    ],
    body: createPortableText(
      [
        "ইসলামী শরীয়তে তাকওয়া বা আল্লাহভীতি এমন এক মৌলিক গুণ, যার ওপর মানুষের ইহকালীন কল্যাণ ও পরকালীন মুক্তি নির্ভরশীল। তাকওয়া শব্দের আভিধানিক অর্থ বিরত থাকা, বেঁচে থাকা বা আত্মরক্ষা করা। শরীয়তের পরিভাষায় আল্লাহ তাআলার ভয়ে যাবতীয় গুনাহ ও নিষিদ্ধ কাজ থেকে নিজেকে রক্ষা করে তাঁর আদেশ-নিষেধ মেনে চলার নামই তাকওয়া।",
        "মুমিনের প্রতিটি আমল আল্লাহর দরবারে কবুল হওয়ার জন্য তাকওয়া ও ইখলাস অপরিহার্য শর্ত। বাহ্যিক আমলের চেয়ে অন্তরের বিশুদ্ধতা ও আল্লাহভীতি মহান আল্লাহর কাছে অধিক মূল্যায়নযোগ্য।",
        "আহলে সুন্নাত ওয়াল জামাআতের আক্বীদাহ অনুযায়ী, ইলম অর্জন ও নেককার সালেহীনদের সাহচর্যের মাধ্যমে অন্তরে তাকওয়ার বীজ অঙ্কুরিত হয় এবং নিয়মিত ফরজ ইবাদতের পাশাপাশি নফল ইবাদত ও জিকিরের মাধ্যমে তা পূর্ণতা লাভ করে।",
      ],
      {
        arabicText: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ",
        translation:
          "নিশ্চয়ই আল্লাহর কাছে তোমাদের মধ্যে সবচেয়ে মর্যাদাবান সেই ব্যক্তি, যে তোমাদের মধ্যে সবচেয়ে বেশি তাকওয়াবান। নিশ্চয়ই আল্লাহ সর্বজ্ঞ, সম্যক অবহিত।",
        source: "সূরা আল-হুজুরাত: আয়াত ১৩",
      },
      {
        type: "tip",
        title: "তাকওয়া অর্জনের মূল চাবিকাঠি",
        content:
          "প্রতিদিনের আমলের মুহাসাবা (আত্মসমালোচনা), হালাল রিজিক অন্বেষণ এবং সুন্নাহর পূর্ণ অনুসরণ মানুষকে প্রকৃত মুত্তাকী হিসেবে গড়ে তোলে।",
      }
    ),
  },
  {
    _id: "post-2",
    name: "হাদীস শরীফ সংরক্ষণের ইতিহাস",
    title: "হাদীস শরীফ সংকলন ও সংরক্ষণে সাহাবায়ে কেরাম ও মুহাদ্দিসগণের অবদান",
    publishedAt: "2025-02-18T10:30:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "হাদীস",
      slug: "hadith",
    },
    categories: [
      {
        title: "হাদীস",
        slug: "hadith",
      },
    ],
    date: {
      createdAt: "2025-02-18T10:30:00Z",
      updatedAt: "2025-02-18T10:30:00Z",
    },
    excerpt:
      "রাসূলুল্লাহ (ﷺ)-এর পবিত্র বাণী, কর্ম ও অনুমোদন কীভাবে শতাব্দীর পর শতাব্দী বিশুদ্ধ সনদের মাধ্যমে সংরক্ষিত হয়েছে, তার প্রামাণ্য ঐতিহাসিক বিবরণ।",
    slug: "history-of-hadith-preservation",
    coverImage: "/img/img1.jpg",
    author: {
      _id: "author-2",
      name: "মুহাদ্দিস আবু তাহের মুহাম্মদ",
      picture: "/img/branding/favicon.png",
      designation: "হাদীস গবেষক",
    },
    referenceLinks: [
      { title: "মুকাদ্দিমা ইবনুস সালাহ", url: "" },
      { title: "তাদরীবুর রাবী - ইমাম সুয়ূতী (রহ.)", url: "" },
    ],
    body: createPortableText(
      [
        "পবিত্র কুরআনের পরই ইসলামী শরীয়তের দ্বিতীয় প্রধান উৎস হলো রাসূলুল্লাহ (ﷺ)-এর সুন্নাহ ও হাদীস। রাসূলুল্লাহ (ﷺ)-এর জীবদ্দশাতেই সাহাবায়ে কেরাম (রা.) অসাধারণ স্মৃতিশক্তি ও লিপিবদ্ধকরণের মাধ্যমে হাদীস সংরক্ষণ শুরু করেন।",
        "পরবর্তীতে তাবেঈন ও তাবে-তাবেঈনদের যুগে ‘ইলমুল জারহ ওয়াত তা’দীল’ এবং ‘আসমাউর রিজাল’ নামক অনন্য শাস্ত্রের উদ্ভাবন ঘটে, যার মাধ্যমে প্রতিটি বর্ণনাকারীর জীবন, সততা ও স্মৃতিশক্তি সূক্ষ্মভাবে যাচাই করা হয়েছে।",
      ],
      {
        arabicText: "نَضَّرَ اللَّهُ امْرَأً سَمِعَ مِنَّا حَدِيثًا فَحَفِظَهُ حَتَّى يُبَلِّغَهُ غَيْرَهُ",
        translation:
          "আল্লাহ সেই ব্যক্তির চেহারা উজ্জ্বল করুন, যে আমাদের থেকে কোনো হাদীস শুনে তা মুখস্থ করেছে এবং অন্যের কাছে তা পৌঁছে দিয়েছে।",
        source: "সুনানে তিরমিযী: ২৬৫৬",
      }
    ),
  },
  {
    _id: "post-3",
    name: "সীরাতে রাসূল (ﷺ) ও আদর্শ সমাজ গঠন",
    title: "সীরাতে রাসূল (ﷺ)-এর আলোকে সম্প্রীতি ও ন্যায়ভিত্তিক সমাজ বিনির্মাণ",
    publishedAt: "2025-02-16T09:15:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "সীরাত",
      slug: "sirath",
    },
    categories: [
      {
        title: "সীরাত",
        slug: "sirath",
      },
    ],
    date: {
      createdAt: "2025-02-16T09:15:00Z",
      updatedAt: "2025-02-16T09:15:00Z",
    },
    excerpt:
      "মদীনা সনদ থেকে বিদায় হজ্জের ভাষণ—নবী করীম (ﷺ) কীভাবে একটি বিভক্ত সমাজকে ভ্রাতৃত্ব, ইনসাফ ও মানবিক মর্যাদার আদর্শে রূপান্তর করেছিলেন।",
    slug: "sirat-un-nabi-ideal-society",
    coverImage: "/img/img2.jpg",
    author: {
      _id: "author-3",
      name: "ড. মুহাম্মদ সাইফুল্লাহ",
      picture: "/img/branding/favicon.png",
      designation: "ইসলামের ইতিহাস ও সীরাত গবেষক",
    },
    referenceLinks: [
      { title: "সীরাতে ইবনে হিশাম", url: "" },
      { title: "আর-রাহীকুল মাখতূম", url: "" },
    ],
    body: createPortableText(
      [
        "বিশ্বমানবতার মুক্তির দিশারী সাইয়্যিদুল মুরসালীন হযরত মুহাম্মদ মোস্তফা (ﷺ)-এর পবিত্র জীবনচরিত কেবল ঐতিহাসিক ঘটনাপ্রবাহ নয়; বরং তা সর্বকালের মানুষের জন্য পূর্ণাঙ্গ জীবনাদর্শ।",
        "হিজরতের পর মদীনা মুনাওয়ারায় আনসার ও মুহাজিরদের মাঝে ভ্রাতৃত্বের বন্ধন স্থাপন এবং মদীনা সনদের মাধ্যমে সকল সম্প্রদায়ের মানুষের নিরাপত্তা ও সুবিচার নিশ্চিত করা মানব ইতিহাসের এক অনন্য মাইলফলক।",
      ],
      {
        arabicText: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
        translation:
          "নিশ্চয়ই তোমাদের জন্য আল্লাহর রাসূলের মধ্যে রয়েছে উত্তম আদর্শ।",
        source: "সূরা আল-আহযাব: আয়াত ২১",
      }
    ),
  },
  {
    _id: "post-4",
    name: "আহলে সুন্নাত ওয়াল জামাআতের আক্বীদাহ",
    title: "আহলে সুন্নাত ওয়াল জামাআতের মূলনীতি ও বিশুদ্ধ ইসলামী আক্বীদাহর পরিচয়",
    publishedAt: "2025-02-14T14:00:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "আকাঈদ",
      slug: "aqaidh",
    },
    categories: [
      {
        title: "আকাঈদ",
        slug: "aqaidh",
      },
      {
        title: "ঈমান",
        slug: "iman",
      },
    ],
    date: {
      createdAt: "2025-02-14T14:00:00Z",
      updatedAt: "2025-02-14T14:00:00Z",
    },
    excerpt:
      "সাহাবায়ে কেরাম ও সালাফে সালেহীনদের অনুসৃত মধ্যমপন্থী আক্বীদাহ এবং চরমপন্থা ও শৈথিল্যবাদ থেকে মুক্ত বিশুদ্ধ ঈমানের মৌলিক ধারা।",
    slug: "ahle-sunnat-wal-jamaat-aqidah",
    coverImage: "/img/banner.jpg",
    author: {
      _id: "author-1",
      name: "মাওলানা আবদুল হালিম",
      picture: "/img/branding/favicon.png",
      designation: "প্রধান মুফাসসির ও গবেষক",
    },
    referenceLinks: [
      { title: "আল-আকীদাতুত তাহাবিয়্যাহ - ইমাম আবু জাফর তাহাবী (রহ.)", url: "" },
    ],
    body: createPortableText([
      "ঈমান ও আমলের বিশুদ্ধতার জন্য সর্বপ্রথম প্রয়োজন সঠিক আক্বীদাহ। রাসূলুল্লাহ (ﷺ) ও তাঁর সাহাবায়ে কেরাম যে পথ ও মতের ওপর প্রতিষ্ঠিত ছিলেন, সেই মূলধারার নামই আহলে সুন্নাত ওয়াল জামাআত।",
      "ইসলামের ইতিহাসে যখনই কোনো ভ্রান্ত মতবাদের উদ্ভব হয়েছে, তখনই আহলে সুন্নাত ওয়াল জামাআতের ইমাম ও আলেমগণ কুরআন ও সুন্নাহর অকাট্য দলিলের মাধ্যমে ঈমানের সঠিক রূপরেখা উম্মাহর সামনে তুলে ধরেছেন।",
    ]),
  },
  {
    _id: "post-5",
    name: "খুশু ও খুজুর সাথে সালাত আদায়ের পদ্ধতি",
    title: "সালাতে একাগ্রতা ও খুশু-খুজু অর্জনের কার্যকর উপায়সমূহ",
    publishedAt: "2025-02-12T07:45:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "সালাত",
      slug: "salath",
    },
    categories: [
      {
        title: "সালাত",
        slug: "salath",
      },
      {
        title: "তাহারাত",
        slug: "taharath",
      },
    ],
    date: {
      createdAt: "2025-02-12T07:45:00Z",
      updatedAt: "2025-02-12T07:45:00Z",
    },
    excerpt:
      "নামাজে মনোযোগ ধরে রাখা এবং আল্লাহর সামনে দাঁড়ানোর অনুভূতি জাগ্রত করার জন্য কুরআন-হাদীস ও আউলিয়ায়ে কেরামের নির্দেশিত আমল।",
    slug: "khushu-in-salat-guide",
    coverImage: "/img/img1.jpg",
    author: {
      _id: "author-4",
      name: "মুফতি রফিকুল ইসলাম",
      picture: "/img/branding/favicon.png",
      designation: "ফিকহ ও ফতোয়া বিভাগ",
    },
    referenceLinks: [],
    body: createPortableText([
      "সালাত বা নামাজ মুমিনের মিরাজ। ঈমানের পর ইসলামের সবচেয়ে গুরুত্বপূর্ণ স্তম্ভ হলো সালাত। কিন্তু সালাতের প্রকৃত রূহ বা প্রাণ হলো খুশু ও খুজু অর্থাৎ অন্তরের বিনয় ও একাগ্রতা।",
      "উত্তমরূপে অজু করা, আজানের জবাব দেওয়া, তিলাওয়াতের অর্থ অনুধাবন করা এবং রুকু-সিজদায় ধীরস্থিরতা বজায় রাখার মাধ্যমে সালাতে খুশু অর্জন করা সহজ হয়।",
    ]),
  },
  {
    _id: "post-6",
    name: "ইসলামে পারিবারিক জীবনের আদর্শ",
    title: "সুখী ও আদর্শ পরিবার গঠনে ইসলামের কালজয়ী দিকনির্দেশনা",
    publishedAt: "2025-02-10T11:20:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "পারিবারিক জীবন",
      slug: "paribarik-jibon",
    },
    categories: [
      {
        title: "পারিবারিক জীবন",
        slug: "paribarik-jibon",
      },
      {
        title: "খাতুন",
        slug: "khatun",
      },
    ],
    date: {
      createdAt: "2025-02-10T11:20:00Z",
      updatedAt: "2025-02-10T11:20:00Z",
    },
    excerpt:
      "পারস্পরিক শ্রদ্ধা, ভালোবাসা, সহনশীলতা ও সন্তানদের দ্বীনি শিক্ষার মাধ্যমে একটি জান্নাতি পরিবার গড়ে তোলার ইসলামী রূপরেখা।",
    slug: "islamic-family-life-guidelines",
    coverImage: "/img/img2.jpg",
    author: {
      _id: "author-2",
      name: "মুহাদ্দিস আবু তাহের মুহাম্মদ",
      picture: "/img/branding/favicon.png",
      designation: "হাদীস গবেষক",
    },
    referenceLinks: [],
    body: createPortableText([
      "পরিবার হলো মানবসমাজের মূল ভিত্তি। ইসলাম পারিবারিক বন্ধনকে অত্যন্ত পবিত্র ও মর্যাদাপূর্ণ ঘোষণা করেছে। স্বামী-স্ত্রীর পারস্পরিক অধিকার, পিতা-মাতার প্রতি সদাচরণ এবং সন্তানদের আদর্শিক তারবিয়াত একটি সুস্থ সমাজের পূর্বশর্ত।",
    ]),
  },
  {
    _id: "post-7",
    name: "তাসাওউফ ও আত্মশুদ্ধির পরিচয়",
    title: "ইসলামে তাসাওউফ ও আউলিয়ায়ে কেরামের জীবনাদর্শ: একটি তাত্ত্বিক বিশ্লেষণ",
    publishedAt: "2025-02-08T16:00:00Z",
    featured: true,
    recommended: true,
    category: {
      title: "তাসাওউফ",
      slug: "tasauf",
    },
    categories: [
      {
        title: "তাসাওউফ",
        slug: "tasauf",
      },
      {
        title: "আউলিয়া",
        slug: "awliya",
      },
    ],
    date: {
      createdAt: "2025-02-08T16:00:00Z",
      updatedAt: "2025-02-08T16:00:00Z",
    },
    excerpt:
      "হাদীসে জিবরীলে বর্ণিত ‘ইহসান’ ও আত্মার ব্যাধিসমূহ দূর করে আল্লাহর নৈকট্য অর্জনে শরীয়তসম্মত তাসাওউফের ভূমিকা।",
    slug: "tasawwuf-and-spiritual-purification",
    coverImage: "/img/banner.jpg",
    author: {
      _id: "author-1",
      name: "মাওলানা আবদুল হালিম",
      picture: "/img/branding/favicon.png",
      designation: "প্রধান মুফাসসির ও গবেষক",
    },
    referenceLinks: [],
    body: createPortableText([
      "হাদীসে জিবরীলে দ্বীনের তিনটি স্তর বর্ণিত হয়েছে—ইসলাম, ঈমান ও ইহসান। আল্লাহর ইবাদত এমনভাবে করা যেন বান্দা আল্লাহকে দেখছে, আর তা সম্ভব না হলে এই দৃঢ় বিশ্বাস রাখা যে আল্লাহ তাকে দেখছেন—এই উচ্চতর আধ্যাত্মিক স্তরই তাসাওউফের মূল প্রতিপাদ্য।",
    ]),
  },
  {
    _id: "post-8",
    name: "ইসলামি অর্থনীতি ও যাকাত ব্যবস্থা",
    title: "দারিদ্র্য বিমোচন ও অর্থনৈতিক সাম্য প্রতিষ্ঠায় যাকাত ও ইসলামি অর্থনীতির ভূমিকা",
    publishedAt: "2025-02-05T12:00:00Z",
    featured: false,
    recommended: false,
    category: {
      title: "ইসলামি অর্থনীতি",
      slug: "islamic-orthonithi",
    },
    categories: [
      {
        title: "ইসলামি অর্থনীতি",
        slug: "islamic-orthonithi",
      },
      {
        title: "যাকাত",
        slug: "jakath",
      },
    ],
    date: {
      createdAt: "2025-02-05T12:00:00Z",
      updatedAt: "2025-02-05T12:00:00Z",
    },
    excerpt:
      "সুদমুক্ত অর্থনীতি, হালাল ব্যবসা-বাণিজ্য ও যাকাত ভিত্তিক সম্পদ বণ্টন কীভাবে সমাজে অর্থনৈতিক বৈষম্য দূর করে।",
    slug: "islamic-economics-and-zakat-system",
    coverImage: "/img/img1.jpg",
    author: {
      _id: "author-4",
      name: "মুফতি রফিকুল ইসলাম",
      picture: "/img/branding/favicon.png",
      designation: "ফিকহ ও ফতোয়া বিভাগ",
    },
    referenceLinks: [],
    body: createPortableText([
      "ইসলাম সম্পদকে কেবল ধনীদের মাঝে পুঞ্জীভূত না রেখে সমাজের সকল স্তরে প্রবাহিত করার নির্দেশ দিয়েছে। যাকাত কোনো অনুগ্রহ নয়, বরং ধনীদের সম্পদে দরিদ্র ও বঞ্চিত মানুষের আল্লাহ প্রদত্ত অধিকার।",
    ]),
  },
  {
    _id: "post-9",
    name: "শিক্ষার্থীদের সময় ব্যবস্থাপনা ও ইলম চর্চা",
    title: "জ্ঞান অন্বেষণে শিক্ষার্থীদের আদব, সময় ব্যবস্থাপনা ও সাফল্যের মূলমন্ত্র",
    publishedAt: "2025-02-02T09:00:00Z",
    featured: false,
    recommended: false,
    category: {
      title: "পরামর্শ",
      slug: "poramorsho",
    },
    categories: [
      {
        title: "পরামর্শ",
        slug: "poramorsho",
      },
      {
        title: "শিক্ষাঙ্গন",
        slug: "shikkhangon",
      },
    ],
    date: {
      createdAt: "2025-02-02T09:00:00Z",
      updatedAt: "2025-02-02T09:00:00Z",
    },
    excerpt:
      "দ্বীনি ও জাগতিক শিক্ষায় উৎকর্ষ অর্জনের জন্য সালাফে সালেহীনদের অধ্যবসায়, শিক্ষকের প্রতি শ্রদ্ধা ও সময়ের সদ্ব্যবহার।",
    slug: "student-time-management-and-ilm",
    coverImage: "/img/img2.jpg",
    author: {
      _id: "author-3",
      name: "ড. মুহাম্মদ সাইফুল্লাহ",
      picture: "/img/branding/favicon.png",
      designation: "ইসলামের ইতিহাস ও সীরাত গবেষক",
    },
    referenceLinks: [],
    body: createPortableText([
      "ইলম বা জ্ঞান অর্জন প্রতিটি নর-নারীর ওপর ফরজ। প্রকৃত জ্ঞান কেবল তথ্যের সমষ্টি নয়, বরং তা মানুষের চরিত্র ও কর্মকে আলোকিত করে।",
    ]),
  },
];

const MOCK_GALLERIES = [
  {
    _id: "gallery-1",
    title: "ইসলামের কন্ঠ প্রচ্ছদ চিত্র",
    slug: "islamer-kantho-banner",
    mediaType: "image",
    caption: "বাংলা ভাষায় বিশুদ্ধ ইসলামী জ্ঞানের ক্ষেত্র",
    videoUrl: "",
    image: "/img/banner.jpg",
  },
  {
    _id: "gallery-2",
    title: "ইসলামী স্থাপত্য ও ঐতিহ্য",
    slug: "islamic-heritage-1",
    mediaType: "image",
    caption: "ঐতিহাসিক মসজিদ ও ইসলামী শিল্পকলা",
    videoUrl: "",
    image: "/img/img1.jpg",
  },
  {
    _id: "gallery-3",
    title: "কুরআন ও দ্বীনি শিক্ষা",
    slug: "quran-education-gallery",
    mediaType: "image",
    caption: "বিশুদ্ধ ইলম ও আমলের প্রসার",
    videoUrl: "",
    image: "/img/img2.jpg",
  },
];

const getUniquePosts = (posts) => {
  if (!Array.isArray(posts)) return [];
  const slugs = new Set();
  return posts.filter((post) => {
    if (!post?.slug || slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

// API Client.
const getClient = (preview) => (preview ? previewClient : client);

const postFields = `
  _id,
  name,
  title,
  publishedAt,
  'category': categories[]-> {
    title,
    'slug': slug.current
  },
  'date': {
    'createdAt': _createdAt, 
  	'updatedAt': _updatedAt
  },
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url, designation},
  references,
  'seo': seo {
    metaTitle,
    metaDescription,
    keywords,
    'ogImageUrl': ogImage.asset->url,
    noIndex
  },
`;

// Recommended Posts.
export async function getRecommendedPost(preview, range) {
  const sliceStart = range ? range[0] : 0;
  const sliceEnd = range ? range[1] : MOCK_POSTS.length;

  if (!hasSanityConfig) {
    return getUniquePosts(
      MOCK_POSTS.filter((p) => p.recommended).slice(sliceStart, sliceEnd)
    );
  }

  try {
    let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);
    const dataQuery = `*[_type == "post" && recommended ] | order(publishedAt desc)`;
    const dataParams = `
      _id,
      'date': {
        'createdAt': _createdAt, 
        'updatedAt': _updatedAt
      },
      'category': categories[0]-> {
        title,
        'slug': slug.current
      },
      'author': author->{name, 'picture': image.asset->url},
      title,
      'slug': slug.current,
      excerpt,
      'coverImage': mainImage,
    `;
    const featuredPost = await getClient(preview).fetch(
      `${dataQuery} {
        ${dataParams}
      } ${dataRange(range)}`
    );
    return getUniquePosts(featuredPost);
  } catch (err) {
    console.warn("Sanity fetch failed in getRecommendedPost, using fallback:", err.message);
    return getUniquePosts(
      MOCK_POSTS.filter((p) => p.recommended).slice(sliceStart, sliceEnd)
    );
  }
}

// Featured Posts.
export async function getFeaturedPost(preview, range) {
  const sliceStart = range ? range[0] : 0;
  const sliceEnd = range ? range[1] : MOCK_POSTS.length;

  if (!hasSanityConfig) {
    return getUniquePosts(
      MOCK_POSTS.filter((p) => p.featured).slice(sliceStart, sliceEnd)
    );
  }

  try {
    let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);
    const dataQuery = `*[_type == "post" && featured ] | order(publishedAt desc)`;
    const dataParams = `
      _id,
      title,
      'date': {
        'createdAt': _createdAt, 
        'updatedAt': _updatedAt
      },
      'category': categories[0]-> {
        title,
        'slug': slug.current
      },
      'author': author->{name, 'picture': image.asset->url},
      'slug': slug.current,
      excerpt,
      'coverImage': mainImage,
    `;
    const featuredPost = await getClient(preview).fetch(
      `${dataQuery} {
        ${dataParams}
      } ${dataRange(range)}`
    );
    return getUniquePosts(featuredPost);
  } catch (err) {
    console.warn("Sanity fetch failed in getFeaturedPost, using fallback:", err.message);
    return getUniquePosts(
      MOCK_POSTS.filter((p) => p.featured).slice(sliceStart, sliceEnd)
    );
  }
}

// Category List.
export async function getCategoryList(preview) {
  if (!hasSanityConfig) {
    return [
      { _id: "cat-1", title: "তাফসীর", slug: "tafsir" },
      { _id: "cat-2", title: "হাদীস", slug: "hadith" },
      { _id: "cat-3", title: "সীরাত", slug: "sirath" },
      { _id: "cat-4", title: "আকাঈদ", slug: "aqaidh" },
      { _id: "cat-5", title: "সালাত", slug: "salath" },
    ];
  }

  try {
    const dataQuery = `*[_type=='category'] | order(publishedAt desc)`;
    const featuredPost = await getClient(preview).fetch(
      `${dataQuery} {
        _id,
        title,
        'slug': slug.current
      }`
    );
    return getUniquePosts(featuredPost);
  } catch {
    return [];
  }
}

export async function getPreviewPostBySlug(slug) {
  if (!hasSanityConfig) {
    return MOCK_POSTS.find((p) => p.slug === slug) || MOCK_POSTS[0];
  }
  try {
    const data = await getClient(true).fetch(
      `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
        ${postFields}
        body
      }`,
      { slug }
    );
    return data?.[0] || null;
  } catch {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }
}

export async function getAllPostsWithSlug() {
  if (!hasSanityConfig) {
    return MOCK_POSTS.map((post) => ({ slug: post.slug }));
  }
  try {
    const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
    return data || [];
  } catch {
    return MOCK_POSTS.map((post) => ({ slug: post.slug }));
  }
}

/**
 * Get all posts.
 *
 * @param {boolean} preview
 * @param {number} offset
 * @param {number} limit
 * @param {string} category
 * @returns
 */
export async function getAllPosts(preview = false, offset, limit, category) {
  let offsetValue = parseInt(offset, 10);
  let limitValue = parseInt(limit, 10);

  if (!offsetValue || offsetValue < MIN_POSTS) offsetValue = MIN_POSTS;
  if (!limitValue || limitValue <= MIN_POSTS || limitValue > MAX_POSTS)
    limitValue = MAX_POSTS;

  const getFallbackResult = () => {
    const filtered = category
      ? MOCK_POSTS.filter(
          (p) =>
            p.category?.slug === category ||
            p.categories?.some((c) => c.slug === category)
        )
      : MOCK_POSTS;
    const list = filtered.length > 0 ? filtered : MOCK_POSTS;
    const sliced = list.slice(offsetValue, offsetValue + limitValue + 1);
    const isPaginate = sliced.length > limitValue;
    const pageItems = sliced.slice(0, limitValue);
    return {
      data: getUniquePosts(pageItems),
      isPaginate,
      offset: offsetValue + limitValue,
      length: pageItems.length,
    };
  };

  if (!hasSanityConfig) {
    return getFallbackResult();
  }

  try {
    let categoryValue = category
      ? `&& "${category}" in (categories[]->slug.current)`
      : "";
    const range = `[${offsetValue}...${offsetValue + limitValue + 1}]`;
    const query = `*[_type == "post" ${categoryValue}] | order(publishedAt desc) {
        _id,
        name,
        title,
        'category': categories[0]-> {
          title,
          'slug': slug.current
        },
        'date': {
          'createdAt': _createdAt, 
          'updatedAt': _updatedAt
        },
        excerpt,
        'slug': slug.current,
        'coverImage': mainImage,
        'author': author->{_id, name, 'picture': image.asset->url},
      } ${range}`;
    const results = (await getClient(preview).fetch(query)) || [];
    const totalPosts = results.length;
    results.splice(limitValue);
    const isPaginate = totalPosts > limitValue;

    return {
      data: getUniquePosts(results),
      isPaginate,
      offset: offsetValue + limitValue,
      length: results.length,
    };
  } catch (err) {
    console.warn("Sanity fetch failed in getAllPosts, using fallback:", err.message);
    return getFallbackResult();
  }
}

export async function getAllPostsByCategory(preview, category, range) {
  const sliceStart = range ? range[0] : 0;
  const sliceEnd = range ? range[1] : MOCK_POSTS.length;

  const getFallback = () => {
    const filtered = MOCK_POSTS.filter(
      (p) =>
        p.category?.slug === category ||
        p.categories?.some((c) => c.slug === category)
    );
    const list = filtered.length > 0 ? filtered : MOCK_POSTS;
    return {
      length: list.length,
      data: getUniquePosts(list.slice(sliceStart, sliceEnd)),
    };
  };

  if (!hasSanityConfig) {
    return getFallback();
  }

  try {
    let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);
    let filter = `_type == "post" && "${category}" in (categories[]->slug.current)`;
    const query = `{
      "data": *[${filter}] | order(publishedAt desc){
        ${postFields}
      } ${dataRange(range)},
     "length": count(*[${filter}])
     }`;

    const results = await getClient(preview).fetch(query);
    return {
      length: results?.length || 0,
      data: getUniquePosts(results?.data || []),
    };
  } catch {
    return getFallback();
  }
}

export async function getPostAndMorePosts(slug, preview) {
  const getFallback = () => {
    const post = MOCK_POSTS.find((p) => p.slug === slug) || MOCK_POSTS[0];
    const morePosts = MOCK_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);
    return { post, morePosts: getUniquePosts(morePosts) };
  };

  if (!hasSanityConfig) {
    return getFallback();
  }

  try {
    const curClient = getClient(preview);
    const [post, morePosts] = await Promise.all([
      curClient
        .fetch(
          `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
          ${postFields}
          body,
          'comments': *[
                        _type == "comment" && 
                        post._ref == ^._id && 
                        approved == true] {
            _id, 
            name, 
            email, 
            comment, 
            _createdAt
          }
        }`,
          { slug }
        )
        .then((res) => res?.[0]),
      curClient.fetch(
        `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
          ${postFields}
          body,
        }[0...4]`,
        { slug }
      ),
    ]);
    return { post: post || null, morePosts: getUniquePosts(morePosts || []) };
  } catch {
    return getFallback();
  }
}

export async function getAllGalleries(preview = false) {
  if (!hasSanityConfig) {
    return MOCK_GALLERIES;
  }
  try {
    const query = `*[_type == "gallery"] | order(_createdAt desc) {
      _id,
      title,
      'slug': slug.current,
      mediaType,
      caption,
      videoUrl,
      'image': image.asset->url
    }`;
    return (await getClient(preview).fetch(query)) || MOCK_GALLERIES;
  } catch {
    return MOCK_GALLERIES;
  }
}

export async function getGalleryBySlug(slug, preview = false) {
  if (!hasSanityConfig) {
    return MOCK_GALLERIES.find((g) => g.slug === slug) || MOCK_GALLERIES[0];
  }
  try {
    const query = `*[_type == "gallery" && slug.current == $slug][0] {
      _id,
      title,
      'slug': slug.current,
      mediaType,
      caption,
      videoUrl,
      'image': image.asset->url
    }`;
    return await getClient(preview).fetch(query, { slug });
  } catch {
    return MOCK_GALLERIES.find((g) => g.slug === slug) || MOCK_GALLERIES[0];
  }
}

export async function searchPosts(searchQuery, preview = false) {
  if (!searchQuery) return [];

  const getFallback = () => {
    const q = searchQuery.toLowerCase();
    return getUniquePosts(
      MOCK_POSTS.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.category?.title?.toLowerCase().includes(q)
      )
    );
  };

  if (!hasSanityConfig) {
    return getFallback();
  }

  try {
    const query = `*[_type == "post" && (title match $searchQuery || excerpt match $searchQuery)] | order(publishedAt desc) {
      _id,
      name,
      title,
      'category': categories[0]-> {
        title,
        'slug': slug.current
      },
      'date': {
        'createdAt': _createdAt, 
        'updatedAt': _updatedAt
      },
      excerpt,
      'slug': slug.current,
      'coverImage': mainImage,
      'author': author->{_id, name, 'picture': image.asset->url},
    }[0...20]`;

    const results = await getClient(preview).fetch(query, {
      searchQuery: `*${searchQuery}*`,
    });
    return getUniquePosts(results || []);
  } catch {
    return getFallback();
  }
}

export async function getPageBySlug(slug, preview = false) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    'slug': slug.current,
    body,
    'seo': seo {
      metaTitle,
      metaDescription,
      keywords,
      'ogImageUrl': ogImage.asset->url,
      noIndex
    }
  }`;
  return await getClient(preview).fetch(query, { slug });
}

export async function getAllPagesWithSlug(preview = false) {
  const query = `*[_type == "page"] { 'slug': slug.current }`;
  return await getClient(preview).fetch(query);
}

export async function getSiteSettings(preview = false) {
  const query = `*[_type == "siteSettings"][0] {
    primaryMenu[] {
      title,
      url
    },
    sidebarMenu[] {
      title,
      color,
      items[] {
        title,
        url
      }
    }
  }`;
  return await getClient(preview).fetch(query);
}
