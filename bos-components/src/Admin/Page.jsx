const ownerId = "nearhorizon.near";

const availableContent = ["claims", "applications", "vendors", "metrics"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "claims";
  }

  return content;
};

State.init({
  isOwner: false,
  isOwnerFetched: false,
});

// TODO: THIS IS A HACK AND SHOULD BE REMOVED ASAP - NEED TO ADD PERMISSION SYSTEM
const allowedUsers = ["lccc.near", "jarrodbarnes.near"];

if (context.accountId && !state.isOwnerFetched) {
  Near.asyncView(
    ownerId,
    "check_is_owner",
    { account_id: context.accountId },
    "final",
    false,
  ).then((isOwner) =>
    State.update({
      isOwner: isOwner || allowedUsers.includes(context.accountId),
      isOwnerFetched: true,
    }),
  );
}

if (!state.isOwner) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Permission Denied!",
        description: (
          <>
            You need to log in with an admin account to access the admin
            dashboard!
          </>
        ),
      }}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
`;

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
`;

const HeaderProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  padding-top: 0.25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

const circledPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1624_38049)">
      <path
        d="M9 6V12M6 9H12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1624_38049">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const plus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.75V14.25M3.75 9H14.25"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CTARow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75em;
  margin-top: 1em;
`;

const content = {
  claims: (
    <Widget
      src={`${ownerId}/widget/Admin.Claims`}
      props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
    />
  ),
  applications: (
    <Widget
      src={`${ownerId}/widget/Admin.Applications`}
      props={{ accountId: props.accountId }}
    />
  ),
  vendors: (
    <Widget
      src={`${ownerId}/widget/Admin.Vendors`}
      props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
    />
  ),
  metrics: (
    <Widget
      src={`${ownerId}/widget/Admin.Completion`}
      props={{ accountId: props.accountId }}
    />
  ),
}[getContent(props.content)];

return (
  <Container>
    <Header>
      <HeaderDetails>
        <h1>Admin dashboard</h1>
      </HeaderDetails>
      <HeaderProgress></HeaderProgress>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/TabSelector`}
          props={{
            tab: "admin",
            content: getContent(props.content),
            search: props.search,
            update: props.update,
            accountId: props.accountId,
            buttons: [
              {
                id: "claims",
                text: "Claims",
              },
              {
                id: "applications",
                text: "Credit applications",
              },
              {
                id: "vendors",
                text: "Vendors",
              },
              {
                id: "metrics",
                text: "Metrics",
              },
            ],
          }}
        />
        {content}
      </MainContent>
    </ContentContainer>
  </Container>
);
