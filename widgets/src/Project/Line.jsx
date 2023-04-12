const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const size = props.size ?? "1em";

console.log("Render happening with: ", accountId, size);

State.init({
  name: "",
  nameIsFetched: false,
});

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/name`] },
    "final",
    false,
  ).then((name) => State.update({ name: name[accountId].profile.name, nameIsFetched: true }));
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: .75em;
  line-height: 1em;
  color: #7e868c;
`;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Project.Icon`}
      props={{ accountId, size }}
    />
    <Name>{state.name}</Name>
    <AccountId>@{accountId}</AccountId>
  </Container>
);
