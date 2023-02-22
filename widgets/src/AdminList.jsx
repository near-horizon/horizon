const ownerId = "contribut3.near";
const search = props.search ?? "";

const allEntities = (
  Near.view(
    ownerId,
    "get_contributor_admin_entities",
    { account_id: context.accountId },
    "final",
    true
  ) ?? []
)
  .filter((accountId) => (search ? accountId.includes(search) : true))
  .sort((a, b) => a.localeCompare(b));

if (!allEntities || allEntities.length === 0) {
  return "No entities with Admin access for your account!";
}

return (
  <>
    {allEntities.map((accountId) => (
      <div key={accountId} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Entity`}
          props={{ accountId, notStandalone: false, inboxView: true }}
        />
      </div>
    ))}
  </>
);
