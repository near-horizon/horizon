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
    false,
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
            tx.args.account_id === context.accountId,
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
    },
  );
}

if (!state.projectIsFetched || !state.transactionsIsFetched) {
  return <>Loading...</>;
}

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
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

  & > div:nth-child(1),
  & > div:nth-child(3) {
    display: flex;
    height: 2.75rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    align-self: stretch;
  }

  & > div:nth-child(3n + 4) {
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

  & > div:nth-child(3n + 5) {
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

  & > div:nth-child(3n + 6) {
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

const achievements = state.transactions
  .reduce(
    ([seenSet, list], current) => {
      if (
        seenSet.has(current.args.incentive) &&
        state.incentiveDetails[current.args.incentive][0] === "Once"
      ) {
        return [seenSet, list];
      }

      return [seenSet.add(current.args.incentive), list.concat(current)];
    },
    [new Set(), []],
  )[1]
  .map((tx) => (
    <>
      <div>
        {new Date(Number(`${tx.timestamp}`.substring(0, 13)))
          .toLocaleDateString("en-GB")
          .replace(/\//g, ".")}
      </div>
      <div>{tx.args.incentive}</div>
      <div>+{state.incentiveDetails[tx.args.incentive][1]} NHZN</div>
    </>
  ));

return achievements.length > 0 ? (
  <List>
    <div>Date</div>
    <div>Achievement</div>
    <div>Reward</div>
    {achievements}
  </List>
) : (
  <>
    <List>
      <div>Date</div>
      <div>Achievement</div>
      <div>Reward</div>
    </List>
    <p>No achievements yet</p>
  </>
);
