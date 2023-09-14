const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

State.init({
  project: null,
  projectIsFetched: false,
  transactions: [],
  transactionsIsFetched: false,
  incentiveDetails: null,
  incentiveDetailsIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: context.accountId },
    "final",
    false
  ).then((project) => {
    State.update({ project, projectIsFetched: true });
  });
}

if (!state.transactionsIsFetched) {
  asyncFetch(`${apiUrl}/transactions/all`).then(({ body: transactions }) => {
    State.update({
      transactions: transactions
        .filter(
          (tx) =>
            tx.method_name === "add_incentive" &&
            tx.args.account_id === context.accountId
        )
        .sort((a, b) => Number(a.timestamp) - Number(b.timestamp)),
      transactionsIsFetched: true,
    });
  });
}

if (!state.incentiveDetailsIsFetched) {
  Near.asyncView(ownerId, "get_incentive_data", {}, "final", false).then(
    (incentiveDetails) => {
      State.update({ incentiveDetails, incentiveDetailsIsFetched: true });
    }
  );
}

if (!state.projectIsFetched || !state.transactionsIsFetched) {
  return <>Loading...</>;
}

const List = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  width: 100%;

  & > div:nth-child(-n + 3) {
    display: flex;
    height: 2.75rem;
    padding: 0.75rem 1.5rem;
    align-items: center;
    border-bottom: 1px solid var(--gray-200, #eaecf0);
    background: var(--gray-50, #f9fafb);
    color: var(--gray-600, #475467);
    font-family: "Mona Sans";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.0375rem; /* 138.333% */
  }

  & > div:nth-child(2),
  & > div:nth-child(3) {
    display: flex;
    height: 2.75rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    align-self: stretch;
  }

  & > div:nth-child(3n + 6) {
    display: flex;
    padding: 1.5rem;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border-bottom: 1px solid var(--gray-200, #eaecf0);
    color: var(--text-text-dark, #11181c);
    font-family: "Mona Sans";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.1rem; /* 146.667% */
  }

  & > div:nth-child(3n + 4) {
    display: flex;
    padding: 1rem 1.5rem;
    align-items: center;
    gap: 1rem;
    align-self: stretch;
    border-bottom: 1px solid var(--gray-200, #eaecf0);
    color: var(--gray-900, #101828);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > div:nth-child(3n + 5) {
    display: flex;
    padding: 1.5rem;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    border-bottom: 1px solid var(--gray-200, #eaecf0);
    color: var(--primary-primary-pressed, #04a46e);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }
`;

const LineThrough = styled.span`
  color: var(--ui-elements-gray, #7e868c);
  text-decoration-line: line-through;
`;

const LinkTo = styled.span`
  & > a {
    color: var(--text-text-link, #006adc);
    text-decoration-line: underline;
  }
`;

const incentives = Object.entries(state.incentiveDetails).map(
  ([name, [repetition, amount]]) => (
    <>
      <div>
        {name in state.project.achieved_incentives ? (
          <LineThrough>{name}</LineThrough>
        ) : (
          <LinkTo>
            <Link>{name}</Link>
          </LinkTo>
        )}
      </div>
      <div>+{amount} NHZN</div>
      <div>{repetition}</div>
    </>
  )
);

return (
  <List>
    <div>Achievement</div>
    <div>Reward</div>
    <div>Claiming term</div>
    {incentives}
  </List>
);
