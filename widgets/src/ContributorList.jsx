const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const allContributors = (
  Near.view(
    ownerId,
    accountId ? "get_entity_contributions" : "get_contributors",
    accountId ? { entity_id: accountId } : {},
    "final",
    true
  ) ?? []
).filter((ids) => (accountId ? ids[0].includes(search) : ids.includes(search)));

if (!allContributors || allContributors.length === 0) {
  return "No contributors found!";
}

return (
  <>
    {allContributors.map((ids) => (
      <div key={account ? ids[0] : ids} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Contributor`}
          props={{ accountId: accountId ? ids[0] : ids, notStandalone: true }}
        />
      </div>
    ))}
  </>
);
