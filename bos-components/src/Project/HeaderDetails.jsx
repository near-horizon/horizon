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
    false,
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile,
      profileIsFetched: true,
    }),
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;
`;

const onSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

return (
  <Container>
    <div>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Logo`}
        props={{
          accountId,
          value: state.profile.image,
          id: "image",
          onSave: (image) =>
            onSave({ profile: { image: { ipfs_cid: image.cid } } }),
          isProject: true,
          canEdit: isAdmin,
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
          onSave: (name) => onSave({ profile: { name } }),
          canEdit: isAdmin,
        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.OneLiner`}
        props={{
          value: state.profile.tagline,
          id: "tagline",
          onSave: (tagline) => onSave({ profile: { tagline } }),
          canEdit: isAdmin,
        }}
      />

      {/*<Widget
        src={`${ownerId}/widget/BadgeList`}
        props={{
          badges: [
            { value: "Verified" },
            { value: "Fundraiser", color: "#62ebe4" },
          ],
        }}
      />*/}
    </Details>
  </Container>
);
