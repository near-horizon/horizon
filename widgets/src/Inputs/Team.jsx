const ownerId = "nearhorizon.near";
const search = props.search ?? "";
const team = props.team ?? [];

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75em 0.95em;
  gap: 0.75em;
  width: 100%;
  background: #f9fafb;
  border-bottom: 1px solid #eaecf0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #475467;
`;

const Name = styled.div`
  width: 70%;
`;

const Other = styled.div`
  text-align: center;
  width: 15%;
`;

const Container = styled.div`
  .cont {
    width: 100% !important;
  }
`;

return (
  <Container>
    <Widget src={`${ownerId}/widget/Inputs.MultiSelect`} props={{}} />
    <Header>
      <Name>User</Name>
      <Other>Permissions</Other>
      <Other />
    </Header>
    {team.map(({ accountId, name }) => (
      <Widget
        src={`${ownerId}/widget/Inputs.TeamMember`}
        props={{
          accountId,
          name,
          onToggle: () => {},
          onRemove: () => {},
        }}
      />
    ))}
  </Container>
);
