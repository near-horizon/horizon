const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const cid = props.cid;
const size = props.size ?? "1em";

State.init({
  title: "",
  titleIsFetched: false,
});

if (!state.nameIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false,
  ).then(({ title }) => State.update({ title, titleIsFetched: true }));
  return <>Loading...</>;
}

const Container = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: .95em;
  line-height: 1em;
  color: #101828;
`;

return (
  <Container>
    {title}
  </Container>
);
