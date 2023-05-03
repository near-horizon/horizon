const ownerId = "nearhorizon.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/Investor.Details`}
    props={{
      accountId,
      onSave: (profile) => {
        Near.call({
          contractName: "social.near",
          methodName: "set",
          args: { data: { [accountId]: { profile } } },
        });
      },
      isAdmin: props.isAdmin,
    }}
  />
);
