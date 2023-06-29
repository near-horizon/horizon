const ownerId = "nearhorizon.near";

return (
  <Widget
    src={`${ownerId}/widget/Layout.ListPage`}
    props={{
      descriptor: "projects",
      title: "Projects",
      urlProps: props.urlProps,
      entity: "projects",
      filters: [
        "vertical",
        "readiness",
        "size",
        "integration",
        "dev",
        "stage",
        "distribution",
      ],
      renderItem: (accountId) => (
        <Widget
          src={`${ownerId}/widget/Project.Card`}
          props={{
            accountId,
            large: true,
          }}
        />
      ),
    }}
  />
);
