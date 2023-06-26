const ownerId = "nearhorizon.near";
const title = props.title ?? "List";
const count = props.count ?? 0;
const items = props.items ?? [];
const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);
const entity = props.entity ?? "projects";
const sort = props.sort ?? Storage.get(`${entity}-sort`) ?? "timedesc";

State.init({
  sort,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 1em;
  width: 100%;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 16px;

    & > h2 {
      font-family: "FK Grotesk";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 36px;
      color: #11181c;
    }

    & > span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 19px;
      line-height: 23px;
      color: #7e868c;

      & > b {
        font-weight: 600;
        color: #11181c;
      }
    }
  }

  & > a {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    gap: 8px;
    background: #fafafa;
    border: 1px solid #eceef0;
    border-radius: 50px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #101828;

    &:hover,
    &:focus {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #101828;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px;
  flex-wrap: wrap;
  width: 100%;

  & > div {
    margin-bottom: 24px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      width: 49%;
    }

    @media screen and (min-width: 1424px) {
      width: 32%;
    }
  }
`;

const Sort = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;

  & > span.label {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #11181c;
    white-space: nowrap;
  }

  &:last-child {
    width: 30%;
  }
`;

const optionsMap = {
  timeasc: "Oldest first",
  timedesc: "Newest first",
  nameasc: "Alphabetical",
  namedesc: "Reverse alphabetical",
  recentasc: "Oldest activity first",
  recentdesc: "Most recently active first",
};

return (
  <Container>
    <Heading>
      <div>
        <span>
          <b>{count}</b> backers
        </span>
      </div>
      <Sort>
        <span className="label">Sort by:</span>
        <Widget
          src={`${ownerId}/widget/Inputs.Select`}
          props={{
            noLabel: true,
            value: { text: optionsMap[state.sort], value: state.sort },
            onChange: ({ value }) => {
              Storage.set(`${entity}-sort`, value);
              State.update({ sort: value });
              props.onSort(value);
            },
            options: [
              { text: "Oldest first", value: "timeasc" },
              { text: "Newest first", value: "timedesc" },
              { text: "Alphabetical", value: "nameasc" },
              { text: "Reverse alphabetical", value: "namedesc" },
              { text: "Oldest activity first", value: "recentasc" },
              { text: "Most recently active first", value: "recentdesc" },
            ],
          }}
        />
      </Sort>
    </Heading>
    <List>{items.map((item) => renderItem(item))}</List>
  </Container>
);
