const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  border: none;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;

  &:disabled {
    background: #e5e5e5;
  }
`;

return (
  <Button onClick={props.onClick} disabled={props.disabled}>
    {props.text}
  </Button>
);
