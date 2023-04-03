const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ownerId = "contribut3.near";
const accountId = props.accountId ?? "";
const kind = props.kind ? [{ name: props.kind }] : [];
const startDate = props.startDate ?? createDate();
const forbiddenIds = new Set(
  Near.view(ownerId, "get_entities", {}, "final", true) ?? []
);

State.init({
  accountId,
  name: props.name ?? "",
  accountIdValid: true,
  kind,
  startDate,
  entityFetched: false,
});

if (accountId && !state.entityFetched) {
  Near.asyncView(
    ownerId,
    "get_entity",
    { account_id: accountId },
    "final"
  ).then((entity) => {
    const date = new Date(Number(entity.start_date));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    State.update({
      name: entity.name,
      entityFetched: true,
      kind: [{ name: entity.kind }],
      startDate: `${year}-${month}-${day}`,
    });
  });
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

const InputWrapper = styled.div`
  margin-bottom: 0.5em;
`;

const accountIdInput = (
  <InputWrapper>
    {accountId ? (
      <>
        <Label htmlFor="account-id">Project account ID</Label>
        <div
          className="rounded-3 bg-light"
          style={{ height: "5em" }}
          id="account-id"
        >
          <Widget
            src={`${ownerId}/widget/ProfileLine`}
            props={{ accountId, imageSize: "4em", isEntity: true }}
          />
        </div>
      </>
    ) : (
      <Widget
        src={`${ownerId}/widget/ValidatedAccountIdInput`}
        props={{
          label: "Project account ID *",
          value: state.accountId,
          update: (accountId, accountIdValid) =>
            State.update({ accountId, accountIdValid }),
          forbiddenIds,
        }}
      />
    )}
  </InputWrapper>
);
const nameInput = (
  <InputWrapper>
    <Widget
      src={`${ownerId}/widget/NameInput`}
      props={{
        label: "Project name *",
        value: state.name,
        update: (name) => State.update({ name }),
      }}
    />
  </InputWrapper>
);

const kindInput = (
  <InputWrapper>
    <Widget
      src={`${ownerId}/widget/EntityTypeInput`}
      props={{
        kind: state.kind,
        update: (kind) => State.update({ kind }),
        text: "Type of project *",
      }}
    />
  </InputWrapper>
);

const startDateInput = (
  <InputWrapper>
    <Widget
      src={`${ownerId}/widget/DateInput`}
      props={{
        id: "start-date",
        text: "Founding date",
        date: state.startDate,
        update: (startDate) => State.update({ startDate }),
      }}
    />
  </InputWrapper>
);

const onSubmit = () => {
  if (!state.accountIdValid) {
    return;
  }

  const args = {
    account_id: state.accountId,
    name: state.name,
    kind: state.kind[0].name,
    start_date: `${new Date(state.startDate).getTime()}`,
  };

  Near.call(ownerId, "add_entity", args);
};

const Page = styled.div`
  padding: 0 0.75em;
  max-width: 100%;

  h1 {
    font-size: 2em;
    margin-bottom: 0.75em;
    padding-bottom: 0.75em;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75em;
  padding: 1em;
  border-radius: 4px;
  background-color: #f9fafb;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButton = styled.a`
  background-color: white;
  padding: 0.7em;
  border-radius: 4px;
  border: 0;
  color: #344054;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    color: unset;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }
`;

const ConfirmButton = styled.button`
  padding: 0.7em;
  border-radius: 4px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: ${({ valid }) => (valid ? "#7f56d9" : "#344054")};
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    ${({ valid }) => (valid ? "background-color: #4f56d9;" : "")}
  }
`;

return (
  <Page>
    <h1>{!props.accountId ? "Create new" : "Edit"} project</h1>
    <Form>
      {accountIdInput}
      {nameInput}
      {kindInput}
      {startDateInput}
    </Form>
    <Controls>
      <CloseButton
        href={`/#/${ownerId}/widget/Index?tab=home`}
        onClick={() => props.update({ tab: "home" })}
      >
        Cancel
      </CloseButton>
      <ConfirmButton
        valid={
          state.name.length > 1 &&
          state.accountIdValid &&
          state.kind.length === 1
        }
        onClick={onSubmit}
      >
        {!props.accountId ? "Create" : "Edit"} project
      </ConfirmButton>
    </Controls>
  </Page>
);
