const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

State.init({
  contribution: null,
  contributionIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  request: null,
  requestIsFetched: false,
});

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

if (!state.proposalIsFetched) {
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

if (
  !state.contributionIsFetched ||
  !state.proposalIsFetched ||
  !state.requestIsFetched
) {
  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/Contribution.Details`}
    props={{
      contribution: state.contribution,
      proposal: state.proposal,
      request: state.request,
    }}
  />
);
