const ownerId = "contribut3.near";
const search = props.search;
const accountId = props.accountId;

const invites =
  Near.view(
    ownerId,
    accountId ? "get_entity_invites" : "get_contributor_invites",
    { account_id: props.accountId ?? context.accountId },
    "final",
    true
  ) ?? {};

const allInvites = Object.keys(invites).filter(
  (entityId) =>
    entityId.includes(search) ||
    invites[entityId].description.includes(search) ||
    invites[entityId].contribution_type.includes(search)
);

if (!allInvites || allInvites.length === 0) {
  return "No invites for your account!";
}

return (
  <>
    {allInvites.map((entityId) => (
      <div key={entityId} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Invite`}
          props={{
            entityId: accountId ?? entityId,
            accountId: accountId ? entityId : null,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
