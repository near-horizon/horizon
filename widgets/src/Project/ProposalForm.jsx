const ownerId = "nearhorizon.near";
const accountId = props.accountId;

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
  vendorId: [],
  vendors: [],
  vendorsIsFetched: false,
  requestId: [],
  requests: [],
  requestsIsFetched: false,
  proposalTerms: [],
  proposalTerm: "specify",
  terms: [],
  term: [],
  paymentTypes: [],
  paymentType: [],
  methods: [],
  method: [],
});

const validateForm = () => {
  return (
    state.message &&
    state.messageError === "" &&
    state.price &&
    state.priceError === "" &&
    state.vendorId &&
    state.vendorIdError === "" &&
    state.requestType &&
    state.requestTypeError === "" &&
    state.paymentType &&
    state.paymentTypeError === "" &&
    state.paymentSource &&
    state.paymentSourceError === "" &&
    state.startDate &&
    state.startDateError === "" &&
    state.endDate &&
    state.endDateError === ""
  );
};

if (!state.vendorsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_vendors",
    { account_id: context.accountId },
    "final",
    false
  ).then((vendors) => {
    if (!vendors.length) {
      State.update({
        vendors: [],
        vendorsIsFetched: true,
      });
    } else {
      Near.asyncView(
        "social.near",
        "get",
        { keys: vendors.map((accountId) => `${accountId}/profile/**`) },
        "final",
        false
      ).then((data) =>
        State.update({
          vendors: vendors.map((accountId) => ({
            // text: <Widget
            //   src={`${ownerId}/widget/Project.Line`}
            //   props={{ accountId, size: "1em" }}
            // />,
            text: createProjectLine(
              accountId,
              data[accountId].profile.name,
              data[accountId].profile.image
            ),
            value: accountId,
          })),
          vendorsIsFetched: true,
        })
      );
    }
  });
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: accountId },
    "final",
    false
  ).then((requests) =>
    State.update({
      requests: requests.map(([_, cid, title]) => ({
        // name: (
        //   <Widget
        //     src={`${ownerId}/widget/Request.Line`}
        //     props={{ accountId, cid, size: "1em" }}
        //   />
        // ),
        text: title,
        value: cid,
      })),
      requestsIsFetched: true,
    })
  );
}

if (!state.requestsIsFetched || !state.vendorsIsFetched) {
  return <>Loading...</>;
}

if (!state.vendors || state.vendors.length === 0) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "No contributor to request as!",
        description: (
          <>
            You need to log in with an account that has admin rights to a
            contributor or create a{" "}
            <a href={`/${ownerId}/widget/Index?tab=createvendor`}>
              new contributor
            </a>
            !
          </>
        ),
      }}
    />
  );
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
  padding-bottom: 1em;
`;

return (
  <Container>
    <Form>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Propose as *",
          options: state.vendors,
          value: state.vendorId,
          onChange: (vendorId) => {
            State.update({ vendorId });
          },
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Subject *",
          options: state.requests,
          value: state.requestId,
          onChange: (requestId) => State.update({ requestId }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Message *",
          placeholder: "Describe the contribution you would like to request",
          value: state.message,
          onChange: (message) => State.update({ message }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.RadioGroup`}
        props={{
          label: "Proposal terms",
          items: [
            { value: "specify", name: "Specify proposal terms" },
            { value: "no", name: "Don't specify" },
          ],
          value: state.proposalTerm,
          onChange: (proposalTerm) => State.update({ proposalTerm }),
        }}
      />
      {state.proposalTerm === "specify" ? (
        <>
          <Widget
            src={`${ownerId}/widget/Inputs.Select`}
            props={{
              label: "Service terms",
              options: state.terms,
              value: state.term,
              onChange: (term) => State.update({ term }),
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Select`}
            props={{
              label: "Payment type",
              options: state.paymentTypes,
              value: state.paymentType,
              onChange: (paymentType) => State.update({ paymentType }),
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Number`}
            props={{
              label: "Price",
              value: state.price,
              onChange: (price) => State.update({ price }),
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.Select`}
            props={{
              label: "Payment method",
              options: state.methods,
              value: state.method,
              onChange: (method) => State.update({ method }),
            }}
          />
        </>
      ) : (
        <></>
      )}
      <Widget
        src={`${ownerId}/widget/Inputs.Checkbox`}
        props={{
          label:
            "Yes, I understand and agree with NEAR Horizon credit and payment system",
          value: state.agree,
          id: "agree",
          onChange: (agree) => State.update({ agree }),
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
              Send proposal
            </>
          ),
          disabled: !state.agree || !validateForm(),
          onClick: () => {
            if (!state.agree || !validateForm()) return;
            Near.call(ownerId, "add_proposal", {
              proposal: {
                vendor_id: state.vendorId.value,
                request_id: [accountId, state.requestId.value],
                title: state.requestId.text,
                description: state.message,
                price: Number(state.price),
                payment_type: state.paymentType.value,
                proposal_type: state.requestType.value,
                payment_source: state.paymentSource.value,
                start_date: `${new Date(state.startDate).getTime()}`,
                end_date: `${new Date(state.endDate).getTime()}`,
              },
            });
          },
        }}
      />
    </Footer>
  </Container>
);
