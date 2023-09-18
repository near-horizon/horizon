const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

const CreditAward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  background: var(--base-white, #fff);
  width: 100%;

  & > small {
    color: var(--ui-elements-gray, #7e868c);
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.0075rem;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & > span {
      overflow: hidden;
      color: var(--ui-elements-black, #000);
      text-overflow: ellipsis;
      whitespace: nowrap;
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    & > b {
      overflow: hidden;
      color: var(--primary-primary-pressed, #04a46e);
      text-align: right;
      text-overflow: ellipsis;
      font-family: "Mona Sans";
      font-size: 0.8125rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--text-text-primary, #101828);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;

  &.green {
    border-radius: 3.125rem;
    border: 1px solid var(--primary-primary-default, #00ec97);
    background: var(--primary-primary-default, #00ec97);
  }
`;

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
    <CreditAward key={tx.hash}>
      <small>
        {new Date(Number(`${tx.timestamp}`.substring(0, 13)))
          .toLocaleDateString("en-GB")
          .replace(/\//g, ".")}
      </small>
      <div>
        <span>{tx.args.incentive}</span>
        <b>+{state.incentiveDetails[tx.args.incentive][1]} NHZN</b>
      </div>
    </CreditAward>
  ));

return (
  <>
    <List>
      {achievements.length > 0 ? achievements : <p>No achievements yet</p>}
    </List>
    <Button>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 3.75C9.75 4.57843 7.90317 5.25 5.625 5.25C3.34683 5.25 1.5 4.57843 1.5 3.75M9.75 3.75C9.75 2.92157 7.90317 2.25 5.625 2.25C3.34683 2.25 1.5 2.92157 1.5 3.75M9.75 3.75V4.875M1.5 3.75V12.75C1.5 13.5784 3.34683 14.25 5.625 14.25M5.625 8.25C5.49859 8.25 5.37351 8.24793 5.25 8.24388C3.14756 8.17499 1.5 7.53246 1.5 6.75M5.625 11.25C3.34683 11.25 1.5 10.5784 1.5 9.75M16.5 8.625C16.5 9.45343 14.6532 10.125 12.375 10.125C10.0968 10.125 8.25 9.45343 8.25 8.625M16.5 8.625C16.5 7.79657 14.6532 7.125 12.375 7.125C10.0968 7.125 8.25 7.79657 8.25 8.625M16.5 8.625V14.25C16.5 15.0784 14.6532 15.75 12.375 15.75C10.0968 15.75 8.25 15.0784 8.25 14.25V8.625M16.5 11.4375C16.5 12.2659 14.6532 12.9375 12.375 12.9375C10.0968 12.9375 8.25 12.2659 8.25 11.4375"
          stroke="currentColor"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      How credits work?
    </Button>
  </>
);
