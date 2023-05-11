const ownerId = "nearhorizon.near";
const canEdit = props.isAdmin ?? false;
const accountId = props.accountId;

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
  return <>Loading...</>;
}

const onSave = (project) => {
  Near.call(ownerId, "edit_project", {
    account_id: accountId,
    project,
  });
};

return (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Pitch deck",
        id: "pitch-deck",
        fileAccept: [".pdf"],
        value: state.project.deck,
        onSave: (deck) => onSave({ deck }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "White paper",
        id: "white-paper",
        fileAccept: [".pdf"],
        value: state.project.white_paper,
        onSave: (white_paper) => onSave({ white_paper }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Roadmap",
        id: "roadmap",
        fileAccept: [".pdf"],
        value: state.project.roadmap,
        onSave: (roadmap) => onSave({ roadmap }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Team",
        id: "team",
        fileAccept: [".pdf"],
        value: state.project.team_deck,
        onSave: (team_deck) => onSave({ team_deck }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Demo video",
        id: "demo-video",
        fileAccept: ["video/*"],
        value: state.project.demo,
        onSave: (demo) => onSave({ demo }),
        canEdit,
      }}
    />
  </>
);
