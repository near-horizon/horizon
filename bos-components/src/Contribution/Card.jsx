const ownerId = "nearhorizon.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;
const isVendorView = props.isVendorView ?? false;

State.init({
  contribution: null,
  contributionIsFetched: false,
  request: null,
  requestIsFetched: false,
});

if (!state.contributionIsFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution",
    { project_id: projectId, vendor_id: vendorId, cid },
    "final",
    false,
  ).then((contribution) =>
    State.update({ contribution, contributionIsFetched: true }),
  );
}

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false,
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.contributionIsFetched || !state.requestIsFetched) {
  return <>Loading...</>;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Completed = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const Feedback = styled.p`
  font-style: italic;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.5em;
  color: #11181c;
  border-left: 6px solid #00ec97;
  padding-left: 0.625em;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #101828;
`;

const startDate = new Date(
  state.contribution.actions.length > 0
    ? Number(state.contribution.actions[0].start_date.substring(0, 13))
    : Number(state.contribution.status.Created.substring(0, 13)),
);
const isCompleted = "Completed" in state.contribution.status;
const completedDate = new Date(
  isCompleted
    ? Number(state.contribution.status.Completed.substring(0, 13))
    : 1,
);
const completedDateString = `Completed ${
  isCompleted ? completedDate.toLocaleDateString() : "Not yet"
}`;
const price = state.contribution.price;
const type = state.request.request_type;
const feedback = isVendorView
  ? state.contribution.project_feedback
  : state.contribution.vendor_feedback;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25em;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  width: 100%;
`;

const body = (
  <Column>
    <Row>
      <Detail>
        <Widget
          src={`${ownerId}/widget/${isVendorView ? "Project" : "Vendor"}.Icon`}
          props={{
            accountId: isVendorView ? projectId : vendorId,
            size: "2em",
          }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: isVendorView ? projectId : vendorId,
            nameSize: "1.125em",
          }}
        />
      </Detail>
      <Completed>{completedDateString}</Completed>
    </Row>
    <Title>{state.request.title}</Title>
    <Feedback>{feedback}</Feedback>
    <Details>
      <Detail>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 15.75L3 3M3 9.75H8.55C8.97004 9.75 9.18006 9.75 9.34049 9.66825C9.48161 9.59635 9.59635 9.48161 9.66825 9.34049C9.75 9.18006 9.75 8.97004 9.75 8.55V3.45C9.75 3.02996 9.75 2.81994 9.66825 2.65951C9.59635 2.51839 9.48161 2.40365 9.34049 2.33175C9.18006 2.25 8.97004 2.25 8.55 2.25H4.2C3.77996 2.25 3.56994 2.25 3.40951 2.33175C3.26839 2.40365 3.15365 2.51839 3.08175 2.65951C3 2.81994 3 3.02996 3 3.45V9.75ZM9.75 3.75H14.55C14.97 3.75 15.1801 3.75 15.3405 3.83175C15.4816 3.90365 15.5963 4.01839 15.6683 4.15951C15.75 4.31994 15.75 4.52996 15.75 4.95V10.05C15.75 10.47 15.75 10.6801 15.6683 10.8405C15.5963 10.9816 15.4816 11.0963 15.3405 11.1683C15.1801 11.25 14.97 11.25 14.55 11.25H10.95C10.53 11.25 10.3199 11.25 10.1595 11.1683C10.0184 11.0963 9.90365 10.9816 9.83175 10.8405C9.75 10.6801 9.75 10.47 9.75 10.05V3.75Z"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {startDate.toLocaleDateString()}
      </Detail>
      <Detail>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 8.25V11.25M13.5 6.75V9.75M12.75 3C14.5865 3 15.5799 3.28107 16.0741 3.49908C16.1399 3.52812 16.1728 3.54263 16.2678 3.63328C16.3247 3.68761 16.4287 3.84705 16.4554 3.92107C16.5 4.04455 16.5 4.11205 16.5 4.24706V12.3084C16.5 12.9899 16.5 13.3307 16.3978 13.5059C16.2938 13.6841 16.1936 13.7669 15.999 13.8354C15.8076 13.9027 15.4215 13.8285 14.6491 13.6801C14.1085 13.5762 13.4674 13.5 12.75 13.5C10.5 13.5 8.25 15 5.25 15C3.41347 15 2.42015 14.7189 1.92591 14.5009C1.86009 14.4719 1.82718 14.4574 1.7322 14.3667C1.67526 14.3124 1.57134 14.153 1.5446 14.0789C1.5 13.9554 1.5 13.8879 1.5 13.7529L1.5 5.69164C1.5 5.01006 1.5 4.66928 1.60221 4.49411C1.70618 4.31592 1.80644 4.23309 2.00104 4.16461C2.19235 4.09729 2.57853 4.17149 3.35087 4.31989C3.89146 4.42376 4.53261 4.5 5.25 4.5C7.5 4.5 9.75 3 12.75 3ZM10.875 9C10.875 10.0355 10.0355 10.875 9 10.875C7.96447 10.875 7.125 10.0355 7.125 9C7.125 7.96447 7.96447 7.125 9 7.125C10.0355 7.125 10.875 7.96447 10.875 9Z"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {price}
      </Detail>
      <Detail>
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
        {type}
      </Detail>
    </Details>
  </Column>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, full: true }} />;
