const active = props.active ?? false;
const activeText = props.activeText ?? "Active";
const inactiveText = props.inactiveText ?? "Not active";

const TextSpan = styled.span`
  font-size: 0.95em;
  color: ${({ active }) => (active ? "#027a48" : "#b54708")};
  display: block;
  margin-left: 0.25em;
  white-space: nowrap;
`;

const Icon = styled.i`
  background-color: ${({ active }) => (active ? "#12b76a" : "#f79009")};
  border-radius: 100%;
  width: 0.6em;
  height: 0.6em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.125em 0.5em 0.125em 0.375em;
  gap: 0.25em;
  background-color: ${({ active }) => (active ? "#ecfdf3" : "#fffaeb")};
  mix-blend-mode: multiply;
  border-radius: 16px;
`;

return (
  <Container active={active}>
    <Icon active={active} />
    <TextSpan active={active}>{active ? activeText : inactiveText}</TextSpan>
  </Container>
);
