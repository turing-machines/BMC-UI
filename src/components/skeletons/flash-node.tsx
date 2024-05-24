import TabView from "../TabView";

export default function FlashNodeSkeleton() {
  return (
    <TabView>
      <div className="flex flex-col">
        <div className="mb-10 h-7 w-96 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-6 w-36 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-24 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700"
                ></div>
              ))}
            </div>
          </div>
          <div className="h-10 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="h-10 w-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <div className="mb-4 mt-5 flex items-center gap-4">
          <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="h-6 w-28 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    </TabView>
  );
}
