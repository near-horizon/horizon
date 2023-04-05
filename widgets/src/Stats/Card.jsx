const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1.25em 0.625em;
  background-color: #fafafa;
  border-radius: 16px;
`;

const Value = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1em;
  text-align: center;
  color: #7269e1;
`;

const Label = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #000;
`;

return (
  <Container>
    <Value>{props.value}</Value>
    <Label>{props.label}</Label>
  </Container>
);
