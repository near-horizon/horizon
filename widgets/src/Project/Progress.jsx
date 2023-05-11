const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #d9f4ff;
  border-radius: 8px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  width: 100%;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
  width: 35%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 0.75em;
  line-height: 1.4em;
  color: #11181c;
  width: 65%;
`;

State.init({
  project: null,
  projectIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: props.accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${props.accountId}/profile/**`] },
    "final",
    false
  ).then((profile) =>
    State.update({
      profile: profile[props.accountId].profile,
      profileIsFetched: true,
    })
  );
}

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

const progress = () => {
  let filledInFields = 0;
  const totalFields = 23;
  const application = state.project;
  if (application) {
    if (application.integration) filledInFields++;
    if (application.why) filledInFields++;
    if (application.vision) filledInFields++;
    if (application.geo) filledInFields++;
    if (application.success_position) filledInFields++;
    if (application.tech_lead) filledInFields++;
    if (application.team) filledInFields++;
    const graduation = application.graduation;
    if (graduation) {
      if (graduation.pitch_deck) filledInFields++;
      if (graduation.white_paper) filledInFields++;
      if (graduation.roadmap) filledInFields++;
      if (graduation.demo) filledInFields++;
    }
  }
  const profile = state.profile;
  if (profile) {
    if (profile.name) filledInFields++;
    if (profile.description) filledInFields++;
    if (profile.linktree) filledInFields++;
    if (profile.linktree.website) filledInFields++;
    if (profile.logo) filledInFields++;
    if (profile.tagline) filledInFields++;
    if (profile.category) filledInFields++;
    if (profile.stage) filledInFields++;
    if (profile.team) filledInFields++;
    if (profile.ceo) filledInFields++;
    if (profile.tags) filledInFields++;
    if (profile.userbase) filledInFields++;
  }

  return ((filledInFields / totalFields) * 100)
    .toFixed(0)
    .toLocaleString("en-US", { style: "percent" });
};

return (
  <Container>
    <Row>
      <Label>Credits:</Label>
      <Value>
        0 NHZN{" "}
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{
            content:
              "Horizon Credits (NHZN) help track service usage and inform payments distributed to Horizon service partners.",
          }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>
        {progress()}%
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{
            content:
              "Completion status of your profile. Once fully complete, your project will be more discoverable by others in the community",
          }}
        />
      </Value>
    </Row>
  </Container>
);
