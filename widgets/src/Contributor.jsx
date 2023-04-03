const ownerId = "contribut3.near";
const accountId = props.accountId;

if (!accountId) {
  return "Cannot show contributor without account ID!";
}

State.init({
  contributor: null,
  contributorFetched: false,
  isEntity: false,
  isEntityFetched: false,
  profile: null,
  profileFetched: false,
});

if (!state.contributorFetched) {
  Near.asyncView(
    ownerId,
    "get_contributor",
    { account_id: accountId },
    "final",
    false
  ).then((contributor) =>
    State.update({ contributor, contributorFetched: true })
  );
}

if (!state.contributor) {
  return "Loading...";
}

if (!state.isEntityFetched) {
  Near.asyncView(
    ownerId,
    "check_is_entity",
    { account_id: accountId },
    "final",
    false
  ).then((isEntity) => State.update({ isEntity, isEntityFetched: true }));
}

const active = state.contributor.looking_for_work;

if (!state.profileFetched) {
  const profile = Social.get(`${accountId}/profile/**`, "final", {
    subscribe: false,
  });
  State.update({ profile, profileFetched: true });
}

const contributionTypes = state.contributor.contribution_types.reduce(
  (ob, contributionType) =>
    typeof contributionType === "object"
      ? { ...ob, [contributionType.Other]: "" }
      : { ...ob, [contributionType]: "" },
  {}
);

if (contributionTypes && "Other" in contributionTypes) {
  contributionTypes[contributionTypes.Other] = "";
  delete contributionTypes.Other;
}

const skills = state.contributor.skills.reduce(
  (ob, skill) => ({ ...ob, [skill]: "" }),
  {}
);

const tags = { ...skills, ...contributionTypes } || state.profile.tags;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  min-height: 8em;
  max-width: 100%;
  padding: 0 0.75em;
  border-bottom: 1px solid #eaecf0;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0.75em 0;
  max-width: 100%;
`;

const ActionColumn = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: between;
  align-items: center;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: 0.5em;
  }
`;

const DescriptionWrapper = styled.div`
  max-width: 100%;
  margin-top: 0.5em;
`;

