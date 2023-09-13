const ownerId = "nearhorizon.near";
const canEdit = true;

State.init({
  deck: "",
  white_paper: "",
  roadmap: "",
  team_deck: "",
  demo: "",
  projectIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: context.accountId },
    "final",
    false,
  ).then((project) =>
    State.update({
      deck: project.deck,
      white_paper: project.white_paper,
      roadmap: project.roadmap,
      team_deck: project.team_deck,
      demo: project.demo,
      projectIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const onSave = (project) => {
  Near.call(ownerId, "edit_project", {
    account_id: context.accountId,
    project,
  });
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > h2 {
      color: #000;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > small {
      color: var(--ui-elements-gray, #7e868c);
      font-family: Inter;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
      letter-spacing: 0.00875rem;
    }
  }
`;

let completed = 0;
const total = 5;
if (state.deck) completed++;
if (state.white_paper) completed++;
if (state.roadmap) completed++;
if (state.team_deck) completed++;
if (state.demo) completed++;

return (
  <Container>
    <Header>
      <div>
        <h2>Project overview</h2>
        <small>
          Completed:{" "}
          {(completed / total).toLocaleString("en-GB", { style: "percent" })}
        </small>
      </div>
    </Header>
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Pitch deck",
        id: "pitch-deck",
        fileAccept: [".pdf"],
        value: state.deck,
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
        value: state.white_paper,
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
        value: state.roadmap,
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
        value: state.team_deck,
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
        value: state.demo,
        onSave: (demo) => onSave({ demo }),
        canEdit,
      }}
    />
  </Container>
);
