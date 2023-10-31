import Link from "next/link";
import { NoData } from "../empty";

export function List<T extends string | [string, string]>({
  items,
  renderItem,
  title,
  count = 0,
  link = "/",
  linkText = "View all",
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  count?: number;
  link?: string;
  linkText?: string;
}) {
  return (
    <section className="flex w-full max-w-full flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <small>{count}</small>
        </div>
        <Link href={link}>{linkText}</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.length ? (
          items.map((id, index) => (
            <div
              key={id.toString() + index}
              className="md:[&:nth-child(n+7)]:hidden 2xl:[&:nth-child(n+7)]:block"
            >
              {renderItem(id)}
            </div>
          ))
        ) : (
          <NoData description="There are no items to show" />
        )}
      </div>
    </section>
  );
}
