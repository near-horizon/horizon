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

const HalfWidth = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const stageMap = {
  "pre-seed": "Pre-seed",
  seed: "Seed",
  "series-a": "Series A",
  "series-b": "Series B",
  "series-c": "Series C",
  "series-d": "Series D",
};

const data = (
  <>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Project stage",
          id: "stage",
          value: {
            value: state.stage,
            text: stageMap[state.stage],
          },
          options: [
            { text: "Pre-seed", value: "pre-seed" },
            { text: "Seed", value: "seed" },
            { text: "Series A", value: "series-a" },
            { text: "Series B", value: "series-b" },
            { text: "Series C", value: "series-c" },
            { text: "Series D", value: "series-d" },
          ],
          onChange: ({ value: stage }) => State.update({ stage }),
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Are you currently raising?",
          id: "raising",
          value: {
            value: state.fundraising,
            text: state.fundraising === "yes" ? "Yes" : "No",
          },
          options: [
            { text: "Yes", value: "yes" },
            { text: "No", value: "no" },
          ],
          onChange: ({ value: fundraising }) => State.update({ fundraising }),
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "How much are you raising?",
          placeholder: 10,
          value: state.raise,
          onChange: (raise) => State.update({ raise }),
          validate: () => {
            if (state.raise < 0) {
              State.update({ raiseError: "Raise must be non negative" });
              return;
            }

            State.update({ raiseError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Have you taken any investment?",
          id: "investment",
          value: {
            value: state.investment,
            text: state.investment === "yes" ? "Yes" : "No",
          },
          options: [
            { text: "Yes", value: "yes" },
            { text: "No", value: "no" },
          ],
          onChange: ({ value: investment }) => State.update({ investment }),
        }}
      />
    </HalfWidth>
  </>
);

return <Container>{data}</Container>;
