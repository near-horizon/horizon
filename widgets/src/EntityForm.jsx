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
  Object.keys(Near.view(ownerId, "get_entities", {}, "final", true) ?? {})
);

State.init({
  accountId,
  name: props.name ?? "",
  accountIdValid: true,
  kind,
  startDate,
});

if (accountId) {
  Near.asyncView(
    ownerId,
    "get_entity",
    { account_id: accountId },
    "final"
  ).then((entity) => {
    const date = new Date(Number(entity.start_date));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    State.update({
      name: entity.name,
      kind: [{ name: entity.kind }],
      startDate: `${year}-${month}-${day}`,
    });
  });
}

const accountIdInput = accountId ? (
  <div>
    <label htmlFor="account-id" className="text-muted fw-semibold">
      Project account ID
    </label>
    <div
      className="rounded-3 bg-light"
      style={{ height: "5em" }}
      id="account-id"
    >
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId, imageSize: "4em", isEntity: true }}
      />
    </div>
  </div>
) : (
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
    <h1 className="fs-2 mb-3 pb-3">
      {accountId ? "Create new" : "Edit"} project
    </h1>
    <div className="bg-light mb-3 p-4 rounded-2">
      <div className="row">
        {accountIdInput}
        {nameInput}
        {kindInput}
        {startDateInput}
      </div>
    </div>
    <div className="d-flex flex-row justify-content-between">
      <a
        className="btn btn-outline-secondary"
        href={`https://near.social/#/${ownerId}/widget/Index?tab=home`}
        onClick={() => props.update({ tab: "home" })}
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
