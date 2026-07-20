import clsx from "clsx";

/**
 * Fingerboard Lab — primary brand mark ("the bearing").
 * Two-tone for use on the dark UI: lime rings + cream bearing balls.
 * Scales cleanly from favicon size up to hero.
 */
export default function LogoMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Fingerboard Lab"
      className={clsx("h-9 w-9", className)}
      {...props}
    >
      <circle cx="60" cy="60" r="38" fill="none" stroke="#c5f23c" strokeWidth="8" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="#c5f23c" strokeWidth="8" />
      <circle cx="60" cy="60" r="6" fill="#c5f23c" />
      <g fill="#f3f1ea">
        <circle cx="89" cy="60" r="3" />
        <circle cx="74.5" cy="85.1" r="3" />
        <circle cx="45.5" cy="85.1" r="3" />
        <circle cx="31" cy="60" r="3" />
        <circle cx="45.5" cy="34.9" r="3" />
        <circle cx="74.5" cy="34.9" r="3" />
      </g>
    </svg>
  );
}
