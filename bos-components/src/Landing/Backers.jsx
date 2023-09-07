const ownerId = "nearhorizon.near";

const images = {
  desktop: "bafkreie2i3o373b6srfte3adfbgnjo7qbgi4dustpt5y7dr6irll7my4aa",
  mobile: "bafkreidp4dfhg2x74xuojei4qrxmfbtkrzkbdoqgsaljpc2qrn4vi7i65a",
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  align-items: flex-start;
  gap: 1.375rem;
  width: 100%;
  margin: 1rem 0;

  & > div {
    width: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2.25rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    & > div {
      width: 100%;
      align-items: center;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    align-items: center;
  }

  & > span {
    display: flex;
    padding: 0.4375rem 1.125rem;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 6px;
    background: var(--ui-elements-dark, #11181c);
    color: var(--ui-elements-white, #fff);
    font-size: 1rem;
    font-family: "Mona Sans";
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

    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
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

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <div>
      <Title>
        <span>Horizon for Backers</span>
        <h2>Discover the next Web3 success story with Horizon</h2>
      </Title>
      <Accordion defaultValue="access">
        <Item value="access">
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
                  d="M7.81113 14.8995C6.9891 14.8995 6.17513 14.7333 5.41568 14.4104C4.65623 14.0876 3.96617 13.6144 3.38491 13.0178C2.80365 12.4213 2.34257 11.713 2.028 10.9336C1.71342 10.1542 1.55151 9.31878 1.55151 8.47512C1.55151 7.63147 1.71342 6.79607 2.028 6.01663C2.34257 5.2372 2.80365 4.52898 3.38491 3.93243C3.96617 3.33587 4.65623 2.86266 5.41568 2.53981C6.17513 2.21695 6.9891 2.05078 7.81113 2.05078C9.47128 2.05078 11.0634 2.72763 12.2373 3.93243C13.4113 5.13723 14.0707 6.77128 14.0707 8.47512C14.0707 10.179 13.4113 11.813 12.2373 13.0178C11.0634 14.2226 9.47128 14.8995 7.81113 14.8995ZM8.50664 29.1758C6.84649 29.1758 5.25433 28.4989 4.08043 27.2941C2.90652 26.0893 2.24703 24.4553 2.24703 22.7514C2.24703 21.0476 2.90652 19.4135 4.08043 18.2087C5.25433 17.0039 6.84649 16.3271 8.50664 16.3271C10.1668 16.3271 11.759 17.0039 12.9329 18.2087C14.1068 19.4135 14.7663 21.0476 14.7663 22.7514C14.7663 24.4553 14.1068 26.0893 12.9329 27.2941C11.759 28.4989 10.1668 29.1758 8.50664 29.1758ZM22.4169 14.8995C21.5949 14.8995 20.7809 14.7333 20.0214 14.4104C19.262 14.0876 18.5719 13.6144 17.9907 13.0178C17.4094 12.4213 16.9483 11.713 16.6338 10.9336C16.3192 10.1542 16.1573 9.31878 16.1573 8.47512C16.1573 7.63147 16.3192 6.79607 16.6338 6.01663C16.9483 5.2372 17.4094 4.52898 17.9907 3.93243C18.5719 3.33587 19.262 2.86266 20.0214 2.53981C20.7809 2.21695 21.5949 2.05078 22.4169 2.05078C24.0771 2.05078 25.6692 2.72763 26.8431 3.93243C28.017 5.13723 28.6765 6.77128 28.6765 8.47512C28.6765 10.179 28.017 11.813 26.8431 13.0178C25.6692 14.2226 24.0771 14.8995 22.4169 14.8995ZM22.4169 29.1758C20.7567 29.1758 19.1646 28.4989 17.9907 27.2941C16.8168 26.0893 16.1573 24.4553 16.1573 22.7514C16.1573 21.0476 16.8168 19.4135 17.9907 18.2087C19.1646 17.0039 20.7567 16.3271 22.4169 16.3271C24.0771 16.3271 25.6692 17.0039 26.8431 18.2087C28.017 19.4135 28.6765 21.0476 28.6765 22.7514C28.6765 24.4553 28.017 26.0893 26.8431 27.2941C25.6692 28.4989 24.0771 29.1758 22.4169 29.1758ZM7.81113 12.0442C8.73344 12.0442 9.61797 11.6682 10.2701 10.9988C10.9223 10.3295 11.2887 9.4217 11.2887 8.47512C11.2887 7.52854 10.9223 6.62074 10.2701 5.9514C9.61797 5.28207 8.73344 4.90604 7.81113 4.90604C6.88882 4.90604 6.00429 5.28207 5.35212 5.9514C4.69995 6.62074 4.33356 7.52854 4.33356 8.47512C4.33356 9.4217 4.69995 10.3295 5.35212 10.9988C6.00429 11.6682 6.88882 12.0442 7.81113 12.0442ZM8.50664 26.3205C9.42895 26.3205 10.3135 25.9445 10.9657 25.2752C11.6178 24.6058 11.9842 23.698 11.9842 22.7514C11.9842 21.8049 11.6178 20.8971 10.9657 20.2277C10.3135 19.5584 9.42895 19.1824 8.50664 19.1824C7.58433 19.1824 6.6998 19.5584 6.04763 20.2277C5.39546 20.8971 5.02908 21.8049 5.02908 22.7514C5.02908 23.698 5.39546 24.6058 6.04763 25.2752C6.6998 25.9445 7.58433 26.3205 8.50664 26.3205ZM22.4169 12.0442C23.3392 12.0442 24.2237 11.6682 24.8759 10.9988C25.5281 10.3295 25.8945 9.4217 25.8945 8.47512C25.8945 7.52854 25.5281 6.62074 24.8759 5.9514C24.2237 5.28207 23.3392 4.90604 22.4169 4.90604C21.4946 4.90604 20.6101 5.28207 19.9579 5.9514C19.3057 6.62074 18.9393 7.52854 18.9393 8.47512C18.9393 9.4217 19.3057 10.3295 19.9579 10.9988C20.6101 11.6682 21.4946 12.0442 22.4169 12.0442ZM22.4169 26.3205C23.3392 26.3205 24.2237 25.9445 24.8759 25.2752C25.5281 24.6058 25.8945 23.698 25.8945 22.7514C25.8945 21.8049 25.5281 20.8971 24.8759 20.2277C24.2237 19.5584 23.3392 19.1824 22.4169 19.1824C21.4946 19.1824 20.6101 19.5584 19.9579 20.2277C19.3057 20.8971 18.9393 21.8049 18.9393 22.7514C18.9393 23.698 19.3057 24.6058 19.9579 25.2752C20.6101 25.9445 21.4946 26.3205 22.4169 26.3205Z"
                  fill="currentColor"
                />
              </svg>
              <h3>Access to the ecosystem projects </h3>
            </Trigger>
          </Header>
          <Content>
            Engage directly with 150+ startups at various stages, from
            early-stage to growth-stage businesses.
          </Content>
        </Item>

        <Item value="risk">
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
                  d="M11.625 15.3549L14.2084 17.9382L20.0209 12.1257M25.8334 16.0007C25.8334 22.3408 18.9178 26.952 16.4016 28.4199C16.1156 28.5868 15.9726 28.6702 15.7709 28.7134C15.6143 28.747 15.3858 28.747 15.2292 28.7134C15.0274 28.6702 14.8844 28.5868 14.5985 28.4199C12.0822 26.952 5.16669 22.3408 5.16669 16.0007V9.82344C5.16669 8.79074 5.16669 8.27439 5.33559 7.83053C5.48479 7.43843 5.72725 7.08857 6.042 6.81118C6.39829 6.49719 6.88176 6.31589 7.84871 5.95328L14.7744 3.35616C15.0429 3.25546 15.1772 3.20511 15.3153 3.18515C15.4378 3.16745 15.5622 3.16745 15.6847 3.18515C15.8229 3.20511 15.9571 3.25546 16.2257 3.35616L23.1513 5.95328C24.1183 6.31589 24.6018 6.49719 24.958 6.81118C25.2728 7.08857 25.5153 7.43843 25.6645 7.83053C25.8334 8.27439 25.8334 8.79074 25.8334 9.82344V16.0007Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Lower your risks</h3>
            </Trigger>
          </Header>
          <Content>
            Enhance your community engagement through our perks, tools,
            resources and Horizon Credits available to founders.
          </Content>
        </Item>

        <Item value="time">
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
                  d="M29.3208 17.9375L26.7382 15.3542L24.1541 17.9375M27.125 16C27.125 22.4203 21.9203 27.625 15.5 27.625C9.07969 27.625 3.875 22.4203 3.875 16C3.875 9.57969 9.07969 4.375 15.5 4.375C19.765 4.375 23.4935 6.67176 25.5162 10.0959M15.5 9.54167V16L19.375 18.5833"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Save your time</h3>
            </Trigger>
          </Header>
          <Content>
            Activate learners through our next gen talent database, with a
            pipeline of internship and job opportunities.
          </Content>
        </Item>
      </Accordion>
      <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
    </div>
    <ImgContainer>
      <img src={mapImage(images.desktop)} alt="contributors" />
      <img src={mapImage(images.mobile)} alt="contributors" />
    </ImgContainer>
  </Container>
);
