const ownerId = "nearhorizon.near";
const id = props.id ?? "select";
const label = props.label ?? "Input";
const value = props.value ?? {};
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
      src={`${ownerId}/widget/Inputs.Verticals`}
      props={{
        verticals: v,
        update,
        noLabel: true,
        setError: (verticalsError) => props.setError(verticalsError),
        error: props.verticalsError,
      }}
    />
    <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
  </LabelArea>
);

/** @type {{text:string;value:string}[]} */
const verticals = [
  { text: "DeSci", value: "desci" },
  { text: "DeFi", value: "defi" },
  { text: "Gaming", value: "gaming" },
  { text: "Metaverse", value: "metaverse" },
  { text: "Commercial", value: "commercial" },
  { text: "Sports and Entertainment", value: "sports-and-entertainment" },
  { text: "Infrastructure", value: "infrastructure" },
  { text: "Social", value: "social" },
  { text: "Social Impact", value: "social-impact" },
  { text: "Creative", value: "creative" },
  { text: "Education", value: "education" },
  // { text: "Other", value: "other" },
];

/**
 * @param {string} old
 *
 * @returns {string[]}
 * */
const mapOldToNew = (old) => {
  if (old === "wallets") {
    return ["infrastructure"];
  }
  if (old === "gaming/metaverse") {
    return ["gaming", "metaverse"];
  }
  if (old === "nft") {
    return ["creative"];
  }
  if (old === "dao") {
    return ["social-impact"];
  }
  return [old];
};

/**
 * @param {string} value
 *
 * @returns {string}
 * */
const mapValueToText = (value) => {
  const option = verticals.find((option) => option.value === value);
  return option
    ? option.text
    : value.charAt(0).toUpperCase() + value.substring(1);
};

const mappedVerticals = Object.keys(value).reduce(
  (acc, key) => [...acc, ...mapOldToNew(key)],
  [],
);

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value: mappedVerticals,
      edit,
      view: (
        <Widget
          src={`${ownerId}/widget/Tags`}
          props={{
            tags: mappedVerticals.reduce(
              (acc, key) => Object.assign(acc, { [mapValueToText(key)]: "" }),
              {},
            ),
          }}
        />
      ),
      canEdit,
    }}
  />
);
