const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Add contribution action",
      description: (
        <Widget
          src={`${ownerId}/widget/Contribution.Line`}
          props={{ projectId, cid, vendorId }}
        />
      ),
      trigger: <>Add action</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Contribution.ActionForm`}
          props={{ projectId, cid, vendorId }}
        />
      ),
      minWidth: "400px",
    }}
  />
);
