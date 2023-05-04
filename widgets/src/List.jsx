const ownerId = "nearhorizon.near";
const items = props.items ?? [];
const createItem = props.createItem ?? (() => <></>);
const limit = 10;

State.init({
  shown: items.slice(0, limit),
  from: limit,
  hasMore: items.length > limit,
});

const loadMore = () => {
  State.update({
    shown: items.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < items.length,
  });
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5em;
  row-gap: 1.25em;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;

  & > div {
    width: 100%;
  }
`;

return (
  <Container>
    <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
      <ListContainer>
        {state.shown
          .filter(props.filter)
          .map((args, index) => createItem(args))}
      </ListContainer>
    </InfiniteScroll>
  </Container>
);
