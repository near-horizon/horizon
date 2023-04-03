const ownerId = "contribut3.near";
const buttons = props.buttons ?? [];
const tab = props.tab;
const accountId = props.accountId;
const content = props.content;
const cid = props.cid;

const TabItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #344054;
  cursor: pointer;
  font-weight: 500;
  font-size: 1em;
  padding: 0.5em;
  margin: 0;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ selected }) => (selected ? "#f2f4f7" : "white")};

  &:hover {
    color: #667085;
    text-decoration: none;
    background-color: #f9fafb;
  }

  &:nth-child(n + 2) {
    border-left: 1px solid #d0d5dd;
  }

  span {
    margin-left: 0.25em;
    margin-right: ${({ hasCount }) => (hasCount ? "1.75em" : "0")};
  }
`;

const CountIndicator = styled.div`
  display: ${({ show }) => (show ? "inline-block" : "none")};
  border-radius: 100%;
  background-color: ${({ grey }) => (grey ? "#f2f4f7" : "#f04438")};
  min-width: 1.5em;
  min-height: 1.5em;
  color: ${({ grey }) => (grey ? "#344054" : "white")};
  text-align: center;
  position: absolute;
  inset: auto 0.5em auto auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #d0d5dd;
  overflow: hidden;
  border-radius: 8px;
`;

return (
  <Container>
    {buttons.map(({ id, text, icon, count, grey }) => (
      <TabItem
        selected={props.content === id}
        hasCount={!!count && count > 0}
        href={`/#/${ownerId}/widget/Index?tab=${tab}&content=${id}${props.search ? "&search=" + props.search : ""
          }${accountId ? "&accountId=" + accountId : ""}${cid ? "&cid=" + cid : ""
          }`}
        onClick={() =>
          props.update({
            tab,
            content: id,
            search: props.search,
            accountId,
            cid,
          })
        }
        key={id}
      >
        {icon}
        <span>{text}</span>
        <CountIndicator show={!!count && count > 0} grey={grey}>
          {count}
        </CountIndicator>
      </TabItem>
    ))}
  </Container>
);
