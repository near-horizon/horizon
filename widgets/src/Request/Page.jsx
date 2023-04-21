const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const cid = props.cid;

const availableContent = ["overview", "invitations", "proposals"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

State.init({
  request: null,
  requestIsFetched: false,
  isAdmin: false,
  isAdminIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.isAdminIsFetched) {
  Near.asyncView(
    ownerId,
    "check_is_project_admin",
    { project_id: accountId, account_id: context.accountId },
    "final",
    false
  ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
}

if (!state.requestIsFetched || !state.isAdminIsFetched) {
  return <>Loading...</>;
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
  width: 80%;
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

const personPlus = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3.5L14.25 1.25M14.25 1.25L16.5 3.5M14.25 1.25V5.75M12 14.75V13.85C12 12.5899 12 11.9598 11.7548 11.4785C11.539 11.0552 11.1948 10.711 10.7715 10.4952C10.2902 10.25 9.66012 10.25 8.4 10.25H5.1C3.83988 10.25 3.20982 10.25 2.72852 10.4952C2.30516 10.711 1.96095 11.0552 1.74524 11.4785C1.5 11.9598 1.5 12.5899 1.5 13.85V14.75M9.375 4.625C9.375 6.07475 8.19975 7.25 6.75 7.25C5.30025 7.25 4.125 6.07475 4.125 4.625C4.125 3.17525 5.30025 2 6.75 2C8.19975 2 9.375 3.17525 9.375 4.625Z"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

const content = {
  overview: (
    <Widget
      src={`${ownerId}/widget/Request.About`}
      props={{
        accountId,
        cid,
        isAdmin: state.isAdmin,
      }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/Request.Invitations`}
      props={{
        accountId,
        cid,
        isAdmin: state.isAdmin,
      }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/Request.ProposalList`}
      props={{
        accountId,
        cid,
      }}
    />
  ),
}[getContent(props.content)];

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Request.HeaderDetails`}
          props={{ accountId, cid, isAdmin: state.isAdmin }}
        />
        <CTARow>
          {state.isAdmin ? (
            <></>
          ) : (
            <Widget
              src={`${ownerId}/widget/Request.ProposeSideWindow`}
              props={{ accountId, cid }}
            />
          )}
          <Widget
            src={`${ownerId}/widget/Buttons.Grey`}
            props={{
              onClick: () => {
                clipboard.writeText(
                  `https://alpha.near.org/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`
                );
              },
              text: <>Share</>,
            }}
          />
        </CTARow>
      </HeaderDetails>
    </Header>
    <ContentContainer>
      <MainContent>
        {state.isAdmin ? (
          <Widget
            src={`${ownerId}/widget/TabSelector`}
            props={{
              tab: "request",
              content: getContent(props.content),
              search: props.search,
              update: props.update,
              accountId: props.accountId,
              cid,
              buttons: [
                {
                  id: "overview",
                  text: "Overview",
                },
                {
                  id: "invitations",
                  text: "Invitations",
                },
                {
                  id: "proposals",
                  text: "Proposals",
                },
              ],
            }}
          />
        ) : (
          <></>
        )}
        {content}
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Request.Sidebar`}
          props={{ accountId, cid, isAdmin: state.isAdmin }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
