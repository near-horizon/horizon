const ownerId = "nearhorizon.near";
const onSave = props.onSave;

const supportedLinks = [
  {
    name: "github",
    url: "github.com/",
  },
  {
    name: "discord",
    url: "discord.com/",
  },
  {
    name: "reddit",
    url: "reddit.com/u/",
  },
  {
    name: "twitter",
    url: "twitter.com/",
  },
  {
    name: "youtube",
    url: "youtube.com/",
  },
];

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

const data = (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Description",
        placeholder: "Give a short description of your project",
        value: state.description,
        onChange: (description) => State.update({ description }),
        validate: () => {
          if (state.description.length > 500) {
            State.update({
              descriptionError: "Description must be less than 500 characters",
            });
            return;
          }

          State.update({ descriptionError: "" });
        },
        error: state.descriptionError,
      }}
    />
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Website",
          placeholder: "Website URL (near.org)",
          value: state.website,
          onChange: (website) => State.update({ website }),
          validate: () => {
            if (state.website.length > 50) {
              State.update({
                websiteError: "The URL must be less than 50 characters",
              });
              return;
            }

            State.update({ websiteError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Team size",
          placeholder: 10,
          value: state.company_size,
          onChange: (company_size) =>
            State.update({ company_size: `${company_size}` }),
          validate: () => {
            if (state.company_size < 1) {
              State.update({
                company_sizeError: "Team size must be at least 1",
              });
              return;
            }

            State.update({ company_sizeError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Location",
          placeholder: "San Fancisco, CA",
          value: state.geo,
          onChange: (geo) => State.update({ geo }),
          validate: () => {
            if (state.geo.length > 100) {
              State.update({
                geoError: "Location must be less than 100 characters",
              });
              return;
            }

            State.update({ geoError: "" });
          },
        }}
      />
    </HalfWidth>
    <HalfWidth>
      <Widget
        src={`${ownerId}/widget/Inputs.LabeledData`}
        props={{
          label: "Social profiles",
          content: supportedLinks.map(({ name, url }) => (
            <Widget
              src={`${ownerId}/widget/Inputs.Social`}
              props={{
                start: url,
                value: state.linktree[name] ?? "",
                update: (s) => State.update({ ...state.linktree, [name]: s }),
              }}
            />
          )),
        }}
      />
    </HalfWidth>
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "What problem(s) are you solving?",
        placeholder: " ",
        value: state.problem,
        onChange: (problem) => State.update({ problem }),
        validate: () => {
          if (state.problem.length > 500) {
            State.update({
              problemError: "Problem must be less than 500 characters",
            });
            return;
          }

          State.update({ problemError: "" });
        },
        error: state.problemError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "What makes your team uniquely positioned for success?",
        placeholder: " ",
        value: state.success_position,
        onChange: (success_position) => State.update({ success_position }),
        validate: () => {
          if (state.success_position.length > 500) {
            State.update({
              success_positionError:
                "Success position must be less than 500 characters",
            });
            return;
          }

          State.update({ success_positionError: "" });
        },
        error: state.success_positionError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Why are you building on NEAR?",
        placeholder: " ",
        value: state.why,
        onChange: (why) => State.update({ why }),
        validate: () => {
          if (state.why.length > 500) {
            State.update({
              whyError: "Why must be less than 500 characters",
            });
            return;
          }

          State.update({ whyError: "" });
        },
        error: state.whyError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Why do you think you are going to win?",
        placeholder: " ",
        value: state.win,
        onChange: (win) => State.update({ win }),
        validate: () => {
          if (state.win.length > 500) {
            State.update({
              winError: "Win must be less than 500 characters",
            });
            return;
          }

          State.update({ winError: "" });
        },
        error: state.winError,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "What is your vision for the future?",
        placeholder: " ",
        value: state.vision,
        onChange: (vision) => State.update({ vision }),
        validate: () => {
          if (state.vision.length > 500) {
            State.update({
              visionError: "Vision must be less than 500 characters",
            });
            return;
          }

          State.update({ visionError: "" });
        },
        error: state.visionError,
      }}
    />
  </>
);

return <Container>{data}</Container>;
