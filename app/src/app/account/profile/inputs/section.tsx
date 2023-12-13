import { Toggleable } from "~/components/toggleable";
import { NUMBER } from "~/lib/format";

interface InputSectionBaseProps {
  title: string;
  completion: number;
  value: boolean;
  children: React.ReactNode;
}

type InputSectionProps = InputSectionBaseProps &
  ({ disabled: true } | { onChange: (value: boolean) => void });

export function InputSection({
  children,
  title,
  completion,
  value,
  ...props
}: InputSectionProps) {
  return (
    <Toggleable value={value} id={title} {...props}>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex flex-row items-start justify-start gap-6">
          <span>Completed: {NUMBER.percentage(completion)}</span>
        </div>

        {children}
      </div>
    </Toggleable>
  );
}
