import { type ReactNode } from "react";

interface TabViewProps {
  title?: string;
  children: ReactNode;
}

export default function TabView({ title, children }: TabViewProps) {
  return (
    <section>
      {title && <h2 className="mb-8 text-lg font-bold">{title}</h2>}
      <div className="space-y-8">{children}</div>
    </section>
  );
}
