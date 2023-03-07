const ownerId = "contribut3.near";
const search = props.search;
const accountId = props.accountId;
const isAdmin = props.isAdmin;
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
      ? isAdmin
        ? "get_admin_contribution_needs"
        : "get_entity_contribution_needs"
      : "get_contribution_needs",
    { ...(accountId ? { account_id: accountId } : {}) },
    "final",
    false
  ).then((needs) => {
    if (accountId && isAdmin) {
      State.update({
        items: needs.map((cid) => [accountId, cid]),
        shown: needs.map((cid) => [accountId, cid]).slice(0, limit),
        from: limit,
        hasMore: needs.length > limit,
      });
    } else {
      State.update({
        items: needs.sort(([a], [b]) => a.localeCompare(b)),
        shown: needs.slice(0, limit),
        from: limit,
        hasMore: needs.length > limit,
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
      .filter(([accountId]) => accountId.includes(search))
      .map(([accountId, cid]) => (
        <WidgetContainer key={cid}>
          <Widget
            src={`${ownerId}/widget/Need`}
            props={{
              accountId,
              cid,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
