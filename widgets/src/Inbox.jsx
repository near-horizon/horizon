const ownerId = "contribut3.near";

const availableContent = ["proposals", "invitations"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "proposals";
  }

  return content;
};

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

const header = (
  <div>
    <h1 className="fs-2">Inbox</h1>
    <p className="fw-semibold fs-5 text-muted">
      Manage invitations and proposals
    </p>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "inbox",
      content: getContent(props.content),
      search: props.search,
      update: (content) => props.update({ content }),
      buttons: [
        {
          id: "proposals",
          text: "Proposals",
          icon: "bi-person-plus",
          count: proposalsCount,
        },
        {
          id: "invitations",
          text: "Invitations",
          icon: "bi-person-up",
          count: invitesCount,
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
  proposals: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
}[getContent(state.content)];

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
