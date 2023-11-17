import { TechForm } from "./form";
import { DataSkeleton } from "./data";

export default function Loader() {
  return (
    <TechForm defaultValues={{}} completion={0}>
      <DataSkeleton />
    </TechForm>
  );
}
