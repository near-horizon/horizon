const ownerId = "contribut3.near";

const availableContent = ["projects", "contributors", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const header = (
  <div>
    <h1 className="fs-3">Find projects, contributors or requests</h1>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "home",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "projects",
          text: "Projects",
          icon: "bi-boxes",
        },
        {
          id: "contributors",
          text: "Contributors",
          icon: "bi-person",
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
      src={`${ownerId}/widget/EntityList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ search: props.search, update: props.update }}
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
    <div className="px-3 pt-3">{content}</div>
  </div>
);
