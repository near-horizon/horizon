const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #d9f4ff;
  border-radius: 8px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  width: 100%;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
  width: 35%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 0.75em;
  line-height: 1.4em;
  color: #11181c;
  width: 65%;
`;

State.init({
  project: null,
  projectIsFetched: false,
  profile: null,
  profileIsFetched: false,
  completion: 0,
  credits: 0,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: props.accountId },
    "final",
    false,
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${props.accountId}/profile/**`] },
    "final",
    false,
  ).then((profile) =>
    State.update({
      profile: profile[props.accountId].profile,
      profileIsFetched: true,
    }),
  );
}

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

if (state.project.credits) {
  asyncFetch(`${apiUrl}/data/credits/projects/${props.accountId}/balance`).then(
    ({ body: credits }) => State.update({ credits }),
  );
}

asyncFetch(`${apiUrl}/data/projects/completion`).then(({ body: { list } }) =>
  State.update({
    completion: list
      .find(({ id }) => id === props.accountId)
      .completion.toLocaleString("en-US", { style: "percent" }),
  }),
);

return (
  <Container>
    <Row>
      <Label>Credits:</Label>
      <Value>
        {state.project.credits ? (
          <>
            {Number(state.credits).toLocaleString("en-US", {
              notation: "compact",
            })}{" "}
            NHZN
          </>
        ) : (
          <>Not available</>
        )}{" "}
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{
            content:
              "Horizon Credits (NHZN) help track service usage and inform payments distributed to Horizon service partners.",
          }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>
        {state.completion}
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{
            content:
              "Completion status of your profile. Once fully complete, your project will be more discoverable by others in the community",
          }}
        />
      </Value>
    </Row>
  </Container>
);
