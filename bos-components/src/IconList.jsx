const ownerId = "nearhorizon.near";
const ids = props.ids ?? [];
const onlyOne = !props.iconOnly && ids.length === 1;
const justify = props.justify ?? "flex-start";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${justify};
  gap: 0.25em;
  width: 100%;
`;

const Item = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125em;

  @media screen and (max-width: 900px) {
    & > div:last-child {
      display: none;
    }
  }
`;

State.init({
  names: null,
  namesIsFetched: false,
});

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: ids.map((id) => `${id}/profile/name`) },
    "final",
    false,
  ).then((data) =>
    State.update({
      names: ids.reduce(
        (acc, id) => ({ ...acc, [id]: data[id].profile.name }),
        {},
      ),
      namesIsFetched: true,
    }),
  );
}

const createItem = (accountId) => (
  <Item
    key={accountId}
    href={`/near/widget/ProfilePage?accountId=${accountId}`}
  >
    <Widget src={`${ownerId}/widget/Vendor.Icon`} props={{ accountId }} />
    {onlyOne ? (
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId,
          name: state.names[accountId],
          nameSize: ".75em",
          accountSize: ".75em",
        }}
      />
    ) : (
      <></>
    )}
  </Item>
);

return <Container>{ids.map(createItem)}</Container>;
