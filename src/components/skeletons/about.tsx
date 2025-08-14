import TableItem from "../TableItem";
import TabView from "../TabView";

export default function AboutSkeleton() {
  return (
    <TabView>
      <dl className="flex flex-col">
        <TableItem term="Board model">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="Host name">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="Daemon version">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="Build time">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="Build version">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="Buildroot release">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="API version">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
        <TableItem term="BMC UI">
          <div className="h-6 w-48 animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
        </TableItem>
      </dl>
    </TabView>
  );
}
