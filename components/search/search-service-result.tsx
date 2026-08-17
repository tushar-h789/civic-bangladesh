"use client";

import { getServiceByKey } from "@/data/government-services";
import { getGovernmentServiceCardModel } from "@/lib/get-government-service-card";
import { useTranslation } from "@/hooks/use-translation";
import { GovernmentServiceCardFromModel } from "@/components/services/government-service-card";
import type { SearchServiceHit } from "@/lib/search-catalog";

interface SearchServiceResultProps {
  hit: SearchServiceHit;
}

function SearchServiceResult({ hit }: SearchServiceResultProps) {
  const { t } = useTranslation();
  const service = getServiceByKey(hit.key);

  if (!service) return null;

  return (
    <GovernmentServiceCardFromModel
      variant="search-result"
      model={getGovernmentServiceCardModel(service, t)}
      isolateOfficialCta
    />
  );
}

export { SearchServiceResult };
export type { SearchServiceResultProps };
