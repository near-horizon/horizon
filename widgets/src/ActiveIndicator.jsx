const active = props.active ?? false;
const activeText = props.activeText ?? "Active";
const inactiveText = props.inactiveText ?? "Not active";

const TextSpan = styled.span`
  font-size: 0.95em;
  display: block;
  margin-left: 0.25em;
  white-space: nowrap;
`;

const Icon = styled.i`
  background-color: rgb(25, 135, 84);
  border-radius: 100%;
  width: 0.6em;
  height: 0.6em;
  display: ${({ active }) => (active ? "block" : "hidden")};
`;

const Container = styled.div`
  margin-right: 0.75em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${({ active }) =>
    active ? "rgb(25, 135, 84)" : "rgba(173, 181, 189, 0.75)"};
`;

return (
  <Container active={active}>
    <Icon active={active} />
    <TextSpan>{active ? activeText : inactiveText}</TextSpan>
  </Container>
);
