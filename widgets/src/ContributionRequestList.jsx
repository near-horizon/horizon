const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;
const cid = props.cid;

const requests = accountId
  ? Object.keys(
    Near.view(
      ownerId,
      cid
        ? "get_need_contribution_requests"
        : "get_entity_contribution_requests",
      { account_id: accountId, ...(cid ? { cid } : {}) },
      "final",
      true
    ) ?? {}
  )
  : Near.view(
    ownerId,
    "get_admin_contribution_requests",
    { account_id: context.accountId },
    "final",
    true
  ) ?? [];

if (!requests) {
  return "Loading...";
}

if (Array.isArray(requests) && requests.length === 0) {
  return "No contribution requests found!";
}

const allRequests = requests.filter((ids) =>
  accountId ? ids.includes(accountId) : ids[0].includes(search)
);

if (!allRequests || allRequests.length === 0) {
  return "No requests match search criteria!";
}

return (
  <>
    {allRequests.map(([entityId, contributorId]) => (
      <div key={contributorId} className="mt-3">
        <Widget
          src={`${ownerId}/widget/ContributionRequest`}
          props={{
            entityId: accountId ? accountId : entityId,
            contributorId: accountId ? entityId : contributorId,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
