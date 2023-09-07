const ownerId = "nearhorizon.near";
const { contributionId, vendorId } = props.value;
const [accountId, cid] = contributionId;

State.init({
  contribution: null,
  contributionIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  isProjectAdmin: null,
  isProjectAdminIsFetched: false,
});

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: accountId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true }),
  );
}

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: accountId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.isProjectAdminIsFetched) {
  Near.asyncView(
    ownerId,
    "check_is_project_admin",
    { project_id: accountId, account_id: context.accountId },
    "final",
    false,
  ).then((isProjectAdmin) =>
    State.update({ isProjectAdmin, isProjectAdminIsFetched: true }),
  );
}

if (
  !state.contributionIsFetched ||
  !state.proposalIsFetched ||
  !state.isProjectAdminIsFetched
) {
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

const GreyButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  color: #006adc;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
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
        props={{ accountId: state.isProjectAdmin ? vendorId : accountId }}
      />
      <Text>gave you feedback</Text>
    </Row>

    <GreyButton
      href={`${ownerId}/widget/Index?tab=contribution&projectId=${accountId}&vendorId=${vendorId}&cid=${cid}&content=feedback`}
      onClick={() =>
        props.update({
          tab: "contribution",
          content: "feedback",
          search: "",
          accountId,
        })
      }
    >
      View Feedback
    </GreyButton>
  </>
);
