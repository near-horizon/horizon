const ownerId = "nearhorizon.near";

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5em;

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1.3em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

return (
  <Container>
    <Header>
      <Heading>
        <h1>Apply to Web3 partner programs</h1>
        <h2>
          Apply to attend an accelerator cohort where you will receive quality,
          professional Web3 business guidance
        </h2>
      </Heading>
    </Header>
    <Widget src={`${ownerId}/widget/Application.List`} />
  </Container>
);
