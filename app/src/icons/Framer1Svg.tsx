export function Framer1Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.12" d="M12 15.5V22.5L5 15.5H12Z" fill="currentColor" />
      <path
        d="M12 15.5V22.5L5 15.5M5 15.5V8.5H12M5 15.5H19L12 8.5M12 8.5H19V1.5H5L12 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
