export function Skew3Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.56811 2C5.31573 1.99997 5.06993 1.99994 4.86178 2.01695C4.63318 2.03563 4.36345 2.07969 4.09202 2.21799C3.7157 2.40974 3.40974 2.7157 3.21799 3.09202C3.07969 3.36345 3.03563 3.63318 3.01695 3.86178C2.99994 4.06993 2.99997 4.31572 3 4.5681V5.4319C2.99997 5.68428 2.99994 5.93008 3.01695 6.13824C3.03563 6.36683 3.07969 6.63656 3.21799 6.90799C3.40974 7.28431 3.7157 7.59027 4.09202 7.78202C4.36345 7.92032 4.63318 7.96438 4.86178 7.98306C4.89062 7.98542 4.92018 7.98745 4.95039 7.98919L3.51989 16C3.28451 16 3.05665 16.001 2.86178 16.017C2.63318 16.0356 2.36345 16.0797 2.09202 16.218C1.7157 16.4097 1.40974 16.7157 1.21799 17.092C1.07969 17.3634 1.03563 17.6332 1.01695 17.8618C0.999943 18.0699 0.999973 18.3157 1 18.5681V19.4319C0.999973 19.6843 0.999943 19.9301 1.01695 20.1382C1.03563 20.3668 1.07969 20.6366 1.21799 20.908C1.40974 21.2843 1.7157 21.5903 2.09202 21.782C2.36345 21.9203 2.63318 21.9644 2.86178 21.9831C3.06993 22.0001 3.31572 22 3.56811 22H4.4319C4.68429 22 4.93008 22.0001 5.13824 21.9831C5.36683 21.9644 5.63656 21.9203 5.90799 21.782C6.28431 21.5903 6.59027 21.2843 6.78202 20.908C6.92032 20.6366 6.96438 20.3668 6.98306 20.1382C6.98669 20.0938 6.98955 20.0476 6.99179 20L15.0082 20C15.0105 20.0476 15.0133 20.0938 15.017 20.1382C15.0356 20.3668 15.0797 20.6366 15.218 20.908C15.4097 21.2843 15.7157 21.5903 16.092 21.782C16.3634 21.9203 16.6332 21.9644 16.8618 21.9831C17.0699 22.0001 17.3157 22 17.5681 22H18.4319C18.6843 22 18.9301 22.0001 19.1382 21.9831C19.3668 21.9644 19.6366 21.9203 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C20.9203 20.6366 20.9644 20.3668 20.9831 20.1382C21.0001 19.9301 21 19.6843 21 19.4319V18.5681C21 18.3157 21.0001 18.0699 20.9831 17.8618C20.9644 17.6332 20.9203 17.3634 20.782 17.092C20.5903 16.7157 20.2843 16.4097 19.908 16.218C19.7454 16.1352 19.5834 16.0861 19.4305 16.0561L20.5814 7.99989C20.7805 7.99938 20.9715 7.99669 21.1382 7.98306C21.3668 7.96438 21.6366 7.92032 21.908 7.78202C22.2843 7.59027 22.5903 7.28431 22.782 6.90799C22.9203 6.63656 22.9644 6.36683 22.9831 6.13824C23.0001 5.93008 23 5.68429 23 5.4319V4.56811C23 4.31572 23.0001 4.06993 22.9831 3.86178C22.9644 3.63318 22.9203 3.36345 22.782 3.09202C22.5903 2.7157 22.2843 2.40974 21.908 2.21799C21.6366 2.07969 21.3668 2.03563 21.1382 2.01695C20.9301 1.99994 20.6843 1.99997 20.4319 2H19.5681C19.3157 1.99997 19.0699 1.99994 18.8618 2.01695C18.6332 2.03563 18.3634 2.07969 18.092 2.21799C17.7157 2.40974 17.4097 2.7157 17.218 3.09202C17.0797 3.36345 17.0356 3.63318 17.017 3.86178C17.0133 3.90623 17.0105 3.95241 17.0082 4L8.99179 4C8.98955 3.95241 8.98669 3.90623 8.98306 3.86178C8.96438 3.63318 8.92032 3.36345 8.78202 3.09202C8.59027 2.7157 8.28431 2.40974 7.90799 2.21799C7.63656 2.07969 7.36683 2.03563 7.13824 2.01695C6.93008 1.99994 6.68429 1.99997 6.43192 2L5.56811 2ZM17.4182 16.0001L18.5691 7.94384C18.4163 7.91382 18.2545 7.8648 18.092 7.78202C17.7157 7.59027 17.4097 7.28431 17.218 6.90799C17.0797 6.63656 17.0356 6.36683 17.017 6.13824C17.0133 6.09377 17.0105 6.04759 17.0082 6L8.99179 6C8.98955 6.04759 8.98669 6.09377 8.98306 6.13824C8.96438 6.36683 8.92032 6.63656 8.78202 6.90799C8.59027 7.28431 8.28431 7.59027 7.90799 7.78202C7.63656 7.92032 7.36683 7.96438 7.13824 7.98306C7.08801 7.98716 7.03559 7.99028 6.98141 7.99264L5.53724 16.08C5.65788 16.1104 5.78275 16.1542 5.90799 16.218C6.28431 16.4097 6.59027 16.7157 6.78202 17.092C6.92032 17.3634 6.96438 17.6332 6.98306 17.8618C6.98669 17.9062 6.98955 17.9524 6.99179 18L15.0082 18C15.0105 17.9524 15.0133 17.9062 15.017 17.8618C15.0356 17.6332 15.0797 17.3634 15.218 17.092C15.4097 16.7157 15.7157 16.4097 16.092 16.218C16.3634 16.0797 16.6332 16.0356 16.8618 16.017C17.0284 16.0033 17.2192 16.0006 17.4182 16.0001Z"
        fill="currentColor"
      />
    </svg>
  );
}
