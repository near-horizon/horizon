const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;
const accountId = context.accountId;

initState({
  endDate: new Date().toLocaleDateString(),
});

if (!entityId || !contributorId) {
  return "Cannot show contribution without entity ID or contributor ID!";
}

const contribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: contributorId },
  "final"
);

const currentAccountContribution = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: accountId },
  "final"
);

if (!contribution) {
  return "Loading...";
}

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { account_id: accountId, entity_id: entityId },
  "final",
  true
);

const endDateInput = (
  <div className="col-lg-6 mb-2">
    End date of contribution:
    <input
      type="date"
      value={state.endDate}
      onChange={(e) => State.update({ endDate: e.target.value })}
    />
  </div>
);

const finishButton =
  isAuthorized && !contribution.current.end_date ? (
    <div className="card-footer">
      {endDateInput}
      <a
        className="btn btn-outline-primary mb-2"
        onClick={() => {
          const args = {
            entity_id: entityId,
            contributor_id: contributorId,
            end_date: `${new Date(state.endDate).getTime()}`,
          };
          Near.call(ownerId, "finish_contribution", args);
        }}
      >
        Finish
      </a>
    </div>
  ) : null;

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Contribution?entityId=${entityId}&contributorId=${contributorId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share" />
  </a>
);

const header = (
  <div className="card-header">
    <small className="text-muted">
      <div className="row justify-content-between">
        <div className="col-4">
          <Widget
            src={`mob.near/widget/ProfileLine`}
            props={{ accountId: contributorId }}
          />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const detail = ({ description, start_date, end_date }) => (
  <div className="card">
    <div className="card-header">Details</div>
    <div className="card-body">
      Description:
      <br />
      <p>{description || "Founded entity"}</p>
      Start date:
      <br />
      <p>{new Date(Number(start_date)).toLocaleDateString()}</p>
      {end_date ? (
        <>
          End date: <br /> <p>{end_date}</p>
        </>
      ) : null}
    </div>
    {finishButton}
  </div>
);

const pastWork =
  !contribution.history || contribution.history.length === 0 ? null : (
    <>
      Past work:
      {contribution.history.map(detail)}
    </>
  );

const body = (
  <div className="card-body">
    <div>
      Contribution to:
      <Widget
        src={`mob.near/widget/ProfileLine`}
        props={{ accountId: entityId }}
      />
    </div>
    Current work:
    {detail(contribution.current)}
    {pastWork}
  </div>
);

return (
  <div className="card">
    {header}
    {body}
  </div>
);
