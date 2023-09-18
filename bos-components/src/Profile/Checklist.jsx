const ownerId = "nearhorizon.near";

const ChecklistItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.625rem;

    & > p {
      color: var(--text-text-link, #006adc);
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 1.225rem */
      letter-spacing: 0.00875rem;
    }
  }

  & > span {
    overflow: hidden;
    color: var(--primary-primary-pressed, #04a46e);
    text-align: right;
    text-overflow: ellipsis;
    font-family: "Mona Sans";
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &.completed > span {
    text-decoration-line: line-through;
    color: var(--ui-elements-gray, #7e868c);
  }

  &.completed > div > p {
    color: var(--ui-elements-gray, #7e868c);
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.00875rem;
    text-decoration-line: line-through;
  }
`;

const createChecklistItem = ({ text, completed, award }) => (
  <ChecklistItem className={completed ? "completed" : ""}>
    <div>
      {completed ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8752 2.75H4.12524C3.76068 2.75036 3.41115 2.89534 3.15337 3.15313C2.89559 3.41091 2.7506 3.76044 2.75024 4.125V17.875C2.7506 18.2396 2.89559 18.5891 3.15337 18.8469C3.41115 19.1047 3.76068 19.2496 4.12524 19.25H17.8752C18.2398 19.2496 18.5893 19.1047 18.8471 18.8469C19.1049 18.5891 19.2499 18.2396 19.2502 17.875V4.125C19.2499 3.76044 19.1049 3.41091 18.8471 3.15313C18.5893 2.89534 18.2398 2.75036 17.8752 2.75ZM15.2562 9.43433L10.2141 14.2468C10.0863 14.3692 9.91627 14.4375 9.73938 14.4375C9.56249 14.4375 9.39244 14.3692 9.26471 14.2468L6.74432 11.8406C6.6789 11.7783 6.6264 11.7037 6.58983 11.6211C6.55326 11.5385 6.53333 11.4495 6.53119 11.3592C6.52906 11.2689 6.54475 11.179 6.57737 11.0948C6.60999 11.0106 6.6589 10.9336 6.7213 10.8683C6.78371 10.8029 6.85838 10.7506 6.94105 10.7141C7.02371 10.6777 7.11275 10.6579 7.20306 10.656C7.29338 10.654 7.38319 10.6698 7.46738 10.7026C7.55156 10.7354 7.62846 10.7844 7.69367 10.8469L9.73938 12.7993L14.3068 8.44067C14.372 8.37816 14.4489 8.32911 14.5331 8.29634C14.6173 8.26358 14.7071 8.24773 14.7974 8.24971C14.8877 8.25169 14.9768 8.27146 15.0594 8.30789C15.1421 8.34432 15.2168 8.39669 15.2792 8.46201C15.3416 8.52732 15.3905 8.6043 15.4231 8.68854C15.4557 8.77278 15.4714 8.86263 15.4693 8.95294C15.4672 9.04325 15.4472 9.13225 15.4107 9.21485C15.3741 9.29746 15.3216 9.37204 15.2562 9.43433H15.2562Z"
            fill="#04A46E"
          />
        </svg>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z"
            stroke="#A8ACB3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      <p>{text}</p>
    </div>
    <span>+{award} NHZN</span>
  </ChecklistItem>
);

State.init({
  incentives: null,
  incentivesIsFetched: false,
  project: null,
  projectIsFetched: false,
});

if (!state.incentivesIsFetched) {
  Near.asyncView(ownerId, "get_incentive_data", {}, "final", false).then(
    (incentives) => {
      State.update({ incentives, incentivesIsFetched: true });
    },
  );
  return <>Loading...</>;
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: context.accountId },
    "final",
    false,
  ).then((project) => {
    State.update({ project, projectIsFetched: true });
  });
  return <>Loading...</>;
}

const checklist = Object.entries(state.incentives)
  .map(([key, value]) => ({
    text: key,
    completed: key in state.project.achieved_incentives,
    award: value[1],
  }))
  .filter(
    ({ text }) => text !== "QuestionAnswer" && text !== "ProposalSubmission",
  );

return (
  <>
    <p>
      A thoroughly filled-out profile is a great way to build transparency and
      credibility so you can make the best impression on potential backers!
    </p>
    {checklist.map(createChecklistItem)}
  </>
);
