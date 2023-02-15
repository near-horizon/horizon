const ownerId = "contribut3.near";
const allAccountIds = props.allAccountIds;
const accountId = props.accountId;
const fixed = props.fixed;
const update = props.update;

initState({
  valid: props.valid ?? true,
  errorMessage: "",
});

const validate = (accountId) => {
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof accountId !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    update(accountId, false);
    return;
  }

  if (accountId.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    update(accountId, false);
    return;
  }

  if (accountId.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    update(accountId, false);
    return;
  }

  if (!accountIdRegex.test(accountId)) {
    State.update({
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a href="https://nomicon.io/DataStructures/Account#account-id-rules">
            here
          </a>
          !
        </>
      ),
    });
    update(accountId, false);
    return;
  }

  State.update({ valid: true, errorMessage: "" });
  update(accountId, true);
};

const formatDate = (timestampString) => {
  const date = new Date(Number(timestampString));
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

return (
  <div className="col-lg-12 mb-2">
    <label htmlFor="account-id-input">Account ID of entity:</label>
    <small style={{ color: "red" }}>
      {state.valid ? null : state.errorMessage}
    </small>
    <Typeahead
      id="account-id-input"
      labelKey="name"
      onChange={(accountId) => {
        const args = { account_id: accountId[0].name };
        Near.asyncView(ownerId, "get_entity", args, "final").then(
          (existing) => {
            const updatedState = {
              accountId,
            };

            if (existing) {
              updatedState.existing = existing;
              updatedState.name = existing.name;
              updatedState.kind = [{ name: existing.kind }];
              updatedState.entityStatus = [{ name: existing.status }];
              updatedState.startDate = formatDate(existing.start_date);

              if (existing.end_date) {
                updatedState.endDate = formatDate(existing.endDate);
              }
            }

            update(updatedState);
          }
        );
      }}
      onBlur={() => validate(accountId[0].name)}
      options={allAccountIds}
      placeholder="contribut3.near, social.near..."
      selected={state.accountId}
      isInvalid={!state.valid}
      positionFixed
      allowNew
      disabled={state.fixed}
    />
  </div>
);
