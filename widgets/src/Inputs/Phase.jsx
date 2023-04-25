const ownerId = "contribut3.near";

const options = [
  { text: "Idea stage", value: "idea" },
  { text: "Testnet launched", value: "testnet" },
  { text: "Mainnet launched", value: "mainnet" },
  { text: "Scaling startup", value: "scaling" },
  { text: "Established business", value: "established" },
];

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Development phase *",
      noLabel: props.noLabel,
      placeholder: "Testnet launched",
      options,
      value: props.dev,
      onChange: (dev) => props.update(dev),
    }}
  />
);
