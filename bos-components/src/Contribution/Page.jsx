const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

const availableContent = ["activity", "details", "feedback"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "activity";
  }

  return content;
};

State.init({
  contribution: null,
  contributionIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  isProjectAdmin: false,
  isProjectAdminIsFetched: false,
  isVendorAdmin: false,
  isVendorAdminIsFetched: false,
});

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false,
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true }),
  );
}

if (!state.isProjectAdminIsFetched && context.accountId) {
  Near.asyncView(
    ownerId,
    "check_is_project_admin",
    { project_id: projectId, account_id: context.accountId },
    "final",
    false,
  ).then((isProjectAdmin) =>
    State.update({ isProjectAdmin, isProjectAdminIsFetched: true }),
  );
}

if (!state.isVendorAdminIsFetched && context.accountId) {
  Near.asyncView(
    ownerId,
    "check_is_vendor_admin",
    { vendor_id: vendorId, account_id: context.accountId },
    "final",
    false,
  ).then((isVendorAdmin) =>
    State.update({ isVendorAdmin, isVendorAdminIsFetched: true }),
  );
}

if (
  !state.contributionIsFetched ||
  !state.proposalIsFetched ||
  (!state.isProjectAdminIsFetched && context.accountId) ||
  (!state.isVendorAdminIsFetched && context.accountId)
) {
  return <>Loading...</>;
}

const cStatus = state.contribution.status;
const isAcceptable = typeof cStatus === "object" && "Created" in cStatus;
const isDeliverable = typeof cStatus === "string" || "Accepted" in cStatus;
const isCompletable = isDeliverable;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
`;

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
  padding-top: 0.25em;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const circledPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1624_38049)">
      <path
        d="M9 6V12M6 9H12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1624_38049">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const personPlus = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3.5L14.25 1.25M14.25 1.25L16.5 3.5M14.25 1.25V5.75M12 14.75V13.85C12 12.5899 12 11.9598 11.7548 11.4785C11.539 11.0552 11.1948 10.711 10.7715 10.4952C10.2902 10.25 9.66012 10.25 8.4 10.25H5.1C3.83988 10.25 3.20982 10.25 2.72852 10.4952C2.30516 10.711 1.96095 11.0552 1.74524 11.4785C1.5 11.9598 1.5 12.5899 1.5 13.85V14.75M9.375 4.625C9.375 6.07475 8.19975 7.25 6.75 7.25C5.30025 7.25 4.125 6.07475 4.125 4.625C4.125 3.17525 5.30025 2 6.75 2C8.19975 2 9.375 3.17525 9.375 4.625Z"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const plus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.75V14.25M3.75 9H14.25"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CTARow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75em;
  margin-top: 1em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

const content = {
  activity: (
    <Widget
      src={`${ownerId}/widget/Contribution.Activity`}
      props={{
        projectId,
        title: state.proposal.title,
        actions: state.contribution.actions,
        status: state.contribution.status,
        vendorId,
        isAdmin: state.isAdmin,
      }}
    />
  ),
  details: (
    <Widget
      src={`${ownerId}/widget/Contribution.About`}
      props={{
        projectId,
        cid,
        vendorId,
        isAdmin: state.isAdmin,
      }}
    />
  ),
  feedback: (
    <Widget
      src={`${ownerId}/widget/Contribution.Feedback`}
      props={{
        projectId,
        cid,
        vendorId,
        status: state.contribution.status,
        title: state.proposal.title,
        projectFeedback: state.contribution.project_feedback,
        vendorFeedback: state.contribution.vendor_feedback,
      }}
    />
  ),
}[getContent(props.content)];

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 1.5em;
  line-height: 1.5em;
  color: #101828;
`;

const contractAction = (actionType) => {
  const methodName =
    actionType == "accept"
      ? "accept_contribution"
      : actionType == "reject"
      ? "reject_contribution"
      : "deliver_contribution";
  const transactions = [
    {
      contractName: ownerId,
      methodName: methodName,
      args: {
        project_id: projectId,
        cid,
        vendor_id: vendorId,
      },
    },
    {
      contractName: "social.near",
      methodName: "set",
      args: {
        data: {
          [context.accountId]: {
            index: {
              graph: JSON.stringify({
                key: "vendor/contract",
                value: { accountId: projectId },
              }),
              inbox: JSON.stringify({
                key: projectId,
                value: {
                  type: "vendor/contract",
                  contributionId: [projectId, cid],
                  message: state.message,
                  vendorId: vendorId,
                  actionType: actionType,
                },
              }),
            },
          },
        },
      },
    },
  ];
  Near.call(transactions);
};

