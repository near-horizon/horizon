const update = props.update;
const value = props.value;
const label = props.label ?? "Name:";

if (typeof value !== "string") {
  return "Cannot accept non string value for input!";
}

if (!update) {
  return "Cannot render name input without update function!";
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="name">{label}</Label>
    <input
      type="text"
      id="name"
      placeholder="NEAR, Sweatcoin..."
      value={value}
      onChange={({ target }) => update(target.value)}
    />
  </>
);
