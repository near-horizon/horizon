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
const id = props.id;

const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const convertType = (contributionType) => {
  if (allContributionTypes.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

State.init({
  entityId: [],
  accountId,
  permissions: [],
  description: props.description ?? "",
  contributionType: [],
  accountIdValid: true,
  startDate,
  forbiddenIds: new Set(),
});

const onSubmit = () => {
  if (!state.accountIdValid) {
    return;
  }

  const args = {
    entity_id: state.entityId[0].name,
    contributor_id: state.accountId,
    description: state.description,
    start_date: `${new Date(state.startDate).getTime()}`,
    contribution_type: convertType(state.contributionType[0]),
    permissions: state.permissions.map(({ name }) => name),
  };

  Near.call(ownerId, "invite_contributor", args);
};

const header = <div className="card-header">Invite contributor</div>;

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

const EntityInput = styled.div`
  margin-bottom: 0.5em;
`;

const SelectedEntity = styled.div`
  border-radius: 4px;
  background-color: #f2f4f7;
  height: 5em;
`;

const InputWrapper = styled.div`
  margin-bottom: 0.5em;
`;

const confirmText = (
  <>
    <i>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_778_24981)">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M8.74952 11.25L17.4995 2.50002M8.85584 11.5234L11.0459 17.1551C11.2389 17.6512 11.3353 17.8993 11.4743 17.9717C11.5948 18.0345 11.7384 18.0345 11.859 17.9719C11.998 17.8997 12.0948 17.6517 12.2883 17.1558L17.7803 3.08269C17.955 2.63504 18.0423 2.41121 17.9945 2.26819C17.953 2.14398 17.8556 2.04651 17.7314 2.00501C17.5883 1.95723 17.3645 2.04458 16.9169 2.21927L2.84373 7.71122C2.34784 7.90474 2.09989 8.0015 2.02763 8.14059C1.96499 8.26116 1.96508 8.4047 2.02786 8.5252C2.10028 8.66421 2.34834 8.76067 2.84446 8.95361L8.47613 11.1437C8.57684 11.1829 8.62719 11.2024 8.66959 11.2327C8.70717 11.2595 8.74004 11.2924 8.76685 11.3299C8.79709 11.3723 8.81667 11.4227 8.85584 11.5234Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_778_24981">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </i>
    <span>Send invite</span>
  </>
);

const body = (
  <div className="row">
    <InputWrapper>
      {accountId ? (
        <>
          <Label htmlFor="account-id">You're inviting:</Label>
          <SelectedEntity id="account-id">
            <Widget
              src={`${ownerId}/widget/ProfileLine`}
              props={{ accountId, imageSize: "4em" }}
            />
          </SelectedEntity>
        </>
      ) : (
        <Widget
          src={`${ownerId}/widget/ValidatedAccountIdInput`}
          props={{
            label: "Account ID of contributor:",
            value: state.accountId,
            update: (accountId, accountIdValid) =>
              State.update({ accountId, accountIdValid }),
            forbiddenIds: state.forbiddenIds,
          }}
        />
      )}
    </InputWrapper>
    <InputWrapper>
      <Widget
        src={`${ownerId}/widget/AdminEntityAccountIdInput`}
        props={{
          update: (entityId) => {
            State.update({ entityId });
            Near.asyncView(
              ownerId,
              "get_entity_invites",
              { account_id: entityId[0].name },
              "final"
            ).then((invites) =>
              State.update({
                forbiddenIds: new Set(Object.keys(invites)),
              })
            );
          },
          accountId: context.accountId,
          selected: state.entityId,
        }}
      />
    </InputWrapper>
    <InputWrapper>
      <Widget
        src={`${ownerId}/widget/ContributionTypeInput`}
        props={{
          contributionType: state.contributionType,
          update: (contributionType) => State.update({ contributionType }),
          allContributionTypes,
        }}
      />
    </InputWrapper>
    <InputWrapper>
      <Widget
        src={`${ownerId}/widget/DateInput`}
        props={{
          id: "start-date",
          text: " Start date of contribution:",
          date: state.startDate,
          update: (startDate) => State.update({ startDate }),
        }}
      />
    </InputWrapper>
    <InputWrapper>
      <Label htmlFor="permissions-input">Permissions for contributor:</Label>
      <Typeahead
        id="permissions-input"
        labelKey="name"
        onChange={(permissions) =>
          State.update({
            permissions,
          })
        }
        options={[{ name: "Admin" }]}
        placeholder="Admin or leave blank"
        selected={state.permissions}
        positionFixed
      />
    </InputWrapper>
    <InputWrapper>
      <Widget
        src={`${ownerId}/widget/DescriptionInput`}
        props={{
          description: state.description,
          text: "Details:",
          update: (description) => State.update({ description }),
        }}
      />
    </InputWrapper>
  </div>
);

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
    <h1>Propose contribution</h1>
    <Form>{body}</Form>
    <Controls>
      <CloseButton
        href={`/#/${ownerId}/widget/Index?tab=home`}
        onClick={() => props.update({ tab: "home" })}
      >
        Cancel
      </CloseButton>
      <ConfirmButton
        valid={
          state.contributionType.length === 1 && state.description.length > 0
        }
        onClick={onSubmit}
      >
        {confirmText}
      </ConfirmButton>
    </Controls>
  </Page>
);
