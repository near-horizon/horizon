const about = {
  founders: (
    <svg
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6667 18.7503L11.9167 15.0003M15.6667 18.7503C17.4127 18.0862 19.0878 17.2487 20.6667 16.2503M15.6667 18.7503V25.0003C15.6667 25.0003 19.4542 24.3128 20.6667 22.5003C22.0167 20.4753 20.6667 16.2503 20.6667 16.2503M11.9167 15.0003C12.5819 13.2746 13.4194 11.6204 14.4167 10.0628C15.8732 7.73404 17.9012 5.81662 20.3079 4.49292C22.7147 3.16923 25.42 2.48327 28.1667 2.50031C28.1667 5.90031 27.1917 11.8753 20.6667 16.2503M11.9167 15.0003H5.66669C5.66669 15.0003 6.35419 11.2128 8.16669 10.0003C10.1917 8.65031 14.4167 10.0003 14.4167 10.0003M6.29169 20.6253C4.41669 22.2003 3.79169 26.8753 3.79169 26.8753C3.79169 26.8753 8.46669 26.2503 10.0417 24.3753C10.9292 23.3253 10.9167 21.7128 9.92919 20.7378C9.44332 20.2741 8.8033 20.0061 8.13197 19.9853C7.46064 19.9646 6.80528 20.1925 6.29169 20.6253Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  contributors: (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4.3347C21.8521 5.25514 23.125 7.16642 23.125 9.375C23.125 11.5836 21.8521 13.4949 20 14.4153M22.5 20.958C24.3893 21.8129 26.0907 23.2062 27.5 25M2.5 25C4.93311 21.9032 8.23647 20 11.875 20C15.5135 20 18.8169 21.9032 21.25 25M17.5 9.375C17.5 12.4816 14.9816 15 11.875 15C8.7684 15 6.25 12.4816 6.25 9.375C6.25 6.2684 8.7684 3.75 11.875 3.75C14.9816 3.75 17.5 6.2684 17.5 9.375Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  backers: (
    <svg
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5834 26.25H6.08337C5.38331 26.25 5.03328 26.25 4.76589 26.1138C4.53068 25.9939 4.33946 25.8027 4.21962 25.5675C4.08337 25.3001 4.08337 24.9501 4.08337 24.25V3.75M26.5834 8.75L19.7905 15.5429C19.543 15.7904 19.4192 15.9142 19.2765 15.9605C19.151 16.0013 19.0158 16.0013 18.8902 15.9605C18.7475 15.9142 18.6238 15.7904 18.3763 15.5429L16.0405 13.2071C15.793 12.9596 15.6692 12.8358 15.5265 12.7895C15.401 12.7487 15.2658 12.7487 15.1402 12.7895C14.9975 12.8358 14.8738 12.9596 14.6263 13.2071L9.08337 18.75M26.5834 8.75H21.5834M26.5834 8.75V13.75"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};

const Container = styled.div`
  display: flex;
  padding: 1.5rem 2rem 3rem 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.6875rem;
  align-self: stretch;
  border-radius: 16px;
  background: var(--background-darker, #202425);
  width: 100%;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 0.6875rem;
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
  <RegisterButton href={href ?? `${ownerId}/widget/Onboarding.Page`}>
    {text}
  </RegisterButton>
);

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
  min-width: 20rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }

  & > h3 {
    color: var(--ui-elements-white, #fff);
    font-size: 1.5625rem;
    font-family: FK Grotesk;
    font-weight: 700;
    line-height: 2.25rem;
    letter-spacing: 0.01563rem;
  }

  & > p {
    color: var(--ui-elements-white, #fff);
    font-size: 1rem;
    font-family: Mona-Sans;
    line-height: 130%;
    letter-spacing: 0.01rem;
  }

  & > a {
    display: flex;
    width: 100%;
    color: var(--primary-primary-default, #00ec97) !important;
    font-size: 0.875rem;
    font-family: Mona-Sans;
    line-height: 140%;
    letter-spacing: 0.00875rem;
  }
`;

return (
  <Container>
    <div>
      <Column>
        {about.founders}
        <h3>Web3 Founders</h3>
        <p>
          WEB3 FOUNDERS create profiles to boost their projects: post tasks,
          hire experts, get financial support, or get investments
        </p>
        <a>Learn more</a>
      </Column>
      <Column>
        {about.contributors}
        <h3>Contributors</h3>
        <p>
          CONTRIBUTORS create profiles to find projects that need help from
          experts like you. Offer your services, earn and grow your customers
          base
        </p>
        <a>Learn more</a>
      </Column>
      <Column>
        {about.backers}
        <h3>Backers</h3>
        <p>
          BACKERS create profiles to connect with NEAR Ecosystem projects that
          are looking for early investors.
        </p>
        <a>Learn more</a>
      </Column>
    </div>
    <div>{registerButton({ text: "Create profile" })}</div>
  </Container>
);
