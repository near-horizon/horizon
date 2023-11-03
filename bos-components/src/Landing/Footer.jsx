const ownerId = "nearhorizon.near";
const exploreLink = "https://app.hzn.xyz";

const Footer = styled.div`
  width: 100%;
  background: var(--background-beige, #f2f1ea);

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4rem 6.875rem 3.0625rem 6.875rem;
    justify-content: center;
    gap: 1.5rem;

    @media screen and (max-width: 768px) {
      display: flex;
      padding: 3rem 1rem 0rem 1rem;
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  & > div {
    max-width: 20%;

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }

  & > h4 {
    color: var(--ui-elements-dark, #11181c);
    font-size: 1.1875rem;
    font-family: Inter;
    font-weight: 700;
    letter-spacing: 0.01188rem;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    color: var(--ui-elements-dark, #11181c);
    font-size: 0.875rem;
    font-family: "Mona Sans";
    line-height: 140%;
    letter-spacing: 0.00875rem;
    list-style: none;
    margin-left: 0rem;
    padding-left: 0rem;

    @media screen and (max-width: 768px) {
      align-items: center;
      text-align: center;
    }

    & a {
      color: var(--ui-elements-dark, #11181c);

      &:hover,
      &:focus,
      &:active {
        color: var(--ui-elements-dark, #11181c);
      }
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 1rem 0rem 2rem 0rem;
    gap: 1.375rem;
    align-self: stretch;
  }

  & > span,
  & > a {
    color: rgba(17, 24, 28, 0.65);
    font-size: 0.875rem;
    font-family: "Mona Sans";
    line-height: 140%;
    letter-spacing: 0.00875rem;
  }

  & > a {
    cursor: pointer;
  }

  & svg {
    margin-left: 0.625rem;
  }
`;

