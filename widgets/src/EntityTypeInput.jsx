const kind = props.kind ?? [];
const text = props.text ?? "Type of entity:";
const update = props.update;
const allKinds = ["Project", "Organization", "DAO"].map((name) => ({ name }));

if (!update) {
  return "Cannot render entity type input without update function!";
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="entity-type">{text}</Label>
    <Typeahead
      id="entity-type"
      labelKey="name"
      onChange={(kind) => update(kind)}
      options={allKinds}
      placeholder="Project, Organization or DAO"
      selected={kind}
      positionFixed
    />
  </>
);
