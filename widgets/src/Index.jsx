const ownerId = "contribut3.near";

State.init({
  search: props.search ?? "",
  content: props.content,
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

const update = (state) => State.update(state);

const tabContent = {
  dashboard: (
    <Widget
      src={`${ownerId}/widget/Dashboard`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  contributor: (
    <Widget
      src={`${ownerId}/widget/Profile`}
      props={{
        content: state.content,
        search: state.search,
        accountId: props.accountId,
        update,
      }}
    />
  ),
  inbox: (
    <Widget
      src={`${ownerId}/widget/Inbox`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  entities: (
    <Widget
      src={`${ownerId}/widget/ManageEntities`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  entity: (
    <Widget
      src={`${ownerId}/widget/EntityPage`}
      props={{
        accountId: props.accountId,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  need: (
    <Widget
      src={`${ownerId}/widget/NeedPage`}
      props={{
        accountId: props.accountId,
        cid: props.cid,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  create: (
    <Widget
      src={`${ownerId}/widget/CreatePage`}
      props={{
        search: state.search,
        content: state.content,
        kind: props.kind,
        update,
      }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionsPage`}
      props={{
        search: state.search,
        content: state.content,
        update,
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
