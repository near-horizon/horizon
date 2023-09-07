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
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile,
      profileIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const onSave = (profile) => {
  Social.set(
    { profile },
    {
      onCommit: () =>
        State.update({ profile: { ...state.profile, ...profile } }),
    },
  );
};

return (
  <Container>
    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Website",
        id: "website",
        value: state.profile.linktree.website,
        link: `https://${state.profile.linktree.website}`,
        onSave: (website) => onSave({ linktree: { website } }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: state.profile.linktree,
        onSave: (linktree) => onSave({ linktree }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Specialization",
        id: "specialization",
        value: state.profile.specialization,
        options: [{ value: "Venture investments", text: "venture" }],
        onSave: ({ value: specialization }) => onSave({ specialization }),
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
                {},
              ),
            },
          }),
        canEdit: isAdmin,
      }}
    />
    {/*<Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Area of interest",
        id: "interest",
        value: Object.keys(state.profile.skills || {}).map((name) => ({
          name,
        })),
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (interest) =>
          onSave({
            interest: interest.reduce(
              (acc, { name }) => Object.assign(acc, { [name]: "" }),
              {}
            ),
          }),
        canEdit: isAdmin,
      }}
    />*/}
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: state.profile.location,
        onSave: (location) => onSave({ location }),
        canEdit: isAdmin,
      }}
    />
  </Container>
);
