import { Cards, RadioGroupChoices } from "./card";

export default function Onoboarding() {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-8">
      <div className="flex w-full flex-col items-center justify-start gap-6">
        <h1 className="text-2xl font-bold text-ui-elements-black">
          Choose a path to get started
        </h1>

        <div className="grid w-full max-w-6xl grid-cols-1 justify-center gap-7 md:hidden">
          <Cards />
        </div>

        <div className="hidden w-full md:block">
          <RadioGroupChoices />
        </div>
      </div>
    </div>
  );
}
