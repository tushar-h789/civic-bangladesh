import type { Metadata } from "next";

import { parseCivicPromiseKey } from "@/data/civic-promises";
import { CivicPromisePage } from "@/components/promise/civic-promise-page";

export const metadata: Metadata = {
  title: "Civic Promise | Civic Bangladesh",
  description:
    "Pick one small civic habit for this visit. A Civic Promise is a personal reminder — not a government oath, and not saved to an account.",
};

export default async function CivicPromiseRoute({
  searchParams,
}: {
  searchParams: Promise<{ promise?: string | string[] }>;
}) {
  const params = await searchParams;

  return (
    <CivicPromisePage initialPromise={parseCivicPromiseKey(params.promise)} />
  );
}
