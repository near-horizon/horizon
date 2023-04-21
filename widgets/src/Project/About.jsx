const ownerId = "contribut3.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

State.init({
  project: null,
  projectIsFetched: false,
  profile: "",
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    })
  );
}

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

const onPrivateSave = (value) => {
  Near.call(ownerId, "edit_project", {
    account_id: accountId,
    project: {
      ...state.project,
      application: { ...state.project.application, private: value },
    },
  });
};

const onSave = (value) => {
  Near.call(ownerId, "edit_project", {
    account_id: accountId,
    project: {
      ...state.project,
      application: { ...state.project.application, ...value },
    },
  });
};

return (
  <Container>
    <Heading>About project</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.profile.description,
        onSave: (description) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { description } } },
          }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What problem(s) are you solving?",
        id: "problem",
        value: state.profile.problem,
        onSave: (problem) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { problem } } },
          }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What makes your team uniquely positioned for success?",
        id: "success_position",
        value: state.project.application.success_position,
        onSave: (success_position) => onSave({ success_position }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Why are you building on NEAR?",
        id: "why",
        value: state.project.application.why,
        onSave: (why) => onSave({ why }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What's your 5 year vision? 1B users project evolution?",
        id: "vision",
        value: state.project.application.vision,
        onSave: (vision) => onSave({ vision }),
        canEdit: props.isAdmin,
      }}
    />
    {/*<Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Are you going to launch your token?",
        id: "token",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (token) => onSave({ token }),
      }}
    />*/}
  </Container>
);
