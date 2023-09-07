const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const status = props.status;
const vendorFeedback = props.vendorFeedback;
const projectFeedback = props.projectFeedback;
const title = props.title;

if (typeof status === "string" || !("Completed" in status)) {
  return <>No feedback yet. Contract still in progress...</>;
}

State.init({
  name: "",
  nameIsFetched: false,
  vendorName: "",
  vendorNameIsFetched: false,
});

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

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
  width: 100%;
`;

const Description = styled.div`
  padding-left: 1em;
  border-left: 3px solid #00ec97;
  width: 100%;
`;

const projectFeedbackView = projectFeedback ? (
  <Widget
    src={`${ownerId}/widget/Card`}
    props={{
      body: (
        <Container>
          <Column>
            <Row>
              <Widget
                src={`${ownerId}/widget/Project.Icon`}
                props={{ accountId: projectId, size: "2em" }}
              />
              <Widget
                src={`${ownerId}/widget/NameAndAccount`}
                props={{
                  accountId: projectId,
                  name: state.name,
                  nameSize: "1.125em",
                }}
              />
            </Row>
            <h3>{title}</h3>
            <Description>
              <Widget
                src={`${ownerId}/widget/DescriptionArea`}
                props={{ description: projectFeedback }}
              />
            </Description>
          </Column>
        </Container>
      ),
    }}
  />
) : (
  <>No project feedback yet...</>
);

const vendorFeedbackView = vendorFeedback ? (
  <Widget
    src={`${ownerId}/widget/Card`}
    props={{
      body: (
        <Container>
          <Column>
            <Row>
              <Widget
                src={`${ownerId}/widget/Vendor.Icon`}
                props={{ accountId: vendorId, size: "2em" }}
              />
              <Widget
                src={`${ownerId}/widget/NameAndAccount`}
                props={{
                  accountId: vendorId,
                  name: state.name,
                  nameSize: "1.125em",
                }}
              />
            </Row>
            <h3>{title}</h3>
            <Description>
              <Widget
                src={`${ownerId}/widget/DescriptionArea`}
                props={{ description: vendorFeedback }}
              />
            </Description>
          </Column>
        </Container>
      ),
    }}
  />
) : (
  <>No vendor feedback yet...</>
);

return (
  <Column>
    {projectFeedback}
    {vendorFeedback}
  </Column>
);
