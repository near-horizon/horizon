const ownerId = "nearhorizon.near";

State.init({
  claim: null,
  claimIsFetched: false,
});

if (!state.claimIsFetched) {
  Near.asyncView(
    ownerId,
    "get_claim",
    { project_id: props.projectId, account_id: props.accountId },
    "final",
    false,
  ).then((claim) => State.update({ claim, claimIsFetched: true }));
  return <>Loading...</>;
}

const acceptClaim = () => {
  Near.call({
    contractName: ownerId,
    methodName: "accept_claim",
    args: {
      project_id: props.projectId,
      account_id: props.accountId,
    },
  });
};

const rejectClaim = () => {
  Near.call({
    contractName: ownerId,
    methodName: "reject_claim",
    args: {
      project_id: props.projectId,
      account_id: props.accountId,
    },
  });
};

const accepted = "Accepted" in state.claim;
const rejected = "Rejected" in state.claim;
const timestamp = accepted
  ? state.claim.Accepted
  : rejected
  ? state.claim.Rejected
  : state.claim.Sent.timestamp;
const message = accepted
  ? "Accepted"
  : rejected
  ? "Rejected"
  : state.claim.Sent.message;

const date = new Date(Number(timestamp.substring(0, timestamp.length - 6)));

const dateString = date.toLocaleString();

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5em 0px 0px;
  gap: 0.125em;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const body = (
  <>
    <Details>
      <Row>
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: props.projectId, size: "3em" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: props.projectId,
            // name: state.profile.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </Row>
      <b>claimed by</b>
      <Row>
        <Widget
          src={`${ownerId}/widget/Vendor.Icon`}
          props={{ accountId: props.accountId, size: "2em" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: props.accountId,
            // name: state.profile.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </Row>
      <Row>on {dateString}</Row>
    </Details>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: message }}
    />
  </>
);

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  width: 100%;
`;

const footer =
  accepted || rejected ? (
    <></>
  ) : (
    <Footer>
      <Widget
        src={`${ownerId}/widget/Buttons.Green`}
        props={{ text: "Accept", onClick: acceptClaim }}
      />
      <Widget
        src={`${ownerId}/widget/Buttons.Red`}
        props={{ text: "Reject", onClick: rejectClaim }}
      />
    </Footer>
  );

return <Widget src={`${ownerId}/widget/Card`} props={{ footer, body }} />;
