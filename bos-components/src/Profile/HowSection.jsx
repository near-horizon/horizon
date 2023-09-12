const ownerId = "nearhorizon.near";
const key = `${context.accountId}-profile-how-section-dismissed`;
const dismissed = Storage.get(key) === "true";

if (dismissed) {
  return <></>;
}

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 2rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.75rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--blue-100, #d1e9ff);
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6875rem;
  width: 100%;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1.0625rem;
    color: var(--gray-900, #101828);
    font-family: "FK Grotesk";
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.25rem; /* 144% */

    & > svg {
      width: 10rem;
    }
  }

  & > p {
    color: var(--ui-elements-black, #000);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.3rem */
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  overflow-x: scroll;
  scrollbar-width: none;

  & > div {
    display: flex;
    padding: 0rem 2rem;
    align-items: flex-start;
    gap: 1.625rem;
  }
`;

const Card = styled.div`
  display: flex;
  width: 18.75rem;
  padding: 1.5rem 2rem 2rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.9375rem;
  border-radius: 1rem;
  background: #fff;
  height: 18.075rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    width: 100%;

    & > h6 {
      color: var(--ui-elements-black, #000);
      text-align: center;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > p {
      color: var(--ui-elements-black, #000);
      text-align: center;
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 1.225rem */
    }
  }
`;

const Button = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 3.125rem;
  border: 1px solid var(--primary-primary-default, #00ec97);
  background: var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;

  &.secondary {
    border: 1px solid var(--ui-elements-light, #eceef0);
    background: var(--background-light, #fafafa);
    color: var(--text-text-primary, #101828);
  }
`;

const Dismiss = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 0.625rem;
  display: flex;
  width: 2.1875rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  background: none;
  border: none;
`;

const createCard = ({ icon, title, description, action, secondary }) => (
  <Card>
    <div>
      {icon}
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
    <div>
      <Button>{action}</Button>
      {secondary ? <Button className="secondary">{secondary}</Button> : <></>}
    </div>
  </Card>
);

/** @type {{icon: SVGElement; title: string; description: string; action: string; secondary: string;}[]} */
const cards = [
  {
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.25 13.75L15 17.5L27.5 5M20 3.75H9.75C7.6498 3.75 6.5997 3.75 5.79754 4.15873C5.09193 4.51825 4.51825 5.09193 4.15873 5.79754C3.75 6.5997 3.75 7.6498 3.75 9.75V20.25C3.75 22.3502 3.75 23.4003 4.15873 24.2025C4.51825 24.9081 5.09193 25.4817 5.79754 25.8413C6.5997 26.25 7.6498 26.25 9.75 26.25H20.25C22.3502 26.25 23.4003 26.25 24.2025 25.8413C24.9081 25.4817 25.4817 24.9081 25.8413 24.2025C26.25 23.4003 26.25 22.3502 26.25 20.25V15"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: "Get the jobs done",
    description: "Post your needs and find ecosystem experts to fulfill them",
    action: "Create request",
    secondary: "Browse contributors",
  },
  {
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18.7498L11.25 14.9998M15 18.7498C16.7461 18.0857 18.4211 17.2482 20 16.2498M15 18.7498V24.9998C15 24.9998 18.7875 24.3123 20 22.4998C21.35 20.4748 20 16.2498 20 16.2498M11.25 14.9998C11.9152 13.2741 12.7528 11.6199 13.75 10.0623C15.2065 7.73355 17.2345 5.81613 19.6413 4.49244C22.048 3.16874 24.7533 2.48279 27.5 2.49982C27.5 5.89982 26.525 11.8748 20 16.2498M11.25 14.9998H5C5 14.9998 5.6875 11.2123 7.5 9.99982C9.525 8.64982 13.75 9.99982 13.75 9.99982M5.625 20.6248C3.75 22.1998 3.125 26.8748 3.125 26.8748C3.125 26.8748 7.8 26.2498 9.375 24.3748C10.2625 23.3248 10.25 21.7123 9.2625 20.7373C8.77663 20.2736 8.13662 20.0056 7.46528 19.9849C6.79395 19.9641 6.1386 20.192 5.625 20.6248Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: "Boost your growth",
    description: "Crypto ipsum bitcoin ethereum dogecoin litecoin PancakeSwap",
    action: "Join HZN1 accelerator",
    secondary: "Learn about HZN1",
  },
  {
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 9.99991V5.62573C20 4.58605 20 4.06621 19.781 3.74675C19.5896 3.46763 19.2933 3.27803 18.9597 3.22126C18.5779 3.15628 18.1059 3.37412 17.1619 3.80981L6.07377 8.9274C5.23188 9.31596 4.81094 9.51024 4.50263 9.81155C4.23007 10.0779 4.02202 10.4031 3.89438 10.7622C3.75 11.1684 3.75 11.632 3.75 12.5592V18.7499M20.625 18.1249H20.6375M3.75 13.9999L3.75 22.2499C3.75 23.65 3.75 24.3501 4.02248 24.8849C4.26217 25.3553 4.64462 25.7377 5.11502 25.9774C5.6498 26.2499 6.34987 26.2499 7.75 26.2499H22.25C23.6501 26.2499 24.3502 26.2499 24.885 25.9774C25.3554 25.7377 25.7378 25.3553 25.9775 24.8849C26.25 24.3501 26.25 23.65 26.25 22.2499V13.9999C26.25 12.5998 26.25 11.8997 25.9775 11.3649C25.7378 10.8945 25.3554 10.5121 24.885 10.2724C24.3502 9.99991 23.6501 9.99991 22.25 9.99991L7.75 9.99991C6.34987 9.99991 5.6498 9.99991 5.11502 10.2724C4.64462 10.5121 4.26217 10.8945 4.02248 11.3649C3.75 11.8997 3.75 12.5998 3.75 13.9999ZM21.25 18.1249C21.25 18.4701 20.9702 18.7499 20.625 18.7499C20.2798 18.7499 20 18.4701 20 18.1249C20 17.7797 20.2798 17.4999 20.625 17.4999C20.9702 17.4999 21.25 17.7797 21.25 18.1249Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: "Earn and spend",
    description: "Crypto ipsum bitcoin ethereum dogecoin litecoin PancakeSwap",
    action: "Earn credits",
    secondary: "Learn how credits work",
  },
  {
    icon: (
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
    ),
    title: "Join the community",
    description: "Crypto ipsum bitcoin ethereum dogecoin litecoin PancakeSwap",
    action: "Join Discord",
  },
  {
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 18.75L8.65593 22.6421C8.11973 23.185 7.85163 23.4565 7.62119 23.4756C7.42127 23.4922 7.22552 23.4119 7.09495 23.2596C6.94444 23.084 6.94444 22.7025 6.94444 21.9394V19.9895C6.94444 19.3049 6.38384 18.8096 5.7065 18.7104V18.7104C4.06718 18.4703 2.77972 17.1828 2.53959 15.5435C2.5 15.2732 2.5 14.9506 2.5 14.3056V8.5C2.5 6.3998 2.5 5.3497 2.90873 4.54754C3.26825 3.84193 3.84193 3.26825 4.54754 2.90873C5.3497 2.5 6.3998 2.5 8.5 2.5H17.75C19.8502 2.5 20.9003 2.5 21.7025 2.90873C22.4081 3.26825 22.9817 3.84193 23.3413 4.54754C23.75 5.3497 23.75 6.3998 23.75 8.5V13.75M23.75 27.5L21.0295 25.6086C20.6471 25.3427 20.4559 25.2098 20.2478 25.1155C20.0631 25.0319 19.8689 24.971 19.6695 24.9343C19.4448 24.8929 19.2119 24.8929 18.7461 24.8929H16.5C15.0999 24.8929 14.3998 24.8929 13.865 24.6204C13.3946 24.3807 13.0122 23.9982 12.7725 23.5278C12.5 22.9931 12.5 22.293 12.5 20.8929V17.75C12.5 16.3499 12.5 15.6498 12.7725 15.115C13.0122 14.6446 13.3946 14.2622 13.865 14.0225C14.3998 13.75 15.0999 13.75 16.5 13.75H23.5C24.9001 13.75 25.6002 13.75 26.135 14.0225C26.6054 14.2622 26.9878 14.6446 27.2275 15.115C27.5 15.6498 27.5 16.3499 27.5 17.75V21.1429C27.5 22.3077 27.5 22.8901 27.3097 23.3496C27.056 23.9621 26.5693 24.4488 25.9567 24.7026C25.4973 24.8929 24.9149 24.8929 23.75 24.8929V27.5Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: "Get in touch with us",
    description: "Crypto ipsum bitcoin ethereum dogecoin litecoin PancakeSwap",
    action: "Browse events",
  },
  {
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 25H6.5C5.09987 25 4.3998 25 3.86502 24.7275C3.39462 24.4878 3.01217 24.1054 2.77248 23.635C2.5 23.1002 2.5 22.4001 2.5 21V9C2.5 7.59987 2.5 6.8998 2.77248 6.36502C3.01217 5.89462 3.39462 5.51217 3.86502 5.27248C4.3998 5 5.09987 5 6.5 5H7C9.80026 5 11.2004 5 12.27 5.54497C13.2108 6.02433 13.9757 6.78924 14.455 7.73005C15 8.79961 15 10.1997 15 13M15 25V13M15 25H23.5C24.9001 25 25.6002 25 26.135 24.7275C26.6054 24.4878 26.9878 24.1054 27.2275 23.635C27.5 23.1002 27.5 22.4001 27.5 21V9C27.5 7.59987 27.5 6.8998 27.2275 6.36502C26.9878 5.89462 26.6054 5.51217 26.135 5.27248C25.6002 5 24.9001 5 23.5 5H23C20.1997 5 18.7996 5 17.73 5.54497C16.7892 6.02433 16.0243 6.78924 15.545 7.73005C15 8.79961 15 10.1997 15 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    title: "Get educated",
    description: "Crypto ipsum bitcoin ethereum dogecoin litecoin PancakeSwap",
    action: "Browse learning resources",
  },
];

return (
  <Container>
    <Dismiss
      onClick={() => {
        Storage.set(key, "true");
      }}
    >
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 5.5L6 16.5M6 5.5L17 16.5"
          stroke="#7E868C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Dismiss>
    <Header>
      <div>
        Welcome to
        <Widget src={`${ownerId}/widget/Logo`} />
      </div>
      <p>Use these highlights to get started</p>
    </Header>
    <Row>
      <div>{cards.map(createCard)}</div>
    </Row>
  </Container>
);
