const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const large = props.large ?? false;

State.init({
  investor: null,
  investorIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((data) =>
    State.update({ profile: data[accountId]?.profile, profileIsFetched: true }),
  );
}

if (!state.investorIsFetched) {
  Near.asyncView(
    ownerId,
    "get_investor",
    { account_id: accountId },
    "final",
    false,
  ).then((investor) => State.update({ investor, investorIsFetched: true }));
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  margin-bottom: 0.25em;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const body = (
  <>
    <Container>
      <div>
        <a href={`/${ownerId}/widget/Index?tab=backer&accountId=${accountId}`}>
          <Widget
            src={`${ownerId}/widget/Vendor.Icon`}
            props={{ accountId, size: "64px" }}
          />
        </a>
        <a href={`/${ownerId}/widget/Index?tab=backer&accountId=${accountId}`}>
          <Widget
            src={`${ownerId}/widget/NameAndAccount`}
            props={{
              accountId,
              name: state.profile.name,
              nameSize: "1.125em",
            }}
          />
        </a>
      </div>
      {state.investor.verified ? (
        <Widget
          src={`${ownerId}/widget/BadgeList`}
          props={{
            badges: [{ value: "Verified" }],
          }}
        />
      ) : (
        <></>
      )}
    </Container>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.profile.description }}
    />
    <Widget
      src={`${ownerId}/widget/Tags`}
      props={{ tags: state.profile.verticals }}
    />
  </>
);

const FooterButton = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 48%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: ${({ blue, disabled }) =>
    disabled ? "#878a8e" : blue ? "#006adc" : "#101828"};

  &:hover {
    ${({ disabled }) =>
      disabled ? "color: #878a8e; text-decoration: none;" : ""}
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const footer = (
  <Footer>
    <FooterButton
      href={`/${ownerId}/widget/Index?tab=backer&accountId=${accountId}`}
      onClick={() =>
        props.update({
          tab: "backer",
          content: "",
          search: "",
          accountId,
        })
      }
    >
      View details
    </FooterButton>
    <FooterButton
      blue
      disabled
      // href={`/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`}
      // onClick={() =>
      //   props.update({
      //     tab: "entity",
      //     content: "",
      //     search: "",
      //     accountId,
      //   })
      // }
    >
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.91699 11.25L4.61055 13.5853C4.28883 13.911 4.12797 14.0739 3.98971 14.0854C3.86975 14.0953 3.7523 14.0471 3.67396 13.9557C3.58366 13.8504 3.58366 13.6215 3.58366 13.1637V11.9937C3.58366 11.583 3.2473 11.2858 2.84089 11.2262V11.2262C1.8573 11.0822 1.08482 10.3097 0.940749 9.3261C0.916992 9.16391 0.916992 8.97039 0.916992 8.58333V5.1C0.916992 3.83988 0.916992 3.20982 1.16223 2.72852C1.37794 2.30516 1.72215 1.96095 2.14551 1.74524C2.62681 1.5 3.25687 1.5 4.51699 1.5H10.067C11.3271 1.5 11.9572 1.5 12.4385 1.74524C12.8618 1.96095 13.206 2.30516 13.4218 2.72852C13.667 3.20982 13.667 3.83988 13.667 5.1V8.25M13.667 16.5L12.0347 15.3652C11.8052 15.2056 11.6905 15.1259 11.5656 15.0693C11.4548 15.0191 11.3383 14.9826 11.2187 14.9606C11.0839 14.9357 10.9441 14.9357 10.6647 14.9357H9.31699C8.47691 14.9357 8.05687 14.9357 7.73601 14.7722C7.45376 14.6284 7.22429 14.3989 7.08048 14.1167C6.91699 13.7958 6.91699 13.3758 6.91699 12.5357V10.65C6.91699 9.80992 6.91699 9.38988 7.08048 9.06901C7.22429 8.78677 7.45376 8.5573 7.73601 8.41349C8.05687 8.25 8.47691 8.25 9.31699 8.25H13.517C14.3571 8.25 14.7771 8.25 15.098 8.41349C15.3802 8.5573 15.6097 8.78677 15.7535 9.06901C15.917 9.38988 15.917 9.80992 15.917 10.65V12.6857C15.917 13.3846 15.917 13.7341 15.8028 14.0097C15.6506 14.3773 15.3586 14.6693 14.991 14.8215C14.7154 14.9357 14.3659 14.9357 13.667 14.9357V16.5Z"
          stroke="#878A8E"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Contact
    </FooterButton>
  </Footer>
);

if (large) {
  return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
}

return <Widget src={`${ownerId}/widget/Card`} props={{ body }} />;
