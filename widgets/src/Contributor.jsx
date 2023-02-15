const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Contributor?accountId=${accountId}`}
    role="button"
    target="_blank"
    title="Open in new tab"
  >
    <div className="bi bi-share" />
  </a>
);

if (notStandalone) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-between">
          <div className="col-4">
            <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
          </div>
          <div className="col-5">
            <div className="d-flex justify-content-end">{shareButton}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const contributor = isPreview
  ? props.contributor
  : Near.view(
      ownerId,
      "get_contributor",
      { account_id: accountId },
      "final",
      true
    );

if (!contributor) {
  return isPreview
    ? "You must provide a contributor object in preview mode!"
    : "Loading...";
}

const contributions = Near.view(
  ownerId,
  "get_contributor_contributions",
  { account_id: accountId },
  "final",
  true
);

const contributionsList = notStandalone ? null : (
  <div className="mb-2">
    Contributions:
    <br />
    {!contributions ? (
      <div>Loading...</div>
    ) : (
      Object.keys(contributions).map((entityId) => (
        <Widget
          src={`${ownerId}/widget/Contribution`}
          props={{ entityId, contributorId: accountId, id: entityId }}
        />
      ))
    )}
  </div>
);

const header = (
  <div className="card-header">
    <small className="text-muted">
      <div className="row justify-content-between">
        <div className="col-4">
          <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const body = (
  <div className="card-body">
    <div className="mb-2">
      Contribution types:
      <ul>
        {contributor.contribution_types.map((ct) => (
          <li>{typeof ct !== "string" ? `Other: ${ct.Other}` : ct}</li>
        ))}
      </ul>
    </div>
    <div className="mb-2">
      Skills:
      <ul>
        {contributor.skills.map((s) => (
          <li>{s}</li>
        ))}
      </ul>
    </div>
    <div className="mb-2">
      Resume:
      <p>{contributor.resume}</p>
    </div>
    {contributionsList}
  </div>
);

return (
  <div className="card">
    {header}
    {body}
  </div>
);
