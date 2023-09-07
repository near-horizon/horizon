const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  if (!context.accountId) {
    State.update({ items: [], itemsIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "get_admin_vendors",
      { account_id: context.accountId },
      "final",
      false,
    ).then((items) => State.update({ items, itemsIsFetched: true }));

    return <>Loading...</>;
  }
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75em 0.95em;
  gap: 0.75em;
  width: 100%;
  background: #f9fafb;
  border-bottom: 1px solid #eaecf0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #475467;
`;

const Name = styled.div`
  width: 55%;
`;

const Other = styled.div`
  text-align: center;
  width: 15%;
`;

const Container = styled.div`
  .cont {
    width: 100% !important;
  }
`;

return (
  <Container>
    <Header>
      <Name>Name</Name>
      <Other>Admins</Other>
      <Other>Created</Other>
      <Other>Status</Other>
    </Header>
    <Widget
      src={`${ownerId}/widget/List`}
      props={{
        full: true,
        filter: (accountId) => accountId.includes(search),
        items: state.items,
        createItem: (accountId) => (
          <Widget
            src={`${ownerId}/widget/Vendor.AdminCard`}
            props={{ accountId }}
          />
        ),
      }}
    />
  </Container>
);
