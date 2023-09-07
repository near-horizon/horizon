const items = props.items ?? [];

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25em;
`;

const RadioButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;

  button {
    border: none;
    background: none;
    border-radius: 100%;
    padding: 0;
    width: 1.5em;
    height: 1.5em;
    border: 2px solid #eceef0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    border-radius: 100%;
    border: 6px solid transparent;
    transition: border-color 200ms ease-out;

    &[data-state="checked"] {
      border-color: #202024;
    }
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 140%;
  color: #202024;
`;

return (
  <RadioGroup.Root asChild value={props.value} onValueChange={props.onChange}>
    <Radio>
      {items.map(({ value, name }) => (
        <RadioButton>
          <RadioGroup.Item id={value} value={value}>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Label htmlFor={value}>{name}</Label>
        </RadioButton>
      ))}
    </Radio>
  </RadioGroup.Root>
);
