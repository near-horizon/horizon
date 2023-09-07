const ownerId = "nearhorizon.near";

const Container = styled.div`
  background: var(--background-light, #fafafa);

  display: flex;
  padding: 4rem 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;

  & > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.125rem;
    color: #000;
    font-family: FK Grotesk;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.5rem;
    letter-spacing: 0.02rem;
  }

  & > p {
    color: var(--gray-900, #101828);
    text-align: center;
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.00875rem;
    max-width: 37rem;
  }
`;

const Path = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;

  & > h2 {
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.1875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.01188rem;
  }

  & > div {
    display: flex;
    width: 70.125rem;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    gap: 1.6875rem;
    width: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    @media screen and (min-width: 768px) and (max-width: 1150px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    & > div {
      @media screen and (max-width: 768px) {
        width: 100%;
      }

      @media screen and (min-width: 768px) and (max-width: 1150px) {
        width: 48%;
      }

      display: flex;
      padding: 1.5rem 2rem 2rem 2rem;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1.9375rem;
      border-radius: 1rem;
      background: #fff;
      width: 33%;
      transition: all 0.4s ease-in-out;

      &:hover,
      &:focus,
      &:active,
      &:focus-within {
        box-shadow:
          0px 8px 8px -4px rgba(16, 24, 40, 0.03),
          0px 20px 24px -4px rgba(16, 24, 40, 0.08);

        a {
          border-color: var(--primary-primary-default, #00ec97) !important;
          background: var(--primary-primary-default, #00ec97) !important;
          color: var(--text-text-dark, #11181c) !important;
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        gap: 0.625rem;
        width: 100%;

        & > svg {
          align-self: center;
        }

        & > h3 {
          text-align: center;
          color: var(--ui-elements-black, #000);
          font-family: Inter;
          font-size: 1.1875rem;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        & > ul {
          color: var(--ui-elements-black, #000);
          font-family: "Mona Sans";
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 140%;
        }
      }

      & > a {
        display: flex;
        height: 2.5rem;
        padding: 0.5rem 1rem;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        align-self: stretch;
        border: 1px solid;
        border-radius: 3.125rem;
        text-align: center;
        font-family: Inter;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 600;
        line-height: 142%;
        letter-spacing: 0.00875rem;
        transition: all 0.4s ease-in-out;
        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
          text-decoration: none;
        }

        /* &.green { */
        /*   border-color: var(--primary-primary-default, #00ec97); */
        /*   background: var(--primary-primary-default, #00ec97); */
        /*   color: var(--text-text-dark, #11181c); */
        /* } */

        /* &.grey { */
        border-color: var(--ui-elements-light, #eceef0);
        background: var(--background-light, #fafafa);
        color: var(--text-text-primary, #101828);
        /* } */

        /* &.disabled { */
        /*   border-color: var(--ui-elements-light, #eceef0); */
        /*   background: var(--ui-elements-light, #eceef0); */
        /*   color: var(--text-text-disabled, #878a8e); */
        /* } */
      }
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  width: 100%;

  & > h4 {
    color: var(--ui-elements-black, #000);
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }

  & > p {
    color: #101828;
    text-align: center;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    max-width: 37rem;

    & > a {
      color: #006adc;

      & > svg {
        transition: all 0.4s ease-in-out;
      }

      &:hover,
      &:focus,
      &:active {
        text-decoration: none;

        & > svg {
          transform: translateX(0.3rem);
        }
      }
    }
  }
`;

return (
  <Container>
    <Header>
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
        >
          <path
            d="M32.0928 41.3646L21.9988 16.1288L25.7583 41.9808C25.8441 42.5676 26.3475 43.0037 26.9404 43.0037H30.9842C31.8294 43.0037 32.4064 42.1498 32.0928 41.3658V41.3646ZM18.238 41.9795L21.9975 16.1276L11.9035 41.3633C11.5899 42.1474 12.1669 43.0012 13.0122 43.0012H17.0559C17.6488 43.0012 18.1523 42.5663 18.238 41.9783V41.9795ZM38.9589 0.00366211H5.03863C2.53228 0.00366211 0.5 2.036 0.5 4.54242V38.4637C0.5 38.9169 0.567376 39.3555 0.692326 39.7683C0.970401 40.6883 2.1709 40.915 2.77115 40.1653L22 16.1288L41.2288 40.1653C41.8291 40.915 43.0296 40.6883 43.3077 39.7683C43.4326 39.3555 43.5 38.9182 43.5 38.4637V4.54242C43.5 2.036 41.4677 0.00366211 38.9614 0.00366211H38.9589Z"
            fill="#66A0FF"
          />
        </svg>
        Welcome to Horizon!
      </h1>
      <p>
        Take the next steps towards a successful launch with a vibrant community
        of contributors, backers, and founders just like you!
      </p>
      <Link href={`/${ownerId}/widget/Index`}>
        Click here if you want to explore Horizon
      </Link>
    </Header>
    <Path>
      <h2>Choose your path:</h2>
      <div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
            >
              <path
                d="M15.6665 18.7536L11.9165 15.0036M15.6665 18.7536C17.4126 18.0895 19.0876 17.252 20.6665 16.2536M15.6665 18.7536V25.0036C15.6665 25.0036 19.454 24.3161 20.6665 22.5036C22.0165 20.4786 20.6665 16.2536 20.6665 16.2536M11.9165 15.0036C12.5817 13.2779 13.4193 11.6237 14.4165 10.0661C15.873 7.73734 17.901 5.81992 20.3078 4.49622C22.7145 3.17252 25.4198 2.48657 28.1665 2.50361C28.1665 5.90361 27.1915 11.8786 20.6665 16.2536M11.9165 15.0036H5.6665C5.6665 15.0036 6.354 11.2161 8.1665 10.0036C10.1915 8.65361 14.4165 10.0036 14.4165 10.0036M6.2915 20.6286C4.4165 22.2036 3.7915 26.8786 3.7915 26.8786C3.7915 26.8786 8.4665 26.2536 10.0415 24.3786C10.929 23.3286 10.9165 21.7161 9.929 20.7411C9.44314 20.2774 8.80312 20.0094 8.13179 19.9886C7.46045 19.9679 6.8051 20.1958 6.2915 20.6286Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3>Web3 Founder</h3>
            <ul>
              <li>Hire ecosystem experts</li>
              <li>Meet with fellow founders</li>
              <li>Join accelerator</li>
              <li>Get financial support</li>
              <li>Get investments</li>
            </ul>
          </div>
          <a href={`/${ownerId}/widget/Index?tab=createproject`}>
            Create project profile
          </a>
        </div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M27.5 26.2537V23.7537C27.5 21.4239 25.9065 19.4662 23.75 18.9112M19.375 4.11711C21.2074 4.85884 22.5 6.6553 22.5 8.75366C22.5 10.852 21.2074 12.6485 19.375 13.3902M21.25 26.2537C21.25 23.924 21.25 22.7591 20.8694 21.8402C20.3619 20.6151 19.3886 19.6417 18.1634 19.1343C17.2446 18.7537 16.0797 18.7537 13.75 18.7537H10C7.67029 18.7537 6.50544 18.7537 5.58658 19.1343C4.36144 19.6417 3.38807 20.6151 2.8806 21.8402C2.5 22.7591 2.5 23.924 2.5 26.2537M16.875 8.75366C16.875 11.5151 14.6364 13.7537 11.875 13.7537C9.11358 13.7537 6.875 11.5151 6.875 8.75366C6.875 5.99224 9.11358 3.75366 11.875 3.75366C14.6364 3.75366 16.875 5.99224 16.875 8.75366Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3>Contributor</h3>
            <ul>
              <li>Offer your services to projects</li>
              <li>Build customer base and reputation</li>
              <li>Earn and grow your business</li>
            </ul>
          </div>
          <a href={`/${ownerId}/widget/Index?tab=createvendor`}>
            Create contributor profile
          </a>
        </div>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
            >
              <path
                d="M26.583 26.2537H6.08301C5.38294 26.2537 5.03291 26.2537 4.76552 26.1174C4.53032 25.9976 4.33909 25.8064 4.21925 25.5712C4.08301 25.3038 4.08301 24.9537 4.08301 24.2537V3.75366M26.583 8.75366L19.7901 15.5466C19.5426 15.7941 19.4188 15.9178 19.2761 15.9642C19.1506 16.005 19.0154 16.005 18.8899 15.9642C18.7472 15.9178 18.6234 15.7941 18.3759 15.5466L16.0401 13.2108C15.7926 12.9633 15.6688 12.8395 15.5261 12.7931C15.4006 12.7523 15.2654 12.7523 15.1399 12.7931C14.9972 12.8395 14.8734 12.9633 14.6259 13.2108L9.08301 18.7537M26.583 8.75366H21.583M26.583 8.75366V13.7537"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3>Backer</h3>
            <ul>
              <li>Find promising projects on early stages</li>
              <li>Grow your portfolio</li>
              <li>Reduce risks and costs</li>
            </ul>
          </div>
          <a href={`/${ownerId}/widget/Index?tab=createbacker`}>
            Create backer profile
          </a>
        </div>
      </div>
    </Path>
    <Footer>
      <h4>Become a partner</h4>
      <p>
        Take the next steps towards a successful launch with a vibrant community
        of contributors, backers, and founders just like you!{" "}
        <a href="" target="_blank">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </p>
    </Footer>
  </Container>
);
