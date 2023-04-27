const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;

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

const chat = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 11.25L5.19356 13.5853C4.87184 13.911 4.71098 14.0739 4.57271 14.0854C4.45276 14.0953 4.33531 14.0471 4.25697 13.9557C4.16667 13.8504 4.16667 13.6215 4.16667 13.1637V11.9937C4.16667 11.583 3.83031 11.2858 3.4239 11.2262V11.2262C2.44031 11.0822 1.66783 10.3097 1.52376 9.3261C1.5 9.16391 1.5 8.97039 1.5 8.58333V5.1C1.5 3.83988 1.5 3.20982 1.74524 2.72852C1.96095 2.30516 2.30516 1.96095 2.72852 1.74524C3.20982 1.5 3.83988 1.5 5.1 1.5H10.65C11.9101 1.5 12.5402 1.5 13.0215 1.74524C13.4448 1.96095 13.789 2.30516 14.0048 2.72852C14.25 3.20982 14.25 3.83988 14.25 5.1V8.25M14.25 16.5L12.6177 15.3652C12.3882 15.2056 12.2735 15.1259 12.1487 15.0693C12.0378 15.0191 11.9213 14.9826 11.8017 14.9606C11.6669 14.9357 11.5271 14.9357 11.2477 14.9357H9.9C9.05992 14.9357 8.63988 14.9357 8.31901 14.7722C8.03677 14.6284 7.8073 14.3989 7.66349 14.1167C7.5 13.7958 7.5 13.3758 7.5 12.5357V10.65C7.5 9.80992 7.5 9.38988 7.66349 9.06901C7.8073 8.78677 8.03677 8.5573 8.31901 8.41349C8.63988 8.25 9.05992 8.25 9.9 8.25H14.1C14.9401 8.25 15.3601 8.25 15.681 8.41349C15.9632 8.5573 16.1927 8.78677 16.3365 9.06901C16.5 9.38988 16.5 9.80992 16.5 10.65V12.6857C16.5 13.3846 16.5 13.7341 16.3858 14.0097C16.2336 14.3773 15.9416 14.6693 15.574 14.8215C15.2984 14.9357 14.9489 14.9357 14.25 14.9357V16.5Z"
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

State.init({
  isAdmin: false,
  isAdminIsFetched: false,
});

if (!state.isAdminIsFetched) {
  if (!context.accountId) {
    State.update({ isAdmin: false, isAdminIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_investor_admin",
      { investor_id: accountId, account_id: context.accountId },
      "final",
      false
    ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
  }
}

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Investor.HeaderDetails`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
      </HeaderDetails>
      <HeaderProgress>
        <Widget
          src={`${ownerId}/widget/Investor.Progress`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
      </HeaderProgress>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/Investor.About`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Investor.Sidebar`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
