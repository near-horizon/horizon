const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
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
    false
  ).then((data) =>
    State.update({
      description: data[accountId].profile.description,
      services: data[accountId].profile.services,
      descriptionIsFetched: true,
    })
  );
  return <>Loading...</>;
}

return (
  <Container>
    <Heading>About vendor</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.description,
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
        label: "Skills and services",
        id: "services",
        value: state.services,
        onSave: (services) =>
          Near.call("social.near", "set", {
            data: { [accountId]: { profile: { services } } },
          }),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
