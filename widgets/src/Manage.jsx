const ownerId = "nearhorizon.near";

const availableContent = [
  "projects",
  "vendors",
  // "invites",
  "requests",
  "proposals",
  "contracts",
  "applications",
];

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
      tab: "manage",
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
          text: "Vendors",
        },
        // {
        //   id: "invites",
        //   text: "Invites",
        // },
        {
          id: "requests",
          text: "Requests",
        },
        {
          id: "proposals",
          text: "Proposals",
        },
        {
          id: "contracts",
          text: "Contracts",
        },
        {
          id: "applications",
          text: "Applications",
        },
      ],
    }}
  />
);

State.init({
  search: "",
});

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/Project.AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  vendors: (
    <Widget
      src={`${ownerId}/widget/Vendor.AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  // invites: (
  //   <Widget
  //     src={`${ownerId}/widget/Invites.AdminList`}
  //     props={{ search: state.search, update: props.update }}
  //   />
  // ),
  requests: (
    <Widget
      src={`${ownerId}/widget/Request.AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/Proposal.AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  contracts: (
    <Widget
      src={`${ownerId}/widget/Contribution.AdminList`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  applications: (
    <Widget
      src={`${ownerId}/widget/Application.AdminList`}
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
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
`;

return (
  <Container>
    <Heading>
      <h1>Manage projects and requests</h1>
      <p>Create or edit projects and requests</p>
    </Heading>
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
