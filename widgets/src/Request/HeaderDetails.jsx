const ownerId = "contribut3.near";
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
`;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Title`}
      props={{
        value: state.request.title,
        id: "title",
        onSave: (title) =>
          Near.call(ownerId, "edit_request", {
            cid,
            request: { ...state.request, title },
          }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Toggle`}
      props={{
        id: "open",
        activeText: "Receiving proposals",
        inactiveText: "Closed",
        value: state.request.open,
        onSave: (open) =>
          Near.call(ownerId, "edit_request", {
            cid,
            request: { ...state.request, open },
          }),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
