const ownerId = "nearhorizon.near";

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
      validate: () => {
        if (!props.dev) {
          props.setError("Please select a development phase");
        }

        if (!options.find(({ value }) => props.dev.value === value)) {
          props.setError("Please select a valid development phase");
        }
      },
      error: props.error,
    }}
  />
);
