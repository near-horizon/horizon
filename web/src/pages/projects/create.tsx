import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Create() {
  const { handleSubmit, register } = useForm<FormSchema>();

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
        <label htmlFor="email">Email</label>
        <input {...register("email")} />
        <button type="submit">Create</button>
      </form>
      {/* <div className="animate-bounce animate-pulse "> */}
      {/*   <h1 className="translate-x-1/3 translate-y-8 scale-150 text-9xl"> */}
      {/*     Lucija */}
      {/*   </h1> */}
      {/* </div> */}
    </div>
  );
}
