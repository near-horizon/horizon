const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  flex: 1 0 0;
  width: 100%;

  & > h2 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.875rem; /* 127.778% */
    letter-spacing: 0.0225rem;
  }

  & > p {
    color: var(--background-dark, #3a3f42);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 2rem */
  }

  @media screen and (max-width: 768px) {
    & > div {
      flex-direction: column-reverse;
      gap: 1.5rem !important;

      & > div:first-child {
        width: 100% !important;
      }

      & > div:last-child {
        width: 100% !important;

        & > img {
          transform: scale(-1.5, 1.5) translateX(10%) !important;
        }
      }
    }
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;

    & > div {
      @media screen and (max-width: 768px) {
        width: 100% !important;
      }

      width: calc((100%-4rem) / 3);
      display: flex;
      width: 23.75rem;
      height: 14.375rem;
      padding: 0rem 1.5rem;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 100%;

        & > h3 {
          color: var(--ui-elements-dark, #11181c);
          text-align: center;
          font-family: FK Grotesk;
          font-size: 1.25rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.25rem; /* 180% */
          letter-spacing: 0.0125rem;
        }

        & > p {
          color: var(--ui-elements-dark, #11181c);
          font-family: Montserrat;
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 1.5rem */
        }
      }
    }
  }
`;

const benefits = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <g clip-path="url(#clip0_5474_35586)">
          <rect
            x="1"
            y="6"
            width="14"
            height="7"
            rx="1"
            stroke="#66A0FF"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="8"
            y="13"
            width="15"
            height="7"
            rx="1"
            stroke="#66A0FF"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="15"
            y="20"
            width="16"
            height="7"
            rx="1"
            stroke="#66A0FF"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_5474_35586">
            <rect
              width="32"
              height="32"
              fill="white"
              transform="translate(0 0.967773)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    heading: "Cohort-based Learning",
    text: "Benefit from peer-to-peer learning, collaboration, and support, all facilitated by NEAR's experienced community managers.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M12 23.6344L5.33329 30.3011M20 23.6344L26.6666 30.3011M16 3.6344V6.30107M16 30.3011V23.6344M6.93329 23.6344H25.0666C26.5601 23.6344 27.3068 23.6344 27.8773 23.3438C28.379 23.0881 28.787 22.6801 29.0426 22.1784C29.3333 21.6079 29.3333 20.8612 29.3333 19.3677V10.5677C29.3333 9.07426 29.3333 8.32752 29.0426 7.75709C28.787 7.25533 28.379 6.84738 27.8773 6.59172C27.3068 6.30107 26.5601 6.30107 25.0666 6.30107H6.93329C5.43982 6.30107 4.69308 6.30107 4.12265 6.59172C3.62089 6.84738 3.21294 7.25533 2.95728 7.75709C2.66663 8.32752 2.66663 9.07426 2.66663 10.5677V19.3677C2.66663 20.8612 2.66663 21.6079 2.95728 22.1784C3.21294 22.6801 3.62089 23.0881 4.12265 23.3438C4.69308 23.6344 5.43982 23.6344 6.93329 23.6344Z"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Expert-led Sessions",
    text: "We offer exclusive masterclasses with industry leaders like Illia Polosukhin (NEAR), Paul Hsu (Decasonic), Richard Muirhead (Fabric Ventures), and Michael Kelly (Open Forest Protocol)",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M28 28.9678H6.13333C5.3866 28.9678 5.01323 28.9678 4.72801 28.8224C4.47713 28.6946 4.27316 28.4906 4.14532 28.2398C4 27.9545 4 27.5812 4 26.8344V4.96777M28 10.3011L20.7542 17.5469C20.4902 17.8109 20.3582 17.9429 20.206 17.9923C20.0721 18.0358 19.9279 18.0358 19.794 17.9923C19.6418 17.9429 19.5098 17.8109 19.2458 17.5469L16.7542 15.0554C16.4902 14.7913 16.3582 14.6593 16.206 14.6099C16.0721 14.5664 15.9279 14.5664 15.794 14.6099C15.6418 14.6593 15.5098 14.7913 15.2458 15.0554L9.33333 20.9678M28 10.3011H22.6667M28 10.3011V15.6344"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Fundraising Track",
    text: "Get your startup investment-ready with personalized guidance on fundraising strategies, investor relations, pitch preparation, and leadership development",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M16 30.3011C23.3638 30.3011 29.3333 24.3315 29.3333 16.9677C29.3333 9.60394 23.3638 3.6344 16 3.6344C8.63616 3.6344 2.66663 9.60394 2.66663 16.9677C2.66663 24.3315 8.63616 30.3011 16 30.3011Z"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.6294 11.989C20.2808 11.7719 20.6065 11.6633 20.8231 11.7406C21.0116 11.8078 21.1599 11.9561 21.2271 12.1446C21.3044 12.3612 21.1958 12.6869 20.9787 13.3383L18.9953 19.2884C18.9334 19.474 18.9025 19.5667 18.8498 19.6437C18.8032 19.712 18.7442 19.7709 18.676 19.8176C18.5989 19.8703 18.5062 19.9012 18.3207 19.9631L12.3705 21.9464C11.7191 22.1636 11.3934 22.2721 11.1768 22.1949C10.9883 22.1277 10.84 21.9794 10.7728 21.7909C10.6955 21.5743 10.8041 21.2486 11.0212 20.5972L13.0046 14.647C13.0665 14.4615 13.0974 14.3688 13.1501 14.2917C13.1968 14.2235 13.2557 14.1645 13.3239 14.1179C13.401 14.0652 13.4937 14.0343 13.6793 13.9724L19.6294 11.989Z"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "'Discovery' Track",
    text: "Collaborate with our dedicated team to fast-track customer insights, early feedback, and user-centric strategies.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M21.3333 5.59145C23.3089 6.57325 24.6666 8.61196 24.6666 10.9678C24.6666 13.3236 23.3089 15.3623 21.3333 16.3441M24 23.323C26.0152 24.2349 27.83 25.7211 29.3333 27.6344M2.66663 27.6344C5.26195 24.3312 8.78553 22.3011 12.6666 22.3011C16.5477 22.3011 20.0713 24.3312 22.6666 27.6344M18.6666 10.9678C18.6666 14.2815 15.9803 16.9678 12.6666 16.9678C9.35292 16.9678 6.66663 14.2815 6.66663 10.9678C6.66663 7.65406 9.35292 4.96777 12.6666 4.96777C15.9803 4.96777 18.6666 7.65406 18.6666 10.9678Z"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Networking Opportunities",
    text: "Join exclusive in-person founder retreats, attend local meetups, and participate in virtual co-working days for a blend of online and IRL engagement.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M5.99996 30.3011V23.6344M5.99996 10.3011V3.6344M2.66663 6.96773H9.33329M2.66663 26.9677H9.33329M17.3333 4.96773L15.0211 10.9795C14.645 11.9572 14.457 12.446 14.1647 12.8572C13.9055 13.2216 13.5872 13.54 13.2227 13.7991C12.8116 14.0915 12.3227 14.2795 11.3451 14.6555L5.33329 16.9677L11.3451 19.28C12.3228 19.656 12.8116 19.844 13.2227 20.1364C13.5872 20.3955 13.9055 20.7139 14.1647 21.0783C14.457 21.4895 14.645 21.9783 15.0211 22.9559L17.3333 28.9677L19.6455 22.9559C20.0215 21.9783 20.2096 21.4895 20.5019 21.0783C20.761 20.7139 21.0794 20.3955 21.4438 20.1364C21.855 19.844 22.3438 19.656 23.3215 19.28L29.3333 16.9677L23.3215 14.6555C22.3438 14.2795 21.855 14.0915 21.4438 13.7991C21.0794 13.54 20.761 13.2216 20.5019 12.8572C20.2096 12.446 20.0215 11.9572 19.6455 10.9795L17.3333 4.96773Z"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Access Exclusive Perks",
    text: "Claim valuable offers from our 20+ vendor partners, including discounts, credits, and free trials tailored to Web3 startups.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M17.3333 7.63444C17.3333 9.1072 14.05 10.3011 9.99996 10.3011C5.94987 10.3011 2.66663 9.1072 2.66663 7.63444M17.3333 7.63444C17.3333 6.16168 14.05 4.96777 9.99996 4.96777C5.94987 4.96777 2.66663 6.16168 2.66663 7.63444M17.3333 7.63444V9.63444M2.66663 7.63444V23.6344C2.66663 25.1072 5.94987 26.3011 9.99996 26.3011M9.99996 15.6344C9.77523 15.6344 9.55287 15.6308 9.33329 15.6236C5.59563 15.5011 2.66663 14.3588 2.66663 12.9678M9.99996 20.9678C5.94987 20.9678 2.66663 19.7739 2.66663 18.3011M29.3333 16.3011C29.3333 17.7739 26.05 18.9678 22 18.9678C17.9499 18.9678 14.6666 17.7739 14.6666 16.3011M29.3333 16.3011C29.3333 14.8283 26.05 13.6344 22 13.6344C17.9499 13.6344 14.6666 14.8283 14.6666 16.3011M29.3333 16.3011V26.3011C29.3333 27.7739 26.05 28.9678 22 28.9678C17.9499 28.9678 14.6666 27.7739 14.6666 26.3011V16.3011M29.3333 21.3011C29.3333 22.7739 26.05 23.9678 22 23.9678C17.9499 23.9678 14.6666 22.7739 14.6666 21.3011"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Earn Horizon Credits",
    text: "Earn Horizon Credits by contributing to the community and participating in events and exchange them for essential services, resources, and access to premier industry experts.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M26.6667 17.6344V10.0344C26.6667 7.79419 26.6667 6.67408 26.2307 5.81844C25.8472 5.06579 25.2353 4.45387 24.4827 4.07037C23.627 3.6344 22.5069 3.6344 20.2667 3.6344H11.7334C9.49316 3.6344 8.37306 3.6344 7.51741 4.07037C6.76476 4.45387 6.15284 5.06579 5.76935 5.81844C5.33337 6.67408 5.33337 7.79419 5.33337 10.0344V23.9011C5.33337 26.1413 5.33337 27.2614 5.76935 28.117C6.15284 28.8697 6.76476 29.4816 7.51741 29.8651C8.37306 30.3011 9.49316 30.3011 11.7334 30.3011H16M18.6667 15.6344H10.6667M13.3334 20.9677H10.6667M21.3334 10.3011H10.6667M19.3334 26.3011L22 28.9677L28 22.9677"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "AI Assisted Application Writer",
    text: "This feature provides suggestions to application forms for grants, accelerators, and incubators, leveraging AI to make the process more efficient and approachable.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M12 15.6344L16 19.6344L29.3333 6.30111M21.3333 4.96777H10.4C8.15979 4.96777 7.03969 4.96777 6.18404 5.40375C5.43139 5.78724 4.81947 6.39916 4.43597 7.15181C4 8.00746 4 9.12756 4 11.3678V22.5678C4 24.808 4 25.9281 4.43597 26.7837C4.81947 27.5364 5.43139 28.1483 6.18404 28.5318C7.03969 28.9678 8.15979 28.9678 10.4 28.9678H21.6C23.8402 28.9678 24.9603 28.9678 25.816 28.5318C26.5686 28.1483 27.1805 27.5364 27.564 26.7837C28 25.9281 28 24.808 28 22.5678V16.9678"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Product Audits from UX Experts",
    text: "These audits will assess the quality of your user research, product design, and provide valuable recommendations to enhance your user journey.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M22.1053 30.0125L16.0011 14.7515L18.2746 30.3851C18.3265 30.74 18.631 31.0037 18.9895 31.0037H21.4349C21.9461 31.0037 22.295 30.4873 22.1053 30.0132V30.0125ZM13.7268 30.3844L16.0004 14.7507L9.89614 30.0117C9.70649 30.4859 10.0554 31.0022 10.5666 31.0022H13.012C13.3705 31.0022 13.675 30.7392 13.7268 30.3836V30.3844ZM26.2575 5H5.74468C4.22899 5 3 6.22903 3 7.74476V28.2582C3 28.5323 3.04074 28.7975 3.11631 29.0472C3.28447 29.6035 4.01046 29.7406 4.37345 29.2872L16.0018 14.7515L27.6302 29.2872C27.9932 29.7406 28.7192 29.6035 28.8874 29.0472C28.9629 28.7975 29.0037 28.533 29.0037 28.2582V7.74476C29.0037 6.22903 27.7747 5 26.259 5H26.2575Z"
          fill="#66A0FF"
        />
      </svg>
    ),
    heading: "Access to a Vetted Marketplace",
    text: "This marketplace facilitates reliable access to key services — from legal counsel and marketing specialists to UX and technology consultants",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
      >
        <path
          d="M16 27.6345H6.93329C5.43982 27.6345 4.69308 27.6345 4.12265 27.3438C3.62089 27.0882 3.21294 26.6802 2.95728 26.1785C2.66663 25.608 2.66663 24.8613 2.66663 23.3678V10.5678C2.66663 9.07434 2.66663 8.3276 2.95728 7.75717C3.21294 7.25541 3.62089 6.84746 4.12265 6.5918C4.69308 6.30115 5.43982 6.30115 6.93329 6.30115H7.46663C10.4536 6.30115 11.947 6.30115 13.0879 6.88245C14.0914 7.39377 14.9073 8.20967 15.4187 9.2132C16 10.3541 16 11.8475 16 14.8345M16 27.6345V14.8345M16 27.6345H25.0666C26.5601 27.6345 27.3068 27.6345 27.8773 27.3438C28.379 27.0882 28.787 26.6802 29.0426 26.1785C29.3333 25.608 29.3333 24.8613 29.3333 23.3678V10.5678C29.3333 9.07434 29.3333 8.3276 29.0426 7.75717C28.787 7.25541 28.379 6.84746 27.8773 6.5918C27.3068 6.30115 26.5601 6.30115 25.0666 6.30115H24.5333C21.5463 6.30115 20.0529 6.30115 18.912 6.88245C17.9085 7.39377 17.0926 8.20967 16.5813 9.2132C16 10.3541 16 11.8475 16 14.8345"
          stroke="#66A0FF"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    heading: "Curated Learning Resources",
    text: "Quickly find the resources you and your team need to level up on areas critical to growth and success",
  },
].map(({ icon, heading, text }) => (
  <div key={heading}>
    {icon}
    <div>
      <h3>{heading}</h3>
      <p>{text}</p>
    </div>
  </div>
));

const ComingSoon = styled.div`
  display: flex;
  padding: 1.25rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 1.5rem;
  border: 1px dashed var(--gray-400, #98a2b3);

  & > span {
    color: var(--gray-400, #98a2b3);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.625rem; /* 144.444% */
    letter-spacing: 0.01125rem;
  }
`;

return (
  <Container>
    <h2>HZN fellows get comprehensive benefits</h2>
    <p>
      HZN is an exclusive learning community for founders that addresses the
      unique challenges and opportunities within the web3 space. What we're
      offering is more than just another program; it's a roadmap tailored for
      Web3 founders.
    </p>
    <div>
      {benefits}
      <ComingSoon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M12 5.96777V19.9678M5 12.9678H19"
            stroke="#98A2B3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Even more benefits are coming</span>
      </ComingSoon>
    </div>
  </Container>
);
