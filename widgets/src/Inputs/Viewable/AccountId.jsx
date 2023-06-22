const ownerId = "nearhorizon.near";
const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const name = props.name ?? "";
const onSave = props.onSave ?? (() => {});
const canEdit = props.canEdit;

State.init({
  valid: true,
  errorMessage: <></>,
});

const validate = (accountId) => {
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof accountId !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    return;
  }

  if (accountId.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    return;
  }

  if (accountId.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
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
    return;
  }

  // if (forbiddenIds.has(accountId)) {
  //   State.update({
  //     valid: false,
  //     errorMessage: "This account ID has already been used!",
  //   });
  //   return;
  // }
  //
  State.update({ valid: true, errorMessage: "" });
};

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  flex-wrap: wrap;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

const Error = styled.small`
  color: red;
`;

const Anchor = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Viewable`}
    props={{
      id,
      label,
      value,
      edit: (update, v) => (
        <>
          <LabelArea>
            <Input
              id
              type="text"
              value={v}
              onChange={(e) => update(e.target.value)}
              onBlur={() => validate(v)}
            />
            <SaveButton
              valid={state.valid}
              onClick={() => state.valid && onSave(v)}
            >
              Save
            </SaveButton>
          </LabelArea>
          <Error>{state.valid ? <></> : state.errorMessage}</Error>
        </>
      ),
      view: value ? (
        <Anchor href={`/near/widget/ProfilePage?accountId=${value}`}>
          <Widget
            src={`${ownerId}/widget/Vendor.Icon`}
            props={{ accountId: value, size: "2em" }}
          />
          <Widget
            src={`${ownerId}/widget/NameAndAccount`}
            props={{
              accountId: value,
              name,
              nameSize: "1.125em",
            }}
          />
        </Anchor>
      ) : null,
      canEdit,
    }}
  />
);
