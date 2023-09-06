const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

State.init({
  project: null,
  projectIsFetched: false,
  profile: "",
  profileIsFetched: false,
  requests: null,
  requestsIsFetched: false,
  contracts: null,
  contractsIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    })
  );
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: accountId },
    "final",
    false
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
}

if (!state.contractsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_contributions",
    { account_id: accountId },
    "final",
    false
  ).then((contracts) => State.update({ contracts, contractsIsFetched: true }));
}

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

const onSave = (project) => {
  Near.call(ownerId, "edit_project", {
    account_id: accountId,
    project,
  });
};

const onPrivateSave = (project) => {
  // TODO: Call encryption service to encrypt the project data
  onSave(project);
};

const onSocialSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 100%;

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 16px;

    & > h2 {
      font-family: "FK Grotesk";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 36px;
      color: #11181c;
    }

    & > span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 19px;
      line-height: 23px;
      color: #7e868c;
    }
  }

  & > a {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    gap: 8px;
    background: #fafafa;
    border: 1px solid #eceef0;
    border-radius: 50px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #101828;

    &:hover,
    &:focus {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #101828;
    }
  }
`;

return (
  <Container>
    <Heading>
      <div>
        <h2>About</h2>
      </div>
      <Link
        href={`/${ownerId}/widget/Index?tab=project&accountId=${accountId}&content=details`}
      >
        View all details
      </Link>
    </Heading>
    <Markdown text={state.profile.description} />
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Number`}
        props={{
          label: "Company size",
          id: "size",
          value: state.profile.team,
          onSave: (team) => onSave({ profile: { team: `${team}` } }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Links`}
        props={{
          label: "Links",
          id: "links",
          value: state.profile.linktree ?? {},
          onSave: (linktree) => onSave({ profile: { linktree } }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Text`}
        props={{
          label: "Location",
          id: "location",
          value: state.project.geo,
          onSave: (geo) => horizonOnSave({ geo }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Text`}
        props={{
          label: "Website",
          id: "website",
          value: state.profile.linktree?.website ?? state.profile.website ?? "",
          link: `https://${
            state.profile.linktree.website ?? state.profile.website
          }`,
          onSave: (website) => onSave({ profile: { linktree: { website } } }),
          canEdit: isAdmin,
        }}
      />
    </Details>

    <Separator />

    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Requests",
        count: state.requests.length,
        link: `/${ownerId}/widget/Index?tab=project&accountId=${accountId}&content=requests`,
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

    <Separator />

    <Widget
      src={`${ownerId}/widget/Home.ListSection`}
      props={{
        title: "Work history",
        count: state.contracts.length,
        link: `/${ownerId}/widget/Index?tab=project&accountId=${accountId}&content=history`,
        linkText: "See full history",
        items: state.contracts,
        renderItem: (item) => (
          <Widget
            src={`${ownerId}/widget/Contribution.Card`}
            props={{
              accountId: item[0][0],
              cid: item[0][1],
              vendorId: item[1],
            }}
          />
        ),
      }}
    />
  </Container>
);
