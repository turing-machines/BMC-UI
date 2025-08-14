import TabView from "../TabView";

export default function NodesSkeleton() {
  return (
    <TabView>
      <div>
        <div className="mb-8 h-7 w-2/5 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-neutral-200 py-4 dark:border-neutral-700"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="h-9 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
              </div>
              <div className="flex flex-1 flex-wrap gap-4">
                <div className="flex-1">
                  <div className="h-12 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
                <div className="flex-1">
                  <div className="h-12 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-end gap-4">
          <div className="h-9 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="h-9 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    </TabView>
  );
}
