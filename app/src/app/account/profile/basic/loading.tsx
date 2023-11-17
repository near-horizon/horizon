import { BasicForm } from "./form";
import { DataSkeleton } from "./data";

export default function Loader() {
  return (
    <BasicForm defaultValues={{}} completion={0}>
      <DataSkeleton />
    </BasicForm>
  );
}
