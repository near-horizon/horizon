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

const update = (state) => State.update(state);

const tabContent = {
  home: (
    <Widget
      src={`${ownerId}/widget/Dashboard`}
      props={{ content: state.content, search: state.search, update }}
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
  permissions: (
    <Widget
      src={`${ownerId}/widget/Inputs.SetUpPermissions`}
      props={{ accountId: state.accountId }}
    />
  ),
}[state.tab];

const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 24px 24px 0px 0px;
  padding: 2.5em 1.5em;

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

return (
  <div>
    <Widget src={`${ownerId}/widget/NavbarControl`} props={{ update }} />
    <Content>
      <Sidebar show={!["createproject", "permissions"].includes(state.tab)}>
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update }}
        />
      </Sidebar>
      <ContentContainer>{tabContent}</ContentContainer>
    </Content>
  </div>
);
