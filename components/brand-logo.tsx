import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { SITE_NAME } from "lib/brand";

export function BrandLogo({
  className,
  wordmark = true,
  size = 34,
}: {
  className?: string;
  wordmark?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      prefetch
      aria-label={`${SITE_NAME} home`}
      className={clsx("flex flex-none items-center gap-2.5", className)}
    >
      <Image
        src="/brand/mark.png"
        alt=""
        width={size}
        height={size}
        className="rounded-lg"
        priority
      />
      {wordmark && (
        <span
          className="text-[17px] font-semibold leading-none tracking-tight text-[#f3f1ea]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Fingerboard<span className="text-[#c5f23c]"> Lab</span>
        </span>
      )}
    </Link>
  );
}
