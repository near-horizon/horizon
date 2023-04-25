const ownerId = "contribut3.near";

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

const header = <Header>Inbox</Header>;


const index = {
  action: "inbox",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget src={`${ownerId}/widget/Notification`} key={i} props={item} />
  );
};

return (
  <Wrapper>
    <Header>{header}</Header>
    <Widget
      src="near/widget/IndexFeed"
      props={{ index, renderItem }}
    />
  </Wrapper>
);
