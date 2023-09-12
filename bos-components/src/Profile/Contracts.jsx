const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

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
  contracts: [],
  contractsIsFetched: false,
});

if (!state.contractsIsFetched) {
  asyncFetch(`${apiUrl}/transactions/all`).then(({ body: txs }) => {
    Near.asyncView(
      ownerId,
      "get_project_contributions",
      { account_id: context.accountId },
      "final",
      false,
    ).then((contracts) => {
      txs = txs.filter(
        ({ method_name, args }) =>
          method_name === "add_contribution" &&
          args.project_id === context.accountId,
      );

      const contractsWithTxs = contracts.map(([_, vendor_id]) => {
        const txsForContribution = txs.filter(
          ({ args }) => args.vendor_id === vendor_id,
        );

        return [context.accountId, vendor_id, txsForContribution];
      });

      State.update({
        contracts: contractsWithTxs,
        contractsIsFetched: true,
      });
    });
  });
}

return (
  <Centered>
    {!state.contractsIsFetched ? (
      "Loading..."
    ) : state.contracts.length === 0 ? (
      <>
        <h5>You don't have any contracts yet</h5>
        <p>
          Contracts are the way to track ongoing work agreements with
          contractors that you hired
        </p>
      </>
    ) : (
      state.contracts.map((contract) => contract.toString())
    )}
  </Centered>
);
