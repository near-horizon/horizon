const ownerId = "nearhorizon.near";
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
  if (!context.accountId) {
    State.update({ isAdmin: false, isAdminIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_project_admin",
      { project_id: accountId, account_id: context.accountId },
      "final",
      false
    ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
  }
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
  width: 100%;
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
  margin-top: 1em;
  flex-wrap: wrap;
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

const contentMap = {
  overview: "About",
  invitations: "Invitations",
  proposals: "ProposalList",
}[getContent(props.content)];

const content = (
  <Widget
    src={`${ownerId}/widget/Request.${contentMap}`}
    props={{
      accountId,
      cid,
      isAdmin: state.isAdmin,
    }}
  />
);

const Separator = styled("Separator.Root")`
  height: 1px;
  width: 100%;
  background: #eceef0;
`;

const Button = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--error-error-default, #f44738);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
`;

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
            <>
              <Widget
                src={`${ownerId}/widget/Request.EditSideWindow`}
                props={{ accountId, cid }}
              />
              <Button
                onClick={() => {
                  Near.call(ownerId, "edit_request", {
                    cid: props.cid,
                    request: {
                      ...state.request,
                      open: false,
                    },
                  });
                }}
              >
                Close request
              </Button>
            </>
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
                  `https://near.org/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`
                );
              },
              text: (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.5935 9.45565C15.7766 9.29872 15.8682 9.22025 15.9017 9.12687C15.9311 9.04492 15.9311 8.95527 15.9017 8.87332C15.8682 8.77995 15.7766 8.70148 15.5935 8.54454L9.24047 3.09908C8.9253 2.82893 8.76772 2.69385 8.6343 2.69055C8.51835 2.68767 8.40759 2.73861 8.33432 2.82852C8.25 2.93197 8.25 3.13952 8.25 3.55463V6.77607C6.64899 7.05616 5.1837 7.86741 4.09478 9.0855C2.90762 10.4135 2.25093 12.1321 2.25 13.9133V14.3723C3.03701 13.4242 4.01963 12.6575 5.13057 12.1245C6.11002 11.6547 7.16881 11.3763 8.25 11.303V14.4456C8.25 14.8607 8.25 15.0682 8.33432 15.1717C8.40759 15.2616 8.51835 15.3125 8.6343 15.3096C8.76772 15.3063 8.9253 15.1713 9.24047 14.9011L15.5935 9.45565Z"
                      stroke="currentColor"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Share
                </>
              ),
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
          <Separator />
        )}
        {content}
      </MainContent>
    </ContentContainer>
  </Container>
);
