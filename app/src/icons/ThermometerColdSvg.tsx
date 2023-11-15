export function ThermometerColdSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.12"
        d="M16 4C16 2.89543 16.8954 2 18 2C19.1046 2 20 2.89543 20 4V14.5351C21.1956 15.2267 22 16.5194 22 18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18C14 16.5194 14.8044 15.2267 16 14.5351V4Z"
        fill="currentColor"
      />
      <path
        d="M2 12H12M9 4V20M3 9L6 12L3 15M12 6L9 9L6 6M6 18L9 15L10.5 16.5M20 14.5351V4C20 2.89543 19.1046 2 18 2C16.8954 2 16 2.89543 16 4V14.5351C14.8044 15.2267 14 16.5194 14 18C14 20.2091 15.7909 22 18 22C20.2091 22 22 20.2091 22 18C22 16.5194 21.1956 15.2267 20 14.5351Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
