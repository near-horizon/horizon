const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const isAdmin = props.isAdmin;
const request = props.request;

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
  paymentSources: [],
  paymentTypes: [],
  requestTypes: [],
  isFetched: false,
  name: "",
  nameIsFetched: false,
});

if (!state.isFetched) {
  Near.asyncView(ownerId, "get_payment_types", {}, "final", false).then(
    (paymentTypes) =>
      State.update({
        paymentTypes: paymentTypes.map((value) => ({ value, text: value })),
      }),
  );
  Near.asyncView(ownerId, "get_payment_sources", {}, "final", false).then(
    (paymentSources) =>
      State.update({
        paymentSources: paymentSources.map((value) => ({ value, text: value })),
      }),
  );
  Near.asyncView(ownerId, "get_request_types", {}, "final", false).then(
    (requestTypes) =>
      State.update({
        requestTypes: requestTypes.map((value) => ({ value, text: value })),
      }),
  );
  State.update({ isFetched: true });
}

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${request.project_id}/profile/name`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      name: data[request.project_id].profile.name,
      nameIsFetched: true,
    }),
  );
  return <>Loading...</>;
}

const Project = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
  }

  label {
    font-style: normal;
    font-weight: 600;
    font-size: 0.95em;
    line-height: 1em;
    color: #11181c;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: unset;
  }
`;

return (
  <Container>
    <Heading>Request Details</Heading>
    <Project
      href={`/${ownerId}/widget/Index?tab=project&accountId=${request.project_id}`}
    >
      <label>Project</label>
      <div>
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: request.project_id, size: "2.5em" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: request.project_id,
            name: state.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </div>
    </Project>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Budget",
        id: "bugdet",
        value: request.budget,
        onSave: (budget) => onSave({ budget }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment source",
        id: "source",
        value: { value: request.source, text: request.source },
        options: state.paymentSources,
        onSave: ({ value: source }) => onSave({ source }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment type",
        id: "payment_type",
        value: { value: request.payment_type, text: request.payment_type },
        options: state.paymentTypes,
        onSave: ({ value: payment_type }) => onSave({ payment_type }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Request type",
        id: "request_type",
        value: { value: request.request_type, text: request.request_type },
        options: state.requestTypes,
        onSave: ({ value: request_type }) => onSave({ request_type }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Date`}
      props={{
        label: "Deadline",
        id: "deadline",
        value: request.deadline,
        onSave: (deadline) =>
          onSave({ deadline: `${new Date(deadline).getTime()}` }),
        canEdit: isAdmin,
      }}
    />
    {/*<Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Tags",
        id: "tags",
        value: request.tags.map((name) => ({ name })),
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (tags) => onSave({ tags: tags.map(({ name }) => name) }),
        canEdit: isAdmin,
      }}
    />*/}
  </Container>
);
