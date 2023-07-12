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
  transactionHashes: props.transactionHashes,
});

if (context.accountId && !state.tncIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: [
        `${context.accountId}/profile/horizon_tnc`,
        `${context.accountId}/index/tosAccept`,
      ],
    },
    "final",
    false
  ).then((data) =>
    State.update({
      tnc: data[context.accountId]?.profile?.horizon_tnc === "true",
      tosAccept:
        data[context.accountId]?.index?.tosAccept &&
        data[context.accountId]?.index?.tosAccept.length > 0,
      tncIsFetched: true,
    })
  );
}

const update = (state) => State.update(state);

const tabContentWidget = {
  home: "Dashboard",
  inbox: "Inbox",
  manage: "Manage",
  project: "Project.Page",
  request: "Request.Page",
  vendor: "Vendor.Page",
  backer: "Investor.Page",
  contribution: "Contribution.Page",
  createproject: "Project.Form",
  createrequest: "Request.Form",
  createvendor: "Vendor.Form",
  createbacker: "Investor.Form",
  permissions: "Inputs.SetUpPermissions",
  learn: "Learn.Page",
  faq: "FAQ.Page",
  help: "Help.Page",
  legal: "TNCPage",
  admin: "Admin.Page",
  projects: "Project.ListPage",
  investors: "Investor.ListPage",
  backers: "Investor.ListPage",
  vendors: "Vendor.ListPage",
  contributors: "Vendor.ListPage",
  requests: "Request.ListPage",
  partners: "Application.Page",
  partner: "Application.DetailPage",
  "my-projects": "Manage.Projects",
  "my-requests": "Manage.Requests",
  "my-contracts": "Manage.Contracts",
  "my-applications": "Manage.Applications",
}[state.tab];

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${tabContentWidget}`}
    props={{
      update,
      search: state.search,
      content: state.content,
      tab: state.tab,
      accountId: state.accountId,
      entityId: state.entityId,
      contributorId: state.contributorId,
      projectId: state.projectId,
      vendorId: state.vendorId,
      kind: state.kind,
      cid: state.cid,
      transactionHashes: state.transactionHashes,
      urlProps: props,
    }}
  />
);

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

  @media screen and (max-width: 768px) {
    & > div {
      &:last-child {
        display: none;
      }
    }
  }

  @media screen and (min-width: 768px) {
    & > div {
      &:first-child {
        display: none;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
        open: !state.tnc && state.tosAccept,
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
          props={{ tab: state.tab, update, collapsible: true }}
        />
        <Widget
          src={`${ownerId}/widget/Sidebar`}
          props={{ tab: state.tab, update, collapsible: false }}
        />
      </Sidebar>
      <ContentContainer className={isForm ? "form" : ""}>
        {tabContent}
      </ContentContainer>
    </Content>
  </Container>
);
