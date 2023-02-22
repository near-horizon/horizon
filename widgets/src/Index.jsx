const ownerId = "contribut3.near";

initState({
  search: "",
  content: props.content ?? "entities",
  tab: props.tab ?? "dashboard",
});

const isModerator = Near.view(
  ownerId,
  "check_is_moderator",
  { account_id: context.accountId },
  "final",
  true
);

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const update = (tab) => State.update({ tab });

const tabContent = {
  dashboard: (
    <Widget
      src={`${ownerId}/widget/Dashboard`}
      props={{ content: props.content, search: props.search, update }}
    />
  ),
  profile: <Widget src={`${ownerId}/widget/Profile`} />,
  inbox: (
    <Widget
      src={`${ownerId}/widget/Inbox`}
      props={{ content: props.content, search: props.search, update }}
    />
  ),
  entities: (
    <Widget
      src={`${ownerId}/widget/ManageEntities`}
      props={{ content: props.content, search: props.search, update }}
    />
  ),
  entity: (
    <Widget
      src={`${ownerId}/widget/EntityPage`}
      props={{
        accountId: props.accountId,
        update,
        search: props.search,
        content: props.content,
      }}
    />
  ),
}[state.tab];

return (
  <div className="d-flex flex-row">
    <div className="px-1">
      <Widget
        src={`${ownerId}/widget/Sidebar`}
        props={{ tab: state.tab, update }}
      />
    </div>
    <div className="vr mx-2" />
    <div className="w-100">{tabContent}</div>
  </div>
);
