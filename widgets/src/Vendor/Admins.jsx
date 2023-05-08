const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;

State.init({
  permissions: null,
  permissionsIsFetched: false,
});

if (!state.permissionsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor",
    { account_id: accountId },
    "final",
    false
  ).then(({ permissions }) =>
    State.update({ permissions, permissionsIsFetched: true })
  );
}

if (!state.permissionsIsFetched) {
  return <>Loading...</>;
}

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: Object.keys(state.permissions).map((key) => `${key}/profile/name`),
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

if (!state.namesIsFetched) {
  return <>Loading...</>;
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
    <Heading>Admins</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Admins`}
      props={{
        permissions: state.permissions,
        update: (permissions) => State.update({ permissions }),
        onSave: (permissions) =>
          Near.call(ownerId, "edit_vendor", {
            account_id: accountId,
            vendor: { permissions },
          }),
      }}
    />
  </Container>
);
