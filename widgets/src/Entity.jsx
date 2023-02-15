const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide an entity object in preview mode"
    : "Loading...";
}

const shareButton = isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share" />
  </a>
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized =
  !!currentContributor && currentContributor.permissions.includes("Admin");

const contributions = Near.view(
  ownerId,
  "get_entity_contributions",
  { entity_id: accountId },
  "final"
);

const contributionRequests = Near.view(
  ownerId,
  "get_entity_contribution_requests",
  { entity_id: accountId },
  "final"
);

const invites = Near.view(
  ownerId,
  "get_entity_invites",
  { account_id: accountId },
  "final",
  true
);

const contributionsList = notStandalone ? null : (
  <div className="mb-2">
    Contributions:
    <br />
    {!contributions
      ? "Loading..."
      : contributions.map(([contributorId]) => (
          <Widget
            src={`${ownerId}/widget/Contribution`}
            props={{ entityId: accountId, contributorId, id: contributorId }}
          />
        ))}
  </div>
);

const requestsList =
  !isAuthorized || notStandalone ? null : (
    <div>
      Contribution requests:
      <br />
      {!contributionRequests
        ? "Loading..."
        : contributionRequests.map(([contributorId]) => (
            <Widget
              src={`${ownerId}/widget/ContributionRequest`}
              props={{ entityId: accountId, contributorId, id: contributorId }}
            />
          ))}
    </div>
  );

const inviteList =
  !isAuthorized || notStandalone ? null : (
    <div>
      Sent invites:
      <br />
      {!invites
        ? "Loading..."
        : Object.keys(invites).map((contributorId) => (
            <Widget
              src={`${ownerId}/widget/Invite`}
              props={{ entityId: accountId, contributorId }}
            />
          ))}
    </div>
  );

const needForm =
  !isAuthorized || notStandalone ? null : (
    <Widget src={`${ownerId}/widget/NeedForm`} props={{ accountId }} />
  );

const header = (
  <div className="card-header">
    <div className="row justify-content-between">
      <div className="col-4">
        <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
      </div>
      <div className="col-5">
        <div className="d-flex justify-content-end">{shareButton}</div>
      </div>
    </div>
  </div>
);

const body = (
  <div className="card-body">
    <div>Name: {entity.name}</div>
    <div>Type: {entity.kind}</div>
    <div>Status: {entity.status}</div>
    <div>
      Founded at: {new Date(Number(entity.start_date)).toLocaleDateString()}
    </div>
    {needForm}
    {contributionsList}
    {requestsList}
    {inviteList}
  </div>
);

return (
  <div className="card">
    {header}
    {body}
  </div>
);
c;
