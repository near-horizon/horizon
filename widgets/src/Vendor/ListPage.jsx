const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("vendors-sort", urlProps.sort);
  }

  return ["verified", "active", "type", "payment_type", "rate", "work"].reduce(
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
  vendors: null,
  vendorsIsFetched: false,
});

if (!state.vendorsIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/vendors?${url()}`).then(
    ({ body: vendors }) => State.update({ vendors, vendorsIsFetched: true })
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
    <h1>Contributors</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        urlFilters: state.filters,
        search: state.search,
        entity: "vendors",
        filters: {
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
      }}
    />
    <Widget
      src={`${ownerId}/widget/Vendor.ListSection`}
      props={{
        entity: "vendors",
        count: state.vendors.length,
        items: state.vendors,
        renderItem: (accountId) => (
          <Widget
            src={`${ownerId}/widget/Vendor.Card`}
            props={{ accountId, large: true }}
          />
        ),
      }}
    />
  </Container>
);
