import { z } from "zod";
import { ComboboxInput } from "~/components/inputs/combobox";
import { DateInput } from "~/components/inputs/date";
import { NumberInput } from "~/components/inputs/number";
import { TextInput } from "~/components/inputs/text";
import { TextAreaInput } from "~/components/inputs/text-area";
import { LogInDialog } from "~/components/log-in-dialog";
import { ProgressDialog } from "~/components/progress-dialog";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { withSSRSession } from "~/lib/auth";
import { clearLocalSaveForm, useLocalSaveForm } from "~/lib/mutating";
import { hasProject, useHasProject } from "~/lib/projects";
import { useCreateRequest } from "~/lib/requests";
import { requestSchema } from "~/lib/validation/requests";
import { useUser } from "~/stores/global";

const formSchema = requestSchema.omit({
  cid: true,
  project_id: true,
  open: true,
  creationTx: true,
  tags: true,
});

const formId = "create-request";

export default function Create() {
  const form = useZodForm(formSchema);
  const user = useUser();
  const hasProjectProfile = useHasProject(user!.accountId);
  const [progress, createRequest] = useCreateRequest();
  useLocalSaveForm(form, formSchema, formId);

  return (
    <div className="mx-auto flex w-3/5 flex-col items-center justify-start gap-16">
      <LogInDialog
        open={!user || !hasProjectProfile}
        title="Log in required"
        description="You need to be logged in and have a project profile to create a request"
      />
      <h1 className="text-4xl font-bold text-text-black">
        Create a new request
      </h1>
      <Form {...form}>
        <form
          className="w-full"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit((request) => {
            clearLocalSaveForm(formId);
            createRequest.mutate({
              accountId: user!.accountId,
              request: {
                ...request,
                project_id: user!.accountId,
                deadline: `${new Date(request.deadline).getTime()}`,
                open: true,
                tags: [],
              },
            });
          })}
        >
          <TextInput
            control={form.control}
            name="title"
            placeholder="Enter the title of your request"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
          />
          <TextAreaInput
            control={form.control}
            name="description"
            placeholder="Add a short description"
            rules={{ required: true }}
            defaultValue=""
            disabled={false}
            maxLength={500}
          />
          <div className="w-3/5">
            <ComboboxInput
              control={form.control}
              name="request_type"
              placeholder="Select a request type"
              rules={{ required: true }}
              defaultValue="FullTime"
              disabled={false}
              options={formSchema.shape.request_type.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <ComboboxInput
              control={form.control}
              name="payment_type"
              placeholder="Select a payment type"
              rules={{ required: true }}
              defaultValue="FlatRate"
              disabled={false}
              options={formSchema.shape.payment_type.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <ComboboxInput
              control={form.control}
              name="source"
              placeholder="Select a payment source"
              rules={{ required: true }}
              defaultValue="Other"
              disabled={false}
              options={formSchema.shape.source.options.map((value) => ({
                text: value,
                value,
              }))}
            />
            <NumberInput
              control={form.control}
              name="budget"
              placeholder="Enter the budget"
              rules={{ required: true }}
              defaultValue={0}
              disabled={false}
            />
            <DateInput
              control={form.control}
              name="deadline"
              placeholder="Enter the deadline"
              rules={{ required: true }}
              defaultValue=""
              disabled={false}
              invalidDates={(date) =>
                z.date().max(new Date()).safeParse(date).success
              }
            />
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <Button variant="destructive">Cancel</Button>
            <ProgressDialog
              progress={progress.value}
              description={progress.label}
              title="Creating your request"
              triggerText="Publish request"
              ctaLink={`/projects/${user!.accountId}?tab=requests`}
              ctaText="Go to requests"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export const getServerSideProps = withSSRSession(async function({ req }) {
  if (req.session.user && (await hasProject(req.session.user.accountId))) {
    return { props: {} };
  }

  return {
    redirect: {
      destination: "/projects/create",
      permanent: false,
    },
  };
});
