"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative w-full">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search decks, trucks, molds…"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-[#f3f1ea] placeholder:text-neutral-500 focus:border-[#c5f23c]/60"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center text-neutral-500">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        placeholder="Search decks, trucks, molds…"
        className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-[#f3f1ea] placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center text-neutral-500">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
