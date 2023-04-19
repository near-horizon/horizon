const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

State.init({
  request: null,
  requestIsFetched: false,
  proposals: null,
  proposalsIsFetched: false,
  name: null,
  nameIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.proposalsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request_proposals",
    { account_id: accountId, cid },
    "final",
    false
  ).then((proposals) => State.update({ proposals, proposalsIsFetched: true }));
}

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/name`] },
    "final",
    false
  ).then((data) =>
    State.update({ name: data[accountId].profile.name, nameIsFetched: true })
  );
}

const Owner = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  width: 25%;
`;

const Title = styled.a`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
  width: 45%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const Name = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 35%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

return (
  <Container>
    <Owner
      href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
    >
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: props.accountId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: props.accountId,
          name: state.name,
          nameSize: "1.125em",
        }}
      />
    </Owner>
    <Title
      href={`/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`}
    >
      {state.request.title}
    </Title>
    <Other>{new Date().toLocaleDateString()}</Other>
    <Other>{state.proposals.length}</Other>
    <Other>
      <Widget
        src={`${ownerId}/widget/ActiveIndicator`}
        props={{ active: state.request.open }}
      />
    </Other>
  </Container>
);
