export function Detail({
  label,
  value,
  loading,
}: {
  label: string;
  value: React.ReactNode;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-900">{label}</label>
      <div className="flex items-center gap-2">
        {loading ? (
          <b className="h-5 w-16 animate-pulse rounded-lg bg-gray-200 text-xl" />
        ) : (
          <small className="text-sm">{value}</small>
        )}
      </div>
    </div>
  );
}
