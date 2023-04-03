const ownerId = "contribut3.near";
const isEntity = props.isEntity ?? false;
const search = props.search;
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
    isEntity ? "get_entity_contributions" : "get_contributor_contributions",
    { account_id: props.accountId },
    "final",
    false
  ).then((accountIds) =>
    State.update({
      items: accountIds.sort(),
      shown: accountIds.slice(0, limit),
      from: limit,
      hasMore: accountIds.length > limit,
    })
  );
}

const loadMore = () => {
  State.update({
    shown: state.items.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.items.length,
  });
};

const WidgetContainer = styled.div`
  margin: 0.5em 0;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.shown
      .filter((accountId) => accountId.includes(search))
      .map((accountId) => (
        <WidgetContainer key={accountId}>
          <Widget
            src={`${ownerId}/widget/Contribution`}
            props={{
              entityId: isEntity ? props.accountId : accountId,
              contributorId: !isEntity ? props.accountId : accountId,
              isEntity,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
