import TabView from "../TabView";

export default function InfoSkeleton() {
  return (
    <TabView>
      <div className="mb-6">
        <div className="mb-7 h-7 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="w-1/4">
              <div className="h-5 w-24 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-neutral-200 md:w-3/4 dark:bg-neutral-700"></div>
          </div>
        </div>
        <div className="mt-4 h-9 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      </div>

      <div>
        <div className="mb-6 h-7 w-40 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="flex flex-row border-b border-neutral-200 pb-3 dark:border-neutral-700">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
        </div>
        <div className="flex flex-row border-b border-neutral-200 py-3 dark:border-neutral-700">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <div className="flex flex-row py-3">
          <div className="w-1/2 lg:w-1/4">
            <div className="h-6 w-10 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <div className="mt-4">
          <div className="h-9 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>

      <div>
        <div className="mb-6 h-7 w-20 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="flex flex-row gap-4">
          <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="h-9 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    </TabView>
  );
}
