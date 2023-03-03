const ownerId = "contribut3.near";
const accountId = props.accountId;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

State.init({
  inviteFormHidden: true,
});

const contributor = Near.view(
  ownerId,
  "get_contributor",
  { account_id: accountId },
  "final"
);

const contributions = Near.view(
  ownerId,
  "get_contributor_contributions",
  { account_id: accountId },
  "final"
);

const profile = Social.getr(`${accountId}/profile`);

const controls = (
  <div className="d-flex flex-column justify-content-start align-items-stretch">
    <a
      className="btn me-2 mb-2 text-light"
      style={{
        backgroundColor: "#6941C6",
        borderColor: "#6941C6",
      }}
      onClick={() => State.update({ inviteFormHidden: false })}
    >
      <i className="bi-person-plus" />
      <span className="text-nowrap">Invite to contribute</span>
    </a>
    <a
      className="btn btn-success me-2 text-light"
      style={{ width: "13em" }}
      href={`/#/mob.near/widget/ProfilePage?accountId=${accountId}`}
    >
      <i className="bi-code" />
      <span className="text-nowrap">View Social profile</span>
    </a>
    <Widget
      src={`${ownerId}/widget/InviteForm`}
      props={{
        id: `${accountId}InviteForm`,
        accountId,
        hidden: state.inviteFormHidden,
        onClose: () => State.update({ inviteFormHidden: true }),
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
            imageSize: "5em",
            isEntity: false,
            update: props.update,
            additionalColumn: controls,
            additionalRow: (
              <>
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <Widget
                    src={`${ownerId}/widget/ActiveIndicator`}
                    props={{
                      active: contributor.looking_for_work,
                      activeText: "Available",
                      inactiveText: "Not available",
                    }}
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
    <Markdown text={contributor.resume || profile.description} />
    <div className="d-flex flex-row justify-content-start align-items-center">
      <Widget
        src={`${ownerId}/widget/SocialLinks`}
        props={{ links: profile.linktree ?? {} }}
      />
    </div>
  </div>
);

return (
  <div>
    <div className="mb-5">{body}</div>
    <div className="d-flex flex-row justify-content-between ps-3">
      <span className="fw-bold fs-4">Conrtibutes to</span>
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
    </div>
    <div className="px-3 pt-3">
      <Widget
        src={`${ownerId}/widget/ContributionList`}
        props={{
          accountId: props.accountId,
          search: props.search,
          update: props.update,
        }}
      />
    </div>
  </div>
);
