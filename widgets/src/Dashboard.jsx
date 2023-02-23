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
    <h1 className="fs-2">Dashboard</h1>
    <p className="fw-semibold fs-5 text-muted">
      Find projects, contributors or requests
    </p>
  </div>
);

const createNewButton = ({ id, text, icon, kind }) => (
  <li>
    <a
      className="dropdown-item"
      href={`https://near.social/#/${ownerId}/widget/Index?tab=create&content=${id}${kind ? "&kind=" + kind : ""
        }`}
      onClick={() => props.update("create")}
    >
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

const createNewDropdown = (
  <div className="dropdown">
    <a
      className="btn btn-info dropdown-toggle"
      style={{ backgroundColor: "#7f56d9", borderColor: "#7f56d9" }}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Create new...
    </a>
    <ul className="dropdown-menu">
      {createNewButton({
        id: "request",
        text: "Contribution request",
        icon: "bi-ui-checks-grid",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {createNewButton({
        id: "entity",
        text: "Project",
        icon: "bi-boxes",
        kind: "Project",
      })}
      <li>
        <hr className="dropdown-divider" />
      </li>
      {createNewButton({
        id: "entity",
        text: "Organization",
        icon: "bi-diagram-2",
        kind: "Organization",
      })}
    </ul>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "dashboard",
      content: getContent(props.content),
      search: props.search,
      update: (content) => props.update({ content }),
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

const searchBar = (
  <div className="w-25 col-12 col-md-10 col-lg-8">
    <div className="card card-sm">
      <div className="card-body row p-0 ps-2 align-items-center">
        <div className="col-auto pe-0 me-0">
          <i className="bi-search" />
        </div>
        <div className="col ms-0">
          <input
            className="form-control border-0"
            type="search"
            value={props.search}
            placeholder="Search"
            onChange={(e) => props.update({ search: e.target.value })}
          />
        </div>
      </div>
    </div>
  </div>
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
        {createNewDropdown}
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        {searchBar}
      </div>
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
