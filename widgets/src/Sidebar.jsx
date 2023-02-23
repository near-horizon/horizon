const ownerId = "contribut3.near";

const proposalsCount = (
  Near.view(
    ownerId,
    "get_admin_contribution_requests",
    { account_id: context.accountId },
    "final",
    true
  ) ?? []
).length;

const invitesCount = Object.keys(
  Near.view(
    ownerId,
    "get_contributor_invites",
    { account_id: context.accountId },
    "final",
    true
  ) ?? {}
).length;

const inboxCount = proposalsCount + invitesCount;

const navItem = ({ text, icon, id, count }) => (
  <a
    className={`nav-link mt-2 rounded-3 p-2 ${id === props.tab ? "bg-secondary" : ""
      }`}
    href={`https://near.social/#/${ownerId}/widget/Index?tab=${id}`}
    onClick={() => props.update({ tab: id, content: "", search: "" })}
  >
    <i className={icon} />
    <span>{text}</span>
    {!!count && count > 0 ? (
      <div
        className="d-inline-block rounded-circle bg-danger text-center"
        style={{ minWidth: "1.5em", height: "1.5em", color: "#FFF" }}
      >
        {count}
      </div>
    ) : (
      <></>
    )}
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
    {navItem({
      text: "Inbox",
      icon: "bi-envelope",
      id: "inbox",
      count: inboxCount,
    })}
    {navItem({
      text: "Manage",
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
    <a className="nav-link mt-2 rounded-3 p-2" href="https://near.social/#/">
      <i className="bi-escape" />
      <span>Exit application</span>
    </a>
  </div>
);
