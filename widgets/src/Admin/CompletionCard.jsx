const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const isVendor = props.isVendor ?? false;
const completion = props.completion ?? 0;

State.init({
  project: null,
  projectIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/*`] },
    "final",
    false
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    })
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const Name = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  width: 70%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.95em;
  background: #f2f4f7;
  mix-blend-mode: multiply;
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1.125em;
  text-align: center;
`;

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Name
      href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
    >
      <Widget
        src={`${ownerId}/widget/${isVendor ? "Vendor" : "Project"}.Icon`}
        props={{ accountId: props.accountId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: props.accountId,
          name: state.profile.name,
          nameSize: "1.125em",
        }}
      />
    </Name>
    <Other>
      Completion percentage{" "}
      {Number(completion).toLocaleString("en-US", {
        style: "percent",
      })}
    </Other>
  </Container>
);
