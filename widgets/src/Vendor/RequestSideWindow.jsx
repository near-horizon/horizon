const ownerId = "contribut3.near";

return <Widget
  src={`${ownerId}/widget/SideWindow`}
  props={{
    title: "Request a contribution",
    description: "Request a contribution from this vendor",
    trigger: <>{personPlus}Request contribution</>,
    children: <Widget src={`${ownerId}/widget/Vendor.RequestForm`} />,
  }}
/>
