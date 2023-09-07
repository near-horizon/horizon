const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor_completed_contributions",
    { account_id: props.accountId },
    "final",
    false,
  ).then((items) => State.update({ items, itemsIsFetched: true }));

  return <>Loading...</>;
}

const Container = styled.div`
  width: 100%;

  .cont {
    width: 100% !important;
  }
`;

return (
  <Container>
    {state.items.length === 0 ? (
      <>No history</>
    ) : (
      <Widget
        src={`${ownerId}/widget/List`}
        props={{
          full: true,
          filter: ([[projectId]]) => projectId.includes(search),
          search,
          items: state.items,
          createItem: ([[projectId, cid], vendorId]) => (
            <Widget
              src={`${ownerId}/widget/Contribution.Card`}
              props={{ projectId, cid, vendorId, isVendorView: true }}
            />
          ),
        }}
      />
    )}
  </Container>
);
