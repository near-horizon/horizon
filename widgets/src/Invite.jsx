const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.accountId ?? context.accountId;

if (!entityId) {
  return "Cannot show invite without entityId or contributorId!";
}

const invite = Near.view(
  ownerId,
  "get_invite",
  { entity_id: entityId, contributor_id: contributorId },
  "final",
  false
);

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
  <Controls isAuthorized={contributorId === context.accountId}>
    <AcceptButton
      onClick={() =>
        Near.call(ownerId, "accept_invite", { account_id: entityId })
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
        Near.call(ownerId, "reject_invite", { account_id: entityId })
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
  <Container id={accountId}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId: entityId,
          isEntity: true,
          imageSize: "3em",
          update: props.update,
          additionalText: (
            <b>
              invited{" "}
              {contributorId === context.accountId ? (
                "you"
              ) : (
                <Widget
                  src={`${ownerId}/widget/ProfileLine`}
                  props={{ accountId: contributorId }}
                />
              )}{" "}
              to contribute to
            </b>
          ),
          additionalColumn: controls,
          additionalRow: (
            <>
              <b>
                Need{" "}
                {typeof invite.contribution_type === "string"
                  ? invite.contribution_type
                  : invite.contribution_type.Other}
              </b>
              <DescriptionWrapper>
                <Widget
                  src={`${ownerId}/widget/DescriptionArea`}
                  props={{ description: invite.description }}
                />
              </DescriptionWrapper>
            </>
          ),
        }}
      />
    </Wrapper>
  </Container>
);
