import { createLazyFileRoute } from "@tanstack/react-router";
import TimeAgo from "javascript-time-ago";
import de from "javascript-time-ago/locale/de";
import en from "javascript-time-ago/locale/en";
import es from "javascript-time-ago/locale/es";
import nl from "javascript-time-ago/locale/nl";
import pl from "javascript-time-ago/locale/pl";
import zh from "javascript-time-ago/locale/zh";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

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
TimeAgo.addLocale(de);
TimeAgo.addLocale(es);
TimeAgo.addLocale(nl);
TimeAgo.addLocale(pl);
TimeAgo.addLocale(zh);

function About() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { data } = useAboutTabData();

  const timeAgo = useMemo(() => new TimeAgo(language), [language]);

  return (
    <TabView>
      <dl className="flex flex-col">
        <TableItem term="Board model">
          {data.board_model} (v{data.board_revision})
        </TableItem>
        <TableItem term={t("about.hostname")}>{data.hostname}</TableItem>
        <TableItem
          term={t("about.daemonVersion")}
        >{`v${data.version}`}</TableItem>
        <TableItem term={t("about.buildTime")}>
          {data.buildtime.toLocaleString()} (
          {timeAgo.format(new Date(data.buildtime))})
        </TableItem>
        <TableItem
          term={t("about.buildVersion")}
        >{`v${data.build_version}`}</TableItem>
        <TableItem term={t("about.buildrootRelease")}>
          {data.buildroot}
        </TableItem>
        <TableItem term={t("about.apiVersion")}>{`v${data.api}`}</TableItem>
        <TableItem term={t("about.bmcUI")}>{`v${version}`}</TableItem>
      </dl>
    </TabView>
  );
}
