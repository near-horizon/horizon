const { value } = props;
const ownerId = "nearhorizon.near";

const { type } = value;
const item = value?.item || {};
const path = item.path || "";

const accountId = props.accountId;
const blockHeight = props.blockHeight;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border: 1px solid #eceef0;
  box-shadow:
    0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  padding: 12px;
  border-radius: 12px;
  transition: background-color 200ms;

  &:hover {
    background: #eefeef;
  }

  > *:first-child {
    width: 200px;
    border-right: 1px solid #eceef0;
    padding-right: 24px;
  }

  > *:last-child {
    margin-left: auto;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
    gap: 8px;

    > *:first-child {
      width: 100%;
      border-right: none;
      padding-right: 0;
    }

    > *:last-child {
      margin-left: 0;
    }
  }
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: 400;
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    font-weight: 600;
    color: #006adc !important;
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  color: #006adc !important;
  white-space: nowrap;

  &.button--primary {
    width: 100%;
    color: #006adc !important;

    @media (max-width: 1200px) {
      width: auto;
    }
  }

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7e868c;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

return (
  <>
    <Wrapper>
      {value.type === "project/invite" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Project.Invite`}
          props={props}
        />
      ) : value.type === "project/proposal" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Project.Proposal`}
          props={props}
        />
      ) : value.type == "project/contract" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Project.Contract`}
          props={props}
        />
      ) : value.type === "vendor/propose" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Vendor.Proposal`}
          props={props}
        />
      ) : value.type === "vendor/proposeToRequest" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Vendor.RequestProposal`}
          props={props}
        />
      ) : value.type === "vendor/contract" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Vendor.Contract`}
          props={props}
        />
      ) : value.type === "project/feedback" ||
        value.type === "vendor/feedback" ? (
        <Widget src={`${ownerId}/widget/Notification.Feedback`} props={props} />
      ) : value.type === "vendor/propose" ? (
        <Widget
          src={`${ownerId}/widget/Notification.Vendor.Proposal`}
          props={props}
        />
      ) : (
        <div>
          Unknown notification:{" "}
          <span className="font-monospace">{JSON.stringify(value)}</span>
        </div>
      )}
    </Wrapper>
  </>
);
