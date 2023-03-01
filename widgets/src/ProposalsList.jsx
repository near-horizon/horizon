const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const requests = Object.keys(
  Near.view(
    ownerId,
    "get_contributor_contribution_requests",
    { account_id: context.accountId },
    "final",
    true
  ) ?? {}
);

if (!requests) {
  return "Loading...";
}

if (Array.isArray(requests) && requests.length === 0) {
  return "No proposals found!";
}

const allRequests = requests.filter((entityId) => entityId.includes(search));

if (!allRequests || allRequests.length === 0) {
  return "No proposals match search criteria!";
}

return (
  <>
    {allRequests.map((entityId) => (
      <div key={contributorId} className="mt-3">
        <Widget
          src={`${ownerId}/widget/ContributionRequest`}
          props={{
            entityId,
            contributorId: accountId,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
