const ownerId = "contribut3.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

State.init({
  request: null,
  requestIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  profile: null,
  profileIsFetched: false,
  contributions: [],
  contributionsIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, vendor_id: vendorId, cid },
    "final",
    false
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.contributionsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor_completed_contributions",
    { account_id: vendorId },
    "final",
    false
  ).then((contributions) =>
    State.update({ contributions, contributionsIsFetched: true })
  );
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${vendorId}/profile/**`] },
    "final",
    false
  ).then((data) =>
    State.update({ profile: data[vendorId].profile, profileIsFetched: true })
  );
}

if (
  !state.requestIsFetched ||
  !state.proposalIsFetched ||
  !state.profileIsFetched
) {
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
  border-left: 3px solid #b2ddff;
  width: 100%;
`;

const RejectButton = styled.button`
  position: absolute;
  inset: -20px -20px auto auto;
  transition: all 0.2s ease-in-out;
  border: none;
  background: none;

  &:hover {
    transform: scale(1.1);
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125em;

  span:first-child {
    font-style: normal;
    font-weight: 400;
    font-size: 0.75em;
    line-height: 1em;
    text-decoration-line: line-through;
    color: #7e868c;
  }

  span:last-child {
    font-style: normal;
    font-weight: 700;
    font-size: 0.75em;
    line-height: 1em;
    text-decoration-line: none;
    color: #11181c;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.125em;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const price =
  state.proposal.price !== state.request.budget ? (
    <>
      <span>NH {state.request.budget}</span>
      {" → "}
      <span>NH {state.proposal.price}</span>
    </>
  ) : (
    <span>NH {state.proposal.price}</span>
  );

const body = (
  <Container>
    <RejectButton
      onClick={() =>
        Near.call(ownerId, "reject_proposal", {
          project_id: projectId,
          vendor_id: vendorId,
          cid,
        })
      }
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5"
          stroke="#F44738"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </RejectButton>
    <Row>
      <Widget
        src={`${ownerId}/widget/Vendor.Icon`}
        props={{ accountId: vendorId, size: "4em" }}
      />
      <Column>
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: vendorId,
            name: state.profile.name,
            nameSize: "1.125em",
          }}
        />
        <Row>
          <span>
            {state.profile.organization ? "Organization" : "Individual"}
          </span>
          <span>{state.contributions.length} requests completed</span>
        </Row>
        <Widget
          src={`${ownerId}/widget/Tags`}
          props={{ tags: state.profile.tags }}
        />
      </Column>
    </Row>
    <Column>
      <Row>
        <Price>{price}</Price>
        <Detail>
          Contract: <b>{state.proposal.proposal_type}</b>
        </Detail>
        <Detail>
          Payment: <b>{state.proposal.payment_source}</b>
        </Detail>
      </Row>
      <Description>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{ description: state.proposal.description }}
        />
      </Description>
    </Column>
  </Container>
);

const footer = (
  <Row>
    <Widget
      src={`${ownerId}/widget/Buttons.Grey`}
      props={{ text: "Discuss", onClick: () => {} }}
    />
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
                project_id: projectId,
                cid,
                vendor_id: vendorId,
              }
            },
            {
              contractName: "social.near",
              methodName: "set",
              args: {
                data: {
                  [context.accountId]: {
                    index: {
                      graph: JSON.stringify({
                        key: "project/proposal",
                        value: { accountId: projectId },
                      }),
                      inbox: JSON.stringify({
                        key: projectId,
                        value: {
                          type: "project/proposal",
                          proposalId: [
                            projectId,
                            cid,
                          ],
                          message: state.message,
                          vendorId: vendorId,
                        },
                      }),
                    },
                  },
                }
              }
            }
          ];

          Near.call(transactions);
        }
      }}
    />
  </Row>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
