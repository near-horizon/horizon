
const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

return (
  <div className="d-flex flex-row w-100 align-items-end">
    <div className="d-inline-block">
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start me-2",
          style: { maxWidth: "1.5em" },
        }}
      />
    </div>
    <div className="me-2 profile-name text-truncate">
      {name || "No-name profile"}
    </div>
    <div className="profile-account text-secondary text-truncate">
      @{accountId}
    </div>
  </div>
);