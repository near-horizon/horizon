const ownerId = "nearhorizon.near";

/** @type {{text:string;value:string}[]} */
const options = [
  { text: "DAO", value: "dao" },
  { text: "NFT", value: "nft" },
  { text: "AI", value: "ai" },
  { text: "Tooling", value: "tooling" },
  // { text: "Other", value: "other" },
];

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
      label: "Product type *",
      noLabel: props.noLabel,
      placeholder: "Start typing",
      options,
      labelKey: "text",
      value: props.productType.map(mapValueToOption),
      onChange: (productType) =>
        props.update(productType.map(mapOptionToValue)),
      validate: () => {
        if (!props.productType) {
          props.setError("Please select a product type");
        }
        if (
          !props.productType.every((productType) =>
            options.find(({ value }) => productType === value)
          )
        ) {
          props.setError("Please select a valid product type");
        }
      },
      error: props.error,
    }}
  />
);
