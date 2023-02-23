const ownerId = "contribut3.near";

const isModerator = Near.view(
  ownerId,
  "check_is_moderator",
  { account_id: context.accountId },
  "final",
  true
);

if (isModerator === false) {
  return "You are not authorized to access this widget!";
}

if (!isModerator) {
  return "Loading...";
}

State.init({
  accountId: "",
  valid: true,
});

const accountIdInput = (
  <div className="col-lg-12  mb-2">
    <Widget
      src={`${ownerId}/widget/ValidatedAccountIdInput`}
      props={{
        label: "Account ID of moderator:",
        value: state.accountId,
        update: (accountId, valid) => State.update({ accountId, valid }),
      }}
    />
  </div>
);

const onSubmit = () => {
  if (!state.valid) {
    return;
  }

  const args = {
    moderator_id: state.accountId,
  };

  Near.call(ownerId, "set_moderator", args);
};

const header = <div className="card-header">Change the moderator</div>;

const body = (
  <div className="card-body">
    <div className="row">{accountIdInput}</div>

    <a
      className={`btn ${!state.valid ? "btn-secondary" : "btn-primary"} mb-2`}
      onClick={onSubmit}
    >
      Submit
    </a>
  </div>
);

return (
  <div className="card">
    {header}
    {body}
  </div>
);
