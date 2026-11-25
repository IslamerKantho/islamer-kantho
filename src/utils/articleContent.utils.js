const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num) {
  if (num === undefined || num === null) return "";
  return String(num)
    .split("")
    .map((ch) => (/\d/.test(ch) ? BENGALI_DIGITS[Number(ch)] : ch))
    .join("");
}

/**
 * Extracts plain text from a Portable Text standard block.
 */
export function extractBlockText(block) {
  if (!block || !Array.isArray(block.children)) return "";
  return block.children
    .map((child) => (typeof child?.text === "string" ? child.text : ""))
    .join("")
    .trim();
}

/**
 * Builds structured metadata from an article's title, excerpt, and Portable Text body:
 * - ttsSegments: Ordered array of segments for the Read Out Loud (Web Speech API) player
 * - tocItems: Array of navigable Table of Contents sections & Key Verses / Callouts
 */
export function buildArticleReadingData(post) {
  if (!post) {
    return { ttsSegments: [], tocItems: [], verseItems: [] };
  }

  const ttsSegments = [];
  const tocItems = [];
  const verseItems = [];

  // Segment 0: Title + Excerpt
  const introText = [post.title, post.excerpt].filter(Boolean).join("। ");
  if (introText) {
    ttsSegments.push({
      id: "tts-intro",
      blockKey: "intro",
      anchorId: "article-header-top",
      label: "শিরোনাম ও সারসংক্ষেপ",
      text: introText,
      type: "intro",
    });
  }

  const bodyBlocks = Array.isArray(post.body) ? post.body : [];
  let paragraphCounter = 0;

  bodyBlocks.forEach((block, index) => {
    const blockKey = block?._key || `block-${index}`;
    const anchorId = `article-block-${blockKey}`;

    if (block?._type === "block") {
      const text = extractBlockText(block);
      if (!text) return;

      const style = block.style || "normal";
      const isHeading = ["h1", "h2", "h3", "h4"].includes(style);

      paragraphCounter += 1;
      const bnIndex = toBengaliNumber(paragraphCounter);

      // Build concise title for ToC
      const cleanSnippet =
        text.length > 62 ? `${text.slice(0, 62).trim()}...` : text;

      tocItems.push({
        id: `toc-${blockKey}`,
        blockKey,
        anchorId,
        index: paragraphCounter,
        bnIndex,
        isHeading,
        level: style,
        title: isHeading ? text : cleanSnippet,
        type: isHeading ? "heading" : "paragraph",
      });

      ttsSegments.push({
        id: `tts-${blockKey}`,
        blockKey,
        anchorId,
        label: isHeading ? `শিরোনাম: ${cleanSnippet}` : `অনুচ্ছেদ ${bnIndex}`,
        text,
        type: isHeading ? "heading" : "paragraph",
      });
    } else if (block?._type === "quranVerse") {
      const source = block.source || "কুরআন ও হাদীসের দলিল";
      const translation = block.translation || "";
      const spokenText = [
        source ? `${source}-এ বর্ণিত হয়েছে:` : "",
        translation,
      ]
        .filter(Boolean)
        .join(" ");

      verseItems.push({
        id: `verse-${blockKey}`,
        blockKey,
        anchorId,
        source,
        translation,
        arabicText: block.arabicText || "",
        type: "quranVerse",
      });

      if (spokenText) {
        ttsSegments.push({
          id: `tts-${blockKey}`,
          blockKey,
          anchorId,
          label: `দলিল: ${source}`,
          text: spokenText,
          type: "quranVerse",
        });
      }
    } else if (block?._type === "callout") {
      const title = block.title || "বিশেষ নির্দেশনা";
      const content = block.content || "";
      const spokenText = [title, content].filter(Boolean).join("। ");

      verseItems.push({
        id: `callout-${blockKey}`,
        blockKey,
        anchorId,
        source: title,
        translation: content,
        type: "callout",
      });

      if (spokenText) {
        ttsSegments.push({
          id: `tts-${blockKey}`,
          blockKey,
          anchorId,
          label: `মূল শিক্ষা: ${title}`,
          text: spokenText,
          type: "callout",
        });
      }
    }
  });

  return {
    ttsSegments,
    tocItems,
    verseItems,
  };
}
