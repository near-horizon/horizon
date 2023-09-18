import { z } from "zod";
import { EmailInput } from "~/components/inputs/email";
import { useZodForm } from "~/hooks/form";

const formSchema = z.object({
  email: z.string().email(),
});

export default function Create() {
  const { handleSubmit, control } = useZodForm(formSchema);

  return (
    <div>
      <h1>Create project</h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(async ({ email }) => {
          const response = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({ email }),
          });
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
        })}
      >
        <EmailInput control={control} name="email" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
