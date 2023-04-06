const ownerId = "contribut3.near";
const id = props.id ?? "links";
const label = props.label ?? "Input";
const value = props.value ?? {};
const onSave = props.onSave ?? (() => { });

const supportedLinks = [
  {
    name: "github",
    url: "https://github.com/",
  },
  {
    name: "discord",
    url: "https://discord.com/",
  },
  {
    name: "reddit",
    url: "https://reddit.com/u/",
  },
  {
    name: "twitter",
    url: "https://twitter.com/",
  },
  {
    name: "youtube",
    url: "https://youtube.com/",
  },
];

const LabelArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0.25em;
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
  <>
    <LabelArea>
      {supportedLinks
        .map(({ name, url }) => (
          <Widget src={`${ownerId}/widget/Inputs.Social`} props={{ start: url, value: v[name] ?? "", update: (s) => update({ ...v, [name]: s }) }} />
        ))}
    </LabelArea>
    <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
  </>
);

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value,
      edit,
      view: <Widget src={`${ownerId}/widget/SocialLinks`} props={{ links: value }} />,
    }}
  />
);
