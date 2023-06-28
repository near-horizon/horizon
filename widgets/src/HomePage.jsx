const ownerId = "nearhorizon.near";
const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

const Container = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  & > div {
    width: 100%;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem 6.875rem 3.0625rem 6.875rem;
  justify-content: center;
  gap: 1.5rem;
  background: var(--background-beige, #f2f1ea);
`;

return (
  <>
    <Container>
      <Widget src={`${ownerId}/widget/Landing.Hero`} />
      <Widget src={`${ownerId}/widget/Landing.Support`} />
      <Widget src={`${ownerId}/widget/Landing.About`} />
      <Widget src={`${ownerId}/widget/Landing.Build`} />
      <Widget src={`${ownerId}/widget/Landing.Connect`} />
      <Widget src={`${ownerId}/widget/Landing.Grow`} />
      <Widget src={`${ownerId}/widget/Landing.Links`} />
      <Widget src={`${ownerId}/widget/Landing.Testamonial`} />
      <Widget src={`${ownerId}/widget/Landing.Contributors`} />
      <Widget src={`${ownerId}/widget/Landing.Backers`} />
      <Widget src={`${ownerId}/widget/Landing.Partners`} />
    </Container>
    <Footer></Footer>
  </>
);
