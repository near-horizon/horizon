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
    {}
  );
};

const selected = () => {
  const selectedKeys = Object.keys(state.filters);
  return (
    selectedKeys.length > 0 &&
    selectedKeys.some((key) => state.filters[key].size > 0)
  );
};

const url = () => {
  const urlString = "";

  if (selected()) {
    const selectedKeys = Object.keys(state.filters);

    urlString += selectedKeys
      .map((key) => {
        const values = Array.from(state.filters[key]);
        return `${key}=${values.join(",")}`;
      })
      .join("&");
  }

  if (state.search) {
    if (urlString.length > 0) {
      urlString += "&";
    }
    urlString += `q=${state.search}`;
  }

  if (state.sort) {
    urlString += `&sort=${state.sort}`;
  }

  return urlString;
};

State.init({
  filters: getFilters(),
  search: urlProps.q,
  sort: urlProps.sort,
  requests: null,
  requestsIsFetched: false,
});

if (!state.requestsIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/requests?${url()}`).then(
    ({ body: requests }) => State.update({ requests, requestsIsFetched: true })
  );

  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  gap: 2em;

  & > h1 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  }
`;

return (
  <Container>
    <h1>Contribution requests</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        urlFilters: state.filters,
        search: state.search,
        entity: "requests",
        filters: {
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
        quickFilters: [
          { text: "Credits", value: "credits", key: "source" },
          { text: "One time", value: "onetime", key: "type" },
          { text: "Flat rate", value: "flatrate", key: "payment" },
          { text: "Full time", value: "fulltime", key: "type" },
        ],
      }}
    />
    <Widget
      src={`${ownerId}/widget/Request.ListSection`}
      props={{
        entity: "requests",
        count: state.requests.length,
        items: state.requests,
        renderItem: ([accountId, cid]) => (
          <Widget
            src={`${ownerId}/widget/Request.Card`}
            props={{ accountId, cid, large: true }}
          />
        ),
      }}
    />
  </Container>
);
