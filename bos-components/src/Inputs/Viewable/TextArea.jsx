const ownerId = "nearhorizon.near";
const id = props.id ?? "textarea";
const label = props.label ?? "Input";
const value = props.value ?? "";
const onSave = props.onSave ?? (() => {});
const canEdit = props.canEdit;

const LabelArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
  width: 100%;
`;

const Input = styled.textarea`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  width: 100%;
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

const MarkdownText = styled.div`
  font-size: 0.9em;
  line-height: 1.25em;

  p {
    color: #101828;
    font-weight: 400;
    margin-bottom: 1em;
  }
`;

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value,
      big: true,
      edit: (update, v) => (
        <LabelArea>
          <Input
            id
            rows={5}
            value={v}
            onChange={(e) => update(e.target.value)}
          />
          <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
        </LabelArea>
      ),
      // view: <Widget src={`${ownerId}/widget/DescriptionArea`} props={{ description: value }} />,
      view: value ? (
        <MarkdownText>
          <Markdown text={value} />
        </MarkdownText>
      ) : null,
      canEdit,
    }}
  />
);
