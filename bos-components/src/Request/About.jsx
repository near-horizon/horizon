const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const accountId = props.accountId;
const cid = props.cid;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

State.init({
  request: null,
  requestIsFetched: false,
});

const getDate = (timestamp) => {
  const timestampString = `${timestamp}`;
  return new Date(
    Number(timestampString.substring(0, 13)),
  ).toLocaleDateString();
};

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
  asyncFetch(`${apiUrl}/transactions/all`).then(({ body: txs }) => {
    const tx = txs.find((tx) => {
      const start = "EVENT_JSON:";
      const logData = JSON.parse(tx.log.substring(start.length)).data;
      return (
        logData.cid === cid &&
        tx.method_name === "add_request" &&
        tx.args.request.project_id === accountId
      );
    });
    State.update({
      created_at: tx.timestamp,
    });
  });
}

if (!state.requestIsFetched) {
  return <>Loading...</>;
}

const Label = styled.label`
  color: var(--ui-elements-dark, #11181c);
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.375em;
  width: 33%;
`;

const Details = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MarkdownText = styled.div`
  font-size: 0.9em;
  line-height: 1.25em;

  p {
    color: #101828;
    font-weight: 400;
    margin-bottom: 1em;
  }
`;

const details = [
  {
    label: "Request Type",
    value: state.request.request_type,
  },
  {
    label: "Payment Type",
    value: state.request.payment_type,
  },
  {
    label: "Payment Source",
    value: state.request.source,
  },
  {
    label: "Budget",
    value: state.request.budget,
  },
  {
    label: "Deadline",
    value: getDate(state.request.deadline),
  },
  {
    label: "Created at",
    value: getDate(state.created_at),
  },
];

return (
  <Container>
    <Details>
      {details.map(({ label, value }) => (
        <Detail key={label}>
          <Label>{label}</Label>
          <div>{value}</div>
        </Detail>
      ))}
    </Details>
    <MarkdownText>
      <Markdown text={state.request.description} />
    </MarkdownText>
  </Container>
);
