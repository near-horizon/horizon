const ownerId = "nearhorizon.near";
const account_id = props.accountId;
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id },
    "final",
    false,
  ).then((items) => State.update({ items, itemsIsFetched: true }));

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
      full: true,
    }}
  />
);
