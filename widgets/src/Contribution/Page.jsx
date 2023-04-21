const ownerId = "contribut3.near";
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
    false
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true })
  );
}

if (!state.isProjectAdminIsFetched) {
  Near.asyncView(
    ownerId,
    "check_is_project_admin",
    { project_id: projectId, account_id: context.accountId },
    "final",
    false
  ).then((isProjectAdmin) =>
    State.update({ isProjectAdmin, isProjectAdminIsFetched: true })
  );
}

if (!state.isVendorAdminIsFetched) {
  Near.asyncView(
    ownerId,
    "check_is_vendor_admin",
    { vendor_id: vendorId, account_id: context.accountId },
    "final",
    false
  ).then((isVendorAdmin) =>
    State.update({ isVendorAdmin, isVendorAdminIsFetched: true })
  );
}

if (
  !state.contributionIsFetched ||
  !state.proposalIsFetched ||
  !state.isProjectAdminIsFetched ||
  !state.isVendorAdminIsFetched
) {
  return <>Loading...</>;
}

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
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
  padding-top: 0.25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
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
        cid,
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

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Title>{state.proposal.title}</Title>
        <CTARow>
          {state.isVendorAdmin && "Created" in state.contribution.status ? (
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
                  onClick: () =>
                    Near.call(ownerId, "accept_contribution", {
                      project_id: projectId,
                      cid,
                      vendor_id: vendorId,
                    }),
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
                  onClick: () =>
                    Near.call(ownerId, "reject_contribution", {
                      project_id: projectId,
                      cid,
                      vendor_id: vendorId,
                    }),
                }}
              />
            </>
          ) : state.isProjectAdmin && "Created" in state.contribution.status ? (
            <></>
          ) : (
            <Widget src={`${ownerId}/widget/Buttons.Grey`} props={{}} />
          )}
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
            accountId: props.accountId,
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
