const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

State.init({
  inviteFormHidden: true,
});

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
    ? "You must provide a contributor object in preview mode"
    : "Loading...";
}

const isEntity = Near.view(
  ownerId,
  "check_is_entity",
  { account_id: accountId },
  "final",
  true
);

const active = contributor.looking_for_work;

const profile = Social.getr(`${accountId}/profile`);

const contributionTypes = contributor.contribution_types.reduce(
  (ob, contributionType) =>
    typeof contributionType === "object"
      ? { ...ob, [contributionType.Other]: "" }
      : { ...ob, [contributionType]: "" },
  {}
);

if (contributionTypes && "Other" in contributionTypes) {
  contributionTypes[contributionTypes.Other] = "";
  delete contributionTypes.Other;
}

const skills = contributor.skills.reduce(
  (ob, skill) => ({ ...ob, [skill]: "" }),
  {}
);

const tags = { ...skills, ...contributionTypes } || profile.tags;

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em", maxWidth: "100%" }}
  >
    <div className="flex-grow-1 py-3" style={{ maxWidth: "100%" }}>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity,
          imageSize: "3em",
          update: props.update,
          additionalColumn: inboxView ? (
            <></>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{
                  active,
                  activeText: "Available",
                  inactiveText: "Not avilable",
                }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Invite to contribute",
                      icon: "bi-person-plus",
                      id: "invite",
                      onClick: () => State.update({ inviteFormHidden: false }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/#/${ownerId}/widget/Index?tab=contributor&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "contributor",
                          content: "",
                          search: "",
                          accountId,
                        }),
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
                src={`${ownerId}/widget/InviteForm`}
                props={{
                  id: `${accountId}InviteForm`,
                  accountId,
                  hidden: state.inviteFormHidden,
                  onClose: () => State.update({ inviteFormHidden: true }),
                }}
              />
            </div>
          ),
          additionalRow: (
            <>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <i
                  className={`d-block ${isEntity ? "bi-diagram-2" : "bi-person"
                    }`}
                />
                <span className="ms-2">
                  {isEntity ? "Organization" : "Individual contributor"}
                </span>
              </div>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
            </>
          ),
        }}
      />
      <div style={{ maxWidth: "100%", marginTop: "0.5em" }}>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{
            description:
              contributor.resume || entity?.description || profile.description,
          }}
        />
      </div>
    </div>
  </div>
);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">{body}</div>
  </div>
);
