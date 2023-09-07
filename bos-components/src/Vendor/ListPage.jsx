const ownerId = "nearhorizon.near";

return (
  <Widget
    src={`${ownerId}/widget/Layout.ListPage`}
    props={{
      descriptor: "contributors",
      title: "Contributors",
      urlProps: props.urlProps,
      entity: "vendors",
      filters: ["verified", "active", "type", "payment_type", "rate", "work"],
      filterOptions: {
        first: {
          text: "Verification",
          value: "verified",
          options: [
            { text: "Verified", value: "true" },
            { text: "Unverified", value: "false" },
          ],
        },
        second: [
          {
            text: "Status",
            value: "active",
            options: [
              { text: "Active", value: "true" },
              { text: "Inactive", value: "false" },
            ],
          },
          {
            text: "Type",
            value: "type",
            options: [
              { text: "Individual", value: "individual" },
              { text: "Organization", value: "organization" },
            ],
          },
          {
            text: "Payment type",
            value: "payment_type",
            options: [
              { text: "Fiat", value: "fiat" },
              { text: "Crypto", value: "crypto" },
              { text: "Credits", value: "credits" },
            ],
          },
          {
            text: "Rate",
            value: "rate",
            options: [
              { text: "1-10", value: "1-10" },
              { text: "10-100", value: "10-100" },
              { text: "100-1000", value: "100-1000" },
            ],
          },
          {
            text: "Work type",
            value: "work",
            options: [
              { text: "One time", value: "onetime" },
              { text: "Short", value: "short" },
              { text: "Long", value: "long" },
              { text: "Full time", value: "fulltime" },
            ],
          },
        ],
      },
      renderItem: (accountId) => (
        <Widget
          src={`${ownerId}/widget/Vendor.Card`}
          props={{
            accountId,
            large: true,
          }}
        />
      ),
    }}
  />
);
