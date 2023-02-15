const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ownerId = "contribut3.near";
const accountId = props.accountId ?? "";
const kind = props.kind ? [{ name: props.kind }] : [];
const startDate = props.startDate ?? createDate();
const forbiddenIds = new Set(
  (Near.view(ownerId, "get_entities", {}, "final", true) ?? []).map(
    ([accountId]) => accountId
  )
);

initState({
  accountId,
  name: props.name ?? "",
  accountIdValid: true,
  kind,
  startDate,
});

const accountIdInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/ValidatedAccountIdInput`}
      props={{
        label: "Account ID of entity:",
        value: state.accountId,
        update: (accountId, accountIdValid) =>
          State.update({ accountId, accountIdValid }),
        forbiddenIds,
      }}
    />
  </div>
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
      props={{ kind: state.kind, update: (kind) => State.update({ kind }) }}
    />
  </div>
);

const startDateInput = (
  <div className="col-lg-6 mb-2">
    <Widget
      src={`${ownerId}/widget/DateInput`}
      props={{
        id: "start-date",
        text: " Start date of entity:",
        date: state.startDate,
        update: (startDate) => State.update({ startDate }),
      }}
    />
  </div>
);

const onSubmit = () => {
  if (!state.accountIdValid) {
    return;
  }

  const args = {
    account_id: state.accountId,
    name: state.name,
    kind: state.kind[0].name,
    start_date: `${new Date(state.startDate).getTime()}`,
  };

  Near.call(ownerId, "add_entity", args);
};

const header = <div className="card-header">Create an entity</div>;

const body = (
  <div className="card-body">
    <div className="row">
      {accountIdInput}
      {nameInput}
      {kindInput}
      {startDateInput}
    </div>

    <a
      className={`btn ${
        !state.accountIdValid ? "btn-secondary" : "btn-primary"
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
          accountId: state.accountId,
          notStandalone: true,
          entity: {
            entity: state.entity,
            kind: state.kind[0].name,
            start_date: `${new Date(state.startDate).getTime()}`,
          },
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
