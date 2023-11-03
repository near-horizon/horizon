const ownerId = "nearhorizon.near";

const Container = styled.div`
  max-width: 94rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 6rem;
  padding: 2rem 2rem 0 2rem;

  & > div {
    width: 100%;
  }
`;

return (
  <>
    <Container>
      <Widget src={`${ownerId}/widget/Landing.Nav`} />
      <Widget src={`${ownerId}/widget/HZN.Hero`} />
      <Widget src={`${ownerId}/widget/HZN.What`} />
      <Widget src={`${ownerId}/widget/HZN.Benefits`} />
      <Widget src={`${ownerId}/widget/HZN.Who`} />
      <Widget src={`${ownerId}/widget/HZN.Testamonial`} />
      <Widget src={`${ownerId}/widget/HZN.Journey`} />
      <Widget src={`${ownerId}/widget/HZN.Structure`} />
      <Widget src={`${ownerId}/widget/HZN.Comprehensive`} />
      <Widget src={`${ownerId}/widget/HZN.Join`} />
      <Widget src={`${ownerId}/widget/HZN.FAQ`} />
      <Widget src={`${ownerId}/widget/HZN.Ask`} />
    </Container>
    <Widget src={`${ownerId}/widget/Landing.Footer`} />
  </>
);
