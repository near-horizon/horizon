export function PointOfContact({ telegram = "" }: { telegram?: string }) {
  return (
    <a
      href={`https://t.me/${telegram}`}
      target="_blank"
      referrerPolicy="origin"
      className="text-blue-500 hover:underline"
    >
      {`t.me/${telegram}`}
    </a>
  );
}
