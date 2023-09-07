const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("requests-sort", urlProps.sort);
  }

  return ["tags", "type", "payment", "source", "budget", "stage"].reduce(
    (acc, key) =>
      urlProps[key]
        ? Object.assign(acc, {
            [key]: new Set(urlProps[key].split(",")),
          })
        : acc,
    {},
  );
};

return (
  <Widget
    src={`${ownerId}/widget/Layout.ListPage`}
    props={{
      descriptor: "requests",
      title: "Contribution requests",
      entity: "requests",
      urlProps: props.urlProps,
      filters: ["tags", "type", "payment", "source", "budget", "stage"],
      filterOptions: {
        first: {
          text: "Tags",
          value: "tags",
          options: [],
        },
        second: [
          {
            text: "Request type",
            value: "type",
            options: [
              { text: "One time", value: "onetime" },
              { text: "Short", value: "short" },
              { text: "Long", value: "long" },
              { text: "Full time", value: "fulltime" },
            ],
          },
          {
            text: "Payment type",
            value: "payment",
            options: [
              { text: "Flat rate", value: "flatrate" },
              { text: "Time based", value: "timebased" },
            ],
          },
          {
            text: "Payment source",
            value: "source",
            options: [
              { text: "Credits", value: "credits" },
              { text: "Other", value: "other" },
            ],
          },
          {
            text: "Budget",
            value: "budget",
            options: [
              { text: "0 - 100", value: "0-100" },
              { text: "100 - 1000", value: "100-1000" },
              { text: "1000 - 10000", value: "1000-10000" },
              { text: "10000 - 100000", value: "10000-100000" },
            ],
          },
        ],
      },
      renderItem: ([accountId, cid]) => (
        <Widget
          src={`${ownerId}/widget/Request.Card`}
          props={{ accountId, cid, large: true }}
        />
      ),
    }}
  />
);
