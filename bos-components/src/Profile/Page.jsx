const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  gap: 3.5rem;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 0.25rem;
  width: calc((100% - 3.5rem) / 5);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: calc((100% - 3.5rem) / 5 * 4);
  gap: 3rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const contentWidget = {
  dashboard: "Profile.Dashboard",
  inbox: "Inbox",
  basic: "Profile.Basic",
  tech: "Profile.Tech",
  funding: "Profile.Fund",
  founders: "Profile.Founders",
  files: "Profile.Files",
  requests: "Manage.Requests",
  contracts: "Manage.Contracts",
  credits: "Profile.Credits.Page",
  growth: "Profile.Growth",
  permissions: "Profile.Permissions",
  settings: "Profile.Settings",
  admin: "Admin.Page",
};

const getContent = (tab) => {
  if (tab in contentWidget) {
    return tab;
  }

  if (tab.startsWith("credits")) {
    return "credits";
  }

  return "dashboard";
};

const contentKey = getContent(props.content ?? "");

const content = (
  <Widget
    src={`${ownerId}/widget/${contentWidget[contentKey]}`}
    props={{
      ...props,
    }}
  />
);

return (
  <Container>
    <Sidebar>
      <Widget src={`${ownerId}/widget/Sidebar`} props={{ ...props }} />
    </Sidebar>
    <Content>
      {contentKey === "dashboard" ? (
        <Widget src={`${ownerId}/widget/Profile.HowSection`} />
      ) : (
        <></>
      )}
      <Widget
        src={`${ownerId}/widget/Project.Layout`}
        props={{
          children: content,
          accountId: props.accountId ?? context.accountId,
        }}
      />
    </Content>
  </Container>
);
