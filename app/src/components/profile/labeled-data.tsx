export function LabeledData({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <span className="text-sm font-semibold text-text-black">{label}</span>
      <span>{children}</span>
    </div>
  );
}
