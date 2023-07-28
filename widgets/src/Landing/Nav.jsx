const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  margin-top: -3rem;

  & > div {
    height: 100%;
    min-width: 15rem;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
`;

return (
  <Container>
    <div>
      <Widget src={`${ownerId}/widget/Logo`} />
    </div>
    <Links>
      <Link href={`/${ownerId}/widget/Index`}>Explore Horizon</Link>
      <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
    </Links>
  </Container>
);
