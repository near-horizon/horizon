const ownerId = "nearhorizon.near";

State.init({
  tnc: true,
  tncIsFetched: false,
  tosAccept: true,
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
    false,
  ).then((data) =>
    State.update({
      tnc: data[context.accountId]?.profile?.horizon_tnc === "true",
      tosAccept:
        data[context.accountId]?.index?.tosAccept &&
        data[context.accountId]?.index?.tosAccept.length > 0,
      tncIsFetched: true,
    }),
  );
}

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
  events: "Events.Page",
  perks: "Perks.Page",
  profile: "Profile.Page",
};

const getTabWidget = (tab) => {
  if (tab in tabContentWidget) {
    return tabContentWidget[tab];
  }

  return "Dashboard";
};

const tabContent = (
  <Widget
    src={`${ownerId}/widget/${getTabWidget(props.tab)}`}
    props={{
      ...props,
      urlProps: props,
    }}
  />
);

const Page = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #eaeaea;
`;

const Content = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 3em;
  border-radius: 0rem 0rem 1.5rem 1.5rem;
  border-top: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--base-white, #fff);

  &.form {
    border: none;
    background: #fafafa;
  }

  * {
    margin: 0;
    padding: 0;
  }
`;

const showSidebar = ![
  "createproject",
  "createrequest",
  "createvendor",
  "createbacker",
  "permissions",
  "legal",
].includes(props.tab);
const isForm = [
  "createproject",
  "createrequest",
  "createvendor",
  "createbacker",
].includes(props.tab);
const showTncDialog = !state.tnc && state.tosAccept && props.tab !== "legal";

return (
  <>
    <Widget src={`${ownerId}/widget/Help.FeedbackButton`} />
    <Widget
      src={`${ownerId}/widget/TNCModal`}
      props={{
        open: showTncDialog,
        accept: () =>
          Social.set(
            { profile: { horizon_tnc: true } },
            {
              onCommit: () => {
                State.update({ tnc: true });
              },
            },
          ),
      }}
    />
    <Widget src={`${ownerId}/widget/Header`} />
    <Page>
      <Widget
        src={`${ownerId}/widget/NavbarControl`}
        props={{ tab: props.tab }}
      />
      <Content className={isForm ? "form" : ""}>{tabContent}</Content>
    </Page>
  </>
);
