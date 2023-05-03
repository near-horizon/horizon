const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;
const isAdmin = props.isAdmin;

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
    false
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile,
      profileIsFetched: true,
    })
  );
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
`;

return (
  <Container>
    <div>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Logo`}
        props={{
          accountId,
          value: state.profile.image,
          isProject: false,
          id: "image",
          onSave: (image) =>
            Near.call("social.near", "set", {
              data: {
                [accountId]: { profile: { image: { ipfs_cid: image.cid } } },
              },
            }),
          canEdit: props.isAdmin,
        }}
      />
    </div>
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.NameAndAccount`}
        props={{
          value: state.profile.name,
          id: "name",
          accountId,
          onSave: (name) =>
            Near.call("social.near", "set", {
              data: { [accountId]: { profile: { name } } },
            }),
          canEdit: props.isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.OneLiner`}
        props={{
          value: state.profile.tagline,
          id: "tagline",
          onSave: (tagline) =>
            Near.call("social.near", "set", {
              data: { [accountId]: { profile: { tagline } } },
            }),
          canEdit: props.isAdmin,
        }}
      />
      {/*<Widget
        src={`${ownerId}/widget/BadgeList`}
        props={{
          badges: [{ value: "Verified" }],
        }}
      />*/}
    </Details>
  </Container>
);
