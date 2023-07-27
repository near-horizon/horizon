const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const cid = props.cid;
const isAdmin = props.isAdmin;

State.init({
  request: null,
  requestIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Header = styled.div`
  & > a {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1em;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 1.5em;
  line-height: 1.5em;
  color: #101828;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  & > span {
    &.open {
      color: var(--success-500, #12b76a);
      font-family: "Mona Sans";
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.1rem; /* 146.667% */
    }

    &.closed {
      color: var(--danger-500, #f64e60);
      font-family: "Mona Sans";
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.1rem; /* 146.667% */
    }
  }
`;

return (
  <Container>
    <Header>
      <Link
        href={`/${ownerId}/widget/Index?tab=project&accountId=${accountId}`}
      >
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: props.accountId, size: "30px" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: props.accountId,
            name: state.profile.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </Link>
    </Header>
    <Title>{state.request.title}</Title>
    <Status>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="8"
        viewBox="0 0 7 8"
        fill="none"
      >
        <circle cx="3.5" cy="4" r="3.5" fill="#12B76A" />
      </svg>
      <span className={state.request.open ? "open" : "closed"}>
        {state.request.open ? "Receiving proposals" : "Closed"}
      </span>
    </Status>
  </Container>
);
