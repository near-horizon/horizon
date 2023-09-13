const Label = styled.label`
  color: #000;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
`;

const NotSpecified = styled.div`
  color: var(--ui-elements-gray, #7e868c);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.00875rem;
`;

return (
  <Container>
    <Label>{props.label}</Label>
    {props.content ? props.content : <NotSpecified>Not specified</NotSpecified>}
  </Container>
);
