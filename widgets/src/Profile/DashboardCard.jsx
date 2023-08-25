const ownerId = "nearhorizon.near";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--ui-elements-light, #eceef0);
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: calc((100% - 1.61rem) / 2);
  }

  /* @media screen and (min-width: 1280px) { */
  /*   width: calc((100% - 1.61rem * 2) / 3); */
  /* } */

  /* @media screen and (min-width: 1920px) { */
  /*   width: calc((100% - 1.61rem * 3) / 4); */
  /* } */
`;

const Header = styled.div`
  position: relative;
  display: flex;
  height: 3.4375rem;
  padding: 1rem;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  width: 100%;

  & > h4 {
    color: #000;
    font-family: Inter;
    font-size: 1.1875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  & > a {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-text-link, #006adc);
    text-align: right;
    font-family: "Mona Sans";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.1rem; /* 146.667% */
  }
`;

const Content = styled.div`
  display: flex;
  padding: 1rem 1rem 0.5rem 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background: var(--ui-elements-white, #fff);
  gap: 0.5rem;
  width: 100%;
  height: 17.25rem;
`;

return (
  <Card>
    <Header>
      {props.title}
      <Widget
        src={`${ownerId}/widget/Tooltip`}
        props={{
          content: props.tooltipText,
        }}
      />
      {props.link ? (
        <Link
          href={`/${ownerId}/widget/Index?tab=profile&content=${props.link.href}`}
        >
          {props.link.text}
        </Link>
      ) : (
        <></>
      )}
    </Header>
    <Content>{props.content}</Content>
  </Card>
);
