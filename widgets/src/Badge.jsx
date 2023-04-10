const value = props.value ?? "";
const color = props.color ?? "#e4e4ff";
const border = props.border ?? "#babafc";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 12px;
  gap: 3px;
  background: ${color};
  border: 1px solid ${border};
  border-radius: 100px;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #475467;
`;

return <Container>{value}</Container>;
