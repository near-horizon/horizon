const ownerId = "contribut3.near";
const accountId = props.accountId;
const contributionType = props.contributionType
  ? [{ name: props.contributionType }]
  : [];
const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const convertType = (contributionType) => {
  if (allContributionTypes.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

State.init({
  contributionType: [],
  entityId: accountId ? [{ name: accountId }] : [],
  description: "",
});

const entityIdInput = props.accountId ? (
  <div>
    <label htmlFor="account-id" className="text-muted fw-semibold">
      Request for:
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
  <Widget
    src={`${ownerId}/widget/AdminEntityAccountIdInput`}
    props={{
      label: "Request for:",
      update: (entityId) => {
        State.update({ entityId });
        Near.asyncView(
          ownerId,
          "get_entity_invites",
          { account_id: entityId[0].name },
          "final"
        ).then((invites) =>
          State.update({
            forbiddenIds: new Set(Object.keys(invites)),
          })
        );
      },
      accountId: context.accountId,
      selected: state.entityId,
    }}
  />
);

const contributionTypeInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/ContributionTypeInput`}
      props={{
        contributionType: state.contributionType,
        update: (contributionType) => State.update({ contributionType }),
        allContributionTypes,
      }}
    />
  </div>
);

const descriptionInput = (
  <div className="col-lg-12 mb-2">
    <Widget
      src={`${ownerId}/widget/DescriptionInput`}
      props={{
        description: state.description,
        text: "Details:",
        update: (description) => State.update({ description }),
      }}
    />
  </div>
);

const onSubmit = () => {
  if (state.contributionType.length !== 1 || state.description.length === 0) {
    return;
  }

  const args = {
    entity_id: state.entityId[0].name,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
  };

  Near.call(ownerId, "post_contribution_need", args);
};

return (
  <div className="px-3" style={{ maxWidth: "45em" }}>
    <h1 className="fs-2 mb-3 pb-3">Create new contribution request</h1>
    <div className="bg-light mb-3 p-4 rounded-2">
      <div className="row">
        {entityIdInput}
        {contributionTypeInput}
        {descriptionInput}
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
        className={`btn ${state.contributionType.length !== 1 || state.description.length === 0
            ? "btn-secondary"
            : "btn-primary"
          }`}
        onClick={onSubmit}
      >
        Create request
      </a>
    </div>
  </div>
);
