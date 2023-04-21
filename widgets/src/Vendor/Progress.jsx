const ownerId = "contribut3.near";
const creditsAccount = `credits.${ownerId}`;
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
  earned: 0,
  earnedIsFetched: false,
  active: false,
  activeIsFetched: false,
});

if (!state.earnedIsFetched) {
  Near.asyncView(
    creditsAccount,
    "ft_balance_of",
    { account_id: accountId },
    "final",
    false
  ).then((earned) =>
    State.update({
      earned: Number(earned) / 1000,
      earnedIsFetched: true,
    })
  );
}

if (!state.activeIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/active`] },
    "final",
    false
  ).then((active) =>
    State.update({
      active: active[accountId].profile.active,
      activeIsFetched: true,
    })
  );
}

if (!state.activeIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Row>
      <Label>Earned:</Label>
      <Value>
        {state.earned} NHZN{" "}
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{ content: "Test use case" }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Status:</Label>
      <Value>
        <Widget
          src={`${ownerId}/widget/Inputs.Viewable.Toggle`}
          props={{
            id: "active",
            value: state.active === "true",
            onSave: (active) =>
              Near.call("social.near", "set", {
                data: { [accountId]: { profile: { active: "" + active } } },
              }),
            canEdit: props.isAdmin,
          }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>60%</Value>
    </Row>
  </Container>
);
