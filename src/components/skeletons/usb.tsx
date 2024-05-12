import TabView from "../TabView";

export default function USBSkeleton() {
  return (
    <TabView>
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-8 h-7 w-28 animate-pulse bg-zinc-200"></div>
          <div className="space-y-4">
            <div className="h-12 w-full animate-pulse bg-zinc-200"></div>
            <div className="h-12 w-full animate-pulse bg-zinc-200"></div>
          </div>
          <div className="mt-4 flex flex-row flex-wrap justify-between">
            <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-200"></div>
            <div className="mt-8 flex items-center md:mt-0 lg:mt-0">
              <div className="mr-4 h-12 w-20 animate-pulse bg-zinc-200 lg:h-7 lg:w-48"></div>
              <div className="flex flex-row gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-7 w-24 animate-pulse rounded-full bg-zinc-200"
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
