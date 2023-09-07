const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  margin-bottom: 0.25em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;

  & > span {
    &.open {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #12b76a;
    }

    &.closed {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #ff7966;
    }
  }

  & > h3 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #101828;
  }

  & > h4 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #11181c;
  }
`;

const Tagline = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #11181c;
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0px 0px;
  gap: 1.5em;
  flex: none;
  order: 4;
  align-self: stretch;
  flex-wrap: wrap;
  flex-grow: 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.4em;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #7e868c;
`;

const open = props.open ?? false;

const ImageCircle = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  background: #fafafa;
  sizing: border-box;
  display: inline-block;
  --size: ${({ size }) => size};
  width: var(--size, 1.5em);
  height: var(--size, 1.5em);
  border-radius: 100%;
  overflow: hidden;
`;

const body = (
  <>
    <Container>
      <ImageContainer title={`${props.name}`} size="64px">
        {props.imageSvg ? (
          props.imageSrc
        ) : (
          <ImageCircle src={props.imageSrc} alt="profile image" />
        )}
      </ImageContainer>
      <Details>
        <h3>{props.name}</h3>
        <h4>{props.subheader}</h4>
        <span className={open ? "open" : "closed"}>
          {open ? (
            <>
              <svg
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.5" cy="3.5" r="3.5" fill="#12B76A" />
              </svg>
              Receiving applications
            </>
          ) : (
            "Applications closed"
          )}
        </span>
      </Details>
    </Container>
    <Tagline>{props.tagline}</Tagline>
    <Widget src={`${ownerId}/widget/Tags`} props={{ tags: props.tags }} />
    <Items>
      <Item>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.025 8.625L15.5254 10.125L14.025 8.625M15.7088 9.75C15.736 9.50375 15.75 9.25351 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C11.1205 15.75 13.0125 14.7722 14.25 13.243M9 5.25V9L11.25 10.5"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {props.duration}
      </Item>
      {/*<Item>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2913_84470)">
            <path
              d="M9 1.5C9.44376 1.5 9.87851 1.53854 10.3011 1.61245M9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5M9 1.5V16.5M13.3035 2.85675C14.0192 3.35902 14.6431 3.98317 15.145 4.69905M16.3876 7.69922C16.4615 8.12171 16.5 8.55636 16.5 9C16.5 9.44364 16.4615 9.87829 16.3876 10.3008M15.1419 13.3055C14.6402 14.0197 14.0172 14.6425 13.3027 15.1438M10.2996 16.3878C9.87749 16.4616 9.44323 16.5 9 16.5"
              stroke="#7E868C"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2913_84470">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {props.equity}
      </Item>*/}
      <Item>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.375 5.45874L8.99998 9.00041M8.99998 9.00041L2.62498 5.45874M8.99998 9.00041L9 16.1254M15.75 12.0443V5.95651C15.75 5.69953 15.75 5.57104 15.7121 5.45644C15.6786 5.35506 15.6239 5.262 15.5515 5.18348C15.4697 5.09473 15.3574 5.03233 15.1328 4.90752L9.58277 1.82419C9.37007 1.70602 9.26372 1.64694 9.15109 1.62377C9.05141 1.60327 8.9486 1.60327 8.84891 1.62377C8.73628 1.64694 8.62993 1.70602 8.41723 1.82419L2.86723 4.90753C2.64259 5.03233 2.53026 5.09473 2.44847 5.18348C2.37612 5.262 2.32136 5.35506 2.28786 5.45644C2.25 5.57104 2.25 5.69953 2.25 5.95651V12.0443C2.25 12.3013 2.25 12.4298 2.28786 12.5444C2.32136 12.6458 2.37612 12.7389 2.44847 12.8174C2.53026 12.9061 2.64259 12.9685 2.86723 13.0933L8.41723 16.1767C8.62993 16.2948 8.73628 16.3539 8.84891 16.3771C8.9486 16.3976 9.05141 16.3976 9.15109 16.3771C9.26372 16.3539 9.37007 16.2948 9.58277 16.1767L15.1328 13.0933C15.3574 12.9685 15.4697 12.9061 15.5515 12.8174C15.6239 12.7389 15.6786 12.6458 15.7121 12.5444C15.75 12.4298 15.75 12.3013 15.75 12.0443Z"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {props.chain}
      </Item>
      <Item>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 16.5C12 13.5 15 10.8137 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 10.8137 6 13.5 9 16.5Z"
            stroke="#7E868C"
            stroke-width="1.35"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {props.location}
      </Item>
    </Items>
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
  width: 48%;
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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const footer = (
  <Footer>
    <FooterButton
      href={`/${ownerId}/widget/Index?tab=partner&accountId=${
        props.accountId ?? props.name
      }`}
      onClick={() =>
        props.update({
          tab: "partner",
          content: "",
          search: "",
          accountId,
        })
      }
    >
      View details
    </FooterButton>
    <FooterButton href={props.href}>Apply</FooterButton>
  </Footer>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
