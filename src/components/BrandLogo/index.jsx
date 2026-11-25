import { memo, useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  WORDMARK_PATH,
  WORDMARK_RIM_OFFSET,
  EMBLEM_HEX_OUTER,
  EMBLEM_HEX_CLIP,
  EMBLEM_MINARET_PATH,
  EMBLEM_MINARET_WINDOWS,
  EMBLEM_MOSQUE_DOME_PATH,
  EMBLEM_ARCADE_WINDOWS,
  EMBLEM_CRESCENT_PATH,
  EMBLEM_CHEVRON_PATH,
  EMBLEM_STAR_PATHS,
  EMBLEM_CHEVRON_ORNAMENT_DIAMOND,
  EMBLEM_CHEVRON_ORNAMENT_WINGS,
} from "./logoPaths";

const PALETTES = {
  dark: {
    emblemBg: "#044f4f",
    hexBorder: "#D1BB9E",
    mosqueFill: "#FFFFFF",
    windowCutout: "#044f4f",
    starFill: "#D1BB9E",
    crescentFill: "#D1BB9E",
    chevronFill: "#D1BB9E",
    chevronOrnament: "#044f4f",
    wordmarkPrimary: "#FFFFFF",
    wordmarkRim: "#D1BB9E",
    wordmarkRimOpacity: 0.88,
  },
  light: {
    emblemBg: "#FFFFFF",
    hexBorder: "#044f4f",
    mosqueFill: "#044f4f",
    windowCutout: "#FFFFFF",
    starFill: "#8C241E",
    crescentFill: "#044f4f",
    chevronFill: "#044f4f",
    chevronOrnament: "#D1BB9E",
    wordmarkPrimary: "#044f4f",
    wordmarkRim: "#A5B5C7",
    wordmarkRimOpacity: 0.95,
  },
};

const VIEWBOX_BY_VARIANT = {
  full: "0 0 464 92",
  wordmark: "0 0 368 90",
  emblem: "0 0 84 92",
};

/**
 * Pure-vector SVG brand logo for ইসলামের কন্ঠ.
 * Supports full lockup (hexagonal mosque emblem + calligraphic Bengali wordmark),
 * wordmark-only, and emblem-only variants across dark emerald and light themes.
 */
const BrandLogo = ({
  variant = "full",
  theme = "dark",
  className,
  title = "ইসলামের কন্ঠ",
  decorative = false,
  ...rest
}) => {
  const rawId = useId();
  const clipId = `ik-emblem-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const resolvedVariant = VIEWBOX_BY_VARIANT[variant] ? variant : "full";
  const palette = PALETTES[theme] || PALETTES.dark;
  const showEmblem = resolvedVariant === "full" || resolvedVariant === "emblem";
  const showWordmark =
    resolvedVariant === "full" || resolvedVariant === "wordmark";

  const wordmarkTransform =
    resolvedVariant === "full" ? "translate(98, 6.5)" : "translate(2, 6)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={VIEWBOX_BY_VARIANT[resolvedVariant]}
      fill="none"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : title}
      className={clsx("block shrink-0 select-none", className)}
      {...rest}
    >
      {!decorative && title ? <title>{title}</title> : null}

      {showEmblem && (
        <g>
          <defs>
            <clipPath id={clipId}>
              <path d={EMBLEM_HEX_CLIP} />
            </clipPath>
          </defs>

          {/* Interior Hexagonal Canvas & Architectural Mosque Composition */}
          <g clipPath={`url(#${clipId})`}>
            <path d={EMBLEM_HEX_OUTER} fill={palette.emblemBg} />

            {/* Celestial Star Constellation */}
            <g fill={palette.starFill}>
              {EMBLEM_STAR_PATHS.map((starPath, index) => (
                <path key={index} d={starPath} />
              ))}
            </g>

            {/* Crescent Finial atop Main Dome */}
            <path d={EMBLEM_CRESCENT_PATH} fill={palette.crescentFill} />

            {/* Left Slender Minaret & Lantern Gallery Cutouts */}
            <path d={EMBLEM_MINARET_PATH} fill={palette.mosqueFill} />
            <g fill={palette.windowCutout}>
              {EMBLEM_MINARET_WINDOWS.map((winPath, index) => (
                <path key={index} d={winPath} />
              ))}
            </g>

            {/* Sweeping Mughal Mosque Dome & Arcade Facade */}
            <path d={EMBLEM_MOSQUE_DOME_PATH} fill={palette.mosqueFill} />
            <g fill={palette.windowCutout}>
              {EMBLEM_ARCADE_WINDOWS.map((archPath, index) => (
                <path key={index} d={archPath} />
              ))}
            </g>

            {/* Lower Heraldic Chevron & Geometric Filigree Accent */}
            <path d={EMBLEM_CHEVRON_PATH} fill={palette.chevronFill} />
            <path
              d={EMBLEM_CHEVRON_ORNAMENT_WINGS}
              stroke={palette.chevronOrnament}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d={EMBLEM_CHEVRON_ORNAMENT_DIAMOND}
              fill={palette.chevronOrnament}
            />
          </g>

          {/* Crisp Outer Hexagonal Shield Frame */}
          <path
            d={EMBLEM_HEX_OUTER}
            fill="none"
            stroke={palette.hexBorder}
            strokeWidth="4.2"
            strokeLinejoin="miter"
            strokeMiterlimit="6"
          />
        </g>
      )}

      {showWordmark && (
        <g transform={wordmarkTransform}>
          {/* Dimensional Offset Depth Rim matching the Calligraphic Reference */}
          <path
            d={WORDMARK_PATH}
            fill={palette.wordmarkRim}
            fillOpacity={palette.wordmarkRimOpacity}
            fillRule="evenodd"
            transform={`translate(${WORDMARK_RIM_OFFSET.dx}, ${WORDMARK_RIM_OFFSET.dy})`}
          />
          {/* Primary Calligraphic Bengali Wordmark ("ইসলামের কণ্ঠ") */}
          <path
            d={WORDMARK_PATH}
            fill={palette.wordmarkPrimary}
            fillRule="evenodd"
          />
        </g>
      )}
    </svg>
  );
};

BrandLogo.propTypes = {
  variant: PropTypes.oneOf(["full", "wordmark", "emblem"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  className: PropTypes.string,
  title: PropTypes.string,
  decorative: PropTypes.bool,
};

export default memo(BrandLogo);
