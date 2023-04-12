const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;

const availableContent = ["overview", "contracts", "history"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

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

const personPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5.25L14.25 7.5M14.25 7.5L16.5 5.25M14.25 7.5V3M12 15.75V14.85C12 13.5899 12 12.9598 11.7548 12.4785C11.539 12.0552 11.1948 11.711 10.7715 11.4952C10.2902 11.25 9.66012 11.25 8.4 11.25H5.1C3.83988 11.25 3.20982 11.25 2.72852 11.4952C2.30516 11.711 1.96095 12.0552 1.74524 12.4785C1.5 12.9598 1.5 13.5899 1.5 14.85V15.75M9.375 5.625C9.375 7.07475 8.19975 8.25 6.75 8.25C5.30025 8.25 4.125 7.07475 4.125 5.625C4.125 4.17525 5.30025 3 6.75 3C8.19975 3 9.375 4.17525 9.375 5.625Z"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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

const content = {
  overview: (
    <Widget
      src={`${ownerId}/widget/Vendor.About`}
      props={{
        onSave: (s) => {
          console.log(s);
        },
        accountId,
      }}
    />
  ),
  contracts: (
    <Widget src={`${ownerId}/widget/Vendor.Contracts`} props={{ accountId }} />
  ),
  history: (
    <Widget src={`${ownerId}/widget/Vendor.History`} props={{ accountId }} />
  ),
}[getContent(props.content)];

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Vendor.HeaderDetails`}
          props={{ accountId: props.accountId }}
        />
        <CTARow>
          <Widget src={`${ownerId}/widget/Vendor.RequestSideWindow`} />
          <Widget
            src={`${ownerId}/widget/Buttons.Grey`}
            props={{
              onClick: () => {
                console.log("clicked");
              },
              text: <>{chat}Contact</>,
            }}
          />
        </CTARow>
      </HeaderDetails>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/TabSelector`}
          props={{
            tab: "vendor",
            content: getContent(props.content),
            search: props.search,
            update: props.update,
            accountId,
            buttons: [
              {
                id: "overview",
                text: "Overview",
              },
              {
                id: "contracts",
                text: "Contracts",
              },
              {
                id: "history",
                text: "Work history",
              },
            ],
          }}
        />
        {content}
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Vendor.Sidebar`}
          props={{
            accountId: "contribut3.near",
            onSave: (s) => {
              console.log(s);
            },
          }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
