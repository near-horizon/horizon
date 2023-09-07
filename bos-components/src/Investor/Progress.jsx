const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #d9f4ff;
  border-radius: 8px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  width: 100%;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
  width: 35%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 0.75em;
  line-height: 1.4em;
  color: #11181c;
  width: 65%;
`;

State.init({
  invested: 0,
  projects: 0,
  fetched: false,
});

if (!state.fetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((active) =>
    State.update({
      invested: active[accountId].profile.invested,
      projects: active[accountId].profile.projects,
      fetched: true,
    }),
  );
}

if (!state.fetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Row>
      <Label>Invested:</Label>
      <Value>
        <Widget
          src={`${ownerId}/widget/Inputs.Viewable.Number`}
          props={{
            id: "invested",
            value: state.invested,
            noLabel: true,
            onSave: (invested) =>
              Near.call("social.near", "set", {
                data: { [accountId]: { profile: { invested } } },
              }),
            canEdit: props.isAdmin,
            isUSD: true,
          }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Projects:</Label>
      <Value>
        <Widget
          src={`${ownerId}/widget/Inputs.Viewable.Number`}
          props={{
            id: "projects",
            value: state.projects,
            noLabel: true,
            onSave: (projects) =>
              Near.call("social.near", "set", {
                data: { [accountId]: { profile: { projects } } },
              }),
            canEdit: props.isAdmin,
          }}
        />
      </Value>
    </Row>
  </Container>
);
