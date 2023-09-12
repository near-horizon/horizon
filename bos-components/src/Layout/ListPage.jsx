const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const urlProps = props.urlProps ?? {};
const entity = props.entity ?? "projects";
const filters = props.filters ?? [];
const renderItem = props.renderItem ?? ((item) => JSON.stringify(item));
const title = props.title ?? "Projects";

const getFilters = () => {
  if (urlProps.sort) {
    Storage.set(`${entity}-sort`, urlProps.sort);
  }

  return filters.reduce(
    (acc, key) =>
      urlProps[key]
        ? Object.assign(acc, {
            [key]: new Set(urlProps[key].split(",")),
          })
        : acc,
    {},
  );
};

const selected = (options) => {
  const selectedKeys = Object.keys(options);
  return (
    selectedKeys.length > 0 && selectedKeys.some((key) => options[key].size > 0)
  );
};

const url = ({ filters, sort }) => {
  const urlString = "";

  const options =
    Object.keys(filters ?? {}).length > 0 ? filters : state.filters;

  if (selected(options)) {
    const selectedKeys = Object.keys(options);

    urlString += selectedKeys
      .map((key) => {
        const values = Array.from(options[key]);
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

  const sortOption = state.sort ?? sort;

  if (sortOption) {
    urlString += `&sort=${sortOption}`;
  }

  return urlString;
};

State.init({
  filters: getFilters(),
  search: urlProps.q,
  sort: urlProps.sort,
  items: null,
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  asyncFetch(`${apiUrl}/data/${entity}?${url()}`).then(({ body: items }) =>
    State.update({ items, itemsIsFetched: true }),
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
    <h1>{title}</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        urlFilters: state.filters,
        search: state.search,
        url,
        entity,
        filters: props.filterOptions,
        change: ({ filters, search }) => {
          State.update({ filters, search, itemsIsFetched: false });
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Layout.ListSection`}
      props={{
        entity,
        count: state.items.length,
        items: state.items,
        sort: state.sort,
        url,
        descriptor: props.descriptor,
        onSort: (sort) => {
          State.update({ sort, itemsIsFetched: false });
        },
        renderItem,
      }}
    />
  </Container>
);
