const ownerId = "nearhorizon.near";
const search = props.search ?? "";

State.init({
  projects: null,
  projectsIsFetched: false,
  vendors: null,
  vendorsIsFetched: false,
});

if (!state.projectsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false,
  ).then((projects) => State.update({ projects, projectsIsFetched: true }));
}

if (!state.vendorsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_vendors",
    { account_id: context.accountId },
    "final",
    false,
  ).then((vendors) => State.update({ vendors, vendorsIsFetched: true }));
}

if (!state.projectsIsFetched || !state.vendorsIsFetched) {
  return <>Loading...</>;
}

const notifications = [...new Set([...state.projects, ...state.vendors])]
  .reduce((allNotifications, accountId) => {
    const notificationsForAccount = Social.index("inbox", accountId, {
      order: "desc",
      subscribe: true,
    });

    if (!notificationsForAccount) {
      return allNotifications;
    }

    return [...allNotifications, ...notificationsForAccount];
  }, [])
  .filter(({ value }) => value.type === "project/invite")
  .sort((a, b) => b.blockHeight - a.blockHeight);

// if (!state.itemsIsFetched) {
//   if (!context.accountId) {
//     State.update({ items: [], itemsIsFetched: true });
//   } else {
//     Near.asyncView(
//       ownerId,
//       "get_admin_vendors",
//       { account_id: context.accountId },
//       "final",
//       false
//     ).then((items) => State.update({ items, itemsIsFetched: true }));
//
//     return <>Loading...</>;
//   }
// }

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
        filter: () => {},
        items: notifications,
        createItem: (notification) => (
          <Widget
            src={`${ownerId}/widget/Invites.AdminCard`}
            props={{ notification }}
          />
        ),
      }}
    />
  </Container>
);
