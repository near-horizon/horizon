const ownerId = "contribut3.near";

State.init({
  selected: props.tab ?? "dashboard",
});

const navItem = ({ text, icon, id }) => (
  <a
    className={`nav-link mt-2 rounded-3 p-2 ${id === state.selected ? "bg-secondary" : ""
      }`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=${id}`}
    onClick={() => {
      State.update({ selected: id });
      props.update && props.update(id);
    }}
  >
    <i className={icon} />
    <span>{text}</span>
  </a>
);

return (
  <div className="d-flex flex-column">
    <a className="mb-4">
      <h4>
        <i className="bi-triangle" />
        Web3 Combinator
      </h4>
    </a>
    {navItem({
      text: "Dashboard",
      icon: "bi-house",
      id: "dashboard",
    })}
    {navItem({ text: "Profile", link: "#", icon: "bi-person", id: "profile" })}
    {navItem({
      text: "Inbox",
      icon: "bi-envelope",
      id: "inbox",
    })}
    {navItem({
      text: "My entities",
      icon: "bi-diagram-2",
      id: "entities",
    })}
    {navItem({
      text: "My contributions",
      icon: "bi-ui-checks-grid",
      id: "contributions",
    })}
    <hr className="border-2" />
    {navItem({
      text: "About this app",
      icon: "bi-info-square",
      id: "about",
    })}
  </div>
);
