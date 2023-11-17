export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-full flex-col items-start justify-start gap-8">
      {children}
    </div>
  );
}
