import { Description } from "~/components/description";
import { Detail } from "~/components/detail";
import { Socials } from "~/components/socials";
import { Details } from "~/components/ui/details";
import { getProject } from "~/lib/server/projects";
import { formatTimestamp } from "~/lib/utils";
import { type AccountId } from "~/lib/validation/common";
import { type Project } from "~/lib/validation/projects";
import { Stats } from "./stats";
import { Founder } from "./founder";

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
        {/*   loading={status === "loading"} */}
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
            {formatTimestamp(project.creationTx?.timestamp)}
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
        <a>{project.deck}</a>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12.75L9 15.75M9 15.75L12 12.75M9 15.75V9M15 12.5571C15.9161 11.8005 16.5 10.656 16.5 9.375C16.5 7.09683 14.6532 5.25 12.375 5.25C12.2111 5.25 12.0578 5.1645 11.9746 5.0233C10.9965 3.36363 9.19082 2.25 7.125 2.25C4.0184 2.25 1.5 4.7684 1.5 7.875C1.5 9.42458 2.12659 10.8278 3.14021 11.8451"
            stroke="#7E868C"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        <b>Demo video:</b>
        <a>{project.demo}</a>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 6.75L15.75 2.25M15.75 2.25H11.25M15.75 2.25L9.75 8.25M7.5 3.75H5.85C4.58988 3.75 3.95982 3.75 3.47852 3.99524C3.05516 4.21095 2.71095 4.55516 2.49524 4.97852C2.25 5.45982 2.25 6.08988 2.25 7.35V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75H10.65C11.9101 15.75 12.5402 15.75 13.0215 15.5048C13.4448 15.289 13.789 14.9448 14.0048 14.5215C14.25 14.0402 14.25 13.4101 14.25 12.15V10.5"
            stroke="#7E868C"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
