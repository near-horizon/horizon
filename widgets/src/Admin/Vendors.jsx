const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(
  `https://api-op3o.onrender.com/data/vendors?sort=timedesc&verified=false&q=${search}`
).then(({ body: items }) => State.update({ items, itemsIsFetched: true }));

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: (accountId) => state.items.includes(accountId),
      items: state.items,
      full: true,
      createItem: (accountId) => (
        <Widget
          src={`${ownerId}/widget/Vendor.Card`}
          props={{ accountId, large: true }}
        />
      ),
    }}
  />
);
