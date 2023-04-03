const ownerId = "contribut3.near";
const accountId = props.accountId ? [{ name: props.accountId }] : [];

const kind = props.kind ? [{ name: props.kind }] : [];
const entityStatus = props.status ? [{ name: props.status }] : [];
const startDate = props.startDate ?? "";
const endDate = props.endDate ?? "";

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
  fixed: !!props.accountId,
  accountId,
  accountIdValid: true,
  name: props.name ?? "",
  kind,
  entityStatus,
  startDate,
  endDate,
  updated: false,
  existing: accountId.name
    ? Near.view(ownerId, "get_entity", { account_id: accountId.name }, "final")
    : null,
});

const allStatuses = ["Active", "Flagged"].map((name) => ({ name }));
const allAccountIds = Object.keys(
  Near.view(ownerId, "get_entities", {}, "final", true) ?? {}
).map((name) => ({ name }));

const accountIdInput = (
  <Widget
    src={`${ownerId}/widget/ModeratorAccountIdInput`}
    props={{
      accountId: state.accountId,
      allAccountIds,
      fixed: state.fixed,
      update: (update, accountIdValid) =>
        State.update({ ...update, accountIdValid }),
      valid: state.accountIdValid,
    }}
  />
);

const nameInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/NameInput`}
      props={{
        label: "Name of entity:",
        value: state.name,
        update: (name) => State.update({ name }),
      }}
    />
  </div>
);

const kindInput = (
  <div className="col-lg-6  mb-2">
    <Widget
      src={`${ownerId}/widget/EntityTypeInput`}
      props={{
        kind: state.kind,
        update: (kind) => State.update({ kind, updated: true }),
      }}
    />
  </div>
);

const statusInput = (
  <div className="col-lg-6  mb-2">
    Status of entity:
    <Typeahead
      labelKey="name"
      onChange={(entityStatus) => State.update({ entityStatus, updated: true })}
      options={allStatuses}
      placeholder="Active or Flagged"
      selected={state.entityStatus}
      positionFixed
    />
  </div>
);

const startDateInput = (
  <div className="col-lg-6 mb-2">
    <Widget
      src={`${ownerId}/widget/DateInput`}
      props={{
        id: "start-date",
        text: "Start date of entity:",
        date: state.startDate,
        update: (startDate) => State.update({ startDate, updated: true }),
      }}
    />
  </div>
);

const endDateInput = (
  <div className="col-lg-6 mb-2">
    <Widget
      src={`${ownerId}/widget/DateInput`}
      props={{
        id: "end-date",
        text: "End date of entity:",
        date: state.endDate,
        update: (endDate) => State.update({ endDate, updated: true }),
      }}
    />
  </div>
);

const onSubmit = () => {
  if (!state.accountIdValid) {
    return;
  }

  const args = {
    account_id: state.accountId[0].name,
    entity: {
      status: state.entityStatus[0].name,
      name: state.name,
      kind: state.kind[0].name,
      start_date: `${new Date(state.startDate).getTime()}`,
      end_date: state.endDate ? `${new Date(state.endDate).getTime()}` : "",
    },
  };

  Near.call(ownerId, "set_entity", args);
};

const header = (
  <div className="card-header">
    {state.fixed ? "Update" : "Edit/Create"} an entity
  </div>
);

const body = (
  <div className="card-body">
    <div className="row">
      {accountIdInput}
      {nameInput}
      {kindInput}
      {statusInput}
      {startDateInput}
      {endDateInput}
    </div>

    <a
      className={`btn ${
        state.accountIdValid ? "btn-primary" : "btn-secondary"
      } mb-2`}
      onClick={onSubmit}
    >
      Submit
    </a>
  </div>
);

const footer = (
  <div className="card-footer">
    Preview:
    {state.accountIdValid ? (
      <Widget
        src={`${ownerId}/widget/Entity`}
        props={{
          isPreview: true,
          accountId: state.accountId[0].name,
          notStandalone: true,
          entity:
            state.updated || !state.existing
              ? {
                  name: state.name,
                  kind: state.kind[0].name,
                  status: state.entityStatus[0].name,
                  start_date: `${new Date(state.startDate).getTime()}`,
                  end_date: `${new Date(state.endDate).getTime()}`,
                }
              : state.existing,
        }}
      />
    ) : null}
  </div>
);

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
