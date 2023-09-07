const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

State.init({
  proposal: null,
  proposalIsFetched: false,
  projectName: null,
  projectNameIsFetched: false,
  vendorName: null,
  vendorNameIsFetched: false,
});

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.projectNameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${projectId}/profile/name`] },
    "final",
    false,
  ).then((data) =>
    State.update({
      projectName: data[projectId].profile.name,
      projectNameIsFetched: true,
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

const Owner = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  width: 20%;
`;

const Title = styled.a`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
  width: 40%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

return (
  <Container>
    <Owner href={`/${ownerId}/widget/Index?tab=vendor&accountId=${vendorId}`}>
      <Widget
        src={`${ownerId}/widget/Vendor.Icon`}
        props={{ accountId: vendorId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: vendorId,
          name: state.vendorName,
          nameSize: "1.125em",
        }}
      />
    </Owner>
    <Owner href={`/${ownerId}/widget/Index?tab=project&accountId=${projectId}`}>
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: projectId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: projectId,
          name: state.projectName,
          nameSize: "1.125em",
        }}
      />
    </Owner>
    <Title
      href={`/${ownerId}/widget/Index?tab=proposal&projectId=${projectId}&cid=${cid}&vendorId=${vendorId}`}
    >
      {state.proposal.title}
    </Title>
    <Other>{new Date().toLocaleDateString()}</Other>
    <Other>
      <Widget
        src={`${ownerId}/widget/ActiveIndicator`}
        props={{ active: false, inactiveText: "Pending" }}
      />
    </Other>
  </Container>
);
