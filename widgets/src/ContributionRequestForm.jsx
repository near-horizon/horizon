const ownerId = "contribut3.near";
const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const convertType = (contributionType) => {
  if (allContributionTypes.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

initState({
  // The entity to which to request a contribution.
  entity: props.entity ? [{ name: props.entity }] : [],
  // The description of the contribution request.
  description: props.description ?? "",
  contributionType: props.contributionType
    ? [{ name: props.contributionType }]
    : [],
});

const onClick = () => {
  const args = {
    entity_id: state.entity[0].name,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
    need: null,
  };

  Near.call(ownerId, "request_contribution", args);
};

const existingEntities = (
  Near.view(ownerId, "get_entities", {}, "final") ?? []
).map(([accountId]) => ({ name: accountId }));

const entityEditor = (
  <div className="col-lg-12  mb-2">
    <label htmlFor="enity-id">Entity account ID:</label>
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
  <div className="col-lg-12  mb-2">
    <label htmlFor="description">Description:</label>
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

const header = <div className="card-header">Propose contribution</div>;

const body = (
  <div className="card-body">
    <div className="row">
      {entityEditor}
      {descriptionDiv}
      {contributionTypeInput}
    </div>

    <a className="btn btn-outline-primary mb-2" onClick={onClick}>
      Submit
    </a>
  </div>
);

const footer = (
  <div className="card-footer">
    Preview:
    <Widget
      src={`${ownerId}/widget/ContributionRequest`}
      props={{
        isPreview: true,
        id: 0, // irrelevant
        contributorId: context.accountId,
        entityId: state.entity[0].name,
        contributionRequest: {
          entity: state.entity[0].name,
          description: state.description,
        },
      }}
    />
  </div>
);

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
