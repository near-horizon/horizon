const ownerId = "contribut3.near";
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
  ).then((profile) => State.update({ profile: profile[accountId].profile, profileIsFetched: true }));
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

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Project.Icon`}
      props={{ accountId, size: "8em" }}
    />
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
          canEdit: isAdmin

        }}
      />

      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.OneLiner`}
        props={{
          value: "Simple solutions for complex tasks",
          id: "tagline",
          onSave: (tagline) =>
            Near.call("social.near", "set", {
              data: { [accountId]: { profile: { tagline } } },
            }),
          canEdit: isAdmin
        }}
      />

      <Widget
        src={`${ownerId}/widget/BadgeList`}
        props={{
          badges: [
            { value: "Verified" },
            { value: "Fundraiser", color: "#62ebe4" },
          ],
        }}
      />
    </Details>
  </Container>
);