return (
  <Footer>
    <div>
      <Links>
        <Main>
          <Widget src={`${ownerId}/widget/Logo`} />
          <p>
            An early stage accelerator empowering Web3 founders to build,
            connect, and grow
          </p>
          <Widget
            src={`${ownerId}/widget/SocialLinks`}
            props={{
              links: {
                twitter: "nearhorizon",
                youtube: "",
              },
            }}
          />
        </Main>
        <Column>
          <h4>Explore</h4>
          <ul>
            <li>
              <a href={`${exploreLink}/projects?utm=near.org`}>Projects</a>
            </li>
            <li>
              <a href={`${exploreLink}/requests?utm=near.org`}>
                Contribution requests
              </a>
            </li>
            <li>
              <a href={`${exploreLink}/contributors?utm=near.org`}>
                Contributors
              </a>
            </li>
            <li>
              <a href={`${exploreLink}/backers?utm=near.org`}>Backers</a>
            </li>
          </ul>
        </Column>
        <Column>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="https://lu.ma/u/usr-5oZHY9dEDbDcaHY" target="_blank">
                Events calendar
              </a>
            </li>
            <li>
              <a href="mailto:horizon@near.foundation">
                Reach out to us directly
              </a>
            </li>
          </ul>
        </Column>
        <Column>
          <h4>Get help</h4>
          <ul>
            <li>
              <a href={`${exploreLink}/learn?utm=near.org`}>
                Learning resources
              </a>
            </li>
            <li>
              <a href={`${exploreLink}/faq?utm=near.org`}>FAQ</a>
            </li>
          </ul>
        </Column>
        <div>
          <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
        </div>
      </Links>
      <Bottom>
        <span>© 2023</span>
        <a href={`/${ownerId}/widget/Index?tab=legal`}>
          Terms &amp; conditions
        </a>
        <span>
          Built on
          <svg
            width="83"
            height="21"
            viewBox="0 0 83 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.319 3.48737C32.7852 3.48737 31.6699 3.84578 30.7224 4.67256L29.0491 6.10561C28.9096 6.21615 28.6307 6.29877 28.4358 6.13296C28.2404 5.96771 28.2128 5.7472 28.3799 5.52669L29.2722 4.20361C29.4116 4.01045 29.3004 3.76258 29.0491 3.76258H26.9021C26.6513 3.76258 26.4559 3.95575 26.4559 4.20361V17.1039C26.4559 17.3518 26.6513 17.545 26.9021 17.545H29.1327C29.3834 17.545 29.5788 17.3518 29.5788 17.1039V9.82694C29.5788 6.49193 32.395 5.96828 33.4544 5.96828C35.7127 5.96828 36.5214 7.56715 36.5214 8.77965V17.1039C36.5214 17.3518 36.7168 17.545 36.9675 17.545H39.1981C39.4488 17.545 39.6443 17.3518 39.6443 17.1039V8.50391C39.6443 5.41672 37.6091 3.48737 34.319 3.48737Z"
              fill="#3A3F42"
            />
            <path
              d="M48.7333 3.43207C44.4116 3.43207 41.6512 6.05087 41.6512 9.6064V11.5637C41.6512 15.3124 44.4116 17.876 48.7333 17.876C52.553 17.876 55.2297 15.9187 55.5087 13.2726C55.537 12.9968 55.3416 12.8042 55.0626 12.8042H52.8879C52.6925 12.8042 52.5253 12.9147 52.4694 13.1073C52.1905 13.9894 50.8803 15.3124 48.7333 15.3124C46.5862 15.3124 44.5787 13.7688 44.6064 11.5637L44.6346 9.11074C44.6623 7.26398 46.6145 5.99618 48.7333 5.99618C50.6573 5.99618 52.5253 7.07139 52.7201 8.83552C52.7363 9.03951 52.5945 9.22351 52.3911 9.26228L46.1396 10.4617C45.8888 10.5169 45.6935 10.7375 45.6935 11.0127V11.04C45.6935 11.2879 45.9441 11.5084 46.3067 11.5084H55.2851C55.5317 11.5084 55.7312 11.3107 55.7312 11.0674V9.33126C55.7312 6.05144 52.8591 3.43264 48.7327 3.43264L48.7333 3.43207Z"
              fill="#3A3F42"
            />
            <path
              d="M64.2912 3.43209C60.8058 3.43209 57.7947 5.44406 57.7947 8.09021C57.7947 8.31073 57.9902 8.47595 58.2409 8.47595H60.4991C60.7222 8.47595 60.8893 8.31073 60.9176 8.09021C61.1407 6.87768 62.6185 5.99562 64.2077 5.99562C66.1034 5.99562 67.3864 7.15346 67.3864 9.13811V11.5364C67.3864 13.9894 65.546 15.2298 63.2595 15.2298C61.475 15.2298 60.4432 14.5683 60.4432 13.493C60.4432 12.5557 60.9453 11.7563 63.0082 11.2879L65.9916 10.4885C66.2982 10.4058 66.41 10.1575 66.3541 9.88224C66.3264 9.66172 66.0757 9.5512 65.852 9.5512H62.7574C60.1366 9.5512 57.4876 11.2047 57.4876 13.6304V14.0161C57.4876 16.4971 59.8577 17.7922 62.5621 17.7922C64.2906 17.7922 65.7685 17.1307 66.6884 16.3592L68.055 15.2014C68.2781 15.0082 68.5012 15.0082 68.6959 15.2014C68.8631 15.3666 68.8072 15.615 68.6677 15.8076L67.8313 17.1033C67.6919 17.2965 67.8032 17.5444 68.0544 17.5444H70.062C70.3127 17.5444 70.5081 17.3512 70.5081 17.1033V8.75117C70.5081 5.55403 68.1939 3.43152 64.2901 3.43152L64.2912 3.43209Z"
              fill="#3A3F42"
            />
            <path
              d="M82.5537 3.76312H79.4304C78.3433 3.76312 77.2835 4.42465 76.5305 5.05885L75.3043 6.10614C75.1648 6.21668 74.9135 6.2993 74.7463 6.16141C74.5509 6.02352 74.4674 5.74774 74.6351 5.52722L75.5273 4.20414C75.6669 4.01098 75.5556 3.76312 75.3043 3.76312H73.2131C72.9624 3.76312 72.767 3.95628 72.767 4.20414V17.1044C72.767 17.3523 72.9624 17.5455 73.2131 17.5455H75.4997C75.7503 17.5455 75.9457 17.3523 75.9457 17.1044V10.4891C75.9457 7.64975 77.1168 6.38192 79.6546 6.38192H82.5537C82.8044 6.38192 82.9999 6.18876 82.9999 5.94089V4.20414C82.9999 3.95628 82.8044 3.76312 82.5537 3.76312Z"
              fill="#3A3F42"
            />
            <path
              d="M18.0759 0.654297C17.3266 0.654297 16.6309 1.03834 16.2384 1.66968L12.0095 7.87652C11.8717 8.08111 11.9276 8.35685 12.1345 8.49307C12.3023 8.60359 12.5241 8.58992 12.6769 8.46001L16.8396 4.89077C16.9088 4.82923 17.0153 4.8355 17.0776 4.90387C17.1059 4.93521 17.1209 4.97567 17.1209 5.01726V16.1922C17.1209 16.2845 17.0453 16.3586 16.9519 16.3586C16.9018 16.3586 16.8546 16.3369 16.8229 16.2988L4.23977 1.40872C3.82997 0.930652 3.22822 0.654867 2.59477 0.654297H2.15499C0.964746 0.654297 -0.00012207 1.60814 -0.00012207 2.78478V18.5238C-0.00012207 19.7005 0.964746 20.6543 2.15499 20.6543C2.90429 20.6543 3.59999 20.2703 3.99251 19.6389L8.22149 13.4321C8.35921 13.2275 8.3033 12.9518 8.09634 12.8155C7.92863 12.705 7.70674 12.7187 7.55402 12.8486L3.39133 16.4179C3.32217 16.4794 3.21554 16.4731 3.15329 16.4047C3.12504 16.3734 3.11006 16.333 3.11063 16.2913V5.11356C3.11063 5.02125 3.18614 4.94718 3.27951 4.94718C3.32909 4.94718 3.37692 4.96883 3.40863 5.00701L15.99 19.8999C16.3998 20.378 17.0016 20.6538 17.635 20.6543H18.0748C19.265 20.6549 20.2305 19.7016 20.2316 18.525V2.78478C20.2316 1.60814 19.2661 0.654297 18.0759 0.654297Z"
              fill="#3A3F42"
            />
          </svg>
        </span>
      </Bottom>
    </div>
  </Footer>
);
