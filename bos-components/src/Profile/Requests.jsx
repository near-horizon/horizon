const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

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

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  width: 100%;

  & > h5 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 1.4rem */
  }

  & > p {
    color: var(--ui-elements-gray, #7e868c);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
  }
`;

State.init({
  requests: [],
  requestsIsFetched: false,
});

if (!state.requestsIsFetched) {
  asyncFetch(`${apiUrl}/transactions/all`).then(({ body: txs }) => {
    Near.asyncView(
      ownerId,
      "get_project_requests",
      { account_id: context.accountId },
      "final",
      false,
    ).then((requests) => {
      txs = txs.filter(
        ({ method_name, args }) =>
          method_name === "add_request" &&
          args.request.project_id === context.accountId,
      );

      const requestsWithTxs = requests.map(([project_id, cid]) => {
        const tx = txs.find((tx) => {
          const start = "EVENT_JSON:";
          const logData = JSON.parse(tx.log.substring(start.length)).data;

          return (
            logData.cid === cid &&
            tx.method_name === "add_request" &&
            tx.args.request.project_id === project_id
          );
        });

        return [project_id, cid, tx];
      });
      State.update({ requests: requestsWithTxs, requestsIsFetched: true });
    });
  });
}

return (
  <Centered>
    {!state.requestsIsFetched ? (
      "Loading..."
    ) : state.requests.length === 0 ? (
      <>
        <h5>You haven't created any requests yet</h5>
        <p>
          Requests are a way to express your project needs and find an expert to
          help you
        </p>
        <Button className="green">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 3.75V14.25M4.25 9H14.75"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Create a request
        </Button>
      </>
    ) : (
      state.requests.map((request) => request.toString())
    )}
  </Centered>
);
