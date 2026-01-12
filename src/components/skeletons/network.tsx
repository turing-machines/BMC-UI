import TabView from "../TabView";

export default function NetworkSkeleton() {
  return (
    <TabView>
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-8 h-7 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-6 h-5 w-96 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-6 w-12 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-28 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-10 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="h-4 w-72 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-9 w-32 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
        </div>
        <div>
          <div className="mb-6 h-7 w-24 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="space-y-4">
            <div className="h-6 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-6 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-6 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
        </div>
      </div>
    </TabView>
  );
}
