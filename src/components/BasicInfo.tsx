import { Suspense } from "react";

import { useAboutTabData } from "@/lib/api/get";

function BasicInfoContent() {
  const { data } = useAboutTabData();

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-zinc-900">Turing PI</h1>
      <div className="mt-2 flex space-x-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-zinc-600">hostname</span>
          <span className="ml-2 text-sm font-semibold text-zinc-900">
            {data.hostname}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-zinc-600">daemon</span>
          <span className="ml-2 text-sm font-semibold text-zinc-900">
            v{data.version}
          </span>
        </div>
      </div>
    </div>
  );
}

function BasicInfoSkeleton() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-zinc-900">Turing PI</h1>
      <div className="mt-2 flex space-x-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-zinc-500">hostname</span>
          <div className="ml-2 h-5 w-14 animate-pulse bg-zinc-200"></div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-zinc-500">daemon</span>
          <div className="ml-2 h-5 w-12 animate-pulse bg-zinc-200"></div>
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
