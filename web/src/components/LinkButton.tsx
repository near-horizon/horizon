import { cn } from "@lib/utils";

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: boolean;
}

export function LinkButton({
  label,
  variant = "primary",
  href,
  className,
  icon = false,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "px-7 py-3 rounded-full text-center text-text-dark font-semibold text-lg w-fit",
        variant === "secondary" ? "border-2 border-black" : "bg-primary",
        className,
      )}
      href={href}
      {...props}
    >
      {icon ? (
        <span className="flex flex-row items-center justify-center gap-2">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.37464 10.1251L16.2496 2.25013M8.47033 10.3712L10.4414 15.4397C10.6151 15.8862 10.7019 16.1094 10.827 16.1746C10.9354 16.2311 11.0646 16.2312 11.1731 16.1748C11.2983 16.1098 11.3854 15.8866 11.5596 15.4403L16.5023 2.77453C16.6595 2.37164 16.7381 2.1702 16.6951 2.04148C16.6578 1.92969 16.5701 1.84197 16.4583 1.80462C16.3296 1.76162 16.1281 1.84023 15.7252 1.99746L3.05943 6.94021C2.61313 7.11438 2.38997 7.20146 2.32494 7.32664C2.26857 7.43516 2.26864 7.56434 2.32515 7.67279C2.39033 7.7979 2.61358 7.88472 3.06009 8.05836L8.12859 10.0294C8.21923 10.0647 8.26455 10.0823 8.30271 10.1095C8.33653 10.1337 8.36611 10.1632 8.39024 10.1971C8.41746 10.2352 8.43508 10.2805 8.47033 10.3712Z"
              stroke="#11181C"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {label}
        </span>
      ) : (
        label
      )}
    </a>
  );
}
