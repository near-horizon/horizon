const ownerId = "contribut3.near";

const availableContent = ["projects", "proposals", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "proposals";
  }

  return content;
};

const header = (
  <div>
    <h1 className="fs-2">Manage</h1>
    <p className="fw-semibold fs-5 text-muted">
      Create, edit and manage your projects and contributions
    </p>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entities",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "proposals",
          text: "My Proposals",
          icon: "bi-person-up",
        },
        {
          id: "projects",
          text: "My Projects",
          icon: "bi-boxes",
        },
        {
          id: "requests",
          text: "Requests",
          icon: "bi-ui-checks-grid",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ProposalsList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
      }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
        isAdmin: true,
      }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
        <Widget
          src={`${ownerId}/widget/CreateNewInput`}
          props={{ update: props.update }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">
      {context.accountId
        ? content
        : "You need to be logged in to view this page!"}
    </div>
  </div>
);
