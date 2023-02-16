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
  "final"
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

const profile = Social.getr(`${accountId}/profile`);

const name = entity.name || profile.name;
const tags = Object.keys(profile.tags ?? {});
const image = profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const circle = (
  <div
    className="profile-circle d-inline-block"
    title={`${name} @${accountId}`}
    style={{ width: "4em", height: "4em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${url}`}
      alt="profile image"
    />
  </div>
);

const body = (
  <div
    className="d-flex flex-row justify-content-between align-items-start"
    id={accountId}
  >
    <div className="d-flex flex-row justify-content-start">
      <div className="m-2">{circle}</div>
      <div className="m-2 d-flex flex-column justify-content-between align-items-start">
        <div>
          <b>{name}</b>
          <span className="text-muted">@{accountId}</span>
        </div>
        <div className="text-truncate text-muted">
          {tags.length > 0 ? (
            <>
              {tags.map((tag) => (
                <span
                  className="d-inline-block mx-1 py-1 px-2 badge border border-secondary text-secondary text-muted text-center"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
    <div className="d-flex flex-row justify-content-end align-items-start">
      <a
        className="btn btn-outline-secondary me-2"
        href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
      >
        View details
      </a>
      <a className="btn btn-outline-secondary">
        <i className="bi-box-arrow-up-right" />
      </a>
    </div>
  </div>
);

const details = (
  <div className="text-truncate my-2" style={{ maxWidth: "70%" }}>
    {profile.description}
  </div>
);

const [[founder]] = (contributions ?? []).filter((contribution) => {
  const [_, details] = contribution;
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const founderProfile = Social.getr(`${founder}/profile`);
const founderImage = profile.image;
const founderImageUrl =
  (founderImage.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${founderImage.ipfs_cid}`
    : founderImage.url) ||
  "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const founderCircle = (
  <div
    className="profile-circle d-inline-block"
    title={`${founderProfile.name} @${founder}`}
    style={{ width: "1.5em", height: "1.5em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${founderImageUrl}`}
      alt="profile image"
    />
  </div>
);

const footer = (
  <div className="d-flex flex-row justify-content-start align-items-stretch text-muted">
    <div className="d-flex flex-row justify-content-start align-items-center">
      {founderCircle}
      <span className="ms-1">{founderProfile.name}</span>
    </div>
    <div className="ms-3">
      <i className="bi-play" />
      <span className="ms-1">{entity.status}</span>
    </div>
  </div>
);

return (
  <div className="card">
    <div className="card-body p-3">
      {body}
      {details}
      {footer}
      {needForm}
      {contributionsList}
      {requestsList}
      {inviteList}
    </div>
  </div>
);
