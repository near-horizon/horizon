const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const cid = props.cid;
const full = props.full ?? false;
const large = props.large ?? false;

State.init({
  request: null,
  requestIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((data) =>
    State.update({ profile: data[accountId].profile, profileIsFetched: true }),
  );
}

if (!state.requestIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #101828;
  flex: none;
  flex-grow: 1;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0px 0px;
  gap: 1.5em;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.4em;
  flex: none;
  flex-grow: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const deadline = (
  <Item>
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 14.75L1.5 2M1.5 8.75H7.05C7.47004 8.75 7.68006 8.75 7.84049 8.66825C7.98161 8.59635 8.09635 8.48161 8.16825 8.34049C8.25 8.18006 8.25 7.97004 8.25 7.55V2.45C8.25 2.02996 8.25 1.81994 8.16825 1.65951C8.09635 1.51839 7.98161 1.40365 7.84049 1.33175C7.68006 1.25 7.47004 1.25 7.05 1.25H2.7C2.27996 1.25 2.06994 1.25 1.90951 1.33175C1.76839 1.40365 1.65365 1.51839 1.58175 1.65951C1.5 1.81994 1.5 2.02996 1.5 2.45V8.75ZM8.25 2.75H13.05C13.47 2.75 13.6801 2.75 13.8405 2.83175C13.9816 2.90365 14.0963 3.01839 14.1683 3.15951C14.25 3.31994 14.25 3.52996 14.25 3.95V9.05C14.25 9.47004 14.25 9.68006 14.1683 9.84049C14.0963 9.98161 13.9816 10.0963 13.8405 10.1683C13.6801 10.25 13.47 10.25 13.05 10.25H9.45C9.02996 10.25 8.81994 10.25 8.65951 10.1683C8.51839 10.0963 8.40365 9.98161 8.33175 9.84049C8.25 9.68006 8.25 9.47004 8.25 9.05V2.75Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    {new Date(Number(state.request.deadline)).toLocaleDateString()}
  </Item>
);

const currency = state.request.source === "Credits" ? "NH" : "$";

const budget = (
  <Item>
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 6.25V9.25M13.5 4.75V7.75M12.75 1C14.5865 1 15.5799 1.28107 16.0741 1.49908C16.1399 1.52812 16.1728 1.54263 16.2678 1.63328C16.3247 1.68761 16.4287 1.84705 16.4554 1.92107C16.5 2.04455 16.5 2.11205 16.5 2.24706V10.3084C16.5 10.9899 16.5 11.3307 16.3978 11.5059C16.2938 11.6841 16.1936 11.7669 15.999 11.8354C15.8076 11.9027 15.4215 11.8285 14.6491 11.6801C14.1085 11.5762 13.4674 11.5 12.75 11.5C10.5 11.5 8.25 13 5.25 13C3.41347 13 2.42015 12.7189 1.92591 12.5009C1.86009 12.4719 1.82718 12.4574 1.7322 12.3667C1.67526 12.3124 1.57134 12.153 1.5446 12.0789C1.5 11.9554 1.5 11.8879 1.5 11.7529L1.5 3.69164C1.5 3.01006 1.5 2.66928 1.60221 2.49411C1.70618 2.31592 1.80644 2.23309 2.00104 2.16461C2.19235 2.09729 2.57853 2.17149 3.35087 2.31989C3.89146 2.42376 4.53261 2.5 5.25 2.5C7.5 2.5 9.75 1 12.75 1ZM10.875 7C10.875 8.03553 10.0355 8.875 9 8.875C7.96447 8.875 7.125 8.03553 7.125 7C7.125 5.96447 7.96447 5.125 9 5.125C10.0355 5.125 10.875 5.96447 10.875 7Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <b>{currency}</b>{" "}
    {Number(state.request.budget).toLocaleString("en-US", {
      notation: "compact",
    })}
  </Item>
);

const contributionType = (
  <Item>
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 14.75C13 13.7033 13 13.18 12.8708 12.7541C12.58 11.7953 11.8297 11.045 10.8709 10.7542C10.445 10.625 9.92167 10.625 8.875 10.625H5.125C4.07833 10.625 3.55499 10.625 3.12914 10.7542C2.17034 11.045 1.42003 11.7953 1.12918 12.7541C1 13.18 1 13.7033 1 14.75M10.375 4.625C10.375 6.48896 8.86396 8 7 8C5.13604 8 3.625 6.48896 3.625 4.625C3.625 2.76104 5.13604 1.25 7 1.25C8.86396 1.25 10.375 2.76104 10.375 4.625Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    {state.request.request_type}
  </Item>
);

const body = (
  <>
    <Details>
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: props.accountId, size: "30px" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: props.accountId,
          name: state.profile.name,
          nameSize: ".95em",
          accountSize: ".75em",
        }}
      />
    </Details>
    <a
      href={`/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`}
    >
      <Title>{state.request.title}</Title>
    </a>
    <Widget
      src={`${ownerId}/widget/ActiveIndicator`}
      props={{
        active: state.request.open,
        activeText: "Open to proposals",
        inactiveText: "Closed",
      }}
    />
    {large ? (
      <Widget
        src={`${ownerId}/widget/DescriptionArea`}
        props={{ description: state.request.description }}
      />
    ) : (
      <Widget
        src={`${ownerId}/widget/Tags`}
        props={{
          tags: state.request.tags.reduce(
            (ob, tag) => ({ ...ob, [tag]: "" }),
            {},
          ),
        }}
      />
    )}
    <Details>
      {deadline}
      {budget}
      {contributionType}
    </Details>
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
  color: ${({ blue }) => (blue ? "#006ADC" : "#101828")};
  width: 48%;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  width: 100%;
`;

const ProposeButton = styled.div`
  width: 48%;
`;

const footer = (
  <Footer>
    <FooterButton
      href={`/${ownerId}/widget/Index?tab=request&accountId=${accountId}&cid=${cid}`}
    >
      View details
    </FooterButton>
    <ProposeButton>
      <Widget
        src={`${ownerId}/widget/Request.ProposeSideWindow`}
        props={{ accountId, cid }}
      />
    </ProposeButton>
  </Footer>
);

if (large) {
  return (
    <Widget src={`${ownerId}/widget/Card`} props={{ body, footer, full }} />
  );
}

return <Widget src={`${ownerId}/widget/Card`} props={{ body }} />;
