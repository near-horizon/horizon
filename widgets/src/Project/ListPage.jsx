const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const getFilters = () => {
  if (urlProps.sort) {
    Storage.set("projects-sort", urlProps.sort);
  }

  return [
    "vertical",
    "readiness",
    "size",
    "integration",
    "dev",
    "stage",
    "distribution",
  ].reduce(
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
  projects: null,
  projectsIsFetched: false,
});

if (!state.projectsIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/projects?${url()}`).then(
    ({ body: projects }) => State.update({ projects, projectsIsFetched: true })
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
    <h1>Projects</h1>
    <Widget
      src={`${ownerId}/widget/Inputs.Filters`}
      props={{
        urlFilters: state.filters,
        search: state.search,
        entity: "projects",
        change: ({ filters, search }) => {
          State.update({ filters, search, projectsIsFetched: false });
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Project.ListSection`}
      props={{
        entity: "projects",
        count: state.projects.length,
        items: state.projects,
        renderItem: (accountId) => (
          <Widget
            src={`${ownerId}/widget/Project.Card`}
            props={{ accountId, large: true }}
          />
        ),
      }}
    />
  </Container>
);
