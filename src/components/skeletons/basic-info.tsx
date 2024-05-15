export default function BasicInfoSkeleton() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Turing Pi</h1>
      <div className="mt-2 flex flex-row flex-wrap gap-x-4">
        <div className="flex items-center">
          <span className="text-sm font-semibold opacity-60">hostname</span>
          <div className="ml-2 h-5 w-12 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold opacity-60">daemon</span>
          <div className="ml-2 h-5 w-12 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}
