const ownerId = "contribut3.near";

State.init({
  search: props.search ?? "",
  content: props.content,
  tab: props.tab ?? "home",
  accountId: props.accountId,
  entityId: props.entityId,
  contributorId: props.contributorId,
  kind: props.kind,
  cid: props.cid,
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
  home: (
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
        accountId: state.accountId,
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
        accountId: state.accountId,
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
        accountId: state.accountId,
        cid: state.cid,
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
        accountId: props.accountId,
        kind: state.kind,
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
    <div className="d-flex flex-row position-sticky top-0">
      <div className="flex-grow-1">
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update }}
        />
      </div>
      <div className="vr mx-3" style={{ height: "90vh" }} />
    </div>
    <div className="flex-grow-1">{tabContent}</div>
  </div>
);
