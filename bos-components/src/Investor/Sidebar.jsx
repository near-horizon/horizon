const ownerId = "nearhorizon.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/Investor.Details`}
    props={{
      accountId,
      onSave: (profile) => Social.set({ profile }),
      isAdmin: props.isAdmin,
    }}
  />
);
