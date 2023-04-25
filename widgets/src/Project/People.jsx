const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  founders: null,
  foundersIsFetched: false,
  team: null,
  teamIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.teamIsFetched) {
  Near.asyncView(
    ownerId,
    "get_team",
    { account_id: accountId },
    "final",
    false
  ).then((team) => State.update({ team, teamIsFetched: true }));
}

if (!state.foundersIsFetched || !state.teamIsFetched) {
  return <>Loading...</>;
}

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: [...state.founders, ...state.team].map(
        (key) => `${key}/profile/name`
      ),
    },
    "final",
    false
  ).then((names) => {
    State.update({
      names: new Map(
        Object.keys(names).map((account) => [
          account,
          names[account].profile.name,
        ])
      ),
      namesIsFetched: true,
    });
  });
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5em 0px;
  border-bottom: 1px solid #eaecf0;
`;

const Heading = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  margin-top: 1em;

  color: #000000;
`;

const Container = styled.div`
  width: 100%;
`;

return (
  <Container>
    <Heading>Founders</Heading>
    <List>
      {state.founders.map((founder) => (
        <Item>
          <Widget
            src={`${ownerId}/widget/Vendor.Icon`}
            props={{ accountId: founder, size: "2em" }}
          />
          <Widget
            src={`${ownerId}/widget/NameAndAccount`}
            props={{
              accountId: founder,
              name: state.names.get(founder),
              nameSize: ".9em",
            }}
          />
        </Item>
      ))}
    </List>
    <Heading>Team</Heading>
    <List>
      {state.team.map((member) => (
        <Item>
          <Widget
            src={`${ownerId}/widget/Vendor.Icon`}
            props={{ accountId: member, size: "2em" }}
          />
          <Widget
            src={`${ownerId}/widget/NameAndAccount`}
            props={{
              accountId: member,
              name: state.names.get(member),
              nameSize: ".9em",
            }}
          />
        </Item>
      ))}
    </List>
  </Container>
);
