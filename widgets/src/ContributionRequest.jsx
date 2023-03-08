const ownerId = "contribut3.near";
const accountId = context.accountId;
const entityId = props.entityId;
const contributorId = props.contributorId;

if (!entityId || !contributorId) {
  return "Cannot show contribution request without entityId or contributorId!";
}

State.init({
  isAuthorized: false,
  isAuthorizedFetched: false,
  contributionRequest: null,
  contributionRequestFetched: false,
  need: null,
  needFetched: false,
});

if (!state.isAuthorizedFetched) {
  Near.asyncView(
    ownerId,
    "check_is_manager_or_higher",
    { entity_id: entityId, account_id: context.accountId },
    "final",
    false
  ).then((isAuthorized) =>
    State.update({ isAuthorized, isAuthorizedFetched: true })
  );
}

if (!state.contributionRequestFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution_request",
    {
      entity_id: entityId,
      contributor_id: contributorId,
    },
    "final",
    false
  ).then((contributionRequest) =>
    State.update({ contributionRequest, contributionRequestFetched: true })
  );
}

if (
  !state.needFetched &&
  state.contributionRequestFetched &&
  !!state.contributionRequest.need
) {
  Near.asyncView(
    ownerId,
    "get_contribution_need",
    { account_id: entityId, cid: state.contributionRequest.need },
    "final",
    false
  ).then((need) => State.update({ need, needFetched: true }));
}

if (!state.contributionRequest) {
  return "Loading...";
}

const Controls = styled.div`
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  display: ${({ isAuthorized }) => (isAuthorized ? "flex" : "none")};
`;

const AcceptButton = styled.button`
  background-color: #12b76a;
  border: 1px solid #12b76a;
  border-radius: 4px;
  padding: 0.5em 1em;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  color: white;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0e9f5d;
  }
`;

const RejectButton = styled.button`
  background-color: white;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  padding: 0.5em 1em;
  margin-top: 0.5em;
  color: #f04438;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f04438;
    color: white;
  }
`;

const IconContainer = styled.i`
  transform: translate(0, -1px);
  margin-right: 0.25em;
`;

const controls = (
  <Controls isAuthorized={state.isAuthorized}>
    <AcceptButton
      onClick={() =>
        Near.call(ownerId, "approve_contribution", {
          entity_id: entityId,
          contributor_id: contributorId,
        })
      }
    >
      <IconContainer>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1666 5L7.99992 14.1667L3.83325 10"
            stroke="currentColor"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconContainer>
      <span>Accept</span>
    </AcceptButton>
    <RejectButton
      style={{ minWidth: "7em" }}
      onClick={() =>
        Near.call(ownerId, "reject_contribution", {
          entity_id: entityId,
          contributor_id: contributorId,
        })
      }
    >
      <IconContainer>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 5L5.5 15M5.5 5L15.5 15"
            stroke="currentColor"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconContainer>
      <span>Reject</span>
    </RejectButton>
  </Controls>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-height: 8em;
  padding: 0 0.75em;
  border-radius: 4px;
  background-color: #f0f9ff;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0.75em 0;
`;

const DescriptionWrapper = styled.div`
  margin-top: 0.5em;
  padding-left: 0.5em;
  border-left: 3px solid #b2ddff;
`;

return (
  <Container id={`${entityId}-${contributorId}`}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId: contributorId,
          imageSize: "3em",
          update: props.update,
          additionalText: (
            <b>
              {state.contributionRequest.need
                ? "sent a proposal to your request"
                : "wants to contribute to your project"}
            </b>
          ),
          additionalColumn: controls,
          additionalRow: (
            <>
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{
                  accountId: entityId,
                  update: props.update,
                  isEntity: true,
                  imageSize: state.contributionRequest.need ? "1.5em" : "2em",
                }}
              />
              {state.contributionRequest.need ? (
                <b>
                  Looking for {state.need.contribution_type}:{" "}
                  {state.need.description}
                </b>
              ) : (
                <></>
              )}
              <DescriptionWrapper>
                <Widget
                  src={`${ownerId}/widget/DescriptionArea`}
                  props={{
                    description: state.contributionRequest.description,
                  }}
                />
              </DescriptionWrapper>
            </>
          ),
        }}
      />
    </Wrapper>
  </Container>
);
