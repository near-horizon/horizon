const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(
  `https://api-op3o.onrender.com/data/vendors?sort=timedesc&&q=${search}`
).then(({ body: items }) => State.update({ items, itemsIsFetched: true }));

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return <>List of unverified backers coming soon...</>;
