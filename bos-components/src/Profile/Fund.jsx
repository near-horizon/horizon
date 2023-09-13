const ownerId = "nearhorizon.near";

State.init({
  // Profile data
  stage: "",
  stageError: "",
  fundraising: "",
  fundraisingError: "",
  raise: "",
  raiseError: "",
  investment: "",
  investmentError: "",
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${context.accountId}/profile/**`] },
    "final",
    false,
  ).then((data) => {
    const profile = data[`${context.accountId}`]?.profile || {};
    State.update({
      userbase: profile.userbase,
      tam: profile.tam,
      dev: profile.dev,
      distribution: profile.distribution,
      stage: profile.stage,
      profileIsFetched: true,
    });
  });
}

let completed = 0;
const total = 4;
if (state.stage) completed++;
if (state.fundraising) completed++;
if (state.raise) completed++;
if (state.investment) completed++;

if (!state.profileIsFetched) {
  return <>Loading...</>;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > h2 {
      color: #000;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > small {
      color: var(--ui-elements-gray, #7e868c);
      font-family: Inter;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem; /* 142.857% */
      letter-spacing: 0.00875rem;
    }
  }
`;

const EditButton = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--text-text-link, #006adc);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const data = (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.LabeledData`}
      props={{
        label: "Project stage",
        content: state.stage,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.LabeledData`}
      props={{
        label: "Are you currently fundraising?",
        content: state.fundraising,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.LabeledData`}
      props={{
        label: "How mush are you looking to raise?",
        content: state.raise,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.LabeledData`}
      props={{
        label: "Have you raised any investment?",
        content: state.investment,
      }}
    />
  </>
);

const { edit: _, ...editData } = state;

const edit = (
  <Widget
    src={`${ownerId}/widget/Profile.FundForm`}
    props={{
      data: editData,
      save: state.save,
      onSave: (data) => {
        State.update({ save: false });

        const profileKeys = ["stage", "fundraising", "raise", "investment"];

        const profileData = {};

        for (const key of profileKeys) {
          if (Array.isArray(data[key])) {
            if (
              data[key].every((v) => state[key].includes(v)) &&
              state[key].every((v) => data[key].includes(v)) &&
              data[key].length === state[key].length
            ) {
              continue;
            }
          }

          if (typeof data[key] === "object") {
            if (
              Object.keys(data[key]).every(
                (k) => data[key][k] === state[key][k],
              ) &&
              Object.keys(state[key]).every(
                (k) => data[key][k] === state[key][k],
              )
            ) {
              continue;
            }
          }

          if (data[key] !== state[key]) {
            profileData[key] = data[key];
          }
        }

        if (Object.keys(profileData).length > 0) {
          Social.set(
            { profile: profileData },
            {
              onCommit: () => {
                State.update({ ...profileData, edit: false });
              },
            },
          );
          return;
        }
      },
    }}
  />
);

const EditButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const CancelButton = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--text-text-primary, #101828);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const SaveButton = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  background: var(--primary-primary-default, #00ec97);
  border: 1px solid var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const editButtons = (
  <>
    <CancelButton onClick={() => State.update({ edit: false })}>
      Cancel
    </CancelButton>
    <SaveButton onClick={() => State.update({ save: true })}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 4.5L6.75 12.75L3 9"
          stroke="currentColor"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Update section
    </SaveButton>
  </>
);

return (
  <Container>
    <Header>
      <div>
        <h2>Fundraising information</h2>
        <small>
          Completed:{" "}
          {(completed / total).toLocaleString("en-GB", { style: "percent" })}
        </small>
      </div>
      {state.edit ? (
        <div>{editButtons}</div>
      ) : (
        <EditButton onClick={() => State.update({ edit: !state.edit })}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99998 15.0002H15.75M2.25 15.0002H3.50591C3.87279 15.0002 4.05624 15.0002 4.22887 14.9587C4.38192 14.922 4.52824 14.8614 4.66245 14.7791C4.81382 14.6864 4.94354 14.5567 5.20296 14.2972L14.625 4.87517C15.2463 4.25385 15.2463 3.24649 14.625 2.62517C14.0037 2.00385 12.9963 2.00385 12.375 2.62517L2.95295 12.0472C2.69352 12.3067 2.5638 12.4364 2.47104 12.5877C2.3888 12.722 2.32819 12.8683 2.29145 13.0213C2.25 13.194 2.25 13.3774 2.25 13.7443V15.0002Z"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Edit section
        </EditButton>
      )}
    </Header>
    {state.edit ? (
      <>
        {edit}
        <EditButtons>{editButtons}</EditButtons>
      </>
    ) : (
      data
    )}
  </Container>
);
