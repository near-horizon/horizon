const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
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
  showCredits: false,
  showCreditsIsFetched: false,
  earned: 0,
  earnedIsFetched: false,
  active: false,
  activeIsFetched: false,
  completion: 0,
});

if (!state.showCreditsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor",
    { account_id: accountId },
    "final",
    false,
  ).then(({ credits: showCredits }) =>
    State.update({ showCredits, showCreditsIsFetched: true }),
  );
}

if (state.showCredits && !state.earnedIsFetched) {
  asyncFetch(`${apiUrl}/data/credits/vendors/${accountId}/balance`).then(
    ({ body: earned }) => State.update({ earned, earnedIsFetched: true }),
  );
}

if (!state.activeIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/active`] },
    "final",
    false,
  ).then((active) =>
    State.update({
      active: active[accountId].profile.active,
      activeIsFetched: true,
    }),
  );
}

asyncFetch(`${apiUrl}/data/vendors/completion`).then(({ body: { list } }) =>
  State.update({
    completion: list
      .find(({ id }) => id === props.accountId)
      .completion.toLocaleString("en-US", { style: "percent" }),
  }),
);

if (!state.activeIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    {state.showCredits ? (
      <Row>
        <Label>Earned:</Label>
        <Value>
          {Number(state.earned).toLocaleString("en-US", {
            notation: "compact",
          })}{" "}
          NHZN{" "}
          <Widget
            src={`${ownerId}/widget/Tooltip`}
            props={{ content: "Test use case" }}
          />
        </Value>
      </Row>
    ) : (
      <></>
    )}
    <Row>
      <Label>Status:</Label>
      <Value>
        <Widget
          src={`${ownerId}/widget/Inputs.Viewable.Toggle`}
          props={{
            id: "active",
            value: state.active === "true",
            onSave: (active) =>
              Social.set(
                { profile: { active: `${active}` } },
                { onCommit: () => State.update({ active }) },
              ),
            canEdit: props.isAdmin,
          }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>{state.completion}</Value>
    </Row>
  </Container>
);
