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
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 1em 0;

  div {
    width: 18%;
  }

  @media (max-width: 768px) {
    div {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    div {
      width: 49%;
    }
  }
`;

State.init({
  stats: null,
  statsIsFetched: false,
  search: "",
  totalRaised: 578920000,
  totalRaisedIsFetched: false,
});

if (!state.statsIsFetched) {
  asyncFetch(
    "https://api.flipsidecrypto.com/api/v2/queries/36637c73-6301-418b-ae83-7af6e8f34c0f/data/latest"
  ).then((response) =>
    State.update({ stats: response.body[0], statsIsFetched: true })
  );
}

if (!state.totalRaisedIsFetched) {
  asyncFetch("https://encryption-service-73dm.onrender.com/total-raised", {
    headers: {
      "Access-Control-Request-Method": "no-cors",
    },
  }).then(
    (response) =>
      response.ok &&
      State.update({ totalRaised: response.body, totalRaisedIsFetched: true })
  );
}

return (
  <Container>
    <Heading>
      <h1>Discover NEAR Horizon</h1>
      <h2>Explore projects, vendors, investors and contribution requests</h2>
    </Heading>
    <div>
      <h2>Ecosystem stats</h2>
      <Stats>
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: "750",
            label: "Projects",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: state.statsIsFetched
              ? Number(state.stats.MAU).toLocaleString("en-US", {
                  notation: "compact",
                }) + "+"
              : "Loading...",
            label: "Monthly active accounts",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: state.statsIsFetched
              ? Number(state.stats.TOTAL_ACCOUNTS).toLocaleString("en-US", {
                  notation: "compact",
                }) + "+"
              : "Loading...",
            label: "Total accounts",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value:
              Number(state.totalRaised).toLocaleString("en-US", {
                notation: "compact",
              }) + "+",
            label: "Raised",
          }}
        />
        <Widget src={`${ownerId}/widget/Stats.Link`} />
      </Stats>
    </div>
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
