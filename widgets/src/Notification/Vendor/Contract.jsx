const ownerId = "contribut3.near";
const { contributionId, vendorId } = props.value;
const [accountId, cid] = contributionId;
const actionType = props.actionType;

const actionText = {
  accept: "accepted your contract ",
  reject: "declined you contract",
  deliver: "confirmed ending of contract",
}[actionType];

if (!actionText) return "Provide an actionType = accept|reject|deliver";

State.init({
  contribution: null,
  contributionIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
});

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: accountId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true })
  );
}

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: accountId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.contributionIsFetched || !state.proposalIsFetched) {
  return <>Loading...</>;
}
const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: 400;
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    font-weight: 600;
    color: #006adc !important;
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
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

return (
  <>
    <Row>
      <Text>
        <Widget
          src="mob.near/widget/TimeAgo"
          props={{ blockHeight: props.blockHeight }}
        />
        ago
      </Text>
    </Row>
    <Row>
      <Widget
        src="near/widget/AccountProfileInline"
        props={{ accountId: vendorId }}
      />
      <Text>{actionText}</Text>
      <Text bold>
        <b>{state.proposal.title}</b>
      </Text>
    </Row>
  </>
);
