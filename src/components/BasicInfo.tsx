import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import BasicInfoSkeleton from "@/components/skeletons/basic-info";
import { useAboutTabData } from "@/lib/api/get";

function BasicInfoContent() {
  const { t } = useTranslation();
  const { data } = useAboutTabData();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Turing Pi</h1>
      <div className="mt-2 flex flex-row flex-wrap gap-x-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold lowercase opacity-60">
            {t("about.hostname")}
          </span>
          <span className="ml-2 text-sm font-semibold">{data.hostname}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold lowercase opacity-60">
            daemon
          </span>
          <span className="ml-2 text-sm font-semibold">v{data.version}</span>
        </div>
      </div>
    </div>
  );
}

export default function BasicInfo() {
  return (
    <Suspense fallback={BasicInfoSkeleton()}>
      <BasicInfoContent />
    </Suspense>
  );
}
