const ownerId = "contribut3.near";
const id = props.id;
const need = props.need ?? null;
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
  // The entity to which to request a contribution.
  entity: props.entity ? [{ name: props.entity }] : [],
  // The description of the contribution request.
  description: props.description ?? "",
  contributionType: props.contributionType
    ? [{ name: props.contributionType }]
    : [],
});

const onSubmit = () => {
  const args = {
    entity_id: state.entity[0].name,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
    need,
  };

  Near.call(ownerId, "request_contribution", args);
};

const existingEntities = (
  Near.view(ownerId, "get_entities", {}, "final") ?? []
).map(([accountId]) => ({ name: accountId }));

const entityEditor = props.entity ? (
  <div>
    <label htmlFor="account-id" className="text-muted fw-semibold">
      Contribute to:
    </label>
    <div
      className="rounded-3 bg-light"
      style={{ height: "5em" }}
      id="account-id"
    >
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId: props.entity, imageSize: "4em", isEntity: true }}
      />
    </div>
  </div>
) : (
  <div className="col-lg-12  mb-2">
    <label htmlFor="enity-id">Contribute to:</label>
    <Typeahead
      id="entity-id"
      labelKey="name"
      onChange={(entity) => State.update({ entity })}
      options={existingEntities}
      placeholder="social.near, contribut3.near"
      selected={state.entity}
      positionFixed
    />
  </div>
);

const descriptionDiv = (
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

const body = (
  <div className="row">
    {entityEditor}
    {contributionTypeInput}
    {descriptionDiv}
  </div>
);

return (
  <Widget
    src={`${ownerId}/widget/Modal`}
    props={{
      title: "Propose contribution",
      confirmText: (
        <>
          <i className="bi-send" />
          <span>Send proposal</span>
        </>
      ),
      onConfirm: onSubmit,
      hidden: props.hidden,
      onClose: props.onClose,
      body,
      id,
    }}
  />
);
