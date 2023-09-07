const title = props.title ?? "List";
const count = props.count ?? 0;
const link = props.link ?? "";
const linkText = props.linkText ?? "See all";
const items = (props.items ?? []).slice(0, 6);
const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

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

  & div {
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

  @media screen and (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    max-width: 100dvw;
    width: 100dvw;
    gap: 16px;
  }

  & > div {
    margin-bottom: 24px;

    @media screen and (max-width: 768px) {
      width: 70dvw;
    }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      width: 49%;
    }

    @media screen and (min-width: 1424px) {
      width: 32%;
    }
  }
`;

return (
  <Container>
    <Heading>
      <div>
        <h2>{title}</h2>
        <span>{count}</span>
      </div>
      <Link href={link}>{linkText}</Link>
    </Heading>
    <List>{items.map((item) => renderItem(item))}</List>
  </Container>
);
