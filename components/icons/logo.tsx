import clsx from "clsx";

// Monochrome variant of the Fingerboard Lab "bearing" mark (inherits currentColor).
export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME || "Fingerboard Lab"} logo`}
      viewBox="0 0 120 120"
      fill="none"
      {...props}
      className={clsx("h-4 w-4 text-black dark:text-white", props.className)}
    >
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="8" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="8" />
      <circle cx="60" cy="60" r="6" fill="currentColor" />
      <g fill="currentColor">
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
