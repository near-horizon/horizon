const ownerId = "nearhorizon.near";

/** @type {{text:string;value:string}[]} */
const options = [
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
  { text: "Other", value: "other" },
];

/**
 * @param {string} old
 *
 * @returns {string[]}
 * */
const mapOldToNew = (old) => {
  switch (old) {
    case "wallets":
      return ["infrastructure"];
    case "gaming/metaverse":
      return ["gaming", "metaverse"];
    case "nft":
      return ["creative"];
    case "dao":
      return ["social-impact"];
    default:
      return [old];
  }
};

/**
 * @param {string} value
 *
 * @returns {{text:string;value:string}}
 * */
const mapValueToOption = (value) => {
  const option = options.find((option) => option.value === value);
  return option ?? { text: value, value };
};

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Category *",
      noLabel: props.noLabel,
      placeholder: "Wallets",
      options,
      value: props.category,
      onChange: (category) => props.update(category),
      validate: () => {
        if (!props.category) {
          props.setError("Please select a category");
        }

        if (!options.find(({ value }) => props.category.value === value)) {
          props.setError("Please select a valid category");
        }
      },
      error: props.error,
    }}
  />
);
