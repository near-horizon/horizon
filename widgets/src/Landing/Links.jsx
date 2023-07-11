const links = {
  product: {
    desktop: "bafkreihdjvyefnqkqrlcolfw5pbigtn5jxjnp3vrffyyh76hhwffjdjndq",
    mobile: "bafkreifzm3ks62igjwzzyuirsash7gxfxuy5sayutawjo7gqxp4qqfx4vy",
  },
  office: {
    desktop: "bafkreiaxsx6iwjo7mvdfihe5fsb6e4kjy4enu7yasyutnxtwfo5uvxuqpy",
    mobile: "bafkreiaszg6yy3eoj4emmcmtvswots3e2mrxprpgntbzymemvbn3j6p6yu",
  },
};

const Container = styled.div`
  & > h2 {
    text-align: center;
  }
`;

const DoubleItem = styled.div`
  display: flex;
  padding: 0rem 0rem 1.5rem 0rem;
  align-items: center;
  gap: 1.375rem;

  & > div {
    width: 50%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    &.reverse {
      flex-direction: column-reverse;
    }

    & > div {
      width: 100%;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > img:nth-child(2n) {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    & > img:nth-child(2n + 1) {
      display: none;
    }

    & > img:nth-child(2n) {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    & > img:nth-child(2n + 1) {
      display: block;
    }

    & > img:nth-child(2n) {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    & > img:nth-child(2n + 1) {
      display: none;
    }

    & > img:nth-child(2n) {
      display: block;
    }
  }
`;

const RegisterButton = styled.a`
  display: flex;
  padding: 0.75rem 1.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 50px;
  background: var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-size: 1.125rem;
  font-family: Inter;
  font-weight: 600;

  &:hover,
  &:focus,
  &:active {
    background: var(--primary-primary-hover, #00ec97);
    color: var(--text-text-dark, #11181c);
    text-decoration: none;
  }
`;

const registerButton = ({ text, href }) => (
  <RegisterButton href={href ?? `${ownerId}/widget/Index?tab=createproject`}>
    {text}
  </RegisterButton>
);
const heroImage = "bafkreibcddxzaxmjl2ulqkgl52zec6crzhrde2mz5qwobdjyo7m73fhcju";

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

const Card = styled.div`
  display: flex;
  padding: 1.5rem 2.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex: 1 0 0;

  @media screen and (max-width: 768px) {
    text-align: center;
  }

  & > div {
    display: flex;
    padding: 0.625rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    @media screen and (max-width: 768px) {
      align-items: center;
    }

    & > h3 {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      align-self: stretch;
      color: var(--ui-elements-dark, #11181c);
      font-size: 1.1875rem;
      font-family: Inter;
      font-weight: 700;
      letter-spacing: 0.01188rem;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }

      & > span {
        display: flex;
        padding: 0.25rem 0.4375rem;
        align-items: flex-start;
        gap: 0.625rem;
        border-radius: 6px;
        background: var(--primary-primary-focus, #64f1b8);
        color: var(--ui-elements-dark, #11181c);
        font-weight: 400;
        font-size: 0.75rem;
        font-family: Mona-Sans;
        line-height: 1.1rem;
        letter-spacing: 0.0075rem;
      }
    }

    & > p {
      color: #000;
      font-size: 1rem;
      font-family: Mona-Sans;
      line-height: 130%;
      letter-spacing: 0.01rem;
    }

    & > a {
      display: flex;
      padding: 0.625rem 1.5625rem;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      border-radius: 1000px;
      border: 2px solid #000;
      color: #000;
      text-align: center;
      font-size: 1rem;
      font-family: FK Grotesk;
      font-weight: 500;
      letter-spacing: 0.01rem;
      cursor: pointer;

      &:hover,
      &:focus,
      &:active {
        text-decoration: none;
      }
    }
  }
`;

return (
  <Container>
    <h2>Get connected with Horizon</h2>
    <DoubleItem>
      <Card>
        <ImageContainer>
          <Img src={mapImage(links.product.desktop)} />
          <Img src={mapImage(links.product.mobile)} />
        </ImageContainer>
        <div>
          <h3>
            Product Demo Day <span>Once per month</span>
          </h3>
          <p>
            Join if you are an entrepreneur, designer, engineer, or hacker
            working on something cool that you'd like to share with fellow
            builders.
          </p>
          <a>Apply to attend</a>
        </div>
      </Card>
      <Card>
        <ImageContainer>
          <Img src={mapImage(links.office.desktop)} />
          <Img src={mapImage(links.office.mobile)} />
        </ImageContainer>
        <div>
          <h3>
            Office hours <span>Every week</span>
          </h3>
          <p>
            As an early user of NEAR Horizon, we are excited to invite you to
            join our weekly Office Hours sessions with the Horizon team.
          </p>
          <a>Apply to attend</a>
        </div>
      </Card>
    </DoubleItem>
  </Container>
);
