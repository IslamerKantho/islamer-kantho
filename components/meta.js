import Head from "next/head";

export default function Meta() {
	return (
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href={`/img/branding/favicon.png`}
			/>

			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={`/img/branding/favicon.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={`/img/branding/favicon.png`}
			/>

			<link rel="manifest" href="/site.webmanifest" />
			<link
				rel="mask-icon"
				href={`/img/branding/favicon.png`}
				color="#000000"
			/>
			<link rel="shortcut icon" href={`/img/branding/favicon.png`} />

			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="msapplication-config" content="/favicon/browserconfig.xml" />

			<meta name="theme-color" content="#000" />

			<link rel="alternate" type="application/rss+xml" href="/feed.xml" />

			<meta name="title" content="ইসলামের কন্ঠ" />
			<meta
				name="description"
				content="ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য।"
			/>
			<meta name="author" content="islamerkantho.com" />
			<meta name="copyright" content="islamerkantho.com" />
			<meta name="robots" content="index,follow" />
		</Head>
	);
}
