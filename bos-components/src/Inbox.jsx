const ownerId = "nearhorizon.near";

if (!context.accountId) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to look at your notifications!",
      }}
    />
  );
}

const Wrapper = styled.div`
  padding-bottom: 48px;

  > div {
    > * {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  color: #101828;
`;

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

const notifications = [
  ...new Set([...state.projects, ...state.vendors, context.accountId]),
]
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
  .sort((a, b) => b.blockHeight - a.blockHeight);

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

return (
  <Wrapper>
    <Header>Inbox</Header>
    <List>
      {notifications.map((item) => (
        <Widget src={`${ownerId}/widget/Notification.Index`} props={item} />
      ))}
    </List>
  </Wrapper>
);
