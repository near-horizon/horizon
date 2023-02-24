const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const cid = props.cid;
const inboxView = props.inboxView;

if (!accountId || !cid) {
  return "Cannot render contribution need widget without account ID or CID!";
}

State.init({
  contributionFormHidden: true,
});

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const currentContributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: accountId, contributor_id: context.accountId },
  "final"
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: accountId, account_id: context.accountId },
  "final"
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

const entity = isPreview
  ? props.entity
  : Near.view(ownerId, "get_entity", { account_id: accountId }, "final");

if (!entity) {
  return isPreview
    ? "You must provide a entity object in preview mode"
    : "Loading...";
}

const profile = Social.getr(`${accountId}/profile`);

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em" }}
  >
    <div className="flex-grow-1 py-3">
      <div className="d-flex flex-row justify-content-between align-items-start">
        <a
          href={`https://near.social/#/${ownerId}/widget/Index?tab=need&accountId=${accountId}&cid=${cid}`}
          onClick={() =>
            props.update({
              tab: "need",
              content: "",
              search: "",
              accountId,
              cid,
            })
          }
        >
          <h4>Looking for {contributionNeed.contribution_type}</h4>
        </a>
        <div className="d-flex flex-row justify-content-end align-items-start">
          <Widget
            src={`${ownerId}/widget/ActiveIndicator`}
            props={{
              active: contributionNeed.active,
              activeText: "Open to proposals",
              inactiveText: "Closed",
            }}
          />
          <Widget
            src={`${ownerId}/widget/CardMenu`}
            props={{
              update: props.update,
              items: [
                {
                  text: "Propose contribution",
                  icon: "bi-person-up",
                  id: "contribute",
                  onClick: () =>
                    State.update({ contributionFormHidden: false }),
                },
                {
                  text: "View details",
                  icon: "bi-info-circle",
                  id: "info",
                },
                {
                  text: "Share",
                  icon: "bi-arrow-up-right",
                  id: "share",
                },
              ],
            }}
          />
          <Widget
            src={`${ownerId}/widget/ContributionRequestForm`}
            props={{
              id: `${accountId}ContributionRequestForm`,
              entity: accountId,
              hidden: state.contributionFormHidden,
              need: cid,
              contributionType: contributionNeed.contribution_type,
              onClose: () => State.update({ contributionFormHidden: true }),
            }}
          />
        </div>
      </div>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity: true,
          imageSize: "1.5em",
          update: props.update,
          additionalRow: (
            <>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
              <Widget
                src={`${ownerId}/widget/DescriptionArea`}
                props={{ description: contributionNeed.description }}
              />
            </>
          ),
        }}
      />
    </div>
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
