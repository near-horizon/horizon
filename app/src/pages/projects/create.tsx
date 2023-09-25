import { z } from "zod";
import { ComboboxInput } from "~/components/inputs/combobox";
import { EmailInput } from "~/components/inputs/email";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { LogInDialog } from "~/components/log-in-dialog";
import { ProgressDialog } from "~/components/progress-dialog";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { withSSRSession } from "~/lib/auth";
import { hasProject, useCreateProject } from "~/lib/projects";
import { useUser } from "~/stores/global";
import { viewCall } from "~/lib/fetching";
import { env } from "~/env.mjs";
import { type HorizonProject } from "~/lib/validation/projects";

const verticals = [
  { text: "DeSci", value: "desci" },
  { text: "DeFi", value: "defi" },
  { text: "Gaming", value: "gaming" },
  { text: "Metaverse", value: "metaverse" },
  { text: "Commercial", value: "commercial" },
  {
    text: "Sports and Entertainment",
    value: "sports-and-entertainment",
  },
  { text: "Infrastructure", value: "infrastructure" },
  { text: "Social", value: "social" },
  { text: "Social Impact", value: "social-impact" },
  { text: "Creative", value: "creative" },
  { text: "Education", value: "education" },
];

const formSchema = z.object({
  email: z.string().email(),
  "Project name": z.string().min(3).max(50),
  vertical: z
    .string()
    .refine((val) => verticals.some(({ value }) => value === val), {
      message: "Please select a vertical",
    }),
  tagline: z.string().min(3).max(50),
  description: z.string().min(30).max(500),
});

export default function Create() {
  const form = useZodForm(formSchema);
  const user = useUser();
  const [progress, createProject] = useCreateProject();

  return (
    <div className="mx-auto flex w-3/5 flex-col items-center justify-start gap-16">
      <LogInDialog
        open={!user}
        title="Log in required"
        description="You need to be logged in to create a project profile"
      />
      <h1 className="text-4xl font-bold text-text-black">
        Create a new project profile
      </h1>
      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(({ vertical, ...project }) => {
            createProject.mutate({
              accountId: user!.accountId,
              email: project.email,
              profile: {
                ...project,
                name: project["Project name"],
                vertical: { [vertical]: "" },
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="Project name"
            placeholder="Enter your project's name"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <div className="w-3/5">
            <ComboboxInput
              control={form.control}
              name="vertical"
              placeholder="Select a vertical"
              rules={{ required: true }}
              defaultValue=""
              disabled={false}
              options={verticals}
            />
          </div>
          <TextInput
            control={form.control}
            name="tagline"
            placeholder="Your tagline or motto"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            placeholder="Describe your project"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
            maxLength={500}
          />
          <EmailInput
            control={form.control}
            name="email"
            placeholder="Email"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <Button variant="destructive">Cancel</Button>
            <ProgressDialog
              progress={progress.value}
              description={progress.label}
              title="Creating your profile"
              triggerText="Create project profile"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function({ req }) {
  if (req.session.user && (await hasProject(req.session.user.accountId))) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return { props: {} };
});
