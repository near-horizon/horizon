const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(`${apiUrl}/data/requests?sort=timedesc&q=${search}`).then(
  ({ body: items }) => State.update({ items, itemsIsFetched: true }),
);

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: ([accountId, cid]) =>
        state.items.some(([id, c]) => id === accountId && c === cid),
      items: state.items,
      createItem: ([accountId, cid]) => (
        <Widget
          src={`${ownerId}/widget/Request.Card`}
          props={{ accountId, cid }}
        />
      ),
    }}
  />
);
