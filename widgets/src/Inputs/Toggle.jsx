const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;

  .switch {
    width: 42px;
    height: 25px;
    padding: 0;
    background-color: var(--blackA9);
    border-radius: 9999px;
    position: relative;
    box-shadow: 0 2px 10px var(--blackA7);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .switch:focus {
    box-shadow: 0 0 0 2px black;
  }
  .switch[data-state="checked"] {
    background-color: black;
  }

  .thumb {
    display: block;
    width: 21px;
    height: 21px;
    background-color: white;
    border-radius: 9999px;
    box-shadow: 0 2px 2px var(--blackA7);
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;
  }
  .thumb[data-state="checked"] {
    transform: translateX(19px);
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #202024;
  font-style: normal;
`;

return (
  <Box>
    <Switch.Root
      checked={props.value}
      onCheckedChange={props.onChange}
      id={props.id}
      className="switch"
    >
      <Switch.Thumb className="thumb" />
    </Switch.Root>
    <Label htmlFor={props.id}>
      {props.value ? props.labelActive : props.labelInactive}
    </Label>
  </Box>
);
