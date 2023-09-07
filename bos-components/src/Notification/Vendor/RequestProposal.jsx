const ownerId = "nearhorizon.near";
const { requestId, vendorId } = props.value;
const [accountId, cid] = requestId;

State.init({
  request: null,
  requestIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
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
if (!state.requestIsFetched || !state.proposalIsFetched) {
  return <>Loading...</>;
}

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
      <Text bold>
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
      sent a proposal to your request
      <Text bold>{state.request.title}.</Text>
    </Row>
    <Row>
      <Widget
        src={`${ownerId}/widget/Proposal.Summary`}
        props={{ accountId, cid, vendorId }}
      />
    </Row>
    <Row>
      <Widget
        src={`${ownerId}/widget/Buttons.Green`}
        props={{
          text: "Hire",
          onClick: () => {
            const transactions = [
              {
                contractName: ownerId,
                methodName: "add_contribution",
                args: {
                  project_id: accountId,
                  cid,
                  vendor_id: vendorId,
                },
              },
              {
                contractName: "social.near",
                methodName: "set",
                args: {
                  data: {
                    [context.accountId]: {
                      index: {
                        graph: JSON.stringify({
                          key: "vendor/contract",
                          value: { accountId: accountId },
                        }),
                        inbox: JSON.stringify({
                          key: accountId,
                          value: {
                            type: "vendor/contract",
                            contributionId: [accountId, cid],
                            message: state.message,
                            vendorId: vendorId,
                            actionType: "accept",
                          },
                        }),
                      },
                    },
                  },
                },
              },
            ];

            Near.call(transactions);
          },
        }}
      />
      <Button>Discuss</Button>
    </Row>
  </>
);
