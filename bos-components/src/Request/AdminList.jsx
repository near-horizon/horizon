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
      "get_admin_requests",
      { account_id: context.accountId },
      "final",
      false,
    ).then((items) => {
      asyncFetch(`${apiUrl}/transactions/all`).then(({ body: txs }) => {
        const timestamps = new Map();
        txs.forEach((tx) => {
          if (tx.method_name !== "add_request") {
            return;
          }

          const start = "EVENT_JSON:";
          const { cid } = JSON.parse(tx.log.substring(start.length)).data;
          const id = [tx.args.request.project_id, cid];

          if (items.find(([pId, c]) => pId === id[0] && c === id[1])) {
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

  & > a {
    display: flex;
    padding: 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3.125rem;
    background: var(--primary-primary-default, #00ec97);
    color: var(--text-text-dark, #11181c);
    text-align: center;
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
    letter-spacing: 0.00875rem;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
`;

return (
  <Container>
    <Header>
      <h1>Your requests</h1>
      <Link href={`/${ownerId}/widget/Index?tab=createrequest`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M9 3.75V14.25M3.75 9H14.25"
            stroke="currentColor"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Create a request
      </Link>
    </Header>
    <Widget
      src={`${ownerId}/widget/List`}
      props={{
        full: true,
        separator: true,
        filter: ([accountId]) => accountId.includes(search),
        items: state.items,
        createItem: ([accountId, cid]) => (
          <Widget
            src={`${ownerId}/widget/Request.AdminCard`}
            props={{ accountId, cid }}
          />
        ),
      }}
    />
  </Container>
);
