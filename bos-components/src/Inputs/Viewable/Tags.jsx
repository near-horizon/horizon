const ownerId = "nearhorizon.near";
const id = props.id ?? "tags";
const label = props.label ?? "Input";
const value = props.value ?? [];
const options = props.options ?? [];
const onSave = props.onSave ?? (() => {});
const canEdit = props.canEdit;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  flex-wrap: wrap;
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

const edit = (update, v) => (
  <LabelArea>
    <Typeahead
      id
      labelKey="name"
      onChange={update}
      options={options}
      selected={v}
      positionFixed
      multiple
      allowNew
    />
    <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
  </LabelArea>
);

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value,
      edit,
      view:
        value && value.length > 0 ? (
          <Widget
            src={`${ownerId}/widget/Tags`}
            props={{
              tags: value.reduce(
                (acc, { name }) => ({ ...acc, [name]: "" }),
                {},
              ),
            }}
          />
        ) : null,
      canEdit,
    }}
  />
);
