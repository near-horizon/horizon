const update = props.update;
const value = props.value;
const label = props.label ?? "Name:";

if (typeof value !== "string") {
  return "Cannot accept non string value for input!";
}

if (!update) {
  return "Cannot render name input without update function!";
}

return (
  <>
    <label htmlFor="name">{label}</label>
    <input
      type="text"
      id="name"
      placeholder="NEAR, Sweatcoin..."
      value={value}
      onChange={({ target }) => update(target.value)}
    />
  </>
);
