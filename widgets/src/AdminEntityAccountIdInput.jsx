const ownerId = "contribut3.near";
const update = props.update;
const accountId = props.accountId;
const selected = props.selected;
const label = props.label || "Invite to:";

State.init({
  options: [],
  fetched: false,
});

if (!state.fetched) {
  Near.asyncView(
    ownerId,
    "get_admin_entities",
    { account_id: accountId },
    "final",
    false
  ).then((entities) =>
    State.update({
      fetched: true,
      options: entities.map((name) => ({ name })),
    })
  );
}

return (
  <>
    <Typeahead
      id="entity-id-input"
      labelKey="name"
      onChange={update}
      options={state.options}
      placeholder="contribut3.near, social.near..."
      selected={selected}
      positionFixed
    />
  </>
);
