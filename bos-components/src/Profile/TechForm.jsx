const ownerId = "nearhorizon.near";
const onSave = props.onSave;

State.init({ ...props.data });

if (props.save) {
  onSave(state);
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
`;

const ContractsContainer = styled.div`
  width: 100%;

  & > div {
    width: 50%;
    height: 1.5rem;
  }
`;

const HalfWidth = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const data = (
  <>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Userbase",
          placeholder: 10,
          value: state.userbase,
          onChange: (userbase) => State.update({ userbase }),
          validate: () => {
            if (state.userbase < 0) {
              State.update({
                userbaseError: "Userbase must be non negative",
              });
              return;
            }

            State.update({ userbaseError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Total addressable market (TAM)",
          placeholder: 10,
          value: state.tam,
          onChange: (tam) => State.update({ tam }),
          validate: () => {
            if (state.tam < 0) {
              State.update({ tamError: "TAM must be non negative" });
              return;
            }

            State.update({ tamError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Integration`}
        props={{
          category: state.integration,
          update: (integration) =>
            State.update({ integration: integration.value }),
          setError: (integrationError) => State.update({ integrationError }),
          error: state.integrationError,
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Phase`}
        props={{
          dev: state.dev,
          update: (dev) => State.update({ dev: dev.value }),
          setError: (devError) => State.update({ devError }),
          error: state.devError,
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Distribution`}
        props={{
          distribution: state.distribution,
          update: (distribution) =>
            State.update({ distribution: distribution.value }),
          setError: (distributionError) => State.update({ distributionError }),
          error: state.distributionError,
        }}
      />
    </HalfWidth>
    <Widget
      src={`${ownerId}/widget/Inputs.LabeledData`}
      props={{
        label: "What are your contracts?",
        content: (
          <ContractsContainer>
            <Typeahead
              id="contracts"
              labelKey="name"
              onChange={(contracts) => {
                State.update({ contracts: contracts.map(({ name }) => name) });
              }}
              options={[]}
              selected={state.contracts.map((name) => ({ name }))}
              positionFixed
              multiple
              allowNew
            />
          </ContractsContainer>
        ),
      }}
    />
  </>
);

return <Container>{data}</Container>;
