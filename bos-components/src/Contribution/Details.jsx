const onSave = props.onSave ?? (() => {});
const ownerId = "nearhorizon.near";
const isAdmin = false;
const contribution = props.contribution;
const [[projectId, cid], vendorId] = contribution.proposal_id;
const proposal = props.proposal;
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
  vendorName: "",
  vendorNameIsFetched: false,
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
    { keys: [`${projectId}/profile/name`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      name: data[projectId].profile.name,
      nameIsFetched: true,
    }),
  );
}

if (!state.vendorNameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${vendorId}/profile/name`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      vendorName: data[vendorId].profile.name,
      vendorNameIsFetched: true,
    }),
  );
}

if (!state.nameIsFetched || !state.vendorNameIsFetched) {
  return <>Loading...</>;
}

const Project = styled.div`
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
`;

return (
  <Container>
    <Heading>Contract Details</Heading>
    <Project>
      <label>Project</label>
      <div>
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: projectId, size: "2.5em" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: projectId,
            name: state.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </div>
    </Project>
    <Project>
      <label>Contributor</label>
      <div>
        <Widget
          src={`${ownerId}/widget/Vendor.Icon`}
          props={{ accountId: vendorId, size: "2.5em" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: vendorId,
            name: state.vendorName,
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
        value: contribution.price,
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment source",
        id: "source",
        value: {
          value: proposal.payment_source,
          text: proposal.payment_source,
        },
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment type",
        id: "payment_type",
        value: { value: proposal.payment_type, text: proposal.payment_type },
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Request type",
        id: "request_type",
        value: { value: proposal.proposal_type, text: proposal.proposal_type },

        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Date`}
      props={{
        label: "Start date",
        id: "start_date",
        value: proposal.start_date,
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Date`}
      props={{
        label: "End date",
        id: "end_date",
        value: proposal.end_date ?? "Work in progress",
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Date`}
      props={{
        label: "Deadline",
        id: "deadline",
        value: request.deadline,
        canEdit: isAdmin,
      }}
    />
  </Container>
);
