const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;
const size = props.size ?? "1em";

State.init({
  request: null,
  requestIsFetched: false,
  contribution: null,
  contributionIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true }),
  );
}

if (!state.requestIsFetched || !state.contributionIsFetched) {
  return <>Loading...</>;
}

const Container = styled.div`
  width: 100%;
  color: #101828;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 8px;
  background: #fafafa;
  border-bottom: 1px solid #eceef0;
  border-radius: 8px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0px 0px;
  gap: 1.5em;
  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.4em;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const lastAction =
  state.contribution.actions.length > 0
    ? state.contribution.actions[state.contribution.actions.length - 1]
    : null;

const lastActivity = (
  <Item>
    Last activity:
    <br />
    {lastAction ? (
      <>
        {lastAction.description} at{" "}
        {new Date(Number(lastAction.start_date)).toLocaleDateString()}
      </>
    ) : (
      <>Contract has started</>
    )}
  </Item>
);

const Label = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

return (
  <Container>
    <Label>Project</Label>
    <Widget
      src={`${ownerId}/widget/Project.Line`}
      props={{ accountId: projectId, size: "1.5em" }}
    />
    <Label>Vendor</Label>
    <Widget
      src={`${ownerId}/widget/Vendor.Line`}
      props={{ accountId: vendorId, size: "1.5em" }}
    />
    <Title>{state.request.title}</Title>
    <Details>{lastActivity}</Details>
  </Container>
);
