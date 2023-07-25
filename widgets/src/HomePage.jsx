const ownerId = "nearhorizon.near";

const Container = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  margin-bottom: 6rem;
  padding-top: 2rem;

  & > div {
    width: 100%;
  }
`;

return (
  <>
    <Container>
      <Widget src={`${ownerId}/widget/Banner.AwesomeNEAR`} />
      <Widget src={`${ownerId}/widget/Landing.Nav`} />
      <Widget src={`${ownerId}/widget/Landing.Hero`} />
      <Widget src={`${ownerId}/widget/Landing.Support`} />
      <Widget src={`${ownerId}/widget/Landing.About`} />
      <Widget src={`${ownerId}/widget/Landing.Links`} />
      <Widget src={`${ownerId}/widget/Landing.Build`} />
      <Widget src={`${ownerId}/widget/Landing.Connect`} />
      <Widget src={`${ownerId}/widget/Landing.Grow`} />
      <Widget src={`${ownerId}/widget/Landing.Testamonial`} />
      <Widget src={`${ownerId}/widget/Landing.Contributors`} />
      <Widget src={`${ownerId}/widget/Landing.Backers`} />
      <Widget src={`${ownerId}/widget/Landing.Partners`} />
    </Container>
    <Widget src={`${ownerId}/widget/Landing.Footer`} />
  </>
);
