// const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const isAdmin = props.isAdmin;
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5em;
  padding: 0.5em 0.2em;
  max-width: 100%;
  font-size: 0.9em;
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

const onSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

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
        onSave: (website) => onSave({ profile: { linktree: { website } } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: state.profile.linktree ?? {},
        onSave: (linktree) => onSave({ profile: { linktree } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Verticals`}
      props={{
        label: "Verticals",
        value: state.profile.verticals ?? { [state.profile.category]: "" },
        onSave: (verticals) =>
          onSave({
            profile: {
              verticals: verticals.reduce(
                (acc, vertical) => Object.assign(acc, { [vertical]: "" }),
                {}
              ),
            },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.ProductType`}
      props={{
        label: "Product Type",
        value: state.profile.product_type,
        onSave: (productType) =>
          onSave({
            profile: {
              product_type: productType.reduce(
                (acc, productType) => Object.assign(acc, { [productType]: "" }),
                {}
              ),
            },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Integration`}
      props={{
        label: "Integration",
        value: state.project.integration,
        onSave: ({ value: integration }) => props.onSave({ integration }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Phase`}
      props={{
        label: "Development phase",
        value: state.profile.stage,
        onSave: ({ value: stage }) => onSave({ profile: { stage } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Distribution`}
      props={{
        label: "Distribution",
        value: state.profile.distribution,
        onSave: ({ value: distribution }) =>
          onSave({ profile: { distribution } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "User base (MAA)",
        id: "userbase",
        value: state.profile.userbase,
        onSave: (userbase) => onSave({ profile: { userbase: `${userbase}` } }),
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
    />*/}
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Company size",
        id: "size",
        value: state.team,
        onSave: (team) => onSave({ profile: { team: `${team}` } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: state.project.geo,
        onSave: (geo) => props.onSave({ geo }),
        canEdit: isAdmin,
      }}
    />
  </Container>
);
