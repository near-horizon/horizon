const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const accountId = props.accountId;
const cid = props.cid;

const getDate = (timestamp) => {
  const timestampString = `${timestamp}`;
  return new Date(
    Number(timestampString.substring(0, 13)),
  ).toLocaleDateString();
};

State.init({
  request: null,
  requestIsFetched: false,
  proposals: null,
  proposalsIsFetched: false,
  name: null,
  nameIsFetched: false,
});

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
    State.update({ created_at: tx.timestamp });
  });
}

if (!state.proposalsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request_proposals",
    { account_id: accountId, cid },
    "final",
    false,
  ).then((proposals) => State.update({ proposals, proposalsIsFetched: true }));
}

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/name`] },
    "final",
    false,
  ).then((data) =>
    State.update({ name: data[accountId].profile.name, nameIsFetched: true }),
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.65rem;
  align-self: stretch;
`;

const Time = styled.div`
  color: var(--gray-true-500, #737373);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title = styled.h3`
  color: var(--ui-elements-dark, #11181c);
  font-family: "Mona Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.4rem */
  cursor: pointer;

  & > a {
    color: inherit;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--success-500, #12b76a);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &.closed {
    color: var(--error-500, #f43f5e);
  }
`;

const Description = styled.p`
  color: var(--gray-900, #101828);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.00875rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ui-elements-gray, #7e868c);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

return (
  <Container>
    <Main>
      <Header>
        <Time>{getDate(state.created_at)}</Time>
        <Title>
          <Link
            href={`/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`}
          >
            {state.request.title}
          </Link>
        </Title>
        <Status className={state.request.open ? "open" : "closed"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="7"
            viewBox="0 0 7 7"
            fill="none"
          >
            <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" />
          </svg>
          {state.request.open ? "Receiving proposals" : "Closed"}
        </Status>
      </Header>
      <Description>{state.request.description}</Description>
    </Main>
    <Bottom>
      <Detail>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M3 15.75L3 3M3 9.75H8.55C8.97004 9.75 9.18006 9.75 9.34049 9.66825C9.48161 9.59635 9.59635 9.48161 9.66825 9.34049C9.75 9.18006 9.75 8.97004 9.75 8.55V3.45C9.75 3.02996 9.75 2.81994 9.66825 2.65951C9.59635 2.51839 9.48161 2.40365 9.34049 2.33175C9.18006 2.25 8.97004 2.25 8.55 2.25H4.2C3.77996 2.25 3.56994 2.25 3.40951 2.33175C3.26839 2.40365 3.15365 2.51839 3.08175 2.65951C3 2.81994 3 3.02996 3 3.45V9.75ZM9.75 3.75H14.55C14.97 3.75 15.1801 3.75 15.3405 3.83175C15.4816 3.90365 15.5963 4.01839 15.6683 4.15951C15.75 4.31994 15.75 4.52996 15.75 4.95V10.05C15.75 10.47 15.75 10.6801 15.6683 10.8405C15.5963 10.9816 15.4816 11.0963 15.3405 11.1683C15.1801 11.25 14.97 11.25 14.55 11.25H10.95C10.53 11.25 10.3199 11.25 10.1595 11.1683C10.0184 11.0963 9.90365 10.9816 9.83175 10.8405C9.75 10.6801 9.75 10.47 9.75 10.05V3.75Z"
            stroke="currentColor"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {getDate(state.request.deadline)}
      </Detail>
      <Detail>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M4.5 8.25V11.25M13.5 6.75V9.75M12.75 3C14.5865 3 15.5799 3.28107 16.0741 3.49908C16.1399 3.52812 16.1728 3.54263 16.2678 3.63328C16.3247 3.68761 16.4287 3.84705 16.4554 3.92107C16.5 4.04455 16.5 4.11205 16.5 4.24706V12.3084C16.5 12.9899 16.5 13.3307 16.3978 13.5059C16.2938 13.6841 16.1936 13.7669 15.999 13.8354C15.8076 13.9027 15.4215 13.8285 14.6491 13.6801C14.1085 13.5762 13.4674 13.5 12.75 13.5C10.5 13.5 8.25 15 5.25 15C3.41347 15 2.42015 14.7189 1.92591 14.5009C1.86009 14.4719 1.82718 14.4574 1.7322 14.3667C1.67526 14.3124 1.57134 14.153 1.5446 14.0789C1.5 13.9554 1.5 13.8879 1.5 13.7529L1.5 5.69164C1.5 5.01006 1.5 4.66928 1.60221 4.49411C1.70618 4.31592 1.80644 4.23309 2.00104 4.16461C2.19235 4.09729 2.57853 4.17149 3.35087 4.31989C3.89146 4.42376 4.53261 4.5 5.25 4.5C7.5 4.5 9.75 3 12.75 3ZM10.875 9C10.875 10.0355 10.0355 10.875 9 10.875C7.96447 10.875 7.125 10.0355 7.125 9C7.125 7.96447 7.96447 7.125 9 7.125C10.0355 7.125 10.875 7.96447 10.875 9Z"
            stroke="currentColor"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {state.request.source === "Credits"
          ? `${state.request.budget} NHZN`
          : `$${state.request.budget}`}
      </Detail>
      <Detail>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M1.5 5.25L7.62369 9.53658C8.11957 9.8837 8.36751 10.0573 8.6372 10.1245C8.87542 10.1839 9.12458 10.1839 9.3628 10.1245C9.63249 10.0573 9.88043 9.8837 10.3763 9.53658L16.5 5.25M5.1 15H12.9C14.1601 15 14.7902 15 15.2715 14.7548C15.6948 14.539 16.039 14.1948 16.2548 13.7715C16.5 13.2902 16.5 12.6601 16.5 11.4V6.6C16.5 5.33988 16.5 4.70982 16.2548 4.22852C16.039 3.80516 15.6948 3.46095 15.2715 3.24524C14.7902 3 14.1601 3 12.9 3H5.1C3.83988 3 3.20982 3 2.72852 3.24524C2.30516 3.46095 1.96095 3.80516 1.74524 4.22852C1.5 4.70982 1.5 5.33988 1.5 6.6V11.4C1.5 12.6601 1.5 13.2902 1.74524 13.7715C1.96095 14.1948 2.30516 14.539 2.72852 14.7548C3.20982 15 3.83988 15 5.1 15Z"
            stroke="currentColor"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {state.proposals.length} proposals
      </Detail>
    </Bottom>
  </Container>
);
