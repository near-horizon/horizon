const ownerId = "contribut3.near";

State.init({
  content: props.content ?? "proposals",
  search: props.search ?? "",
});

const header = (
  <div>
    <h1 className="fs-2">Inbox</h1>
    <p className="fw-semibold fs-5 text-muted">
      Manage invitations and proposals
    </p>
  </div>
);

const contentSelectButton = ({ id, text, icon }) => (
  <a
    className={`btn ${state.content === id ? "btn-secondary" : "btn-outline-secondary"
      }`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=dashboard&content=${id}${props.search ? "&search=" + props.search : ""
      }`}
    onClick={() => State.update({ content: id })}
  >
    <i className={icon} />
    <span>{text}</span>
  </a>
);

const contentSelector = (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {contentSelectButton({
      id: "proposals",
      text: "Proposals",
      icon: "bi-person-plus",
    })}
    {contentSelectButton({
      id: "invitations",
      text: "Invitations",
      icon: "bi-person-up",
    })}
  </div>
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
            value={state.search}
            placeholder="Search"
            onChange={(e) => State.update({ search: e.target.value })}
          />
        </div>
      </div>
    </div>
  </div>
);

const content = {
  proposals: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
}[state.content];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        {searchBar}
      </div>
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
