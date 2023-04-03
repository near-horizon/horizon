const ownerId = "contribut3.near";
const search = props.search ?? "";
const limit = 10;

State.init({
  items: [],
  shown: [],
  from: 0,
  hasMore: true,
});

if (state.items.length === 0) {
  Near.asyncView(ownerId, "get_entities", {}, "final", false).then(
    (entities) => {
      State.update({
        items: entities.sort(),
        shown: entities.slice(0, limit),
        from: limit,
        hasMore: entities.length > limit,
      });
    }
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
            src={`${ownerId}/widget/Entity`}
            props={{ accountId, update: props.update }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
