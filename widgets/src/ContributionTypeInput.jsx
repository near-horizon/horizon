const ownerId = "contribut3.near";
const contributionType = props.contributionType ?? [];
const text = props.text ?? "Type of contribution:";
const multiple = props.multiple ?? false;
const update = props.update;
const allContributionTypes = props.allContributionTypes ?? [];

State.init({
  options: [],
  fetched: false,
});

if (!state.fetched) {
  Near.asyncView(ownerId, "get_contribution_types", {}, "final", false).then(
    (types) =>
      State.update({
        fetched: true,
        options: types.map((name) => ({ name })),
      })
  );
}

if (!update) {
  return "Cannot render contribution type input without update function!";
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="contribution-type">{text}</Label>
    <Typeahead
      id="contribution-type"
      labelKey="name"
      onChange={update}
      options={state.options}
      placeholder="Development, Investment, Legal..."
      selected={contributionType}
      positionFixed
      multiple={multiple}
      allowNew
    />
  </>
);
