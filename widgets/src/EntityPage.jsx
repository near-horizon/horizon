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
  "graph",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "requests";
  }

  return content;
};

State.init({
  contributionFormHidden: true,
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

const founders =
  Near.view(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    true
  ) || [];

const profile = Social.getr(`${accountId}/profile`);

const controls = isAuthorized ? (
  <div className="d-flex flex-row justify-content-between align-items-center">
    <a
      className="btn btn-outline-secondary me-2"
      style={{ width: "8em" }}
      href={`https://near.social/#/${ownerId}/widget/Index?tab=create&content=entity&accountId=${accountId}`}
      onClick={() =>
        props.update({ tab: "create", content: "entity", accountId })
      }
    >
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
            href: `https://near.social/#/${ownerId}/widget/Index?tab=create&content=request&accountId=${accountId}`,
            onClick: () =>
              props.update({ tab: "create", content: "request", accountId }),
          },
          // {
          //   text: "Invite contributors",
          //   icon: "bi-person-plus",
          // },
          // {
          //   text: "Delete project",
          //   icon: "bi-trash",
          // },
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
      <div>
        {founders.map((founder) => (
          <Widget
            src={`${ownerId}/widget/ProfileLine`}
            props={{
              accountId: founder,
              isEntity: false,
              update: props.update,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const proposalsCount = Object.keys(
  Near.view(
    ownerId,
    "get_entity_contribution_requests",
    { account_id: accountId },
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
      update: props.update,
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
          text: "In-Graph",
          icon: "bi-person-up",
        },
        {
          id: "graph",
          text: "Out-Graph",
          icon: "bi-ui-checks-grid",
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
  graph: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{
        accountId,
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
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
