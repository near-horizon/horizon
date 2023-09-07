const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

State.init({
  proposal: null,
  proposalIsFetched: false,
  request: null,
  requestIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.proposalIsFetched || !state.requestIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Request description",
        id: "request-description",
        value: state.request.description,
        canEdit: false,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Proposal description",
        id: "proposal-description",
        value: state.proposal.description,
        canEdit: false,
      }}
    />
  </Container>
);
