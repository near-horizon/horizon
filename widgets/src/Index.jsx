const ownerId = "contribut3.near";

initState({
  search: "",
  content: props.content ?? "entities",
});

const isModerator = Near.view(
  ownerId,
  "check_is_moderator",
  { account_id: context.accountId },
  "final",
  true
);

const isContributor = Near.view(
  ownerId,
  "check_is_contributor",
  { account_id: context.accountId },
  "final",
  true
);

const editorForm = ({ formName }) => (
  <div
    className="collapse"
    id={`collapse${formName}Form`}
    data-bs-parent="#accordion"
  >
    <Widget src={`${ownerId}/widget/${formName}Form`} />
  </div>
);

const editorsFooter = props.isPreview ? null : (
  <div className="row" id="accordion">
    {editorForm({ formName: "Contributor" })}
    {editorForm({ formName: "ContributionRequest" })}
    {editorForm({ formName: "Entity" })}
    {editorForm({ formName: "Invite" })}
    {!isModerator ? null : editorForm({ formName: "ModeratorEntity" })}
    {!isModerator ? null : editorForm({ formName: "ModeratorSet" })}
  </div>
);

const control = ({ formName, text, icon }) => (
  <Widget
    src={`${ownerId}/widget/NavbarControl`}
    props={{ formName, text, icon }}
  />
);

const controls = (
  <div className="card border-secondary mb-2">
    <div className="nav navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              metadata,
              accountId,
              widgetName,
              style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
              className: "me-2",
            }}
          />
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {control({
              formName: "Contributor",
              text: isContributor
                ? "Edit contributor profile"
                : "Register as a contributor",
              icon: isContributor
                ? "bi-person-fill-gear"
                : "bi-person-fill-add",
            })}
            {control({
              formName: "ContributionRequest",
              text: "Propose Contribution",
              icon: "bi-plus-circle",
            })}
            {control({
              formName: "Entity",
              text: "Create Entity",
              icon: "bi-plus-circle",
            })}
            {control({
              formName: "Invite",
              text: "Invite Contributor",
              icon: "bi-person-add",
            })}
            {!isModerator
              ? null
              : control({
                  formName: "ModeratorEntity",
                  text: "Edit/Create Entity",
                  icon: "bi-pencil-square",
                })}
            {!isModerator
              ? null
              : control({
                  formName: "ModeratorSet",
                  text: "Change moderator",
                  icon: "bi-person-lock",
                })}
          </ul>
        </div>
      </div>
    </div>
    {editorsFooter}
  </div>
);

const navbarButton = ({ content, text, icon }) => (
  <li className="nav-item ">
    <a
      className="nav-link active button"
      href={`https://near.social/#/${ownerId}/widget/Index?content=${content}`}
      role="button"
      onClick={() => State.update({ content })}
    >
      <i className={icon} />
      {text}
    </a>
  </li>
);

const navbar = (
  <div className="card border-secondary">
    <div className="nav navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {navbarButton({
            content: "entities",
            text: "Entities",
            icon: "bi-house-fill",
          })}
          {navbarButton({
            content: "contributors",
            text: "Contributors",
            icon: "bi-person-plus-fill",
          })}
          {navbarButton({
            content: "admin",
            text: "Manage entities",
            icon: "bi-house-lock-fill",
          })}
          {navbarButton({
            content: "needs",
            text: "Contribution needs",
            icon: "bi-clipboard-check-fill",
          })}
          {navbarButton({
            content: "invites",
            text: "Contribution invites",
            icon: "bi-person-fill-add",
          })}
          <li className="nav-item">
            <input
              type="text"
              value={state.search}
              placeholder="Search"
              onChange={(e) => State.update({ search: e.target.value })}
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const content = {
  entities: (
    <Widget
      src={`${ownerId}/widget/EntityList`}
      props={{ search: state.search }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ search: state.search }}
    />
  ),
  admin: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: state.search }}
    />
  ),
  needs: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ search: state.search }}
    />
  ),
  invites: (
    <Widget
      src={`${ownerId}/widget/InviteList`}
      props={{ search: state.search }}
    />
  ),
}[state.content];

return (
  <div>
    {controls}
    {navbar}
    <div className="mt-2">{content}</div>
  </div>
);
