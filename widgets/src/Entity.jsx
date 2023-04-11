const ownerId = "contribut3.near";
const accountId = props.accountId;
const notStandalone = props.notStandalone ?? false;
const isPreview = props.isPreview ?? false;
const inboxView = props.inboxView;

if (!accountId) {
  return "Cannot show entity without account ID!";
}

State.init({
  contributionFormHidden: true,
  entity: null,
  entityFetched: false,
  founders: [],
  foundersFetched: false,
  profile: null,
  profileFetched: false,
});

if (!state.entityFetched) {
  Near.asyncView(
    ownerId,
    "get_entity",
    { account_id: accountId },
    "final",
    false
  ).then((entity) => State.update({ entity, entityFetched: true }));
}

if (!state.profileFetched) {
  const profile = Social.getr(`${accountId}/profile`, "final", {
    subscribe: false,
  });
  State.update({ profile, profileFetched: true });
}

if (!state.foundersFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersFetched: true }));
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-height: 8em;
  max-width: 100%;
  padding: 0 0.75em;
  border-bottom: 1px solid #eaecf0;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0.75em 0;
  max-width: 100%;
`;

const ActionColumn = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  max-width: 100%;
  margin-top: 0.5em;
`;

return (
  <Container id={accountId}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity: true,
          imageSize: "3em",
          update: props.update,
          additionalColumn: (
            <ActionColumn show={!inboxView}>
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{ active: state.entity.status }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Propose contribution",
                      icon: "bi-person-up",
                      href: `/${ownerId}/widget/Index?tab=create&content=proposal&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "create",
                          content: "proposal",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "entity",
                          content: "",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ],
                }}
              />
            </ActionColumn>
          ),
          additionalRow: (
            <div>
              <div>
                {state.founders.map((founder) =>
                  state.founders.length === 1 ? (
                    <Widget
                      src={`${ownerId}/widget/ProfileLine`}
                      props={{
                        accountId: founder,
                        isEntity: false,
                        update: props.update,
                      }}
                    />
                  ) : (
                    <Widget
                      src={`${ownerId}/widget/ProfileCircle`}
                      props={{
                        accountId: founder,
                        isEntity: false,
                        update: props.update,
                      }}
                    />
                  )
                )}
              </div>
              <Widget
                src={`${ownerId}/widget/Tags`}
                props={{ tags: state.profile.tags }}
              />
            </div>
          ),
        }}
      />
      <DescriptionWrapper>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{
            description: state.entity.description || state.profile.description,
          }}
        />
      </DescriptionWrapper>
    </Wrapper>
  </Container>
);
