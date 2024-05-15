import TabView from "../TabView";

export default function USBSkeleton() {
  return (
    <TabView>
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-8 h-7 w-28 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="space-y-4">
            <div className="h-12 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="h-12 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
          <div className="mt-4 flex flex-row flex-wrap justify-between">
            <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="mt-8 flex flex-col items-start md:mt-0 md:flex-row md:items-center lg:mt-0">
              <div className="mr-4 h-7 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="mt-4 flex gap-4 md:mt-0">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-7 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabView>
  );
}
