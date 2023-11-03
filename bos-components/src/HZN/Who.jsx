const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const image = "bafybeibet4t374gtgef22vnwxiaqgpofozf5tp2z2urnrz5htgeqbwdkj4";

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
    align-items: flex-start;
    gap: 4.5625rem;
    width: 100%;

    & > div:first-child {
      width: 55%;
    }

    & > div:last-child {
      width: 45%;
      border-radius: 1.5rem;
      overflow: hidden;

      & > img {
        height: 100%;
        max-height: 34rem;
        transform: scaleX(-1) translateX(10%);
        object-fit: cover;
      }
    }

    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      & > ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3rem;
        flex: 1 0 0;

        & > li {
          display: flex;
          align-items: flex-start;
          gap: 1.75rem;
          align-self: stretch;
          list-style: none;

          & > svg {
            width: 4rem;
          }

          & > div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            align-self: stretch;

            & > span {
              color: var(--ui-elements-dark, #11181c);
              font-family: FK Grotesk;
              font-size: 1.5rem;
              font-style: normal;
              font-weight: 700;
              line-height: 2.25rem; /* 150% */
              letter-spacing: 0.015rem;
            }

            & > p {
              color: var(--background-dark, #3a3f42);
              font-family: "Mona Sans";
              font-size: 1.125rem;
              font-style: normal;
              font-weight: 400;
              line-height: 1.75rem; /* 155.556% */
            }
          }
        }
      }
    }
  }
`;

return (
  <Container>
    <h2>Who can benefit from HZN?</h2>
    <p>
      HZN is an exclusive learning community for founders that addresses the
      unique challenges and opportunities within the web3 space. What we're
      offering is more than just another program; it's a roadmap tailored for
      Web3 founders.
    </p>
    <div>
      <div>
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M15 3.46777V4.71777M3.75 15.9678H2.5M6.875 7.84277L6.12488 7.09265M23.125 7.84277L23.8753 7.09265M27.5 15.9678H26.25M12.5 17.8428H17.5M15 17.8428V24.0928M19.375 22.0602C21.2676 20.6987 22.5 18.4772 22.5 15.9678C22.5 11.8256 19.1421 8.46777 15 8.46777C10.8579 8.46777 7.5 11.8256 7.5 15.9678C7.5 18.4772 8.73241 20.6987 10.625 22.0602V24.4678C10.625 25.8679 10.625 26.568 10.8975 27.1028C11.1372 27.5732 11.5196 27.9556 11.99 28.1953C12.5248 28.4678 13.2249 28.4678 14.625 28.4678H15.375C16.7751 28.4678 17.4752 28.4678 18.01 28.1953C18.4804 27.9556 18.8628 27.5732 19.1025 27.1028C19.375 26.568 19.375 25.8679 19.375 24.4678V22.0602Z"
                stroke="#66A0FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <span>Idea-Stage Founders</span>
              <p>
                If you're pre-launch or actively building a product on Testnet,
                particularly if you haven't yet chosen a chain and are
                considering NEAR, HZN1 will propel your journey.
              </p>
            </div>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M15 19.7178L11.25 15.9678M15 19.7178C16.7461 19.0538 18.4211 18.2162 20 17.2178M15 19.7178V25.9678C15 25.9678 18.7875 25.2803 20 23.4678C21.35 21.4428 20 17.2178 20 17.2178M11.25 15.9678C11.9152 14.2421 12.7528 12.5879 13.75 11.0303C15.2065 8.70157 17.2345 6.78415 19.6413 5.46045C22.048 4.13676 24.7533 3.4508 27.5 3.46784C27.5 6.86784 26.525 12.8428 20 17.2178M11.25 15.9678H5C5 15.9678 5.6875 12.1803 7.5 10.9678C9.525 9.61784 13.75 10.9678 13.75 10.9678M5.625 21.5928C3.75 23.1678 3.125 27.8428 3.125 27.8428C3.125 27.8428 7.8 27.2178 9.375 25.3428C10.2625 24.2928 10.25 22.6803 9.2625 21.7053C8.77663 21.2416 8.13662 20.9736 7.46528 20.9529C6.79395 20.9321 6.1386 21.16 5.625 21.5928Z"
                stroke="#66A0FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <span>Seed-Stage Founders</span>
              <p>
                Seed+ founders who are actively building their project,
                fundraising, or looking for top talent, will find immense value
                in HZN1's networking, mentorship, and strategies.
              </p>
            </div>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M14.1033 5.28436C14.3914 4.70068 14.5355 4.40885 14.731 4.3156C14.9012 4.23448 15.0989 4.23448 15.269 4.3156C15.4646 4.40885 15.6086 4.70068 15.8967 5.28436L18.6301 10.8218C18.7151 10.9941 18.7577 11.0803 18.8198 11.1472C18.8748 11.2064 18.9408 11.2544 19.0141 11.2885C19.0969 11.327 19.192 11.3409 19.3822 11.3687L25.4962 12.2623C26.1401 12.3565 26.462 12.4035 26.611 12.5608C26.7406 12.6976 26.8016 12.8856 26.7769 13.0724C26.7485 13.2872 26.5155 13.5142 26.0493 13.9682L21.6268 18.2757C21.4889 18.41 21.42 18.4772 21.3755 18.557C21.3362 18.6278 21.3109 18.7055 21.3011 18.7858C21.2901 18.8766 21.3064 18.9715 21.3389 19.1611L22.3824 25.2454C22.4925 25.8871 22.5475 26.2079 22.4441 26.3983C22.3541 26.564 22.1942 26.6802 22.0088 26.7146C21.7958 26.754 21.5076 26.6025 20.9314 26.2995L15.4655 23.425C15.2952 23.3354 15.21 23.2907 15.1203 23.2731C15.0409 23.2575 14.9592 23.2575 14.8797 23.2731C14.79 23.2907 14.7049 23.3354 14.5346 23.425L9.06865 26.2995C8.49239 26.6025 8.20426 26.754 7.99121 26.7146C7.80585 26.6802 7.6459 26.564 7.55592 26.3983C7.4525 26.2079 7.50753 25.8871 7.61759 25.2454L8.66111 19.1611C8.69364 18.9715 8.70991 18.8766 8.6989 18.7858C8.68915 18.7055 8.66389 18.6278 8.62451 18.557C8.58003 18.4772 8.5111 18.41 8.37323 18.2757L3.9507 13.9682C3.48458 13.5142 3.25152 13.2872 3.22316 13.0724C3.19848 12.8856 3.25944 12.6976 3.38906 12.5608C3.53804 12.4035 3.85996 12.3565 4.5038 12.2623L10.6179 11.3687C10.808 11.3409 10.9031 11.327 10.9859 11.2885C11.0592 11.2544 11.1252 11.2064 11.1802 11.1472C11.2424 11.0803 11.2849 10.9941 11.37 10.8218L14.1033 5.28436Z"
                stroke="#66A0FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <span>Talented Builders</span>
              <p>
                Director-level or above professionals at web3 projects seeking
                to network, looking for their next role, or a co-founder for a
                new venture will find HZN1 to be a platform to connect with
                like-minded professionals and potential co-founders.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <img src={mapImage(image)} alt="Who Image" />
      </div>
    </div>
  </Container>
);
