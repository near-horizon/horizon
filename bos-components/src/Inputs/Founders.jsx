const ownerId = "nearhorizon.near";
const founders = props.founders ?? [];
const update = props.update ?? (() => {});
const onSave = props.onSave ?? (() => {});

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
  width: 85%;
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

State.init({
  founders: [],
  following: [],
  followingIsFetched: false,
  followers: [],
  followersIsFetched: false,
});

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

if (!state.followersIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`*/graph/follow/${context.accountId}`] },
    "final",
    false,
  ).then((data) => {
    const followers = Object.keys(data ?? {}).map((name) => ({ name }));
    State.update({
      followers,
      followersIsFetched: true,
    });
  });
}

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
  margin-top: 1em;
`;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Inputs.MultiSelect`}
      props={{
        label: "Add founders",
        placeholder: "Start typing",
        options: [...state.followers, ...state.following].filter(
          ({ name }) => !founders.includes(name),
        ),
        value: state.founders,
        onChange: (founders) => {
          State.update({ founders });
          update(
            Array.from(
              new Set([...props.founders, ...founders.map(({ name }) => name)]),
            ),
          );
        },
      }}
    />
    <Header>
      <Name>User</Name>
      <Other />
    </Header>
    {founders.map((accountId) => (
      <div key={accountId}>
        <Widget
          src={`${ownerId}/widget/Inputs.Founder`}
          props={{
            accountId,
            onRemove: () =>
              update(props.founders.filter((id) => id !== accountId)),
          }}
        />
      </div>
    ))}
    <SaveButton onClick={() => onSave(founders)}>Save changes</SaveButton>
  </Container>
);
