const ownerId = "nearhorizon.near";

return (
  <Widget
    src={`${ownerId}/widget/Layout.ListPage`}
    props={{
      descriptor: "backers",
      title: "Backers",
      entity: "investors",
      urlProps: props.urlProps,
      filters: ["vertical"],
      filterOptions: {
        first: {
          text: "Vertical",
          value: "vertical",
          options: [
            { text: "DeSci", value: "desci" },
            { text: "DeFi", value: "defi" },
            { text: "Gaming", value: "gaming" },
            { text: "Metaverse", value: "metaverse" },
            { text: "Commercial", value: "commercial" },
            {
              text: "Sports and Entertainment",
              value: "sports-and-entertainment",
            },
            { text: "Infrastructure", value: "infrastructure" },
            { text: "Social", value: "social" },
            { text: "Social Impact", value: "social-impact" },
            { text: "Creative", value: "creative" },
            { text: "Education", value: "education" },
          ],
        },
        second: [],
      },
      renderItem: (accountId) => (
        <Widget
          src={`${ownerId}/widget/Investor.Card`}
          props={{ accountId, large: true }}
        />
      ),
    }}
  />
);
