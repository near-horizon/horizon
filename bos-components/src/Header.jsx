const ownerId = "nearhorizon.near";

State.init({
  exists: false,
  project: false,
  balance: 0,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  if (!context.accountId) {
    State.update({
      profileIsFetched: true,
    });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_project",
      { account_id: context.accountId },
      "final",
      false,
    ).then((profileExists) => {
      if (profileExists) {
        asyncFetch(
          `https://api-op3o.onrender.com/data/credits/projects/${context.accountId}/balance`,
        ).then(({ body, ok }) => {
          State.update({
            balance: ok ? body : 0,
            project: true,
            exists: true,
            profileIsFetched: true,
          });
        });
      } else {
        Near.asyncView(
          ownerId,
          "check_is_vendor",
          { account_id: context.accountId },
          "final",
          false,
        ).then((contributorExists) => {
          if (contributorExists) {
            asyncFetch(
              `https://api-op3o.onrender.com/data/credits/vendors/${context.accountId}/balance`,
            ).then(({ body, ok }) => {
              State.update({
                balance: ok ? body : 0,
                project: false,
                exists: true,
                profileIsFetched: true,
              });
            });
          } else {
            State.update({
              exists: false,
              profileIsFetched: true,
            });
          }
        });
      }
    });
  }
}

const Header = styled.div`
  display: flex;
  padding: 0 0 0.75rem 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media screen and (max-width: 768px) {
    display: none;
  }

  & > a {
    width: 10rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem;
`;

const GreyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  align-self: stretch;
`;

const GreyContent = styled.div`
  display: flex;
  padding: 0.4375rem 1rem 0.4375rem 1rem;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--ui-elements-black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;

  & > span {
    color: var(--ui-elements-black, #000);
    leading-trim: both;
    text-edge: cap;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 142%; /* 1.2425rem */
    letter-spacing: 0.00875rem;
  }

  & > b {
    color: var(--ui-elements-black, #000);
    leading-trim: both;
    text-edge: cap;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 142%;
    letter-spacing: 0.00875rem;
  }

  & > svg {
    transform: translateY(-1px);
  }

  & > a {
    color: var(--ui-elements-black, #000);
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      color: var(--ui-elements-black, #000);
    }
  }
`;

const profileIcon = (
  <Widget
    src={`${ownerId}/widget/Project.Icon`}
    props={{ accountId: context.accountId, size: "1.5em" }}
  />
);

return (
  <Header>
    <Link href={`/${ownerId}/widget/Index?tab=home`}>
      <Widget src={`${ownerId}/widget/Logo`} />
    </Link>
    <Actions>
      {state.exists ? (
        <>
          <GreyButton>
            <GreyContent>
              <span>Credits:</span>
              <b>{state.balance} NHZN</b>
              <Widget
                src={`${ownerId}/widget/Tooltip`}
                props={{
                  content:
                    "Horizon credits are accepted forms of payments by Horizon-approved Service Providers",
                }}
              />
            </GreyContent>
          </GreyButton>
          <GreyButton>
            <GreyContent>
              <Link
                href={`/${ownerId}/widget/Index?tab=${
                  state.project ? "profile" : "contributor"
                }&accountId=${context.accountId}`}
              >
                {profileIcon} Your profile
              </Link>
            </GreyContent>
          </GreyButton>
        </>
      ) : (
        <Widget src={`${ownerId}/widget/Buttons.Onboard`} />
      )}
    </Actions>
  </Header>
);
