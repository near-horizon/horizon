const ownerId = "nearhorizon.near";
const exploreLink = "https://app.hzn.xyz/";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  margin-top: -3rem;

  & > div:first-child {
    height: 100%;
    min-width: 15rem;
    transform: translateY(-0.5rem);
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    & > a:first-child {
      display: none;
    }
  }
`;

const Explore = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
  }
`;

return (
  <Container>
    <div>
      <Widget src={`${ownerId}/widget/Logo`} />
    </div>
    <Links>
      <a href={`${exploreLink}?utm=near.org`}>Explore Horizon</a>
      <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
    </Links>
    <Explore>
      <a href={`${exploreLink}?utm=near.org`}>Explore Horizon</a>
    </Explore>
  </Container>
);
