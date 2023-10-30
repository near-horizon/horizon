export const Arrow = ({
  className,
  fill = "#FF7966",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg
    width="37"
    height="12"
    viewBox="0 0 37 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M37 6L27 0.226497V11.7735L37 6ZM0 7H28V5H0V7Z" fill={fill} />
  </svg>
);
