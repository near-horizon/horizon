const ownerId = "contribut3.near";
const accountId = props.accountId;

State.init({
  founders: null,
  foundersIsFetched: false,
  requests: null,
  requestsIsFetched: false,
  description: null,
  descriptionIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    ownerId,
    "get_founders",
    { account_id: accountId },
    "final",
    false
  ).then((founders) => State.update({ founders, foundersIsFetched: true }));
}

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project_requests",
    { account_id: accountId },
    "final",
    false
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
}

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/description`] },
    "final",
    false
  ).then((description) =>
    State.update({ description, descriptionIsFetched: true })
  );
}

const body = (
  <>
    <Widget
      src={`${ownerId}/widget/ProfileLine`}
      props={{
        accountId,
        isEntity: true,
        imageSize: "3em",
        update: props.update,
      }}
    />
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.description }}
    />
  </>
);

const Footer = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 100%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const footer = (
  <Footer
    href={`/#/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`}
    onClick={() =>
      props.update({
        tab: "entity",
        content: "",
        search: "",
        accountId,
      })
    }
  >
    View details
  </Footer>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
