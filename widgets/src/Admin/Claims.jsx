const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(
  `https://api-op3o.onrender.com/data/claims?sort=timedesc&q=${search}`
).then(({ body: items }) => State.update({ items, itemsIsFetched: true }));

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: ([projectId, accountId]) =>
        state.items.some(
          ([pId, aId]) => pId === projectId && aId === accountId
        ),
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
