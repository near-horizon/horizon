const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;
const size = props.size ?? (props.tall ? "5em" : "1em");

State.init({
  name: "",
  tagline: "",
  nameIsFetched: false,
});

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((name) =>
    State.update({
      name: name[accountId].profile.name,
      tagline: name[accountId].profile.tagline,
      nameIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #7e868c;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Tagline = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

return (
  <Container>
    <Widget src={`${ownerId}/widget/Vendor.Icon`} props={{ accountId, size }} />
    <Column>
      <Row>
        <Name>{state.name}</Name>
        <AccountId>@{accountId}</AccountId>
      </Row>
      {props.tall ? <Tagline>{state.tagline}</Tagline> : null}
      {props.tall && false ? (
        <Widget
          src={`${ownerId}/widget/BadgeList`}
          props={{ badges: [{ value: "Verified" }] }}
        />
      ) : null}
    </Column>
  </Container>
);
