import { Hydrate, dehydrate } from "@tanstack/react-query";
import { Learn } from "./learn";
import getQueryClient from "../query-client";
import { learningResource } from "~/pages/api/learn";

export default function LearnPage() {
  const queryClient = getQueryClient();
  queryClient.setQueryData(["learningResources"], learningResource);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Learn />
    </Hydrate>
  );
}
