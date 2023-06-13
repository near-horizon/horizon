const ownerId = "nearhorizon.near";
const items = props.items ?? [];
const createItem = props.createItem ?? (() => <></>);
const limit = 10;

State.init({
  all: items,
  shown: items.slice(0, limit),
  from: limit,
  hasMore: items.length > limit,
});

const loadMore = () => {
  State.update({
    shown: state.all.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.all.length,
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

  & > div {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;

    @media (min-width: 768px) {
      width: ${({ full }) => (full ? "100%" : "49%")};
    }

    @media (min-width: 2560px) {
      width: ${({ full }) => (full ? "100%" : "32%")};
    }
  }
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
      <ListContainer full={props.full}>
        {state.shown.filter(props.filter).map((args) => (
          <div key={JSON.stringify(args)}>{createItem(args)}</div>
        ))}
      </ListContainer>
    </InfiniteScroll>
  </Container>
);
