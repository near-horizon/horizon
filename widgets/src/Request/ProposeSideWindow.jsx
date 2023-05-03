const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const cid = props.cid;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Propose contribution",
      description: (
        <Widget
          src={`${ownerId}/widget/Request.Line`}
          props={{ accountId, cid }}
        />
      ),
      trigger: <>Propose contribution</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Request.ProposeForm`}
          props={{ accountId, cid }}
        />
      ),
      minWidth: "400px",
    }}
  />
);
