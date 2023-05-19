const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(ownerId, "get_claims", {}, "final", false).then((items) =>
    State.update({ items, itemsIsFetched: true })
  );

  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: ([projectId, accountId]) =>
        projectId.includes(search) || accountId.includes(search),
      items: state.items,
      full: true,
      createItem: ([projectId, accountId]) => (
        <Widget
          src={`${ownerId}/widget/Claim.Card`}
          props={{ accountId, projectId }}
        />
      ),
    }}
  />
);
