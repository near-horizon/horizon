const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

return (
  <Container>
    {props.badges.map(({ value, color, border }) => (
      <Widget
        src={`${ownerId}/widget/Badge`}
        props={{ value, color, border }}
      />
    ))}
  </Container>
);
