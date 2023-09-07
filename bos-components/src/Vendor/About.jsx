// const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const isAdmin = props.isAdmin;

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
  services: "",
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
      services: data[accountId].profile.services,
      descriptionIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const onSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

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
          label: "Vendor type",
          id: "type",
          value: state.profile.vendor_type,
          options: [
            { text: "Individual contributor", value: "individual" },
            { text: "Organization", value: "organization" },
          ],
          onSave: ({ value: vendor_type }) => onSave({ vendor_type }),
          canEdit: isAdmin,
        }}
      />
      {/*<Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Skills",
        id: "skills",
        value: Object.keys(state.profile.skills || {}).map((name) => ({
          name,
        })),
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (skills) =>
          onSave({
            skills: tags.reduce(
              (acc, { name }) => Object.assign(acc, { [name]: "" }),
              {}
            ),
          }),
        canEdit: isAdmin,
      }}
    />*/}
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.MultiSelect`}
        props={{
          label: "Payment",
          id: "payment",
          value: Object.keys(state.profile.payments || {}).map((id) => ({
            id,
            name: id[0].toUpperCase() + id.slice(1),
          })),
          options: [
            { name: "Fiat", id: "fiat" },
            { name: "Crypto", id: "crypto" },
            { name: "Credits", id: "credits" },
          ],
          onSave: (payments) =>
            onSave({
              payments: payments.reduce(
                (acc, { id }) => Object.assign(acc, { [id]: "" }),
                {},
              ),
            }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Number`}
        props={{
          label: "Rate",
          id: "rate",
          value: state.profile.rate,
          onSave: (rate) => onSave({ rate }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.MultiSelect`}
        props={{
          label: "Available for",
          id: "work",
          value: Object.keys(state.profile.work || {}).map((id) => ({
            id,
            name:
              id === "short"
                ? "Short-term work"
                : id === "long"
                ? "Long-term work"
                : "Full-time job",
          })),
          options: [
            { name: "Short-term work", id: "short" },
            { name: "Long-term work", id: "long" },
            { name: "Full-time job", id: "full" },
          ],
          onSave: (work) =>
            onSave({
              work: work.reduce(
                (acc, { id }) => Object.assign(acc, { [id]: "" }),
                {},
              ),
            }),
          canEdit: isAdmin,
        }}
      />
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

    <Heading>About vendor</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.description,
        onSave: (description) => onSave({ profile: { description } }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Skills and services",
        id: "services",
        value: state.services,
        onSave: (services) => onSave({ profile: { services } }),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
