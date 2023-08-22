export function Title({ text, loading }: { text: string; loading: boolean }) {
  if (loading) {
    return <b className="block h-4 w-28 animate-pulse bg-gray-200" />;
  }

  return <span className="text-lg font-medium">{text}</span>;
}
