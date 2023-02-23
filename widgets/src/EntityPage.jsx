const ownerId = "contribut3.near";
const accountId = props.accountId;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

const availableContent = [
  "proposals",
  "invitations",
  "requests",
  "contributions",
  "contributors",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "requests";
  }

  return content;
};

State.init({
  contributionFormHidden: false,
});

const entity = Near.view(
  ownerId,
  "get_entity",
  { account_id: accountId },
  "final"
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: accountId, account_id: context.accountId },
  "final"
);

const contributions = Near.view(
  ownerId,
  "get_entity_contributions",
  { account_id: accountId },
  "final"
);

const [founder] = Object.keys(contributions ?? {}).filter((contribution) => {
  const details = contributions[contribution];
  const all = [...details.history, details.current];
  return all.some((detail) => detail.description === "");
});

const profile = Social.getr(`${accountId}/profile`);

const controls = isAuthorized ? (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <a className="btn btn-outline-secondary me-2" style={{ width: "8em" }}>
      <i className="bi-pencil-square" />
      <span>Edit project</span>
    </a>
    <Widget
      src={`${ownerId}/widget/CardMenu`}
      props={{
        update: props.update,
        items: [
          {
            text: "Create new request",
            icon: "bi-boxes",
          },
          {
            text: "Invite contributors",
            icon: "bi-person-plus",
          },
          {
            text: "Delete project",
            icon: "bi-trash",
          },
        ],
      }}
    />
  </div>
) : (
  <div className="d-flex flex-column justify-content-start align-items-stretch">
    <a
      className="btn btn-success me-2 text-light"
      style={{ width: "13em" }}
      onClick={() => State.update({ contributionFormHidden: false })}
    >
      <i className="bi-person-up" />
      <span className="text-nowrap">Propose contribution</span>
    </a>
    <Widget
      src={`${ownerId}/widget/ContributionRequestForm`}
      props={{
        id: `${accountId}ContributionRequestForm`,
        entity: accountId,
        hidden: state.contributionFormHidden,
        onClose: () => State.update({ contributionFormHidden: true }),
      }}
    />
  </div>
);

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={accountId}>
      <div className="flex-grow-1 py-3">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId,
            isEntity: true,
            imageSize: "4em",
            update: props.update,
            additionalColumn: controls,
            additionalRow: (
              <>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <span className="text-muted me-2">
                    Created{" "}
                    {new Date(
                      Number(contributor.start_date)
                    ).toLocaleDateString()}
                  </span>
                  <Widget
                    src={`${ownerId}/widget/ActiveIndicator`}
                    props={{ active: contributor.status === "Active" }}
                  />
                </div>
                <Widget
                  src={`${ownerId}/widget/Tags`}
                  pros={{ tags: profile.tags }}
                />
              </>
            ),
          }}
        />
      </div>
    </div>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: profile.description }}
    />
    <div className="d-flex flex-row justify-content-between align-items-center">
      <Widget
        src={`${ownerId}/widget/SocialLinks`}
        props={{ links: profile.linktree ?? {} }}
      />
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{ accountId: founder }}
      />
    </div>
  </div>
);

const proposalsCount = (
  Near.view(
    ownerId,
    "get_entity_contribution_requests",
    { entity_id: accountId },
    "final",
    true
  ) ?? []
).length;

const invitesCount = Object.keys(
  Near.view(
    ownerId,
    "get_entity_invites",
    { account_id: accountId },
    "final",
    true
  ) ?? {}
).length;

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entity",
      content: getContent(props.content),
      search: props.search,
      accountId: props.accountId,
      update: (content) => props.update({ content }),
      buttons: [
        {
          id: "requests",
          text: "Requests",
          icon: "bi-boxes",
        },
        isAuthorized
          ? {
            id: "proposals",
            text: "Proposals",
            icon: "bi-person-down",
            count: contributorsCount,
          }
          : null,
        isAuthorized
          ? {
            id: "invitations",
            text: "Invitations",
            icon: "bi-hourglass",
            count: contributorsCount,
          }
          : null,
        {
          id: "contributions",
          text: "Contributes to",
          icon: "bi-person-up",
        },
        {
          id: "contributors",
          text: "Contributors",
          icon: "bi-people",
        },
      ].filter((x) => x !== null),
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
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ContributionRequestList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{
        accountId,
        isEntity: true,
        search: props.search,
        update: props.update,
      }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
  invitations: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ accountId, search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      {contentSelector}
      {searchBar}
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
