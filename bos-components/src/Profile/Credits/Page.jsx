const ownerId = "nearhorizon.near";

const contentWidget = {
  "credits-activity": "Activity",
  "credits-rewards": "Rewards",
  "credits-how": "How",
};

const getContent = (tab) => {
  if (tab in contentWidget) {
    return tab;
  }

  return "credits-activity";
};

State.init({
  credits: 0,
  creditsIsFetched: false,
});

if (!state.creditsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: context.accountId },
    "final",
    false
  ).then((project) => {
    State.update({
      credits: project.credit_balance,
      creditsIsFetched: true,
    });
  });
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > h2 {
      color: #000;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const Available = styled.div`
  display: flex;
  padding: 1.625rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background: var(--background-beige, #f2f1ea);
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    & > small {
      color: var(--ui-elements-black, #000);
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 600;
      line-height: 142%; /* 1.2425rem */
    }

    & > b {
      color: var(--ui-elements-black, #000);
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > span {
      color: var(--ui-elements-gray, #7e868c);
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

const contentKey = getContent(props.content);
const content = (
  <Widget
    src={`${ownerId}/widget/Profile.Credits.${contentWidget[contentKey]}`}
    props={{ ...props }}
  />
);

return (
  <Container>
    <Header>
      <div>
        <h2>Credit balance</h2>
      </div>
    </Header>
    <Available>
      <div>
        <small>Available for spending</small>
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{
            content: " ",
          }}
        />
      </div>
      <div>
        <b>{state.credits} NHZN</b>
        <span>(~${state.credits})</span>
      </div>
    </Available>
    <Widget
      src={`${ownerId}/widget/TabSelector`}
      props={{
        tab: "profile",
        content: getContent(props.content),
        search: props.search,
        update: props.update,
        accountId: props.accountId,
        buttons: Object.entries(contentWidget).map(([id, text]) => ({
          id,
          text,
        })),
      }}
    />
    {content}
  </Container>
);
