"use client";

import * as React from "react";
import {
  BookUser,
  Building2,
  Camera,
  ClipboardList,
  Copy,
  CreditCard,
  FileText,
  IdCard,
  Mail,
  Map,
  Receipt,
  ScrollText,
  Shield,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ServiceDocumentSpec } from "@/data/government-services";
import { Badge } from "@/components/common/badge";
import { ProgressBar } from "@/components/common/progress-bar";
import { Checkbox } from "@/components/ui/checkbox";

interface DocumentCopy {
  name: string;
  format: string;
  notes: string;
}

interface ServiceDocumentChecklistProps {
  documents: readonly ServiceDocumentSpec[];
  items: Record<string, DocumentCopy>;
  labels: {
    required: string;
    optional: string;
    format: string;
    notes: string;
    markPrepared: string;
    prepared: string;
  };
  isBangla?: boolean;
}

function documentIcon(key: string) {
  const k = key.toLowerCase();
  if (k.includes("photo")) return Camera;
  if (k.includes("nid") || k.includes("birth")) return IdCard;
  if (k.includes("passport")) return BookUser;
  if (k.includes("photocopy") || k.includes("copy")) return Copy;
  if (k.includes("form") || k.includes("application") || k.includes("request"))
    return ClipboardList;
  if (
    k.includes("tax") ||
    k.includes("tin") ||
    k.includes("holding") ||
    k.includes("receipt") ||
    k.includes("statement")
  )
    return Receipt;
  if (
    k.includes("deed") ||
    k.includes("rent") ||
    k.includes("khatian") ||
    k.includes("warish") ||
    k.includes("inheritance")
  )
    return ScrollText;
  if (k.includes("map") || k.includes("land")) return Map;
  if (k.includes("letter") || k.includes("university")) return Mail;
  if (k.includes("card") || k.includes("farmer")) return CreditCard;
  if (k.includes("gd") || k.includes("police")) return Shield;
  if (k.includes("hospital") || k.includes("witness") || k.includes("parent"))
    return Users;
  if (k.includes("tradename")) return Building2;
  return FileText;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ServiceDocumentChecklist({
  documents,
  items,
  labels,
  isBangla = false,
}: ServiceDocumentChecklistProps) {
  const [prepared, setPrepared] = React.useState<Record<string, boolean>>({});
  const preparedCount = documents.filter(
    (document) => prepared[document.key],
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar
        value={preparedCount}
        max={documents.length || 1}
        label={formatTemplate(labels.prepared, {
          prepared: preparedCount,
          total: documents.length,
        })}
      />

      <ul className="m-0 flex list-none flex-col divide-y divide-border overflow-hidden rounded-card bg-surface ring-1 ring-border p-0">
        {documents.map((document, index) => {
          const item = items[document.key];
          if (!item) return null;

          const id = `document-${document.key}`;
          const checked = Boolean(prepared[document.key]);
          const Icon = documentIcon(document.key);

          return (
            <li key={document.key}>
              <div
                className={cn(
                  "flex items-start gap-3 p-4 transition-colors duration-200 ease-standard sm:gap-4 sm:px-5",
                  checked && "bg-light-green",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-btn",
                    checked
                      ? "bg-surface text-primary ring-1 ring-border"
                      : "bg-light-green text-primary",
                  )}
                  aria-hidden
                >
                  <Icon className="size-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="hidden text-xs font-semibold text-primary sm:inline">
                      {padIndex(index)}
                    </span>
                    <label
                      htmlFor={id}
                      className="cursor-pointer text-base font-semibold text-foreground"
                    >
                      {item.name}
                    </label>
                    <Badge
                      variant={document.required ? "warning" : "info"}
                      className="h-6 px-2.5"
                    >
                      {document.required ? labels.required : labels.optional}
                    </Badge>
                  </div>

                  <p
                    className={cn(
                      "mt-1.5 text-sm text-text-secondary",
                      isBangla && "leading-[1.7]",
                    )}
                  >
                    <span className="font-medium text-foreground">
                      {labels.format}:
                    </span>{" "}
                    {item.format}
                    <span aria-hidden> · </span>
                    <span className="font-medium text-foreground">
                      {labels.notes}:
                    </span>{" "}
                    {item.notes}
                  </p>
                </div>

                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={(value) =>
                    setPrepared((current) => ({
                      ...current,
                      [document.key]: value === true,
                    }))
                  }
                  aria-label={`${labels.markPrepared}: ${item.name}`}
                  className="mt-1 size-5"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { ServiceDocumentChecklist };
