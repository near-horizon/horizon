const ownerId = "nearhorizon.near";

State.init({
  following: [],
  followingIsFetched: false,
  value: (props.accountIds ?? "").split(",").map((name) => ({ name })),
  accountsWithPermissions: [],
  accountsWithPermissionsIsFetched: false,
});

if (!context.accountId) {
  return <>Please sign in to continue</>;
}

if (!state.followingIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${context.accountId}/graph/follow/*`] },
    "final",
    false,
  ).then((data) => {
    const following = (
      Object.keys(data).length > 0
        ? Object.keys(data[context.accountId]?.graph?.follow ?? {})
        : []
    ).map((name) => ({ name }));
    State.update({
      following,
      followingIsFetched: true,
    });
  });
}

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false,
  ).then((data) =>
    State.update({
      accountsWithPermissions: data
        .map(([info]) => info)
        .filter((info) => "AccountId" in info)
        .map(({ AccountId }) => AccountId),
      accountsWithPermissionsIsFetched: true,
    }),
  );
}

// if (!state.followingIsFetched || !state.accountsWithPermissionsIsFetched) {
//   return <>Loading...</>;
// }

const Accounts = styled.ul`
  font-style: normal;
  font-weight: 600;
  font-size: 1.125em;
  line-height: 1em;
  color: #344054;
`;

const Existing = styled.div`
  padding: 1.5em 0;

  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 1.5em;
    color: #344054;
  }
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

const grantPermissions = () => {
  const accounts = state.value.map(({ name }) => name);

  if (
    !accounts.includes(context.accountId) &&
    !state.accountsWithPermissions.includes(context.accountId)
  ) {
    accounts.push(context.accountId);
  }

  const transactions = accounts.map((accountId) => ({
    contractName: "social.near",
    methodName: "grant_write_permission",
    args: { predecessor_id: accountId, keys: [context.accountId] },
    deposit: "1",
  }));

  Near.call(transactions);
};

return (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.MultiSelect`}
      props={{
        label: "Accounts to add permissions to",
        placeholder: "Add accounts",
        options: state.following,
        value: state.value,
        onChange: (value) => State.update({ value }),
      }}
    />

    <SaveButton onClick={grantPermissions}>Grant permissions</SaveButton>

    <Existing>
      <h3>Existing permissions</h3>
      <Accounts>
        {state.accountsWithPermissions.map((accountId) => (
          <li key={accountId}>{accountId}</li>
        ))}
      </Accounts>
    </Existing>
  </>
);
