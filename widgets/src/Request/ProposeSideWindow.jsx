const ownerId = "contribut3.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Contribute to",
      description: (
        <Widget
          src={`${ownerId}/widget/Request.line`}
          props={{ accountId }}
        />
      ),
      trigger: <>Propose contribution</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Request.ContributionForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
