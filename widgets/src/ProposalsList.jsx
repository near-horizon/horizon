const ownerId = "contribut3.near";
const search = props.search ?? "";
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
    "get_contributor_contribution_requests",
    { account_id: context.accountId },
    "final",
    false
  ).then((requests) =>
    State.update({
      items: requests.sort(),
      shown: requests.slice(0, limit),
      from: limit,
      hasMore: requests.length > limit,
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
      .filter((entityId) => entityId.includes(search))
      .map((entityId) => (
        <WidgetContainer key={entityId}>
          <Widget
            src={`${ownerId}/widget/ContributionRequest`}
            props={{
              entityId,
              contributorId: accountId,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