const vendorCreatedView =
  state.isVendorAdmin && isAcceptable ? (
    <>
      <Widget
        src={`${ownerId}/widget/Buttons.Green`}
        props={{
          text: (
            <>
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1.5L4.75 9.75L1 6"
                  stroke="#11181C"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Accept contract
            </>
          ),
          onClick: () => contractAction("accept"),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Buttons.Red`}
        props={{
          text: (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5"
                  stroke="#F44738"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Decline contract
            </>
          ),
          onClick: () => contractAction("reject"),
        }}
      />
    </>
  ) : (
    <></>
  );

const vendorAcceptedView =
  state.isVendorAdmin && isDeliverable ? (
    <Widget
      src={`${ownerId}/widget/Buttons.Grey`}
      props={{
        text: (
          <>
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 14.75L1 2M1 8.75H6.55C6.97004 8.75 7.18006 8.75 7.34049 8.66825C7.48161 8.59635 7.59635 8.48161 7.66825 8.34049C7.75 8.18006 7.75 7.97004 7.75 7.55V2.45C7.75 2.02996 7.75 1.81994 7.66825 1.65951C7.59635 1.51839 7.48161 1.40365 7.34049 1.33175C7.18006 1.25 6.97004 1.25 6.55 1.25H2.2C1.77996 1.25 1.56994 1.25 1.40951 1.33175C1.26839 1.40365 1.15365 1.51839 1.08175 1.65951C1 1.81994 1 2.02996 1 2.45V8.75ZM7.75 2.75H12.55C12.97 2.75 13.1801 2.75 13.3405 2.83175C13.4816 2.90365 13.5963 3.01839 13.6683 3.15951C13.75 3.31994 13.75 3.52996 13.75 3.95V9.05C13.75 9.47004 13.75 9.68006 13.6683 9.84049C13.5963 9.98161 13.4816 10.0963 13.3405 10.1683C13.1801 10.25 12.97 10.25 12.55 10.25H8.95C8.52996 10.25 8.31994 10.25 8.15951 10.1683C8.01839 10.0963 7.90365 9.98161 7.83175 9.84049C7.75 9.68006 7.75 9.47004 7.75 9.05V2.75Z"
                stroke="#006ADC"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Deliver work
          </>
        ),
        onClick: () => contractAction("deliver"),
      }}
    />
  ) : (
    <></>
  );

const projectDeliveredView =
  state.isProjectAdmin && isCompletable ? (
    <Widget
      src={`${ownerId}/widget/Buttons.Grey`}
      props={{
        text: (
          <>
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 14.75L1 2M1 8.75H6.55C6.97004 8.75 7.18006 8.75 7.34049 8.66825C7.48161 8.59635 7.59635 8.48161 7.66825 8.34049C7.75 8.18006 7.75 7.97004 7.75 7.55V2.45C7.75 2.02996 7.75 1.81994 7.66825 1.65951C7.59635 1.51839 7.48161 1.40365 7.34049 1.33175C7.18006 1.25 6.97004 1.25 6.55 1.25H2.2C1.77996 1.25 1.56994 1.25 1.40951 1.33175C1.26839 1.40365 1.15365 1.51839 1.08175 1.65951C1 1.81994 1 2.02996 1 2.45V8.75ZM7.75 2.75H12.55C12.97 2.75 13.1801 2.75 13.3405 2.83175C13.4816 2.90365 13.5963 3.01839 13.6683 3.15951C13.75 3.31994 13.75 3.52996 13.75 3.95V9.05C13.75 9.47004 13.75 9.68006 13.6683 9.84049C13.5963 9.98161 13.4816 10.0963 13.3405 10.1683C13.1801 10.25 12.97 10.25 12.55 10.25H8.95C8.52996 10.25 8.31994 10.25 8.15951 10.1683C8.01839 10.0963 7.90365 9.98161 7.83175 9.84049C7.75 9.68006 7.75 9.47004 7.75 9.05V2.75Z"
                stroke="#006ADC"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            End contract
          </>
        ),
        onClick: () => {
          const transactions = [
            {
              contractName: ownerId,
              methodName: "complete_contribution",
              args: {
                project_id: projectId,
                cid,
                vendor_id: vendorId,
              },
            },
            {
              contractName: "social.near",
              methodName: "set",
              args: {
                data: {
                  [context.accountId]: {
                    index: {
                      graph: JSON.stringify({
                        key: "project/contract",
                        value: { projectId },
                      }),
                      inbox: JSON.stringify({
                        key: projectId,
                        value: {
                          type: "project/contract",
                          contributionId: [projectId, cid],
                          message: state.message,
                          vendorId: vendorId,
                        },
                      }),
                    },
                  },
                },
              },
            },
          ];
          Near.call(transactions);
        },
      }}
    />
  ) : (
    <></>
  );

const addActionView = isDeliverable ? (
  <Widget
    src={`${ownerId}/widget/Contribution.ActionSideWindow`}
    props={{
      projectId,
      vendorId,
      cid,
    }}
  />
) : (
  <></>
);

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Title>{state.proposal.title}</Title>
        <CTARow>
          {vendorCreatedView}
          {addActionView}
          {vendorAcceptedView}
          {projectDeliveredView}
        </CTARow>
      </HeaderDetails>
    </Header>
    <ContentContainer>
      <MainContent>
        <Widget
          src={`${ownerId}/widget/TabSelector`}
          props={{
            tab: "contribution",
            content: getContent(props.content),
            search: props.search,
            update: props.update,
            projectId,
            vendorId,
            cid,
            buttons: [
              {
                id: "activity",
                text: "Activity",
              },
              {
                id: "details",
                text: "Details",
              },
              {
                id: "feedback",
                text: "Feedback",
              },
            ],
          }}
        />
        {content}
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Contribution.Sidebar`}
          props={{ projectId, vendorId, cid }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
