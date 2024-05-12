import TabView from "../TabView";

export default function InfoSkeleton() {
  return (
    <TabView>
      <div className="mb-6">
        <div className="mb-7 h-7 w-32 animate-pulse bg-zinc-200"></div>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="w-1/4">
              <div className="h-5 w-24 animate-pulse bg-zinc-200"></div>
            </div>
            <div className="flex h-5 w-3/4 animate-pulse overflow-hidden bg-zinc-200">
              <div className="h-full animate-pulse bg-zinc-200"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-9 w-36 animate-pulse rounded-full bg-zinc-200"></div>
      </div>

      <div>
        <div className="mb-6 h-7 w-40 animate-pulse bg-zinc-200"></div>
        <div className="flex flex-row border-b border-zinc-200 pb-3">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-zinc-200"></div>
          </div>
        </div>
        <div className="flex flex-row border-b border-zinc-200 py-3">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-zinc-200"></div>
          </div>
          <div className="h-6 w-48 animate-pulse bg-zinc-200"></div>
        </div>
        <div className="flex flex-row py-3">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-zinc-200"></div>
          </div>
          <div className="h-6 w-48 animate-pulse bg-zinc-200"></div>
        </div>
        <div className="mt-4">
          <div className="h-9 w-36 animate-pulse rounded-full bg-zinc-200"></div>
        </div>
      </div>

      <div>
        <div className="mb-6 h-7 w-20 animate-pulse bg-zinc-200"></div>
        <div className="flex flex-row gap-4">
          <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-200"></div>
          <div className="h-9 w-36 animate-pulse rounded-full bg-zinc-200"></div>
        </div>
      </div>
    </TabView>
  );
}
