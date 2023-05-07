const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const isAdmin = props.isAdmin;
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  max-width: 100%;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

State.init({
  profile: null,
  profileIsFetched: false,
  project: null,
  projectIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile ?? {},
      profileIsFetched: true,
    })
  );
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched || !state.projectIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Website",
        id: "website",
        value: state.profile.linktree?.website ?? state.profile.website ?? "",
        link: `https://${state.profile.linktree.website}`,
        onSave: (website) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { linktree: { website } } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: state.profile.linktree ?? {},
        onSave: (linktree) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { linktree } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Category`}
      props={{
        label: "Category",
        value: state.profile.category,
        onSave: ({ value: category }) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { category } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Integration`}
      props={{
        label: "Integration",
        value: state.project.application.integration,
        onSave: ({ value: integration }) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { integration } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Phase`}
      props={{
        label: "Development phase",
        value: state.profile.stage,
        onSave: ({ value: stage }) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { stage } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "User base (MAA)",
        id: "userbase",
        value: state.profile.userbase,
        onSave: (userbase) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { userbase: `${userbase}` } } },
          }),
        canEdit: isAdmin,
      }}
    />
    {/*<Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Stage",
        id: "stage",
        value: [{ name: "Pre-Seed" }],
        options: [
          { name: "Pre-Seed" },
          { name: "Seed" },
          { name: "Series A" },
          { name: "Series B" },
          { name: "Series C" },
          { name: "Series D" },
          { name: "Late Stage" },
          { name: "IPO" },
        ],
        onSave: ([{ name: stage }]) => onSave({ stage }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Funding goal",
        id: "goal",
        value: 1000000,
        onSave: (goal) => onSave({ goal }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Raised",
        id: "raised",
        value: 600000,
        onSave: (raised) => onSave({ raised }),
        canEdit: isAdmin,
      }}
    />*/}
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.AccountId`}
      props={{
        label: "CEO",
        id: "ceo",
        value: state.profile.ceo,
        onSave: (ceo) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { ceo } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.AccountId`}
      props={{
        label: "CTO",
        id: "cto",
        value: state.profile.cto,
        onSave: (cto) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { cto } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Company size",
        id: "size",
        value: state.team,
        onSave: (team) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { team: `${team}` } } },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Tags",
        id: "tags",
        value: Object.keys(state.profile.tags ?? {}).map((name) => ({ name })),
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (tags) =>
          Near.call("social.near", "set", {
            data: {
              [accountId]: {
                profile: {
                  tags: tags.reduce(
                    (acc, { name }) => ({ ...acc, [name]: "" }),
                    {}
                  ),
                },
              },
            },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: props.project.application.geo,
        onSave: (geo) => onSave({ geo }),
        canEdit: isAdmin,
      }}
    />
  </Container>
);
