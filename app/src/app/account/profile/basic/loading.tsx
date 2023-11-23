import { ProjectBasicForm } from "./form";
import { ProjectDataSkeleton } from "./data";

export default function Loader() {
  return (
    <ProjectBasicForm defaultValues={{}} completion={0}>
      <ProjectDataSkeleton />
    </ProjectBasicForm>
  );
}
