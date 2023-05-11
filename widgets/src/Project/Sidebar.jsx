const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const gas = "300000000000000";

const companySizeTiers = [
  "1-10 employees",
  "11-50 employees",
  "51-250 employees",
  "251-1000 employees",
  "1001+ employees",
];

State.init({
  project: null,
  projectIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));

  return "Loading...";
}

return (
  <Widget
    src={`${ownerId}/widget/Project.Details`}
    props={{
      accountId,
      isAdmin: props.isAdmin,
      project: state.project,
      onSave: (project) => {
        State.update({
          project: {
            ...state.project,
            ...project,
          },
        });
        Near.call(
          ownerId,
          "edit_project",
          { account_id: accountId, project: state.project },
          gas,
          "0"
        );
      },
    }}
  />
);
