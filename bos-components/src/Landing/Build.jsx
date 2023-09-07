const build = {
  hire: {
    desktop: "bafkreia4if3v5pidg5wn3ajuox7novoqzabtgqjcxtutxscip5dmrhrcni",
    mobile: "bafkreid3i5zlxu2eiqca7qghpgpoj2zbmp2kwv7qtkzdj2utyqhunk56y4",
  },
  validate: {
    desktop: "bafkreiaj66jfkq67dtohhhyugu6fzvwes5iojhnn6552qtsyiyg33lv35e",
    mobile: "bafkreigc2hjgoma3gewa55buw4t3ueoshwap25iu2t6hcyapjwvpqo2qfi",
  },
  mentor: {
    desktop: "bafkreicichhd7bqfhvwphgb3oeo6rv2eritrqhdinaabam2c6xo7epju5e",
    mobile: "bafkreigs2ktn7dokv4l6nug733ovyzqco7lw5hvqluhwzst2sgce3ty4dy",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  gap: 1.375rem;
  width: 100%;

  & > div {
    width: 50%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    & > div {
      width: 100%;
      align-items: center;
    }
  }
`;

const arrow = (
  <svg
    width="37"
    height="12"
    viewBox="0 0 37 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M37 6L27 0.226497V11.7735L37 6ZM0 7H28V5H0V7Z" fill="#FF7966" />
  </svg>
);

const Title = styled.h2`
  display: flex;
  padding: 0rem 0rem 0.75rem 0rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  @media screen and (max-width: 768px) {
    justify-content: center;

    & > :not(:last-child) {
      display: none;
    }
  }
`;

const Join = styled.span`
  color: var(--background-dark, #3a3f42);
  font-size: 2rem;
  font-family: FK Grotesk;
  font-weight: 700;
  line-height: 2.5rem;
  letter-spacing: 0.02rem;
`;

const Build = styled.span`
  color: #ff7966;
  font-size: 2rem;
  font-family: FK Grotesk;
  font-weight: 700;
  line-height: 2.5rem;
  letter-spacing: 0.02rem;
`;

const Accordion = styled("Accordion.Root")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.875rem;
  align-self: stretch;
`;

const Item = styled("Accordion.Item")`
  transition: all 0.3s ease-in-out;

  &[data-state="open"] {
    display: flex;
    padding: 0.75rem 1.5rem 1rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1875rem;
    align-self: stretch;
    border-radius: 12px;
    background: var(--ui-elements-white, #fff);
    box-shadow:
      -8px 40px 59px -28px rgba(16, 24, 40, 0.14),
      -2px 2px 14px -1px rgba(0, 0, 0, 0.13);
  }

  &[data-state="closed"] {
    display: flex;
    padding: 0.75rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1875rem;
    align-self: stretch;
  }
`;

const Header = styled("Accordion.Header")``;

const Trigger = styled("Accordion.Trigger")`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.9375rem;
  align-self: stretch;
  transition: all 0.3s ease-in-out;
  background: transparent;
  border: none;
  color: var(--ui-elements-black, #000);

  &:hover {
    cursor: pointer;
    color: #006adc;
  }

  & > h3 {
    font-size: 1.1875rem;
    font-family: FK Grotesk;
    font-weight: 700;
    letter-spacing: 0.01188rem;
  }
`;

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix - accordion - content - height);
  }
  to {
    height: 0;
  }
`;

const Content = styled("Accordion.Content")`
  display: flex;
  padding: 0rem 0rem 0rem 3.125rem;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  color: var(--black, #000);
  font-size: 0.875rem;
  font-family: "Mona Sans";
  line-height: 140%;
  letter-spacing: 0.00875rem;

  &[data-state="closed"] {
    display: none;
    animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state="open"] {
    animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }
`;

const soon = (
  <svg
    width="46"
    height="17"
    viewBox="0 0 46 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="46" height="17" rx="6" fill="#62EBE4" />
    <path
      d="M14.1535 6.45455C14.1023 6.02273 13.8949 5.6875 13.5313 5.44886C13.1677 5.21023 12.7216 5.09091 12.1932 5.09091C11.8069 5.09091 11.4688 5.15341 11.179 5.27841C10.8921 5.40341 10.6677 5.57528 10.5057 5.79403C10.3466 6.01278 10.2671 6.26136 10.2671 6.53977C10.2671 6.77273 10.3225 6.97301 10.4333 7.14062C10.5469 7.3054 10.6918 7.44318 10.8679 7.55398C11.0441 7.66193 11.2287 7.75142 11.4219 7.82244C11.6151 7.89062 11.7927 7.94602 11.9546 7.98864L12.841 8.22727C13.0682 8.28693 13.3211 8.36932 13.5995 8.47443C13.8807 8.57955 14.1492 8.72301 14.4049 8.90483C14.6634 9.08381 14.8765 9.31392 15.0441 9.59517C15.2117 9.87642 15.2955 10.2216 15.2955 10.6307C15.2955 11.1023 15.1719 11.5284 14.9248 11.9091C14.6804 12.2898 14.3225 12.5923 13.8509 12.8168C13.3821 13.0412 12.8125 13.1534 12.1421 13.1534C11.5171 13.1534 10.9759 13.0526 10.5185 12.8509C10.064 12.6491 9.70601 12.3679 9.44464 12.0071C9.18612 11.6463 9.03982 11.2273 9.00572 10.75H10.0966C10.125 11.0795 10.2358 11.3523 10.429 11.5682C10.625 11.7812 10.8722 11.9403 11.1705 12.0455C11.4716 12.1477 11.7955 12.1989 12.1421 12.1989C12.5455 12.1989 12.9077 12.1335 13.2287 12.0028C13.5498 11.8693 13.804 11.6847 13.9915 11.4489C14.179 11.2102 14.2728 10.9318 14.2728 10.6136C14.2728 10.3239 14.1918 10.0881 14.0299 9.90625C13.8679 9.72443 13.6549 9.5767 13.3907 9.46307C13.1265 9.34943 12.841 9.25 12.5341 9.16477L11.4603 8.85795C10.7785 8.66193 10.2387 8.3821 9.84095 8.01847C9.44322 7.65483 9.24436 7.17898 9.24436 6.59091C9.24436 6.10227 9.37646 5.67614 9.64067 5.3125C9.90771 4.94602 10.2657 4.66193 10.7145 4.46023C11.1662 4.25568 11.6705 4.15341 12.2273 4.15341C12.7898 4.15341 13.2898 4.25426 13.7273 4.45597C14.1648 4.65483 14.5114 4.92756 14.7671 5.27415C15.0256 5.62074 15.162 6.0142 15.1762 6.45455H14.1535ZM19.6758 13.1364C19.0849 13.1364 18.5664 12.9957 18.1204 12.7145C17.6772 12.4332 17.3306 12.0398 17.0806 11.5341C16.8335 11.0284 16.7099 10.4375 16.7099 9.76136C16.7099 9.07955 16.8335 8.48437 17.0806 7.97585C17.3306 7.46733 17.6772 7.07244 18.1204 6.79119C18.5664 6.50994 19.0849 6.36932 19.6758 6.36932C20.2667 6.36932 20.7837 6.50994 21.2269 6.79119C21.673 7.07244 22.0195 7.46733 22.2667 7.97585C22.5167 8.48437 22.6417 9.07955 22.6417 9.76136C22.6417 10.4375 22.5167 11.0284 22.2667 11.5341C22.0195 12.0398 21.673 12.4332 21.2269 12.7145C20.7837 12.9957 20.2667 13.1364 19.6758 13.1364ZM19.6758 12.233C20.1247 12.233 20.494 12.1179 20.7837 11.8878C21.0735 11.6577 21.288 11.3551 21.4272 10.9801C21.5664 10.6051 21.636 10.1989 21.636 9.76136C21.636 9.32386 21.5664 8.91619 21.4272 8.53835C21.288 8.16051 21.0735 7.85511 20.7837 7.62216C20.494 7.3892 20.1247 7.27273 19.6758 7.27273C19.2269 7.27273 18.8576 7.3892 18.5678 7.62216C18.2781 7.85511 18.0636 8.16051 17.9244 8.53835C17.7852 8.91619 17.7156 9.32386 17.7156 9.76136C17.7156 10.1989 17.7852 10.6051 17.9244 10.9801C18.0636 11.3551 18.2781 11.6577 18.5678 11.8878C18.8576 12.1179 19.2269 12.233 19.6758 12.233ZM26.956 13.1364C26.365 13.1364 25.8466 12.9957 25.4006 12.7145C24.9574 12.4332 24.6108 12.0398 24.3608 11.5341C24.1136 11.0284 23.99 10.4375 23.99 9.76136C23.99 9.07955 24.1136 8.48437 24.3608 7.97585C24.6108 7.46733 24.9574 7.07244 25.4006 6.79119C25.8466 6.50994 26.365 6.36932 26.956 6.36932C27.5469 6.36932 28.0639 6.50994 28.5071 6.79119C28.9531 7.07244 29.2997 7.46733 29.5469 7.97585C29.7969 8.48437 29.9219 9.07955 29.9219 9.76136C29.9219 10.4375 29.7969 11.0284 29.5469 11.5341C29.2997 12.0398 28.9531 12.4332 28.5071 12.7145C28.0639 12.9957 27.5469 13.1364 26.956 13.1364ZM26.956 12.233C27.4048 12.233 27.7741 12.1179 28.0639 11.8878C28.3537 11.6577 28.5682 11.3551 28.7074 10.9801C28.8466 10.6051 28.9162 10.1989 28.9162 9.76136C28.9162 9.32386 28.8466 8.91619 28.7074 8.53835C28.5682 8.16051 28.3537 7.85511 28.0639 7.62216C27.7741 7.3892 27.4048 7.27273 26.956 7.27273C26.5071 7.27273 26.1378 7.3892 25.848 7.62216C25.5582 7.85511 25.3437 8.16051 25.2045 8.53835C25.0653 8.91619 24.9957 9.32386 24.9957 9.76136C24.9957 10.1989 25.0653 10.6051 25.2045 10.9801C25.3437 11.3551 25.5582 11.6577 25.848 11.8878C26.1378 12.1179 26.5071 12.233 26.956 12.233ZM32.5827 9.0625V13H31.577V6.45455H32.5486V7.47727H32.6338C32.7872 7.14489 33.0202 6.87784 33.3327 6.67614C33.6452 6.47159 34.0486 6.36932 34.5429 6.36932C34.9861 6.36932 35.3739 6.46023 35.7063 6.64205C36.0387 6.82102 36.2972 7.09375 36.4818 7.46023C36.6665 7.82386 36.7588 8.28409 36.7588 8.84091V13H35.7532V8.90909C35.7532 8.39489 35.6196 7.99432 35.3526 7.70739C35.0855 7.41761 34.7191 7.27273 34.2532 7.27273C33.9321 7.27273 33.6452 7.34233 33.3924 7.48153C33.1424 7.62074 32.9449 7.82386 32.8 8.09091C32.6551 8.35795 32.5827 8.68182 32.5827 9.0625Z"
      fill="black"
    />
  </svg>
);

const ImgContainer = styled.div`
  position: relative;
  height: 455px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > img {
    position: absolute;
    inset: 0 0 0 50%;
    transform: translateX(-50%);
    transition: opacity 300ms cubic-bezier(0.87, 0, 0.13, 1);
    opacity: 0;
    object-fit: cover;
    overflow: hidden;

    &.open {
      opacity: 1;
    }
  }

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

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

State.init({
  value: "hire",
});

return (
  <Container>
    <div>
      <Title>
        <Join>Join Horizon</Join>
        {arrow}
        <Build>Build</Build>
      </Title>
      <Accordion
        value={state.value}
        onValueChange={(value) => State.update({ value })}
      >
        <Item value="hire">
          <Header>
            <Trigger>
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.625 14.7083L15.5 18.5833L28.4167 5.66667M20.6667 4.375H10.075C7.9048 4.375 6.81969 4.375 5.99079 4.79735C5.26166 5.16886 4.66886 5.76166 4.29735 6.49079C3.875 7.31969 3.875 8.4048 3.875 10.575V21.425C3.875 23.5952 3.875 24.6803 4.29735 25.5092C4.66886 26.2383 5.26166 26.8311 5.99079 27.2026C6.81969 27.625 7.9048 27.625 10.075 27.625H20.925C23.0952 27.625 24.1803 27.625 25.0092 27.2026C25.7383 26.8311 26.3311 26.2383 26.7026 25.5092C27.125 24.6803 27.125 23.5952 27.125 21.425V16"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Hire ecosystem experts for your needs</h3>
            </Trigger>
          </Header>
          <Content>
            Easily source reputable contributors for any and every business need
            you have, including back office finance management, recruitment,
            development, legal, and marketing.
          </Content>
        </Item>

        <Item value="validate">
          <Header>
            <Trigger>
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2708 28.9173H18.7291M12.9166 13.4173H18.0833M15.5 13.4173L15.5 21.1673M19.375 20.2972C22.4297 18.8461 24.5416 15.7325 24.5416 12.1257C24.5416 7.13208 20.4936 3.08398 15.5 3.08398C10.5064 3.08398 6.45831 7.13208 6.45831 12.1257C6.45831 15.7325 8.57026 18.8461 11.625 20.2972V21.1673C11.625 22.371 11.625 22.9728 11.8216 23.4476C12.0838 24.0806 12.5867 24.5835 13.2197 24.8457C13.6945 25.0423 14.2963 25.0423 15.5 25.0423C16.7037 25.0423 17.3055 25.0423 17.7802 24.8457C18.4132 24.5835 18.9161 24.0806 19.1783 23.4476C19.375 22.9728 19.375 22.371 19.375 21.1673V20.2972Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Validate your idea safely</h3>
              {soon}
            </Trigger>
          </Header>
          <Content>
            Users are standing by to test your application and provide valuable
            feedback before your launch.
          </Content>
        </Item>

        <Item value="mentor">
          <Header>
            <Trigger>
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 28.9173C22.6337 28.9173 28.4166 23.1343 28.4166 16.0007C28.4166 8.86697 22.6337 3.08398 15.5 3.08398C8.3663 3.08398 2.58331 8.86697 2.58331 16.0007C2.58331 23.1343 8.3663 28.9173 15.5 28.9173Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.016 11.1775C19.6471 10.9672 19.9626 10.862 20.1724 10.9368C20.355 11.0019 20.4987 11.1456 20.5638 11.3282C20.6386 11.538 20.5335 11.8536 20.3231 12.4846L18.4017 18.2488C18.3418 18.4286 18.3118 18.5184 18.2608 18.593C18.2156 18.6591 18.1585 18.7162 18.0924 18.7615C18.0177 18.8125 17.9279 18.8425 17.7482 18.9024L11.9839 20.8238C11.3529 21.0341 11.0374 21.1393 10.8275 21.0645C10.645 20.9994 10.5013 20.8557 10.4362 20.6731C10.3613 20.4633 10.4665 20.1477 10.6769 19.5167L12.5983 13.7525C12.6582 13.5727 12.6881 13.4829 12.7392 13.4083C12.7844 13.3422 12.8415 13.2851 12.9076 13.2398C12.9822 13.1888 13.0721 13.1588 13.2518 13.0989L19.016 11.1775Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Find a mentor or become one</h3>
              {soon}
            </Trigger>
          </Header>
          <Content>
            Connect with industry veterans for advice on your GTM plan,
            leadership skills, pitch deck, and more. Or apply to become a
            mentor, and help Web3 founders put their best foot forward as they
            prepare for launch.
          </Content>
        </Item>
      </Accordion>
    </div>
    <ImgContainer>
      <img
        src={mapImage(build.hire.desktop)}
        alt="hire"
        className={state.value === "hire" ? "open" : ""}
      />
      <img
        src={mapImage(build.hire.mobile)}
        alt="hire"
        className={state.value === "hire" ? "open" : ""}
      />
      <img
        src={mapImage(build.validate.desktop)}
        alt="validate"
        className={state.value === "validate" ? "open" : ""}
      />
      <img
        src={mapImage(build.validate.mobile)}
        alt="validate"
        className={state.value === "validate" ? "open" : ""}
      />
      <img
        src={mapImage(build.mentor.desktop)}
        alt="mentor"
        className={state.value === "mentor" ? "open" : ""}
      />
      <img
        src={mapImage(build.mentor.mobile)}
        alt="mentor"
        className={state.value === "mentor" ? "open" : ""}
      />
    </ImgContainer>
  </Container>
);
