import { createLazyFileRoute } from "@tanstack/react-router";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import AboutSkeleton from "@/components/skeletons/about";
import TableItem from "@/components/TableItem";
import TabView from "@/components/TabView";
import { useAboutTabData } from "@/lib/api/get";

import { version } from "../../../package.json";

export const Route = createLazyFileRoute("/_tabLayout/about")({
  component: About,
  pendingComponent: AboutSkeleton,
});

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function About() {
  const { data } = useAboutTabData();

  return (
    <TabView>
      <dl className="flex flex-col">
        <TableItem term="Host name">{data.hostname}</TableItem>
        <TableItem term="Daemon version">{`v${data.version}`}</TableItem>
        <TableItem term="Build time">
          {data.buildtime.toLocaleString()} (
          {timeAgo.format(new Date(data.buildtime))})
        </TableItem>
        <TableItem term="Build version">{`v${data.build_version}`}</TableItem>
        <TableItem term="Buildroot release">{data.buildroot}</TableItem>
        <TableItem term="API version">{`v${data.api}`}</TableItem>
        <TableItem term="BMC UI">{`v${version}`}</TableItem>
      </dl>
    </TabView>
  );
}
