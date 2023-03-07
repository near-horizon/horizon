const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;
const cid = props.cid;
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
    accountId
      ? cid
        ? "get_need_contribution_requests"
        : "get_entity_contribution_requests"
      : "get_admin_contribution_requests",
    { account_id: accountId ?? context.accountId, ...(cid ? { cid } : {}) },
    "final",
    false
  ).then((requests) => {
    if (accountId) {
      State.update({
        items: requests
          .map((contributorId) => [accountId, contributorId])
          .sort(),
        shown: requests
          .map((contributorId) => [accountId, contributorId])
          .slice(0, limit),
        from: limit,
        hasMore: requests.length > limit,
      });
    } else {
      State.update({
        items: requests.sort(),
        shown: requests.slice(0, limit),
        from: limit,
        hasMore: requests.length > limit,
      });
    }
  });
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
      .filter(
        ([entityId, contributorId]) =>
          entityId.includes(search) || contributorId.includes(search)
      )
      .map(([entityId, contributorId]) => (
        <WidgetContainer key={`${entityId}-${contributorId}`}>
          <Widget
            src={`${ownerId}/widget/ContributionRequest`}
            props={{
              entityId,
              contributorId,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
