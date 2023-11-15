export function Paint3Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M3 13H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.5L10.5 2M11.5 3L20.3687 11.8686C20.7647 12.2646 20.9627 12.4627 21.0369 12.691C21.1021 12.8918 21.1021 13.1082 21.0369 13.309C20.9627 13.5373 20.7647 13.7354 20.3687 14.1314L14.8941 19.6059C13.7061 20.7939 13.1121 21.388 12.4271 21.6105C11.8246 21.8063 11.1755 21.8063 10.573 21.6105C9.888 21.388 9.29397 20.7939 8.10592 19.6059L4.89414 16.3941C3.7061 15.2061 3.11207 14.612 2.88951 13.9271C2.69373 13.3245 2.69373 12.6755 2.88951 12.0729C3.11207 11.388 3.7061 10.7939 4.89415 9.60589L11.5 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
