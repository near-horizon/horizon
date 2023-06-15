const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("investors-sort", urlProps.sort);
  }

  return ["vertical"].reduce(
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
  investors: null,
  investorsIsFetched: false,
});

if (!state.investorsIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/investors?${url()}`).then(
    ({ body: investors }) =>
      State.update({ investors, investorsIsFetched: true })
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
    <h1>Backers</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        urlFilters: state.filters,
        search: state.search,
        entity: "investors",
        change: ({ filters, search }) => {
          State.update({ filters, search, vendorsIsFetched: false });
        },
        filters: {
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
      }}
    />
    <Widget
      src={`${ownerId}/widget/Investor.ListSection`}
      props={{
        entity: "investors",
        count: state.investors.length,
        items: state.investors,
        renderItem: (accountId) => (
          <Widget
            src={`${ownerId}/widget/Investor.Card`}
            props={{ accountId, large: true }}
          />
        ),
      }}
    />
  </Container>
);
