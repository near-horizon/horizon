export function Transform3Svg({ className }: { className?: string }) {
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
        d="M4.56811 2C4.31573 1.99997 4.06993 1.99994 3.86178 2.01695C3.63318 2.03563 3.36345 2.07969 3.09202 2.21799C2.7157 2.40974 2.40974 2.7157 2.21799 3.09202C2.07969 3.36345 2.03563 3.63318 2.01695 3.86178C1.99994 4.06993 1.99997 4.31572 2 4.56809L2 5.4319C1.99997 5.68428 1.99994 5.93008 2.01695 6.13824C2.03563 6.36683 2.07969 6.63656 2.21799 6.90799C2.40974 7.28431 2.7157 7.59027 3.09202 7.78202C3.36345 7.92032 3.63318 7.96438 3.86178 7.98306C3.90623 7.98669 3.95241 7.98955 4 7.99179V16.0082C3.95241 16.0105 3.90623 16.0133 3.86178 16.017C3.63318 16.0356 3.36345 16.0797 3.09202 16.218C2.7157 16.4097 2.40974 16.7157 2.21799 17.092C2.07969 17.3634 2.03563 17.6332 2.01695 17.8618C1.99994 18.0699 1.99997 18.3157 2 18.5681V19.4319C1.99997 19.6843 1.99994 19.9301 2.01695 20.1382C2.03563 20.3668 2.07969 20.6366 2.21799 20.908C2.40974 21.2843 2.7157 21.5903 3.09202 21.782C3.36345 21.9203 3.63318 21.9644 3.86178 21.9831C4.06993 22.0001 4.31572 22 4.56811 22H5.4319C5.68429 22 5.93008 22.0001 6.13824 21.9831C6.36683 21.9644 6.63656 21.9203 6.90799 21.782C7.28431 21.5903 7.59027 21.2843 7.78202 20.908C7.92032 20.6366 7.96438 20.3668 7.98306 20.1382C7.98669 20.0938 7.98955 20.0476 7.99179 20H16.0082C16.0105 20.0476 16.0133 20.0938 16.017 20.1382C16.0356 20.3668 16.0797 20.6366 16.218 20.908C16.4097 21.2843 16.7157 21.5903 17.092 21.782C17.3634 21.9203 17.6332 21.9644 17.8618 21.9831C18.0699 22.0001 18.3157 22 18.5681 22H19.4319C19.6843 22 19.9301 22.0001 20.1382 21.9831C20.3668 21.9644 20.6366 21.9203 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C21.9203 20.6366 21.9644 20.3668 21.9831 20.1382C22.0001 19.9301 22 19.6843 22 19.4319V18.5681C22 18.3157 22.0001 18.0699 21.9831 17.8618C21.9644 17.6332 21.9203 17.3634 21.782 17.092C21.5903 16.7157 21.2843 16.4097 20.908 16.218C20.6366 16.0797 20.3668 16.0356 20.1382 16.017C20.0938 16.0133 20.0476 16.0105 20 16.0082V7.99179C20.0476 7.98955 20.0938 7.98669 20.1382 7.98306C20.3668 7.96438 20.6366 7.92032 20.908 7.78202C21.2843 7.59027 21.5903 7.28431 21.782 6.90799C21.9203 6.63656 21.9644 6.36683 21.9831 6.13824C22.0001 5.93008 22 5.68429 22 5.4319V4.56811C22 4.31572 22.0001 4.06993 21.9831 3.86178C21.9644 3.63318 21.9203 3.36345 21.782 3.09202C21.5903 2.7157 21.2843 2.40974 20.908 2.21799C20.6366 2.07969 20.3668 2.03563 20.1382 2.01695C19.9301 1.99994 19.6843 1.99997 19.4319 2H18.5681C18.3157 1.99997 18.0699 1.99994 17.8618 2.01695C17.6332 2.03563 17.3634 2.07969 17.092 2.21799C16.7157 2.40974 16.4097 2.7157 16.218 3.09202C16.0797 3.36345 16.0356 3.63318 16.017 3.86178C16.0133 3.90623 16.0105 3.95241 16.0082 4L7.99179 4C7.98955 3.95241 7.98669 3.90623 7.98306 3.86178C7.96438 3.63318 7.92032 3.36345 7.78202 3.09202C7.59027 2.7157 7.28431 2.40974 6.90799 2.21799C6.63656 2.07969 6.36683 2.03563 6.13824 2.01695C5.93008 1.99994 5.68429 1.99997 5.43192 2L4.56811 2ZM18 16.0082V7.99179C17.9524 7.98955 17.9062 7.98669 17.8618 7.98306C17.6332 7.96438 17.3634 7.92032 17.092 7.78202C16.7157 7.59027 16.4097 7.28431 16.218 6.90799C16.0797 6.63656 16.0356 6.36683 16.017 6.13824C16.0133 6.09377 16.0105 6.04759 16.0082 6L7.99179 6C7.98955 6.04759 7.98669 6.09377 7.98306 6.13824C7.96438 6.36683 7.92032 6.63656 7.78202 6.90799C7.59027 7.28431 7.28431 7.59027 6.90799 7.78202C6.63656 7.92032 6.36683 7.96438 6.13824 7.98306C6.09377 7.98669 6.04759 7.98955 6 7.99179V16.0082C6.04759 16.0105 6.09377 16.0133 6.13824 16.017C6.36683 16.0356 6.63656 16.0797 6.90799 16.218C7.28431 16.4097 7.59027 16.7157 7.78202 17.092C7.92032 17.3634 7.96438 17.6332 7.98306 17.8618C7.98669 17.9062 7.98955 17.9524 7.99179 18H16.0082C16.0105 17.9524 16.0133 17.9062 16.017 17.8618C16.0356 17.6332 16.0797 17.3634 16.218 17.092C16.4097 16.7157 16.7157 16.4097 17.092 16.218C17.3634 16.0797 17.6332 16.0356 17.8618 16.017C17.9062 16.0133 17.9524 16.0105 18 16.0082Z"
        fill="currentColor"
      />
    </svg>
  );
}