const ownerId = "contribut3.near";
const search = props.search ?? "";

const allEntities = Object.keys(
  Near.view(
    ownerId,
    "get_admin_entities",
    { account_id: context.accountId },
    "final",
    true
  ) ?? {}
).filter((accountId) => accountId.includes(search));

if (!allEntities || allEntities.length === 0) {
  return "No entities with Admin access for your account!";
}

return (
  <>
    {allEntities.map((accountId) => (
      <div key={accountId} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Entity`}
          props={{
            accountId,
            notStandalone: false,
            inboxView: true,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
