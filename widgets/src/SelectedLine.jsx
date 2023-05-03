const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const label = props.label ?? "Project";
const isProject = props.isProject ?? false;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1em;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 1.5em;
  background: #fafafa;
  border-radius: 8px;
`;

return (
  <Container>
    <Label>{label}</Label>
    <Card>
      <Widget
        src={`${ownerId}/widget/${isProject ? "Project" : "Vendor"}.Line`}
        props={{ accountId, tall: true }}
      />
    </Card>
  </Container>
);
