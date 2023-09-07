const ownerId = "nearhorizon.near";
const accountId = props.accountId;

State.init({
  project: null,
  projectIsFetched: false,
  founders: null,
  foundersIsFetched: false,
  requests: null,
  requestsIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false,
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false,
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: accountId },
    "final",
    false,
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/*`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    }),
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const Name = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  width: 35%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 16.25%;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.95em;
  background: #f2f4f7;
  mix-blend-mode: multiply;
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1.125em;
  text-align: center;
`;

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

const text =
  typeof state.project.application === "string"
    ? state.project.application
    : Object.keys(state.project.application)[0];

return (
  <Container>
    <Name
      href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
    >
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: props.accountId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: props.accountId,
          name: state.profile.name,
          nameSize: "1.125em",
        }}
      />
    </Name>
    <Other>
      <Widget
        src={`${ownerId}/widget/IconList`}
        props={{ ids: state.founders, iconOnly: true, justify: "center" }}
      />
    </Other>
    <Other>
      <Badge>{text}</Badge>
    </Other>
    <Other>{new Date().toLocaleDateString()}</Other>
    <Other>
      <Widget
        src={`${ownerId}/widget/ActiveIndicator`}
        props={{ active: true }}
      />
    </Other>
  </Container>
);
