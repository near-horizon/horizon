const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  if (!context.accountId) {
    State.update({ items: [], itemsIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "get_admin_contributions",
      { account_id: context.accountId },
      "final",
      false,
    ).then((items) => {
      asyncFetch(`${apiUrl}/transactions/all`).then(({ body: txs }) => {
        const timestamps = new Map();
        txs.forEach((tx) => {
          if (tx.method_name !== "add_contribution") {
            return;
          }

          const id = [tx.args.project_id, tx.args.cid, tx.args.vendor_id];

          if (
            items.find(
              ([pId, c, vId]) => pId === id[0] && c === id[1] && vId === id[2],
            )
          ) {
            timestamps.set(`${id}`, tx.timestamp);
          }
        });

        items.sort((a, b) => timestamps.get(`${b}`) - timestamps.get(`${a}`));

        State.update({ items, itemsIsFetched: true });
      });
    });

    return <>Loading...</>;
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.625rem;
  align-self: stretch;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  & > h1 {
    color: #000;
    font-family: "FK Grotesk";
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem; /* 144% */
  }
`;

return (
  <Container>
    <Header>
      <h1>Your contracts</h1>
    </Header>
    <Widget
      src={`${ownerId}/widget/List`}
      props={{
        full: true,
        separator: true,
        filter: ([[projectId], vendorId]) =>
          projectId.includes(search) || vendorId.includes(search),
        items: state.items,
        createItem: ([[projectId, cid], vendorId]) => (
          <Widget
            src={`${ownerId}/widget/Contribution.AdminCard`}
            props={{ projectId, cid, vendorId }}
          />
        ),
      }}
    />
  </Container>
);
