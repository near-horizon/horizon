const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

if (!accountId || !cid) {
  return "Cannot show the request page without an account ID and a CID!";
}

const availableContent = ["contributors", "proposals"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "contributors";
  }

  return content;
};

const need = Near.view(
  ownerId,
  "get_contribution_need",
  { account_id: accountId, cid },
  "final",
  true
);

const isAuthorized = Near.view(
  ownerId,
  "check_is_manager_or_higher",
  { entity_id: accountId, account_id: context.accountId },
  "final"
);

const needString =
  typeof need.contribution_type === "string"
    ? need.contribution_type
    : need.contribution_type.Other;

const body = (
  <div className="px-3">
    <div className="d-flex flex-row justify-content-start" id={accountId}>
      <div className="flex-grow-1 py-3">
        <div className="d-flex flex-row justify-content-between align-items-start">
          <h1 className="flex-grow-1">Need for {needString}</h1>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <a
              className="btn me-2 text-light"
              style={{
                backgroundColor: "#6941C6",
                borderColor: "#6941C6",
              }}
            // href={`https://near.social/#/${ownerId}/widget/Entity?accountId=${accountId}`}
            >
              <i className="bi-person-plus" />
              <span className="text-nowrap">Invite contributor</span>
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
        </div>
        <div>
          <div className="d-flex flex-row align-items-center text-muted me-2">
            <span className="me-2">By</span>
            <Widget
              src={`${ownerId}/widget/ProfileLine`}
              props={{ accountId, isEntity: true, update: props.update }}
            />
          </div>
          <Widget
            src={`${ownerId}/widget/ActiveIndicator`}
            props={{
              active: need.active,
              activeText: "Open for proposals",
              inactiveText: "Closed",
            }}
          />
        </div>
        <Widget
          src={`${ownerId}/widget/Tags`}
          pros={{ tags: { [needString]: "" } }}
        />
      </div>
    </div>
    <Markdown text={need.description} />
  </div>
);

const proposalsCount = Object.keys(
  Near.view(
    ownerId,
    "get_need_contribution_requests",
    { account_id: accountId, cid },
    "final",
    true
  ) ?? {}
).length;

const contributorsCount = Object.keys(
  Near.view(
    ownerId,
    "get_need_contributions",
    { account_id: accountId, cid },
    "final",
    true
  ) ?? {}
).length;

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "need",
      content: getContent(props.content),
      search: props.search,
      accountId: props.accountId,
      cid: props.cid,
      update: props.update,
      buttons: [
        {
          id: "contributors",
          text: "Contributors",
          icon: "bi-people",
          count: contributorsCount,
        },
        {
          id: "proposals",
          text: "Proposals",
          icon: "bi-person-down",
          count: proposalsCount,
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
      props={{ accountId, search: props.search, update: props.update, cid }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ accountId, search: props.search, update: props.update, cid }}
    />
  ),
}[getContent(props.content)];

return (
  <div className="">
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      {contentSelector}
      {searchBar}
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
