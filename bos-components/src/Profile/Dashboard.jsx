const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 1.61rem;
`;

const Credits = styled.b`
  display: flex;
  padding: 0.4375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--secondary-secondary-pressed, #7269e1);
  color: var(--ui-elements-white, #fff);
  leading-trim: both;
  text-edge: cap;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const createCard = ({ title, link, tooltipText, content }) => (
  <Widget
    src={`${ownerId}/widget/Profile.DashboardCard`}
    props={{ title, link, tooltipText, content }}
  />
);

/** @type {{ title: React.ReactNode; tooltipText: React.ReactNode; content: React.ReactNode; }} */
const cards = [
  {
    title: <h4>Profile progress</h4>,
    tooltipText: "Profile progress",
    content: <Widget src={`${ownerId}/widget/Profile.Checklist`} />,
  },
  {
    title: (
      <>
        <h4>Credit balance</h4>
        <Credits>{state.credits} NHZN</Credits>
      </>
    ),
    tooltipText: "Credit balance",
    content: <Widget src={`${ownerId}/widget/Profile.Credits`} />,
  },
  {
    title: <h4>Inbox</h4>,
    tooltipText: "Inbox",
    content: <Widget src={`${ownerId}/widget/Profile.Inbox`} />,
  },
  {
    title: <h4>Your requests</h4>,
    tooltipText: "Requests",
    content: <Widget src={`${ownerId}/widget/Profile.Requests`} />,
    link:
      state.requests > 0
        ? {
            text: "View all",
            href: "requests",
          }
        : undefined,
  },
  {
    title: <h4>Your contracts</h4>,
    tooltipText: "Contracts",
    content: <Widget src={`${ownerId}/widget/Profile.Contracts`} />,
    link:
      state.contracts > 0
        ? {
            text: "View all",
            href: "contracts",
          }
        : undefined,
  },
];

State.init({
  requests: 0,
  requestsIsFetched: false,
  contracts: 0,
  contractsIsFetched: false,
  inbox: Social.index("inbox", context.accountId, {
    order: "desc",
    subscribe: true,
  }),
  credits: 0,
  creditsIsFetched: false,
});

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: context.accountId },
    "final",
    false,
  ).then((requests) => {
    State.update({ requests: requests.length, requestsIsFetched: true });
  });
}

if (!state.contractsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_contributions",
    { account_id: context.accountId },
    "final",
    false,
  ).then((contracts) => {
    State.update({ contracts: contracts.length, contractsIsFetched: true });
  });
}

if (!state.creditsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: context.accountId },
    "final",
    false,
  ).then((project) => {
    State.update({
      credits: project.credit_balance ?? 0,
      creditsIsFetched: true,
    });
  });
}

return <Container>{cards.map(createCard)}</Container>;
