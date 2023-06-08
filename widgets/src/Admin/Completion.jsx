const ownerId = "nearhorizon.near";

State.init({
  projectsAvg: 0,
  projects: [],
  vendors: [],
  backers: [],
  completionIsFetched: false,
});

if (!state.completionIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/projects/completion`).then(
    ({ body }) => {
      State.update({
        projectsAvg: body.avg,
        projects: body.list,
        completionIsFetched: true,
      });
    }
  );
  return <>Loading...</>;
}

return (
  <>
    <span>
      Avarage project completion:{" "}
      {Number(state.projectsAvg).toLocaleString("en-US", { style: "percent" })}
    </span>
    <Widget
      src={`${ownerId}/widget/List`}
      props={{
        filter: () => true,
        items: state.projects,
        full: true,
        createItem: ({ id, completion }) => (
          <Widget
            src={`${ownerId}/widget/Admin.CompletionCard`}
            props={{ accountId: id, completion }}
          />
        ),
      }}
    />
  </>
);
