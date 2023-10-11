import { type AccountId } from "~/lib/validation/common";
import { Description } from "../description";
import { useProject } from "~/hooks/projects";

export function Questions({ accountId }: { accountId: AccountId }) {
  const { data, status } = useProject(accountId);

  const questions = [
    {
      question: "What problem(s) are you solving?",
      answer: data?.problem,
    },
    {
      question: "What makes your team uniquely positioned for success?",
      answer: data?.success_position,
    },
    {
      question: "Why are you building on NEAR?",
      answer: data?.why,
    },
    {
      question: "What's your 5 year vision?",
      answer: data?.vision,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {questions.map(({ question, answer }) => (
        <Question
          key={question}
          question={question}
          answer={answer}
          loading={status === "loading"}
        />
      ))}
    </div>
  );
}

function Question({
  question,
  answer = "",
  loading = false,
}: {
  question: string;
  answer?: string;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">{question}</div>
      <Description text={answer} loading={loading} full />
    </div>
  );
}
