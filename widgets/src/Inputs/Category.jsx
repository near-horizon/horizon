const ownerId = "contribut3.near";

const options = [
  { text: "Wallets", value: "wallets" },
  { text: "Gaming/Metaverse", value: "gaming/metaverse" },
  { text: "DeSci", value: "desci" },
  { text: "Infrastructure", value: "infrastructure" },
  { text: "NFT", value: "nft" },
  { text: "DAO", value: "dao" },
  { text: "Social impact", value: "social-impact" },
  { text: "Web2 expansion", value: "web2" },
  { text: "Web3 Product Partner", value: "web3-product-partner" },
];

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Project category *",
      noLabel: props.noLabel,
      placeholder: "Wallets",
      options,
      value: props.category,
      onChange: (category) => props.update(category),
    }}
  />
);
