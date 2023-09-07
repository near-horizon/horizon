const ownerId = "nearhorizon.near";
const id = props.id ?? "select";
const label = props.label ?? "Input";
const value = props.value ?? [];
const options = props.options ?? [];
const onSave = props.onSave ?? (() => {});

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  flex-wrap: wrap;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
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
    <Widget
      src={`${ownerId}/widget/Inputs.MultiSelect`}
      props={{
        id,
        noLabel: true,
        value: v,
        options,
        onChange: update,
      }}
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
      view: value.map(({ name }) => name).join(", "),
      canEdit: props.canEdit,
    }}
  />
);
