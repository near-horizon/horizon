const ownerId = "nearhorizon.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Request contribution",
      description: (
        <Widget
          src={`${ownerId}/widget/SelectedLine`}
          props={{ accountId, label: "Vendor", isProject: false }}
        />
      ),
      trigger: <>Invite vendor</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Vendor.InviteForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
