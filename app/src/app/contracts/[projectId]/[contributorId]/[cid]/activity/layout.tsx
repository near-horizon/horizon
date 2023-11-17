export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col pt-4">{children}</div>;
}
