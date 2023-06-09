const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("investors-sort", urlProps.sort);
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
    <h1>Investors</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        noFilters: true,
        search: state.search,
        entity: "investors",
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
