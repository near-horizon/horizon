const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const accountId = props.accountId;

State.init({
  projects: null,
  projectsIsFetched: false,
});

if (!state.projectsIsFetched) {
  asyncFetch(`${apiUrl}/data/projects/${accountId}/similar`).then(
    ({ body: projects }) =>
      State.update({ projects: projects.slice(0, 5), projectsIsFetched: true }),
  );

  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    overflow: hidden;

    @media screen and (max-width: 1100px) {
      flex-direction: row;
      overflow-x: scroll;
      max-width: 85dvw;
      align-items: stretch;

      & > div {
        width: 70dvw;
        flex-shrink: 0;
        align-self: stretch;
      }
    }
  }

  & > h2 {
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.1875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.01188rem;
  }
`;

return (
  <Container>
    <h2>Similar projects</h2>
    <div>
      {state.projects.map((accountId) => (
        <div>
          <Widget
            src={`${ownerId}/widget/Project.Card`}
            props={{ accountId }}
          />
        </div>
      ))}
    </div>
  </Container>
);
