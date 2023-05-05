const ownerId = "nearhorizon.near";

const options = [
  { text: "Yes", value: "yes" },
  { text: "Partial", value: "partial" },
  { text: "No", value: "no" },
];

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Is your project open source?",
      noLabel: props.noLabel,
      placeholder: "Yes",
      options,
      value: props.oss,
      onChange: (oss) => props.update(oss),
      validate: () => {
        if (!props.oss) {
          props.setError("Please select a valid option");
        }

        if (!options.find(({ value }) => props.oss.value === value)) {
          props.setError("Please select a valid option");
        }
      },
      error: props.error,
    }}
  />
);
