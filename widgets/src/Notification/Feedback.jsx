const ownerId = "contribut3.near";
const { contributionId, vendorId } = props.value;
const [accountId, cid] = contributionId;

State.init({
  contribution: null,
  contributionIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  isProjectAdmin: null,
  isProjectAdminIsFetched: false
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

if (!state.isProjectAdminIsFetched) {
    Near.asyncView(
      ownerId,
      "check_is_project_admin",
      { project_id: accountId, account_id: context.accountId },
      "final",
      false
    ).then((isProjectAdmin) =>
      State.update({ isProjectAdmin, isProjectAdminIsFetched: true })
    );
  }
  

if (!state.contributionIsFetched || !state.proposalIsFetched || !state.isProjectAdminIsFetched) {
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

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  color: #006adc !important;
  white-space: nowrap;

  &.button--primary {
    width: 100%;
    color: #006adc !important;

    @media (max-width: 1200px) {
      width: auto;
    }
  }

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7e868c;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

return (
  <>
    <Widget
      src={`${ownerId}/widget/Contribution.Feedback`}
      props={{
        projectId: accountId,
        title: state.proposal.title,
        vendorId,
        status: state.contribution.status,
        vendorFeedback: state.isProjectAdmin ? state.contribution.vendorFeedback: null,
        projectFeedback: state.contribution.projectFeedback,
      }}
    />
  </>
);
