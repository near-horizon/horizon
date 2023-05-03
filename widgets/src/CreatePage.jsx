const ownerId = "nearhorizon.near";

const availableContent = ["request", "entity", "proposal", "invite"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "request";
  }

  return content;
};

const content = {
  request: (
    <Widget
      src={`${ownerId}/widget/NeedForm`}
      props={{
        search: state.search,
        update: props.update,
        accountId: props.accountId,
      }}
    />
  ),
  entity: (
    <Widget
      src={`${ownerId}/widget/EntityForm`}
      props={{
        search: state.search,
        update: props.update,
        kind: props.kind,
        accountId: props.accountId,
      }}
    />
  ),
  proposal: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestForm`}
      props={{
        search: state.search,
        update: props.update,
        kind: props.kind,
        accountId: props.accountId,
        cid: props.cid,
      }}
    />
  ),
  invite: (
    <Widget
      src={`${ownerId}/widget/InviteForm`}
      props={{
        search: state.search,
        update: props.update,
        accountId: props.accountId,
      }}
    />
  ),
}[getContent(props.content)];

return <div>{content}</div>;
