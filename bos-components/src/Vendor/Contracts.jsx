const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  map: {},
  mapIsFetched: false,
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  const mapEntries = Object.entries(state.map);

  if (state.mapIsFetched && mapEntries.every(([_, { fetched }]) => fetched)) {
    const items = mapEntries.reduce((acc, [projectId, { history }]) => {
      acc.push(...history.map((cid) => [[projectId, cid], props.accountId]));

      return acc;
    }, []);

    State.update({ items, itemsIsFetched: true });
  } else if (!state.mapIsFetched) {
    Near.asyncView(
      ownerId,
      "get_vendor_contributions",
      { account_id: props.accountId },
      "final",
      false,
    ).then((items) => {
      const map = {};
      for (const [project_id, _] of items) {
        map[project_id] = { fetched: false, history: [] };
      }
      State.update({ map });
      items.forEach(([project_id, vendor_id]) => {
        Near.asyncView(
          ownerId,
          "get_contribution_history",
          { project_id, vendor_id },
          "final",
          false,
        ).then((history) => {
          state.map[project_id].history = history;
          state.map[project_id].fetched = true;
          State.update({ map: state.map });
        });
      });
      State.update({ map, mapIsFetched: true });
    });

    return <>Loading...</>;
  } else {
    return <>Loading...</>;
  }
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
      <>No contracts</>
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
