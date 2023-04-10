const ownerId = "contribut3.near";
const label = props.label ?? "Account ID";
const placeholder = props.placeholder ?? "Enter your account ID";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => { });
const accountIdRegex =
  /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

State.init({
  valid: true,
  errorMessage: <></>,
});

const validate = () => {
  if (typeof value !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    return;
  }

  if (value.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    return;
  }

  if (value.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    return;
  }

  if (!accountIdRegex.test(value)) {
    State.update({
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a href="https://nomicon.io/DataStructures/Account#account-id-rules" target="_blank">
            here
          </a>
          !
        </>
      ),
    });
    return;
  }

  // if (forbiddenIds.has(value)) {
  //   State.update({
  //     valid: false,
  //     errorMessage: "This account ID has already been used!",
  //   });
  //   return;
  // }
  //
  State.update({ valid: true, errorMessage: "" });
};

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Text`}
    props={{
      label,
      placeholder,
      value,
      onChange,
      validate,
      error: state.errorMessage,
    }}
  />
);