return (
  <Container id={accountId}>
    <Wrapper>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity,
          imageSize: "3em",
          update: props.update,
          additionalColumn: (
            <ActionColumn show={!inboxView}>
              <Widget
                src={`${ownerId}/widget/ActiveIndicator`}
                props={{
                  active,
                  activeText: "Available",
                  inactiveText: "Not avilable",
                }}
              />
              <Widget
                src={`${ownerId}/widget/CardMenu`}
                props={{
                  update: props.update,
                  items: [
                    {
                      text: "Invite to contribute",
                      icon: "bi-person-plus",
                      href: `/#/${ownerId}/widget/Index?tab=create&content=invite&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "create",
                          content: "invite",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "View details",
                      icon: "bi-info-circle",
                      href: `/#/${ownerId}/widget/Index?tab=contributor&accountId=${accountId}`,
                      onClick: () =>
                        props.update({
                          tab: "contributor",
                          content: "",
                          search: "",
                          accountId,
                        }),
                    },
                    {
                      text: "Share",
                      icon: "bi-arrow-up-right",
                      id: "share",
                    },
                  ],
                }}
              />
            </ActionColumn>
          ),
          additionalRow: (
            <>
              <TypeContainer>
                <i>
                  {!state.isEntity ? (
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6666 18C16.6666 16.837 16.6666 16.2555 16.5231 15.7824C16.1999 14.717 15.3662 13.8834 14.3009 13.5602C13.8277 13.4167 13.2462 13.4167 12.0832 13.4167H7.91659C6.75362 13.4167 6.17213 13.4167 5.69897 13.5602C4.63363 13.8834 3.79995 14.717 3.47678 15.7824C3.33325 16.2555 3.33325 16.837 3.33325 18M13.7499 6.75C13.7499 8.82107 12.071 10.5 9.99992 10.5C7.92885 10.5 6.24992 8.82107 6.24992 6.75C6.24992 4.67893 7.92885 3 9.99992 3C12.071 3 13.7499 4.67893 13.7499 6.75Z"
                        stroke="#667085"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.4999 13.8148C19.4999 13.423 19.333 13.0497 19.0402 12.7764C18.7477 12.5034 18.3534 12.3519 17.9444 12.3519H15.8888L15.8888 11.8698C15.8864 11.135 15.5724 10.4335 15.0197 9.91766C14.4674 9.40217 13.7208 9.11338 12.9444 9.11112H11.0277V7.50001H13.5694C13.9784 7.50001 14.3727 7.34848 14.6652 7.07551C14.958 6.80218 15.1249 6.42891 15.1249 6.03705V2.79631C15.1249 2.40445 14.958 2.03117 14.6652 1.75784C14.3727 1.48488 13.9784 1.33334 13.5694 1.33334H5.93048C5.52149 1.33334 5.12713 1.48488 4.83466 1.75784C4.54181 2.03117 4.37492 2.40445 4.37492 2.79631V6.03705C4.37492 6.42891 4.54181 6.80218 4.83466 7.07551C5.12713 7.34848 5.52148 7.50001 5.93048 7.50001H9.30548V9.11112L7.38833 9.11112C6.61184 9.11338 5.86574 9.40217 5.31343 9.91766C4.76074 10.4335 4.44681 11.1356 4.44436 11.8704V12.3519H2.38881C1.97982 12.3519 1.58546 12.5034 1.293 12.7764C1.00014 13.0497 0.833252 13.423 0.833252 13.8148L0.833252 17.7037C0.833252 18.0956 1.00014 18.4688 1.293 18.7422C1.58546 19.0151 1.97982 19.1667 2.38881 19.1667H8.22214C8.63113 19.1667 9.02549 19.0151 9.31796 18.7422C9.61081 18.4688 9.7777 18.0956 9.7777 17.7037V13.8148C9.7777 13.423 9.61081 13.0497 9.31796 12.7764C9.02549 12.5034 8.63113 12.3519 8.22214 12.3519H6.16659V11.8704C6.16659 11.5746 6.29236 11.2885 6.52044 11.0756C6.74891 10.8624 7.06109 10.7408 7.38881 10.7408H12.9444C13.2721 10.7408 13.5843 10.8624 13.8127 11.0756C14.0408 11.2885 14.1666 11.5746 14.1666 11.8704V12.3519H12.111C11.702 12.3519 11.3077 12.5034 11.0152 12.7764C10.7224 13.0497 10.5555 13.423 10.5555 13.8148V17.7037C10.5555 18.0956 10.7224 18.4688 11.0152 18.7422C11.3077 19.0151 11.702 19.1667 12.111 19.1667H17.9444C18.3534 19.1667 18.7477 19.0151 19.0402 18.7422C19.333 18.4688 19.4999 18.0956 19.4999 17.7037V13.8148ZM12.2777 13.9815H17.7777V17.537H12.2777V13.9815ZM6.09714 2.96297L13.4027 2.96297V5.87038H6.09714V2.96297ZM2.55548 13.9815H8.05548L8.05548 17.537H2.55548L2.55548 13.9815Z"
                        fill="#667085"
                        stroke="white"
                        stroke-width="0.2"
                      />
                    </svg>
                  )}
                </i>
                <span>
                  {state.isEntity ? "Organization" : "Individual contributor"}
                </span>
              </TypeContainer>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
            </>
          ),
        }}
      />
      <DescriptionWrapper>
        <Widget
          src={`${ownerId}/widget/DescriptionArea`}
          props={{
            description: state.contributor.resume || state.profile.description,
          }}
        />
      </DescriptionWrapper>
    </Wrapper>
  </Container>
);
