const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("vendors-sort", urlProps.sort);
  }
};

const url = () => {
  const urlString = "";

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

getFilters();

State.init({
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
        noFilters: true,
        search: state.search,
        entity: "vendors",
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
