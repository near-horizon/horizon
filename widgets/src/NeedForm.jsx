const ownerId = "contribut3.near";
const accountId = props.accountId;
const contributionType = props.contributionType
  ? [{ name: props.contributionType }]
  : [];

State.init({
  contributionType: [],
  entityId: accountId ? [{ name: accountId }] : [],
  description: "",
  options: [],
  fetched: false,
});

console.log("rendered this");

if (!state.fetched) {
  Near.asyncView(ownerId, "get_contribution_types", {}, "final", false).then(
    (types) =>
      State.update({
        fetched: true,
        options: types.map((name) => ({ name })),
      })
  );
}

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

const entityEditor = (
  <EntityInput>
    <Label htmlFor="enity-id">Request for:</Label>
    {props.accountId ? (
      <SelectedEntity id="entity-id">
        <Widget
          src={`${ownerId}/widget/ProfileLine`}
          props={{
            accountId: props.accountId,
            imageSize: "4em",
            isEntity: true,
          }}
        />
      </SelectedEntity>
    ) : (
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
    )}
  </EntityInput>
);

const InputWrapper = styled.div`
  margin-bottom: 0.5em;
`;

const contributionTypeInput = (
  <InputWrapper>
    <Widget
      src={`${ownerId}/widget/ContributionTypeInput`}
      props={{
        contributionType: state.contributionType,
        update: (contributionType) => State.update({ contributionType }),
      }}
    />
  </InputWrapper>
);

const descriptionInput = (
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
);

const convertType = (contributionType) => {
  if (state.options.some(({ name }) => name === contributionType.name)) {
    return contributionType.name;
  }

  return { Other: contributionType.name };
};

const onSubmit = () => {
  if (state.contributionType.length !== 1 || state.description.length === 0) {
    return;
  }

  const args = {
    entity_id: state.entityId[0].name,
    description: state.description,
    contribution_type: convertType(state.contributionType[0]),
  };

  Near.call(ownerId, "post_contribution_need", args);
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
    <h1>Create new contribution request</h1>
    <Form>
      {entityEditor}
      {contributionTypeInput}
      {descriptionInput}
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
          state.contributionType.length === 1 && state.description.length > 0
        }
        onClick={onSubmit}
      >
        Create request
      </ConfirmButton>
    </Controls>
  </Page>
);
