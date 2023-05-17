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
 * @returns {{text:string;value:string}}
 * */
const mapValueToOption = (value) => {
  const option = options.find((option) => option.value === value);
  return (
    option ?? {
      text: value.charAt(0).toUpperCase() + value.substring(1),
      value,
    }
  );
};

/**
 * @param {{text:string;value?:string;customOption?:boolean;}} option
 * @returns {string}
 * */
const mapOptionToValue = (option) => {
  return option.customOption ? option.text.toLowerCase() : option.value;
};

return (
  <Widget
    src={`${ownerId}/widget/Inputs.MultiSelect`}
    props={{
      label: "Verticals *",
      noLabel: props.noLabel,
      placeholder: "Start typing",
      options,
      labelKey: "text",
      value: props.verticals
        .reduce((acc, value) => [...acc, ...mapOldToNew(value)], [])
        .map(mapValueToOption),
      onChange: (verticals) => props.update(verticals.map(mapOptionToValue)),
      validate: () => {
        if (!props.verticals) {
          props.setError("Please select a vertical");
        }
        if (
          !mapOldToNew(props.verticals).every((vertical) =>
            options.find(({ value }) => vertical === value)
          )
        ) {
          props.setError("Please select a valid vetical");
        }
      },
      error: props.error,
    }}
  />
);
