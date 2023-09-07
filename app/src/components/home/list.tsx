import Link from "next/link";

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
    <section className="flex w-full flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <small>{count}</small>
        </div>
        <Link href={link}>{linkText}</Link>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {items.map((id, index) => (
          <div
            key={id.toString() + index}
            className="w-full md:w-[calc((100%-1rem)*.5)] xl:w-[calc((100%-2rem)*.33)] 2xl:w-[calc((100%-4rem)*.25)] md:[&:nth-child(n+7)]:hidden 2xl:[&:nth-child(n+7)]:block"
          >
            {renderItem(id)}
          </div>
        ))}
      </div>
    </section>
  );
}
