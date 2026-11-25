import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn, FaLink, FaCheck, FaPrint } from "react-icons/fa";
import { SITE_CONFIG } from "../SEO";

const SocialShare = ({ url, slug, title }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let finalUrl = url;

    if (!finalUrl && slug) {
      finalUrl = `${SITE_CONFIG.domain}/article/${slug}`;
    }

    if (!finalUrl && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      // If we are on localhost, replace origin with real domain so social platforms can scrape it
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        finalUrl = `${SITE_CONFIG.domain}${pathname}`;
      } else {
        finalUrl = window.location.href;
      }
    }

    setShareUrl(finalUrl || SITE_CONFIG.domain);
  }, [url, slug]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || SITE_CONFIG.siteName);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  const handlePopup = (e, linkUrl) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const width = 600;
      const height = 500;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(
        linkUrl,
        "share-dialog",
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={14} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#1864D9]",
    },
    {
      name: "Twitter",
      icon: <FaTwitter size={14} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2] hover:bg-[#1A91DA]",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={16} />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-[#25D366] hover:bg-[#20BD5A]",
      isDirect: true, // WhatsApp opens app/web directly
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={14} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0A66C2] hover:bg-[#0958A8]",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            onClick={(e) => !link.isDirect && handlePopup(e, link.url)}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 ${link.color}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          title="Copy Link"
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 ${
            copied ? "bg-green-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {copied ? <FaCheck size={13} /> : <FaLink size={13} />}
        </button>
        <button
          onClick={handlePrint}
          title="Print / Save as PDF"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 bg-slate-700 hover:bg-slate-800"
        >
          <FaPrint size={13} />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
