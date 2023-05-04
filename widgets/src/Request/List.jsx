const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(ownerId, "get_requests", {}, "final", false).then((items) =>
    State.update({ items, itemsIsFetched: true })
  );

  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: ([accountId]) => accountId.includes(search),
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
