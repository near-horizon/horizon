const ownerId = "nearhorizon.near";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > h2 {
      color: #000;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > small {
      color: var(--ui-elements-gray, #7e868c);
      font-family: Inter;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
      letter-spacing: 0.00875rem;
    }
  }
`;

return (
  <Container>
    <Header>
      <div>
        <h2>Growth Programs</h2>
      </div>
    </Header>
    <p></p>
    <Widget src={`${ownerId}/widget/Application.List`} />
  </Container>
);
