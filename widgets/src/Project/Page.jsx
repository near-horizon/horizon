const ownerId = "contribut3.near";

const availableContent = [
  "overview",
  "requests",
  "people",
  "funding",
  "history",
  "graduation",
];

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

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Project.HeaderDetails`}
          props={{ accountId: ownerId }}
        />
      </HeaderDetails>
      <HeaderProgress>
        <Widget src={`${ownerId}/widget/Project.Progress`} props={{}} />
      </HeaderProgress>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/TabSelector`}
          props={{
            tab: "project",
            content: getContent(props.content),
            search: props.search,
            update: props.update,
            buttons: [
              {
                id: "overview",
                text: "Overview",
              },
              {
                id: "requests",
                text: "Requests",
              },
              {
                id: "people",
                text: "People",
              },
              {
                id: "funding",
                text: "Funding",
              },
              {
                id: "history",
                text: "Work history",
              },
              {
                id: "graduation",
                text: "Graduation",
              },
            ],
          }}
        />
        <Widget
          src={`${ownerId}/widget/Project.About`}
          props={{
            onSave: (s) => {
              console.log(s);
            },
          }}
        />
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Project.Sidebar`}
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
