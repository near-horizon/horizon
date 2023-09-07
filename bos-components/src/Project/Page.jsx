const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  isAdmin: false,
  isAdminIsFetched: false,
  project: null,
  projectIsFetched: false,
});

if (!state.isAdminIsFetched) {
  if (!context.accountId) {
    State.update({ isAdmin: false, isAdminIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_project_admin",
      { project_id: accountId, account_id: context.accountId },
      "final",
      false,
    ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
  }
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false,
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.projectIsFetched || !state.isAdminIsFetched) {
  return <>Loading...</>;
}

const availableContent = ["overview", "details", "requests", "history"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 30%;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
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

const contentWidget = {
  overview: "About",
  details: "Details",
  requests: "Requests",
  history: "History",
}[getContent(props.content)];

const content = (
  <Widget
    src={`${ownerId}/widget/Project.${contentWidget}`}
    props={{ accountId: props.accountId, isAdmin: state.isAdmin }}
  />
);

const GreyButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  color: #006adc;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
`;

return (
  <Container>
    <ContentContainer>
      <Header>
        <HeaderDetails>
          <Widget
            src={`${ownerId}/widget/Project.HeaderDetails`}
            props={{ accountId, isAdmin: state.isAdmin }}
          />
          <CTARow>
            {state.isAdmin ? (
              <>
                <GreyButton
                  href={`/${ownerId}/widget/Index?tab=createrequest&accountId=${accountId}`}
                >
                  {plus}Create request
                </GreyButton>
                <GreyButton href={`/${ownerId}/widget/Index?tab=partners`}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 11.2502L6.75 9.00019M9 11.2502C10.0476 10.8517 11.0527 10.3492 12 9.75019M9 11.2502V15.0002C9 15.0002 11.2725 14.5877 12 13.5002C12.81 12.2852 12 9.75019 12 9.75019M6.75 9.00019C7.14911 7.96476 7.65165 6.97223 8.25 6.03769C9.12389 4.64043 10.3407 3.48997 11.7848 2.69575C13.2288 1.90154 14.852 1.48996 16.5 1.50019C16.5 3.54019 15.915 7.12519 12 9.75019M6.75 9.00019H3C3 9.00019 3.4125 6.72769 4.5 6.00019C5.715 5.19019 8.25 6.00019 8.25 6.00019M3.375 12.3752C2.25 13.3202 1.875 16.1252 1.875 16.1252C1.875 16.1252 4.68 15.7502 5.625 14.6252C6.1575 13.9952 6.15 13.0277 5.5575 12.4427C5.26598 12.1644 4.88197 12.0037 4.47917 11.9912C4.07637 11.9787 3.68316 12.1155 3.375 12.3752Z"
                      stroke="#006ADC"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Apply to accelerator
                </GreyButton>
              </>
            ) : (
              <Widget
                src={`${ownerId}/widget/Project.ProposeSideWindow`}
                props={{ accountId }}
              />
            )}
          </CTARow>
        </HeaderDetails>
        {/* <HeaderProgress> */}
        {/*   <Widget */}
        {/*     src={`${ownerId}/widget/Project.Progress`} */}
        {/*     props={{ accountId }} */}
        {/*   /> */}
        {/* </HeaderProgress> */}
      </Header>
      <Widget
        src={`${ownerId}/widget/TabSelector`}
        props={{
          tab: "project",
          content: getContent(props.content),
          search: props.search,
          update: props.update,
          accountId: props.accountId,
          buttons: [
            {
              id: "overview",
              text: "Overview",
            },
            {
              id: "details",
              text: "Details",
            },
            {
              id: "requests",
              text: "Requests",
            },
            {
              id: "history",
              text: "Work history",
            },
          ],
        }}
      />
      {content}
    </ContentContainer>
    {/* <Sidebar> */}
    {/*   <Widget */}
    {/*     src={`${ownerId}/widget/Project.Sidebar`} */}
    {/*     props={{ */}
    {/*       accountId, */}
    {/*       isAdmin: state.isAdmin, */}
    {/*     }} */}
    {/*   /> */}
    {/* </Sidebar> */}
  </Container>
);
