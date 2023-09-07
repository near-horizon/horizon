const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const cid = props.cid;

const companySizeTiers = [
  "1-10 employees",
  "11-50 employees",
  "51-250 employees",
  "251-1000 employees",
  "1001+ employees",
];

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
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));

  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/Request.Details`}
    props={{
      accountId,
      isAdmin: props.isAdmin,
      request: state.request,
      onSave: (request) => {
        Near.call(ownerId, "edit_request", {
          cid,
          request: { ...state.request, ...request },
        });
      },
    }}
  />
);
