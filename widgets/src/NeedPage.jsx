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

State.init({
  need: null,
  needFetched: false,
  proposalsCount: 0,
  proposalsCountFetched: false,
  contributorsCount: 0,
  contributorsCountFetched: false,
});

if (!state.needFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution_need",
    { account_id: accountId, cid },
    "final",
    false
  ).then((need) => State.update({ need, needFetched: true }));
}

if (!state.proposalsCountFetched) {
  Near.asyncView(
    ownerId,
    "get_need_contribution_requests",
    { account_id: accountId, cid },
    "final",
    false
  ).then((proposals) =>
    State.update({
      proposalsCount: proposals.length,
      proposalsCountFetched: true,
    })
  );
}

if (!state.contributorsCountFetched) {
  Near.view(
    ownerId,
    "get_need_contributions",
    { account_id: accountId, cid },
    "final",
    false
  ).then((contributors) =>
    State.update({
      contributorsCount: contributors.length,
      contributorsCountFetched: true,
    })
  );
}

const needString =
  typeof state.need.contribution_type === "string"
    ? state.need.contribution_type
    : state.need.contribution_type.Other;

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
              // href={`/#/${ownerId}/widget/Entity?accountId=${accountId}`}
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
              active: state.need.active,
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
    <Markdown text={state.need.description} />
  </div>
);

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
          count: state.contributorsCount,
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 2.8898C14.5679 3.50343 15.4165 4.77762 15.4165 6.25C15.4165 7.72238 14.5679 8.99657 13.3332 9.6102M14.9998 13.972C16.2594 14.5419 17.3936 15.4708 18.3332 16.6667M1.6665 16.6667C3.28858 14.6021 5.49082 13.3333 7.9165 13.3333C10.3422 13.3333 12.5444 14.6021 14.1665 16.6667M11.6665 6.25C11.6665 8.32107 9.98757 10 7.9165 10C5.84544 10 4.1665 8.32107 4.1665 6.25C4.1665 4.17893 5.84544 2.5 7.9165 2.5C9.98757 2.5 11.6665 4.17893 11.6665 6.25Z"
                stroke="#475467"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
        {
          id: "proposals",
          text: "Proposals",
          count: state.proposalsCount,
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 7.5L13.3333 5M13.3333 5L15.8333 2.5M13.3333 5L18.3333 5M13.3333 17.5V16.5C13.3333 15.0999 13.3333 14.3998 13.0608 13.865C12.8211 13.3946 12.4387 13.0122 11.9683 12.7725C11.4335 12.5 10.7334 12.5 9.33329 12.5H5.66663C4.26649 12.5 3.56643 12.5 3.03165 12.7725C2.56124 13.0122 2.17879 13.3946 1.93911 13.865C1.66663 14.3998 1.66663 15.0999 1.66663 16.5V17.5M10.4166 6.25C10.4166 7.86083 9.11079 9.16667 7.49996 9.16667C5.88913 9.16667 4.58329 7.86083 4.58329 6.25C4.58329 4.63917 5.88913 3.33333 7.49996 3.33333C9.11079 3.33333 10.4166 4.63917 10.4166 6.25Z"
                stroke="#667085"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      ],
    }}
  />
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
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
