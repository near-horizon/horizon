const ownerId = "nearhorizon.near";
const key = `${context.accountId}-how-section-dismissed`;
const dismissed = Storage.get(key) === "true";

if (dismissed) {
  return <></>;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.5em 1.1em;
  gap: 1em;
  isolation: isolate;
  background: #d9f4ff;
  border-radius: 16px;

  @media screen and (max-width: 964px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  gap: 1.94rem;
  border-radius: 16px;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 60%;
  }

  @media screen and (min-width: 1024px) {
    width: 33.3%;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 0.62rem;
  }

  & > div > span {
    color: var(--ui-elements-black, #000);
    font-family: Inter;
    font-size: 1.1875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  & > div > ul {
    color: var(--ui-elements-black, #000);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
  }

  & > a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 11px;
    gap: 8px;
    border-radius: 50px;
    width: 100%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #101828;
    background: #59e692;
  }
`;

const Dismiss = styled.button`
  position: absolute;
  inset: 1em 1em auto auto;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #006adc;
  border: none;
  background: none;
`;

return (
  <Container>
    <Dismiss
      onClick={() => {
        Storage.set(key, "true");
      }}
    >
      Dismiss
    </Dismiss>
    <Column>
      <div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18.7503L11.25 15.0003M15 18.7503C16.7461 18.0862 18.4211 17.2487 20 16.2503M15 18.7503V25.0003C15 25.0003 18.7875 24.3128 20 22.5003C21.35 20.4753 20 16.2503 20 16.2503M11.25 15.0003C11.9152 13.2746 12.7528 11.6204 13.75 10.0628C15.2065 7.73404 17.2345 5.81662 19.6413 4.49292C22.048 3.16923 24.7533 2.48327 27.5 2.50031C27.5 5.90031 26.525 11.8753 20 16.2503M11.25 15.0003H5C5 15.0003 5.6875 11.2128 7.5 10.0003C9.525 8.65031 13.75 10.0003 13.75 10.0003M5.625 20.6253C3.75 22.2003 3.125 26.8753 3.125 26.8753C3.125 26.8753 7.8 26.2503 9.375 24.3753C10.2625 23.3253 10.25 21.7128 9.2625 20.7378C8.77663 20.2741 8.13662 20.0061 7.46528 19.9853C6.79395 19.9646 6.1386 20.1925 5.625 20.6253Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Startup founders</span>
        <ul>
          <li>Hire ecosystem experts</li>
          <li>Meet with fellow founders</li>
          <li>Join accelerator</li>
          <li>Get financial support</li>
          <li>Get investments</li>
        </ul>
      </div>
      <a className="green" href={`/${ownerId}/widget/Index?tab=createproject`}>
        Create a project
      </a>
    </Column>
    <Column>
      <div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.5 26.25V23.75C27.5 21.4202 25.9065 19.4626 23.75 18.9075M19.375 4.11345C21.2074 4.85518 22.5 6.65164 22.5 8.75C22.5 10.8484 21.2074 12.6448 19.375 13.3866M21.25 26.25C21.25 23.9203 21.25 22.7554 20.8694 21.8366C20.3619 20.6114 19.3886 19.6381 18.1634 19.1306C17.2446 18.75 16.0797 18.75 13.75 18.75H10C7.67029 18.75 6.50544 18.75 5.58658 19.1306C4.36144 19.6381 3.38807 20.6114 2.8806 21.8366C2.5 22.7554 2.5 23.9203 2.5 26.25M16.875 8.75C16.875 11.5114 14.6364 13.75 11.875 13.75C9.11358 13.75 6.875 11.5114 6.875 8.75C6.875 5.98858 9.11358 3.75 11.875 3.75C14.6364 3.75 16.875 5.98858 16.875 8.75Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Contributors</span>
        <ul>
          <li>Offer your services to projects</li>
          <li>Build customer base and reputation</li>
          <li>Earn and grow your business</li>
        </ul>
      </div>
      <a className="white" href={`/${ownerId}/widget/Index?tab=createvendor`}>
        Join as a contributor
      </a>
    </Column>
    <Column>
      <div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.25 26.25H5.75C5.04993 26.25 4.6999 26.25 4.43251 26.1138C4.19731 25.9939 4.00608 25.8027 3.88624 25.5675C3.75 25.3001 3.75 24.9501 3.75 24.25V3.75M26.25 8.75L19.4571 15.5429C19.2096 15.7904 19.0858 15.9142 18.9431 15.9605C18.8176 16.0013 18.6824 16.0013 18.5569 15.9605C18.4142 15.9142 18.2904 15.7904 18.0429 15.5429L15.7071 13.2071C15.4596 12.9596 15.3358 12.8358 15.1931 12.7895C15.0676 12.7487 14.9324 12.7487 14.8069 12.7895C14.6642 12.8358 14.5404 12.9596 14.2929 13.2071L8.75 18.75M26.25 8.75H21.25M26.25 8.75V13.75"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Backers</span>
        <ul>
          <li>Find promising projects at early stages</li>
          <li>Grow your portfolio</li>
          <li>Reduce risks and costs</li>
        </ul>
      </div>
      <a className="white" href={`/${ownerId}/widget/Index?tab=createbacker`}>
        Join as a backer
      </a>
    </Column>
  </Container>
);
