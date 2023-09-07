const ownerId = "nearhorizon.near";
const label = props.label ?? "Account ID";
const placeholder = props.placeholder ?? "Enter your account ID";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const addInfo = props.addInfo ?? (() => {});
const accountIdRegex =
  /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

const canEdit = (accountId) => {
  return Near.asyncView(
    "social.near",
    "is_write_permission_granted",
    { predecessor_id: context.accountId, key: accountId },
    "final",
    false,
  );
};

const checkIsProject = (accountId) => {
  return Near.asyncView(
    ownerId,
    "check_is_project",
    { account_id: accountId },
    "final",
    false,
  );
};

const checkIsVendor = (accountId) => {
  return Near.asyncView(
    ownerId,
    "check_is_vendor",
    { account_id: accountId },
    "final",
    false,
  );
};

const checkIsInvestor = (accountId) => {
  return Near.asyncView(
    ownerId,
    "check_is_investor",
    { account_id: accountId },
    "final",
    false,
  );
};

const checkIsTaken = {
  project: checkIsProject,
  vendor: checkIsVendor,
  investor: checkIsInvestor,
}[props.type ?? "project"];

State.init({
  valid: true,
  errorMessage: <></>,
});

const validate = async () => {
  if (typeof value !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    addInfo(false);
    return;
  }

  if (value.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    addInfo(false);
    return;
  }

  if (value.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    addInfo(false);
    return;
  }

  if (!accountIdRegex.test(value)) {
    State.update({
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a
            href="https://nomicon.io/DataStructures/Account#account-id-rules"
            target="_blank"
          >
            here
          </a>
          !
        </>
      ),
    });
    addInfo(false);
    return;
  }

  checkIsTaken(value).then((isProject) => {
    if (isProject) {
      State.update({
        valid: false,
        errorMessage: "This account ID is already taken!",
      });
      addInfo(false);
      return;
    }

    if (!props.addInfo) {
      // if (forbiddenIds.has(value)) {
      //   State.update({
      //     valid: false,
      //     errorMessage: "This account ID has already been used!",
      //   });
      //   return;
      // }
      //
      State.update({ valid: true, errorMessage: "" });
      addInfo(false);
    }

    canEdit(value).then((editPermission) => {
      if (!editPermission) {
        if (value !== context.accountId) {
          State.update({
            valid: false,
            errorMessage: "You do not have permission to edit this account!",
          });
        }

        State.update({ valid: true, errorMessage: "" });
        addInfo(true);
        return;
      }

      State.update({ valid: true, errorMessage: "" });
      addInfo(false);
    });
  });
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
