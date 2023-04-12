const ownerId = "contribut3.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/Vendor.Details`}
    props={{
      onSave: (profile) => {
        Near.call({
          contractName: "social.near",
          methodName: "edit_project",
          args: { data: { [accountId]: { profile } } },
        });
      },
    }}
  />
);
