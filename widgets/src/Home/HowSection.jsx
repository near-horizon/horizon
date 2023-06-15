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
  padding: 1.5em 1em;
  gap: 0.75em;
  border-radius: 16px;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 60%;
  }

  @media screen and (min-width: 1024px) {
    width: 33.3%;
  }

  & > div > span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    color: #202024;
  }

  & > div > ul {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 140%;
    color: #000000;
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

    &.green {
      background: #59e692;
    }

    &.white {
      background: #ffffff;
      border: 1px solid #cddbe9;
    }
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
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15L9 12M12 15C13.3968 14.4687 14.7369 13.7987 16 13M12 15V20C12 20 15.03 19.45 16 18C17.08 16.38 16 13 16 13M9 12C9.53214 10.6194 10.2022 9.29607 11 8.05C12.1652 6.18699 13.7876 4.65305 15.713 3.5941C17.6384 2.53514 19.8027 1.98637 22 2C22 4.72 21.22 9.5 16 13M9 12H4C4 12 4.55 8.97 6 8C7.62 6.92 11 8 11 8M4.5 16.5C3 17.76 2.5 21.5 2.5 21.5C2.5 21.5 6.24 21 7.5 19.5C8.21 18.66 8.2 17.37 7.41 16.59C7.02131 16.219 6.50929 16.0046 5.97223 15.988C5.43516 15.9714 4.91088 16.1537 4.5 16.5Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Startup founders
        </span>
        <ul>
          <li>Hire ecosystem experts</li>
          <li>Safely test your product</li>
          <li>Find early adopters</li>
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
        <span>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3334 3.46776C17.8151 4.20411 18.8334 5.73314 18.8334 7.5C18.8334 9.26686 17.8151 10.7959 16.3334 11.5322M18.3334 16.7664C19.8448 17.4503 21.2059 18.565 22.3334 20M2.33337 20C4.27986 17.5226 6.92255 16 9.83337 16C12.7442 16 15.3869 17.5226 17.3334 20M14.3334 7.5C14.3334 9.98528 12.3187 12 9.83337 12C7.34809 12 5.33337 9.98528 5.33337 7.5C5.33337 5.01472 7.34809 3 9.83337 3C12.3187 3 14.3334 5.01472 14.3334 7.5Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Contributors
        </span>
        <ul>
          <li>Offer your services</li>
          <li>Build customer base</li>
          <li>Grow your team</li>
        </ul>
      </div>
      <a className="white" href={`/${ownerId}/widget/Index?tab=createvendor`}>
        Join as a contributor
      </a>
    </Column>
    <Column>
      <div>
        <span>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6667 21H5.26675C4.7067 21 4.42667 21 4.21276 20.891C4.0246 20.7951 3.87161 20.6422 3.77574 20.454C3.66675 20.2401 3.66675 19.9601 3.66675 19.4V3M21.6667 7L16.2324 12.4343C16.0344 12.6323 15.9354 12.7313 15.8213 12.7684C15.7208 12.8011 15.6127 12.8011 15.5122 12.7684C15.3981 12.7313 15.2991 12.6323 15.1011 12.4343L13.2324 10.5657C13.0344 10.3677 12.9354 10.2687 12.8213 10.2316C12.7208 10.1989 12.6127 10.1989 12.5122 10.2316C12.3981 10.2687 12.2991 10.3677 12.1011 10.5657L7.66675 15M21.6667 7H17.6667M21.6667 7V11"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Backers
        </span>
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
