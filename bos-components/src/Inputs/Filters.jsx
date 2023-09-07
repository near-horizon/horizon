const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 7px 0px 0px;
  gap: 17px;
  width: 100%;
`;

const Root = styled("Collapsible.Root")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 17px;
  width: 100%;
`;

return (
  <Container>
    <Root>
      <Widget
        src={`${ownerId}/widget/Inputs.Filters.Inner`}
        props={{
          urlProps,
          urlFilters: props.urlFilters,
          search: props.search,
          entity: props.entity,
          noFilters: props.noFilters,
          filters: props.filters,
          quickFilters: props.quickFilters,
          change: props.change,
          url: props.url,
        }}
      />
    </Root>
  </Container>
);
