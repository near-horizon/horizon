const ownerId = "contribut3.near";

const createNewButton = ({ id, text, icon, kind }) => (
  <li>
    <a
      className="dropdown-item"
      href={`https://near.social/#/${ownerId}/widget/Index?tab=create&content=${id}${kind ? "&kind=" + kind : ""
        }`}
      onClick={() => props.update({ tab: "create", content: id, kind })}
    >
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

return (
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
