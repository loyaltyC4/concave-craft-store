import Footer from "components/layout/footer";
import { ReactNode } from "react";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
        {updated ? (
          <p className="mt-3 text-sm text-neutral-500">Last updated {updated}</p>
        ) : null}
        <div className="prose prose-invert mt-8 max-w-none prose-headings:font-semibold prose-headings:text-[#f3f1ea] prose-a:text-[#c5f23c] prose-strong:text-[#f3f1ea]">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
