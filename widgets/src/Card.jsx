const header = props.header ?? <></>;
const body = props.body ?? <></>;
const footer = props.footer ?? <></>;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  flex-shrink: 0;
  width: 100%;
`;

const CardHeader = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0;
  gap: 0.675em;
  background: #fff9ed;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5em 1.5em 1em;
  gap: 0.675em;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1.5em;
  gap: 1em;
  border-top: 1px solid #eceef0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 1;
`;

return (
  <CardContainer>
    <CardHeader show={!!props.header}>{header}</CardHeader>
    <CardBody>{body}</CardBody>
    <CardFooter>{footer}</CardFooter>
  </CardContainer>
);
