const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

initState({
  description: "",
});

if (!accountId || !cid) {
  return "Cannot render contribution need widget without account ID or CID!";
}

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const contributionNeed = props.isPreview
  ? props.contributionNeed
  : Near.view(
      ownerId,
      "get_contribution_need",
      {
        account_id: accountId,
        cid,
      },
      "final",
      true
    );

if (!contributionNeed) {
  return props.isPreview
    ? "You must provide contribution need object in preview mode!"
    : "Loading...";
}

const shareButton = props.isPreview ? null : (
  <a
    className="card-link"
    href={`https://near.social/#/${ownerId}/widget/Need?accountId=${accountId}&cid=${cid}`}
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
          <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-end">{shareButton}</div>
        </div>
      </div>
    </small>
  </div>
);

const needTitle = (
  <h5 className="card-title">
    <div className="row justify-content-between">
      <div className="col-9">
        Contribution Need for {contributionNeed.contribution_type} -
        <small>{contributionNeed.active ? " Active" : " Finished"}</small>
      </div>
    </div>
  </h5>
);

const description = isPreview
  ? props.contributionNeed.description
  : contributionNeed.description;

const descriptionArea = <Markdown className="card-text" text={description} />;

const descriptionDiv = (
  <div className="col-lg-12  mb-2">
    <label htmlFor="description">Description for proposal:</label>
    <textarea
      id="description"
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
);

const body = (
  <div className="card-body">
    {needTitle}
    {descriptionArea}
  </div>
);

const proposed =
  Near.view(
    ownerId,
    "check_if_need_proposed",
    { entity_id: accountId, contributor_id: context.accountId, cid },
    "final",
    true
  ) ?? true;

const footer =
  !isContributor || isPreview || !contributionNeed.active || proposed ? null : (
    <div className="card-footer">
      <div>
        {descriptionDiv}
        <a
          className="btn btn-outline-primary mb-2"
          onClick={() => {
            const args = {
              entity_id: accountId,
              description: state.description,
              contribution_type: contributionNeed.contribution_type,
              need: cid,
            };

            Near.call(ownerId, "request_contribution", args);
          }}
        >
          Propose
        </a>
      </div>
    </div>
  );

return (
  <div className={`card my-2`}>
    {header}
    {body}
    {footer}
  </div>
);
