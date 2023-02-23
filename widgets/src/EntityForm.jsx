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

State.init({
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
        label: "Project account ID *",
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
        label: "Project name *",
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
        update: (kind) => State.update({ kind }),
        text: "Type of project *",
      }}
    />
  </div>
);

const startDateInput = (
  <div className="col-lg-6 mb-2">
    <Widget
      src={`${ownerId}/widget/DateInput`}
      props={{
        id: "start-date",
        text: "Founding date",
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

return (
  <div className="px-3" style={{ maxWidth: "45em" }}>
    <h1 className="fs-2 mb-3 pb-3">Create new project</h1>
    <div className="bg-light mb-3 p-4 rounded-2">
      <div className="row">
        {nameInput}
        {accountIdInput}
        {kindInput}
        {startDateInput}
      </div>
    </div>
    <div className="d-flex flex-row justify-content-between">
      <a
        className="btn btn-outline-secondary"
        href={`https://near.social/#/${ownerId}/widget/Index?tab=dashboard`}
        onClick={() => props.update("dashboard")}
      >
        Cancel
      </a>
      <a
        className={`btn ${!state.accountIdValid ? "btn-secondary" : "btn-primary"
          }`}
        onClick={onSubmit}
      >
        Create project
      </a>
    </div>
  </div>
);
