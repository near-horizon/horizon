const ownerId = "nearhorizon.near";

State.init({
  search: props.search ?? "",
  content: props.content,
  tab: props.tab ?? "home",
  accountId: props.accountId,
  entityId: props.entityId,
  contributorId: props.contributorId,
  kind: props.kind,
  cid: props.cid,
  projectId: props.projectId,
  vendorId: props.vendorId,
  tnc: true,
  tncIsFetched: false,
});

if (context.accountId && !state.tncIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${context.accountId}/profile/horizon_tnc`] },
    "final",
    false
  ).then((data) =>
    State.update({
      tnc: data[context.accountId]?.profile?.horizon_tnc === "true",
      tncIsFetched: true,
    })
  );
}

const update = (state) => State.update(state);

const tabContent = {
  home: (
    <Widget
      src={`${ownerId}/widget/Dashboard`}
      props={{ content: state.content, update }}
    />
  ),
  inbox: (
    <Widget
      src={`${ownerId}/widget/Inbox`}
      props={{ content: state.content, search: state.search, update }}
    />
  ),
  manage: (
    <Widget
      src={`${ownerId}/widget/Manage`}
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
  request: (
    <Widget
      src={`${ownerId}/widget/Request.Page`}
      props={{
        accountId: state.accountId,
        search: state.search,
        content: state.content,
        update,
        cid: state.cid,
      }}
    />
  ),
  vendor: (
    <Widget
      src={`${ownerId}/widget/Vendor.Page`}
      props={{
        accountId: state.accountId,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  backer: (
    <Widget
      src={`${ownerId}/widget/Investor.Page`}
      props={{
        accountId: state.accountId,
        search: state.search,
        content: state.content,
        update,
      }}
    />
  ),
  contribution: (
    <Widget
      src={`${ownerId}/widget/Contribution.Page`}
      props={{
        accountId: state.accountId,
        search: state.search,
        content: state.content,
        projectId: state.projectId,
        vendorId: state.vendorId,
        cid: state.cid,
        update,
      }}
    />
  ),
  createproject: (
    <Widget
      src={`${ownerId}/widget/Project.Form`}
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
  createrequest: (
    <Widget
      src={`${ownerId}/widget/Request.Form`}
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
  createvendor: (
    <Widget
      src={`${ownerId}/widget/Vendor.Form`}
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
  createbacker: (
    <Widget
      src={`${ownerId}/widget/Investor.Form`}
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
  permissions: (
    <Widget
      src={`${ownerId}/widget/Inputs.SetUpPermissions`}
      props={{ accountId: state.accountId, accountIds: props.accountIds }}
    />
  ),
  learn: (
    <Widget
      src={`${ownerId}/widget/Learn.Page`}
      props={{ accountId: state.accountId }}
    />
  ),
  help: (
    <Widget
      src={`${ownerId}/widget/Help.Page`}
      props={{ accountId: state.accountId }}
    />
  ),
  legal: <Widget src={`${ownerId}/widget/TNCPage`} />,
  admin: (
    <Widget
      src={`${ownerId}/widget/Admin.Page`}
      props={{ update, content: state.content }}
    />
  ),
}[state.tab];

const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 24px 24px 0px 0px;
  padding: 3em;

  &.form {
    border: none;
    background: #fafafa;
  }

  * {
    margin: 0;
  }
`;

const Sidebar = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

const Container = styled.div``;

const showSidebar = ![
  "createproject",
  "createrequest",
  "createvendor",
  "createbacker",
  "permissions",
  "legal",
].includes(state.tab);
const isForm = [
  "createproject",
  "createrequest",
  "createvendor",
  "createbacker",
].includes(state.tab);

return (
  <Container>
    <Widget src={`${ownerId}/widget/Help.FeedbackButton`} props={{ update }} />
    <Widget
      src={`${ownerId}/widget/TNCModal`}
      props={{
        open: !state.tnc,
        accept: () =>
          Social.set(
            { profile: { horizon_tnc: true } },
            {
              onCommit: () => {
                State.update({ tnc: true });
              },
            }
          ),
      }}
    />
    <Widget src={`${ownerId}/widget/NavbarControl`} props={{ update }} />
    <Content>
      <Sidebar show={showSidebar}>
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update }}
        />
      </Sidebar>
      <ContentContainer className={isForm ? "form" : ""}>
        {tabContent}
      </ContentContainer>
    </Content>
  </Container>
);
