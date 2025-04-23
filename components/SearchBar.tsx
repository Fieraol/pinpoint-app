"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/?${params.toString()}`);
  }, 300); // debounce to reduce rerenders

  return (
    <Input
      type="search"
      placeholder="Search notes..."
      defaultValue={searchParams.get("q") || ""}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-xs"
    />
  );
}
