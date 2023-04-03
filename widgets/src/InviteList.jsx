const ownerId = "contribut3.near";
const search = props.search;
const accountId = props.accountId;
const limit = 10;

State.init({
  items: [],
  shown: [],
  from: 0,
  hasMore: true,
});

if (state.items.length === 0) {
  Near.asyncView(
    ownerId,
    accountId ? "get_entity_invites" : "get_contributor_invites",
    { account_id: props.accountId ?? context.accountId },
    "final",
    false
  ).then((invites) =>
    State.update({
      items: invites.sort(),
      shown: invites.slice(0, limit),
      from: limit,
      hasMore: invites.length > limit,
    })
  );
}

const loadMore = () =>
  State.update({
    shown: state.items.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.items.length,
  });

const WidgetContainer = styled.div`
  margin-bottom: 0.5em;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.shown
      .filter((accountId) => accountId.includes(search))
      .map((entityId) => (
        <WidgetContainer key={entityId}>
          <Widget
            src={`${ownerId}/widget/Invite`}
            props={{
              entityId: accountId ?? entityId,
              accountId: accountId ? entityId : null,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
