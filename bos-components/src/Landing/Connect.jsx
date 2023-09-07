const build = {
  connect: {
    desktop: "bafkreidfgplno2h7aczch6i4gqsx74krd4vgfjshuknkhnto2ez2zlsf2q",
    mobile: "bafkreiavbrd2rxzaxucfipc7uemiols4jhdgezshdgxanslssud3xe22jy",
  },
  share: {
    desktop: "bafkreierfioucir5qf43cw56iujghcdvzidezk7z5gny6sw33xhd5ekviy",
    mobile: "bafkreicgiwyplfjka7ldc2k6sg5it3qj75i4dd4xrdbwqlbhuq4eb3zx6i",
  },
  tap: {
    desktop: "bafkreibcp5xmlhlveqs3f4ecestwnsaxobd26adxc2jruvc5v4rah4znbu",
    mobile: "bafkreib2ovzs4vqn3oilpvdns36v4xhwvw4pgrerjc55xd42nvxaiinwqu",
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
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
    <path d="M37 6L27 0.226497V11.7735L37 6ZM0 7H28V5H0V7Z" fill="#9797FF" />
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
  color: #9797ff;
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
  value: "connect",
});

return (
  <Container>
    <div>
      <Title>
        <Join>Join Horizon</Join>
        {arrow}
        <Build>Connect</Build>
      </Title>
      <Accordion
        value={state.value}
        onValueChange={(value) => State.update({ value })}
      >
        <Item value="connect">
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
                  d="M20.6667 4.97919C22.5806 5.93031 23.8959 7.90531 23.8959 10.1875C23.8959 12.4697 22.5806 14.4447 20.6667 15.3958M23.25 22.1566C25.2023 23.04 26.9604 24.4798 28.4167 26.3333M2.58337 26.3333C5.09759 23.1333 8.51106 21.1667 12.2709 21.1667C16.0307 21.1667 19.4442 23.1333 21.9584 26.3333M18.0834 10.1875C18.0834 13.3977 15.481 16 12.2709 16C9.06072 16 6.45837 13.3977 6.45837 10.1875C6.45837 6.97734 9.06072 4.375 12.2709 4.375C15.481 4.375 18.0834 6.97734 18.0834 10.1875Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Connect with fellow founders</h3>
            </Trigger>
          </Header>
          <Content>
            Build long-term relationships with other founders on the app, and
            grow your professional network through regular founder meet and
            greets, product demo nights, workshops, and pitch events
          </Content>
        </Item>

        <Item value="share">
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
                  d="M9.04171 28.9173V14.709M2.58337 17.2923V26.334C2.58337 27.7607 3.73997 28.9173 5.16671 28.9173H22.5089C24.4215 28.9173 26.0481 27.5219 26.3389 25.6315L27.7299 16.5899C28.091 14.2426 26.2749 12.1257 23.9 12.1257H19.375C18.6617 12.1257 18.0834 11.5474 18.0834 10.834V6.26903C18.0834 4.50998 16.6574 3.08398 14.8983 3.08398C14.4788 3.08398 14.0986 3.33107 13.9282 3.71448L9.38263 13.9419C9.17531 14.4084 8.71274 14.709 8.20229 14.709H5.16671C3.73997 14.709 2.58337 15.8656 2.58337 17.2923Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Share your idea and get feedback</h3>
            </Trigger>
          </Header>
          <Content>
            Enhance your community engagement through our perks, tools,
            resources and Horizon Credits available to founders.
          </Content>
        </Item>

        <Item value="tap">
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
                  d="M11.6245 18.5833C11.6245 18.5833 13.3198 20.5208 16.1453 20.5208C18.9708 20.5208 20.6661 18.5833 20.6661 18.5833M19.6974 12.125H19.7103M12.5932 12.125H12.6061M16.1453 26.3333C22.2089 26.3333 27.1245 21.4178 27.1245 15.3542C27.1245 9.29054 22.2089 4.375 16.1453 4.375C10.0817 4.375 5.16614 9.29054 5.16614 15.3542C5.16614 16.5812 5.36744 17.7613 5.73883 18.8631C5.87859 19.2778 5.94846 19.4851 5.96107 19.6443C5.97352 19.8016 5.96411 19.9119 5.92519 20.0648C5.88579 20.2196 5.79879 20.3807 5.6248 20.7027L3.51208 24.6133C3.21072 25.1711 3.06004 25.45 3.09376 25.6652C3.12314 25.8527 3.23348 26.0178 3.39549 26.1166C3.5815 26.2301 3.89682 26.1975 4.52747 26.1323L11.1421 25.4486C11.3424 25.4279 11.4426 25.4175 11.5339 25.421C11.6237 25.4244 11.6871 25.4329 11.7746 25.453C11.8636 25.4736 11.9756 25.5167 12.1995 25.6029C13.424 26.0747 14.7545 26.3333 16.1453 26.3333ZM20.3432 12.125C20.3432 12.4817 20.0541 12.7708 19.6974 12.7708C19.3407 12.7708 19.0516 12.4817 19.0516 12.125C19.0516 11.7683 19.3407 11.4792 19.6974 11.4792C20.0541 11.4792 20.3432 11.7683 20.3432 12.125ZM13.2391 12.125C13.2391 12.4817 12.9499 12.7708 12.5932 12.7708C12.2365 12.7708 11.9474 12.4817 11.9474 12.125C11.9474 11.7683 12.2365 11.4792 12.5932 11.4792C12.9499 11.4792 13.2391 11.7683 13.2391 12.125Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Tap into a supportive community</h3>
            </Trigger>
          </Header>
          <Content>
            Get involved with our mentorship program, product demo nights,
            hackathons and community AMA’s.
          </Content>
        </Item>
      </Accordion>
    </div>
    <ImgContainer>
      <img
        src={mapImage(build.connect.desktop)}
        alt="connect"
        className={state.value === "connect" ? "open" : ""}
      />
      <img
        src={mapImage(build.connect.mobile)}
        alt="connect"
        className={state.value === "connect" ? "open" : ""}
      />
      <img
        src={mapImage(build.share.desktop)}
        alt="share"
        className={state.value === "share" ? "open" : ""}
      />
      <img
        src={mapImage(build.share.mobile)}
        alt="share"
        className={state.value === "share" ? "open" : ""}
      />
      <img
        src={mapImage(build.tap.desktop)}
        alt="tap"
        className={state.value === "tap" ? "open" : ""}
      />
      <img
        src={mapImage(build.tap.mobile)}
        alt="tap"
        className={state.value === "tap" ? "open" : ""}
      />
    </ImgContainer>
  </Container>
);
