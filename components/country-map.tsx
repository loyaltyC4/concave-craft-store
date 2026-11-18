/**
 * A country's outline filled with its own flag.
 *
 * Shapes: Mapsicon by djaiss (https://github.com/djaiss/mapsicon, free to use
 * with credit). Flags: flagcdn.com / Flagpedia. Both are vendored in /public
 * (public/shapes/<code>.svg, public/flags/<code>.svg) so nothing loads from a
 * third party at runtime. The flag is clipped to the outline with a CSS mask.
 */
export function CountryMap({
  code,
  name,
  size = 120,
  className = "",
}: {
  code: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const c = code.toLowerCase();
  const mask = `url(/shapes/${c}.svg)`;
  return (
    <span
      role="img"
      aria-label={`Map of ${name} in the colours of its flag`}
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(/flags/${c}.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maskImage: mask,
        WebkitMaskImage: mask,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        filter: "drop-shadow(0 0 0.6px rgba(0,0,0,0.9)) drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
