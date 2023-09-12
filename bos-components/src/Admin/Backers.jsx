const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(`${apiUrl}/data/vendors?sort=timedesc&&q=${search}`).then(
  ({ body: items }) => State.update({ items, itemsIsFetched: true }),
);

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return <>List of unverified backers coming soon...</>;
