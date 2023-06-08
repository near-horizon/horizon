const ownerId = "nearhorizon.near";

const availableContent = ["projects", "vendors", "backers", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "home",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "projects",
          text: "Projects",
        },
        {
          id: "vendors",
          text: "Contributors",
        },
        {
          id: "backers",
          text: "Backers",
        },
        {
          id: "requests",
          text: "Requests",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/Project.List`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  vendors: (
    <Widget
      src={`${ownerId}/widget/Vendor.List`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  backers: (
    <Widget
      src={`${ownerId}/widget/Investor.List`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/Request.List`}
      props={{ search: state.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

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

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 1em 1.5em;
  gap: 1.75em;
  background: #fafafa;
  border-radius: 16px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1px;
  gap: 0.25em;

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
  search: "",
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
      projectsCount: response.body.projects.total,
      vendorsCount: response.body.vendors.total,
      investorsCount: response.body.backers.total,
      requestsCount: response.body.requests.total,
      projectsTodayCount: response.body.projects.today,
      vendorsTodayCount: response.body.vendors.today,
      investorsTodayCount: response.body.backers.today,
      requestsTodayCount: response.body.requests.today,
    })
);

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

return (
  <Container>
    <Header>
      <Heading>
        <h1>Explore NEAR Horizon</h1>
        <h2>Building, connecting and skyrocketing great projects</h2>
      </Heading>
      <Stats>
        <Stat>
          <div className="number">
            <div>{state.projectsCount}</div>
            <span>+{state.projectsTodayCount}</span>
          </div>
          <div className="label">Projects</div>
        </Stat>
        <Stat>
          <div className="number">
            <div>{state.requestsCount}</div>
            <span>+{state.requestsTodayCount}</span>
          </div>
          <div className="label">Requests</div>
        </Stat>
        <Stat>
          <div className="number">
            <div>{state.vendorsCount}</div>
            <span>+{state.vendorsTodayCount}</span>
          </div>
          <div className="label">Conrtibutors</div>
        </Stat>
        <Stat>
          <div className="number">
            <div>{state.investorsCount}</div>
            <span>+{state.investorsTodayCount}</span>
          </div>
          <div className="label">Backers</div>
        </Stat>
      </Stats>
    </Header>
    <div>{contentSelector}</div>
    <Filters>
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: state.search, update: (s) => State.update(s) }}
      />
      <Filter>
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Type",
            options: [
              { id: "verified", text: "Verified", href: "#" },
              { id: "not-verified", text: "Not verified", href: "#" },
            ],
            selected: "verified",
            update: (id) => console.log(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Status",
            options: [
              { id: "active", text: "Active", href: "#" },
              { id: "not-active", text: "Not active", href: "#" },
            ],
            selected: "active",
            update: (id) => alert(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Sort by",
            options: [
              { id: "name", text: "Name", href: "#" },
              { id: "id", text: "Account ID", href: "#" },
            ],
            selected: "name",
            update: (id) => alert(id),
          }}
        />
      </Filter>
    </Filters>
    <div>{content}</div>
  </Container>
);
