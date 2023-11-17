import { FundingForm } from "./form";
import { DataSkeleton } from "./data";

export default function Loader() {
  return (
    <FundingForm defaultValues={{}} completion={0}>
      <DataSkeleton />
    </FundingForm>
  );
}
