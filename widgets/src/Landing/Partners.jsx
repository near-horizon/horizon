const images = {
  desktop: "bafkreigrs36in3bq4mf6mv2cezjqdq5nobevgqitsj3tsexnf22phv2tmu",
  mobile: "bafkreiet6lvffvydiltk3zxez235fryrsk32yhrlpsf3rpai22dg57nieq",
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.25rem;
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
    <path d="M37 6L27 0.226497V11.7735L37 6ZM0 7H28V5H0V7Z" fill="#32D583" />
  </svg>
);

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;

  & > span {
    display: flex;
    padding: 0.4375rem 1.125rem;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 6px;
    background: var(--ui-elements-dark, #11181c);
    color: var(--ui-elements-white, #fff);
    font-size: 1rem;
    font-family: Mona-Sans;
    font-weight: 600;
    letter-spacing: 0.01rem;
  }
  & > h2 {
    color: #000;
    font-size: 2rem;
    font-family: FK Grotesk;
    font-weight: 700;
    line-height: 2.5rem;
    letter-spacing: 0.02rem;
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
  color: #32d583;
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
    box-shadow: -8px 40px 59px -28px rgba(16, 24, 40, 0.14),
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
  font-family: MonaSans;
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
  display: flex;
  align-items: center;
  justify-content: center;

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
  align-self: flex-start;

  &:hover,
  &:focus,
  &:active {
    background: var(--primary-primary-hover, #00ec97);
    color: var(--text-text-dark, #11181c);
    text-decoration: none;
  }
`;

const registerButton = ({ text, href }) => (
  <RegisterButton href={href ?? `${ownerId}/widget/Index?tab=createproject`}>
    {text}
  </RegisterButton>
);

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <div>
      <Title>
        <span>Horizon for Contributors</span>
        <h2>Grow your reach and reputation with Horizon</h2>
      </Title>
      <Accordion defaultValue="access">
        <Item value="access">
          <Header>
            <Trigger>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3679 29.047L17.4993 14.3751L19.6851 29.4053C19.7349 29.7464 20.0276 30 20.3723 30H22.7234C23.2148 30 23.5502 29.5036 23.3679 29.0477V29.047ZM15.3128 29.4046L17.4986 14.3744L11.63 29.0463C11.4476 29.5022 11.7831 29.9986 12.2745 29.9986H14.6255C14.9702 29.9986 15.2629 29.7457 15.3128 29.4039V29.4046ZM27.3598 5H7.63874C6.18156 5 5 6.18159 5 7.63881V27.3605C5 27.624 5.03917 27.879 5.11182 28.119C5.27349 28.6539 5.97145 28.7856 6.32044 28.3498L17.5 14.3751L28.6796 28.3498C29.0285 28.7856 29.7265 28.6539 29.8882 28.119C29.9608 27.879 30 27.6247 30 27.3605V7.63881C30 6.18159 28.8184 5 27.3613 5H27.3598Z"
                  fill="currentColor"
                />
              </svg>
              <h3>Access to the Horizon ecosystem</h3>
            </Trigger>
          </Header>
          <Content>
            Engage directly with 150+ startups at various stages, from
            early-stage to growth-stage businesses.
          </Content>
        </Item>

        <Item value="scaled">
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
                  d="M18.0833 13.4167L27.125 4.375M27.125 4.375H19.375M27.125 4.375V12.125M12.9167 18.5833L3.875 27.625M3.875 27.625H11.625M3.875 27.625L3.875 19.875"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Scaled reach and business development</h3>
            </Trigger>
          </Header>
          <Content>
            Grow your client base and increase your brand visibility within the
            Web3 start-up community - kickstarted by our innovative credit
            system.
          </Content>
        </Item>

        <Item value="advantage">
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
                  d="M20.6667 10.834V6.95898L24.5417 3.08398L25.8333 5.66732L28.4167 6.95898L24.5417 10.834H20.6667ZM20.6667 10.834L15.5 16.0006M28.4167 16.0007C28.4167 23.1343 22.6337 28.9173 15.5 28.9173C8.36636 28.9173 2.58337 23.1343 2.58337 16.0007C2.58337 8.86697 8.36636 3.08398 15.5 3.08398M21.9584 16.0007C21.9584 19.5675 19.0669 22.459 15.5 22.459C11.9332 22.459 9.04171 19.5675 9.04171 16.0007C9.04171 12.4338 11.9332 9.54232 15.5 9.54232"
                  stroke="black"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Strategic and long-term advantage</h3>
            </Trigger>
          </Header>
          <Content>
            Build long-term relationships with start-ups that can convert into
            high-value clients as they grow and scale.
          </Content>
        </Item>
      </Accordion>
      {registerButton({ text: "Create profile" })}
    </div>
    <ImgContainer>
      <img src={mapImage(images.desktop)} alt="contributors" />
      <img src={mapImage(images.mobile)} alt="contributors" />
    </ImgContainer>
  </Container>
);
