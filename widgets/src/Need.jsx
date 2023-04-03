const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;

if (!accountId || !cid) {
  return "Cannot render contribution need widget without account ID or CID!";
}

State.init({
  need: null,
  needFetched: false,
});

if (!state.needFetched) {
  Near.asyncView(
    ownerId,
    "get_contribution_need",
    {
      account_id: accountId,
      cid,
    },
    "final",
    false
  ).then((need) => State.update({ need, needFetched: true }));
}

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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const ActionColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: start;
`;

const DescriptionWrapper = styled.div`
  max-width: 100%;
  margin-top: 0.5em;
`;

return (
  <Container id={`${accountId}-${cid}`}>
    <Wrapper>
      <Header>
        <a
          href={`/#/${ownerId}/widget/Index?tab=need&accountId=${accountId}&cid=${cid}`}
          onClick={() =>
            props.update({
              tab: "need",
              content: "",
              search: "",
              accountId,
              cid,
            })
          }
        >
          <h4>Looking for {state.need.contribution_type}</h4>
        </a>
        <ActionColumn>
          <Widget
            src={`${ownerId}/widget/ActiveIndicator`}
            props={{
              active: state.need.active,
              activeText: "Open to proposals",
              inactiveText: "Closed",
            }}
          />
          <Widget
            src={`${ownerId}/widget/CardMenu`}
            props={{
              update: props.update,
              items: [
                {
                  text: "Propose contribution",
                  icon: "bi-person-up",
                  id: "contribute",
                  href: `/#/${ownerId}/widget/Index?tab=create&content=proposal&accountId=${accountId}&cid=${cid}`,
                  onClick: () =>
                    props.update({
                      tab: "create",
                      content: "proposal",
                      search: "",
                      accountId,
                      cid,
                    }),
                },
                {
                  text: "View details",
                  icon: "bi-info-circle",
                  id: "info",
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
      </Header>
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId,
          isEntity: true,
          imageSize: "1.5em",
          update: props.update,
          additionalRow: (
            <>
              <Widget src={`${ownerId}/widget/Tags`} props={{ tags }} />
              <Widget
                src={`${ownerId}/widget/DescriptionArea`}
                props={{ description: state.need.description }}
              />
            </>
          ),
        }}
      />
    </Wrapper>
  </Container>
);
