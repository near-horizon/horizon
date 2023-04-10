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
  false
);

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  false
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
  project: (
    <Widget
      src={`${ownerId}/widget/Project.Page`}
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
        cid: state.cid,
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
  contribution: (
    <Widget
      src={`${ownerId}/widget/ContributionPage`}
      props={{
        entityId: state.entityId,
        contributorId: state.contributorId,
        search: state.search,
        update,
      }}
    />
  ),
}[state.tab];

const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 24px 24px 0px 0px;
  padding: 2.5em 1.5em;
`;

return (
  <div>
    <Widget src={`${ownerId}/widget/NavbarControl`} props={{ update }} />
    <div className="d-flex flex-row position-relative">
      <div className="d-flex flex-row position-sticky top-0">
        <div className="flex-grow-1">
          <Widget
            src={`${ownerId}/widget/Sidebar`}
            props={{ tab: state.tab, update }}
          />
        </div>
      </div>
      <ContentContainer>{tabContent}</ContentContainer>
    </div>
  </div>
);
