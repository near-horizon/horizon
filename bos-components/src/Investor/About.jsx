const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const isAdmin = props.isAdmin ?? false;

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
  description: "",
  descriptionIsFetched: false,
});

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      description: data[accountId].profile.description,
      descriptionIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const DetailsGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 600px) {
    & > div {
      width: 100%;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 768px) {
    & > div {
      width: calc((100% - 2rem) * 0.5);
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & > div {
      width: calc((100% - 4rem) * 0.3333);
    }
  }

  @media screen and (min-width: 1024px) {
    & > div {
      width: calc((100% - 8rem) * 0.25);
    }
  }
`;

return (
  <Container>
    <Heading>Details</Heading>
    <DetailsGrid>
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
    </DetailsGrid>

    <Heading>About</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.description,
        onSave: (description) =>
          Social.set(
            { profile: { description } },
            { onCommit: () => State.update({ description }) },
          ),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
