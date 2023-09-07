const ownerId = "nearhorizon.near";

const LineContainer = styled.div`
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
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
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
  const url =
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
  const imageSrc = `https://i.near.social/thumbnail/${url}`;

  return (
    <LineContainer>
      <ImageContainer title={`${fullName} @${accountId}`}>
        <ImageCircle src={imageSrc} alt="profile image" />
      </ImageContainer>
      <Name>{name}</Name>
      <AccountId>@{accountId}</AccountId>
    </LineContainer>
  );
};

State.init({
  message: "",
  messageError: "",
  projectId: null,
  projects: [],
  projectsIsFetched: false,
  requestId: null,
  requests: [],
  requestsIsFetched: false,
});

const validateForm = () => {
  return (
    state.projectId &&
    state.message &&
    state.messageError === "" &&
    state.requestId
  );
};

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
          text: createProjectLine(
            accountId,
            data[accountId].profile.name,
            data[accountId].profile.image,
          ),
          value: accountId,
        })),
        projectsIsFetched: true,
      }),
    );
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.button`
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

return (
  <Container>
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
            ).then((requests) =>
              State.update({
                requests: requests.map(([accountId, cid, title]) => ({
                  name: title,
                  value: cid,
                })),
                requestsIsFetched: true,
              }),
            );
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
          validate: () => {
            if (state.message > 500) {
              State.update({
                messageError: "Message should be less than 500 characters",
              });
              return;
            }

            State.update({ messageError: "" });
          },
          error: state.messageError,
        }}
      />
    </Form>
    <Footer>
      <Dialog.Close asChild>
        <CloseButton>Close</CloseButton>
      </Dialog.Close>
      <Widget
        src={`${ownerId}/widget/Buttons.Green`}
        props={{
          text: (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.87464 10.1251L15.7496 2.25013M7.97033 10.3712L9.94141 15.4397C10.1151 15.8862 10.2019 16.1094 10.327 16.1746C10.4354 16.2311 10.5646 16.2312 10.6731 16.1748C10.7983 16.1098 10.8854 15.8866 11.0596 15.4403L16.0023 2.77453C16.1595 2.37164 16.2381 2.1702 16.1951 2.04148C16.1578 1.92969 16.0701 1.84197 15.9583 1.80462C15.8296 1.76162 15.6281 1.84023 15.2252 1.99746L2.55943 6.94021C2.11313 7.11438 1.88997 7.20146 1.82494 7.32664C1.76857 7.43516 1.76864 7.56434 1.82515 7.67279C1.89033 7.7979 2.11358 7.88472 2.56009 8.05836L7.62859 10.0294C7.71923 10.0647 7.76455 10.0823 7.80271 10.1095C7.83653 10.1337 7.86611 10.1632 7.89024 10.1971C7.91746 10.2352 7.93508 10.2805 7.97033 10.3712Z"
                  stroke="#11181C"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Send request
            </>
          ),
          disabled: !validateForm(),
          onClick: () => {
            if (!validateForm()) return;
            Social.set({
              index: {
                graph: JSON.stringify({
                  key: "project/invite",
                  value: { accountId: state.projectId.value },
                }),
                inbox: JSON.stringify({
                  key: state.projectId.value,
                  value: {
                    type: "project/invite",
                    requestId: [state.projectId.value, state.requestId.value],
                    message: state.message,
                    vendorId: props.accountId,
                  },
                }),
              },
            });
          },
        }}
      />
    </Footer>
  </Container>
);
