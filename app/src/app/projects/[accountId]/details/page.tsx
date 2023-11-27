import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Socials } from "~/components/socials";
import { Details } from "~/components/ui/details";
import { getProject } from "~/lib/server/projects";
import { type AccountId } from "~/lib/validation/common";
import { type Project } from "~/lib/validation/projects";
import { Stats } from "./stats";
import { Founder } from "./founder";
import { DATE } from "~/lib/format";
import { FileDescription } from "../backers-digest/backers-digest";

export default async function ProjectDetails({
  params: { accountId },
}: {
  params: { accountId: AccountId };
}) {
  const project = await getProject(accountId);

  return (
    <Details
      links
      sections={[
        {
          title: "About",
          id: "about",
          Content: <General project={project} />,
        },
        {
          title: "Stats",
          id: "stats",
          Content: <Stats accountId={accountId} />,
        },
        { title: "Tech", id: "tech", Content: <Tech project={project} /> },
        {
          title: "Funding",
          id: "funding",
          Content: <Funding project={project} />,
        },
        {
          title: "Documents",
          id: "documents",
          Content: <Documents project={project} />,
        },
        {
          title: "Founders",
          id: "founders",
          Content: <Founders project={project} />,
        },
        {
          title: "Details",
          id: "details",
          Content: <Questions project={project} />,
        },
      ]}
    />
  );
}

function General({ project }: { project: Project }) {
  return (
    <>
      <Description text={project.description ?? ""} full />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <Detail label="Company size">{project.company_size ?? ""}</Detail>
        {/* <Detail */}
        {/*   label="Point of contact" */}
        {/*   value={<PointOfContact telegram={data?.linktree?.telegram} />} */}
        {/*   loading={status === "pending"} */}
        {/* /> */}
        <Detail label="Social links">
          <Socials links={project.linktree ?? {}} />
        </Detail>
        <Detail label="Joined">
          <a
            href={`https://nearblocks.io/txns/${project.creationTx?.hash}`}
            target="_blank"
            referrerPolicy="origin"
            className="text-blue-500 hover:underline"
          >
            {DATE.timestamp(project.creationTx?.timestamp)}
          </a>
        </Detail>
        <Detail label="Location">{project.geo ?? ""}</Detail>
        <Detail label="Website">
          <a href={`https://${project.website}`} target="_blank">
            {project.website ?? ""}
          </a>
        </Detail>
      </div>
    </>
  );
}

function Tech({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Detail label="Integration with NEAR">{project.integration}</Detail>
      <Detail label="Development phase">{project.dev}</Detail>
      <Detail label="Mainnet launched">{project.dev === "mainnet"}</Detail>
      <Detail label="Open source">
        {project.distribution === "open-source"}
      </Detail>
    </div>
  );
}

function Funding({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Detail label="Stage">{project.stage}</Detail>
      <Detail label="Currently fundraising">Not available</Detail>
      <Detail label="Funding needed">Not available</Detail>
      <Detail label="Previously raised">Not available</Detail>
    </div>
  );
}

function Documents({ project }: { project: Project }) {
  return (
    <div>
      <span>
        <b>Pitch deck:</b>
        <FileDescription file={project.deck} />
      </span>
      <span>
        <b>Demo video:</b>
        <FileDescription file={project.demo} />
      </span>
    </div>
  );
}

function Founders({ project }: { project: Project }) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {(project.founders ?? []).map((founder) => (
        <div key={founder}>
          <Founder accountId={founder} />
        </div>
      ))}
    </div>
  );
}

function Questions({ project }: { project: Project }) {
  const questions = [
    {
      question: "What problem(s) are you solving?",
      answer: project.problem,
    },
    {
      question: "What makes your team uniquely positioned for success?",
      answer: project.success_position,
    },
    {
      question: "Why are you building on NEAR?",
      answer: project.why,
    },
    {
      question: "What's your 5 year vision?",
      answer: project.vision,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {questions.map(({ question, answer }) => (
        <div className="flex flex-col gap-2" key={question}>
          <div className="font-semibold">{question}</div>
          <Description text={answer} full />
        </div>
      ))}
    </div>
  );
}
