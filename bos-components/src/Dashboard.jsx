const ownerId = "nearhorizon.near";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5em;

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1.3em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
  gap: 0.75em;
  width: 50%;
  max-width: 100%;
  overflow-x: scroll;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Stat = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1px;
  gap: 0.25em;
  border-radius: 4px;
  padding: 0.5rem;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    background: #fafafa;
    width: 6rem;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  & > div.number {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;

    & > div {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      text-align: right;
      color: #11181c;
    }

    & > span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #04a46e;
    }
  }

  & > div.label {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 0.75em;
    line-height: 1em;
    color: #006adc;
  }
`;

State.init({
  projects: [],
  requests: [],
  vendors: [],
  investors: [],
  projectsCount: 0,
  vendorsCount: 0,
  investorsCount: 0,
  requestsCount: 0,
  projectsTodayCount: 0,
  vendorsTodayCount: 0,
  investorsTodayCount: 0,
  requestsTodayCount: 0,
});

asyncFetch("https://api-op3o.onrender.com/transactions/stats").then(
  (response) =>
    response.ok &&
    State.update({
      projectsCount: response.body.projects,
      vendorsCount: response.body.vendors,
      investorsCount: response.body.backers,
      requestsCount: response.body.requests,
    }),
);

asyncFetch("https://api-op3o.onrender.com/data/projects?sort=timedesc").then(
  (response) => response.ok && State.update({ projects: response.body }),
);

asyncFetch("https://api-op3o.onrender.com/data/requests?sort=timedesc").then(
  (response) => response.ok && State.update({ requests: response.body }),
);

asyncFetch("https://api-op3o.onrender.com/data/vendors?sort=timedesc").then(
  (response) => response.ok && State.update({ vendors: response.body }),
);

asyncFetch("https://api-op3o.onrender.com/data/investors?sort=timedesc").then(
  (response) => response.ok && State.update({ investors: response.body }),
);

return (
  <Container>
    <Header>
      <Heading>
        <h1>Explore NEAR Horizon</h1>
      </Heading>
      <Stats>
        <Stat href={`/${ownerId}/widget/Index?tab=projects`}>
          <div className="number">
            <div>{state.projectsCount}</div>
          </div>
          <div className="label">Projects</div>
        </Stat>
        <Stat href={`/${ownerId}/widget/Index?tab=requests`}>
          <div className="number">
            <div>{state.requestsCount}</div>
          </div>
          <div className="label">Requests</div>
        </Stat>
        <Stat href={`/${ownerId}/widget/Index?tab=vendors`}>
          <div className="number">
            <div>{state.vendorsCount}</div>
          </div>
          <div className="label">Contributors</div>
        </Stat>
        <Stat href={`/${ownerId}/widget/Index?tab=investors`}>
          <div className="number">
            <div>{state.investorsCount}</div>
          </div>
          <div className="label">Backers</div>
        </Stat>
      </Stats>
    </Header>
    <Widget src={`${ownerId}/widget/Home.HowSection`} />
    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Projects",
        count: state.projectsCount,
        link: `/${ownerId}/widget/Index?tab=projects`,
        linkText: "See all projects",
        items: state.projects,
        renderItem: (item) => (
          <Widget
            src={`${ownerId}/widget/Project.Card`}
            props={{ accountId: item }}
          />
        ),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Requests",
        count: state.requestsCount,
        link: `/${ownerId}/widget/Index?tab=requests`,
        linkText: "See all requests",
        items: state.requests,
        renderItem: (item) => (
          <Widget
            src={`${ownerId}/widget/Request.Card`}
            props={{
              accountId: item[0],
              cid: item[1],
            }}
          />
        ),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Contributors",
        count: state.vendorsCount,
        link: `/${ownerId}/widget/Index?tab=vendors`,
        linkText: "See all contributors",
        items: state.vendors,
        renderItem: (item) => (
          <Widget
            src={`${ownerId}/widget/Vendor.Card`}
            props={{ accountId: item }}
          />
        ),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Backers",
        count: state.investorsCount,
        link: `/${ownerId}/widget/Index?tab=investors`,
        linkText: "See all backers",
        items: state.investors,
        renderItem: (item) => (
          <Widget
            src={`${ownerId}/widget/Investor.Card`}
            props={{ accountId: item }}
          />
        ),
      }}
    />
  </Container>
);
