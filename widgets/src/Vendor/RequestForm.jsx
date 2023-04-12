const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: .95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: .75em;
  line-height: 1em;
  color: #7e868c;
`;

const ImageCircle = styled.img`
  background: #fafafa;
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
`;

const createProjectLine = (accountId, name, image) => {
  const fullName = name ?? accountId;
  const url = (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
  const imageSrc = `https://i.near.social/thumbnail/${url}`;

  return (
    <Container>
      <ImageContainer title={`${fullName} @${accountId}`}>
        <ImageCircle src={imageSrc} alt="profile image" />
      </ImageContainer>
      <Name>{name}</Name>
      <AccountId>@{accountId}</AccountId>
    </Container>
  );
};

State.init({
  requestId: [],
  message: "",
  projectId: [],
  projects: [],
  projectsIsFetched: false,
  requests: [],
  requestsIsFetched: false,
});

if (!state.projectsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false,
  ).then((projects) => {
    Near.asyncView(
      "social.near",
      "get",
      { keys: projects.map((accountId) => `${accountId}/profile/**`) },
      "final",
      false,
    ).then((data) =>
      State.update({
        projects: projects.map((accountId) => ({
          // text: <Widget
          //   src={`${ownerId}/widget/Project.Line`}
          //   props={{ accountId, size: "1em" }}
          // />,
          text: createProjectLine(accountId, data[accountId].profile.name, data[accountId].profile.image),
          value: accountId,
        })),
        projectsIsFetched: true
      }));
  });
  return <>Loading...</>;
}

// if (!state.requestsIsFetched) {
//   Near.asyncView(
//     ownerId,
//     "get_admin_requests",
//     { account_id: context.accountId },
//     "final",
//     false,
//   ).then((requests) => State.update({ requests, requestsIsFetched: true }));
//   return <>Loading...</>;
// }

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

return (
  <Form>
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        label: "Request as *",
        options: state.projects,
        value: state.projectId,
        onChange: (projectId) => {
          State.update({ projectId });
          Near.asyncView(
            ownerId,
            "get_project_requests",
            { account_id: projectId.value },
            "final",
            false,
          ).then((requests) => State.update({
            requests: requests.map(([accountId, cid]) => ({
              name: <Widget src={`${ownerId}/widget/Request.Line`} props={{ accountId, cid, size: "1em" }} />,
              value: cid,
            })),
            requestsIsFetched: true
          }));
        },
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Select`}
      props={{
        label: "Contribution to *",
        options: state.requests,
        value: state.requestId,
        onChange: (requestId) => State.update({ requestId }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.TextArea`}
      props={{
        label: "Message",
        placeholder: "Describe the contribution you would like to request",
        value: state.message,
        onChange: (message) => State.update({ message }),
      }}
    />
  </Form>
);
