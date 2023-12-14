export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-start justify-start gap-4">
      <h2 className="text-xl font-bold text-ui-elements-black">{title}</h2>
      {children}
    </section>
  );
}
