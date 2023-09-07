const ownerId = "nearhorizon.near";

const images = {
  desktop: "bafkreibfgez7zpynpgo5fvjkxgstun6of5ob5noxxhugraxtda3kssosla",
  mobile: "bafkreiexkerx7t3k6oc5262yc64gd5qtatxhlmuakwt3unhfkpyyhe7k3i",
};

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
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
        <span>Horizon for Partners</span>
        <h2>Broaden your reach with Horizon</h2>
      </Title>
      <Accordion defaultValue="acceleration">
        <Item value="acceleration">
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
                  d="M6.45837 16.0007C6.45837 11.0071 10.5065 6.95898 15.5 6.95898M21.3124 10.1882L15.4999 16.0007M28.4167 16.0007C28.4167 23.1343 22.6337 28.9173 15.5 28.9173C8.36636 28.9173 2.58337 23.1343 2.58337 16.0007C2.58337 8.86697 8.36636 3.08398 15.5 3.08398C22.6337 3.08398 28.4167 8.86697 28.4167 16.0007ZM16.7917 16.0007C16.7917 16.714 16.2134 17.2923 15.5 17.2923C14.7867 17.2923 14.2084 16.714 14.2084 16.0007C14.2084 15.2873 14.7867 14.709 15.5 14.709C16.2134 14.709 16.7917 15.2873 16.7917 16.0007Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Accelerator programs</h3>
            </Trigger>
          </Header>
          <Content>
            Streamline sourcing potential investments through our database of
            diverse, pre-screened pool of innovative Web3 founders.
          </Content>
        </Item>

        <Item value="ecosystem">
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
                  d="M27.2297 5C26.2668 5 25.3727 5.48004 24.8683 6.26919L19.4336 14.0275C19.2566 14.2832 19.3285 14.6279 19.5944 14.7982C19.8099 14.9363 20.0951 14.9192 20.2914 14.7568L25.6409 10.2954C25.7298 10.2185 25.8668 10.2263 25.9468 10.3118C25.9831 10.351 26.0023 10.4016 26.0023 10.4535V24.4218C26.0023 24.5372 25.9053 24.6298 25.7853 24.6298C25.7209 24.6298 25.6601 24.6027 25.6194 24.555L9.44873 5.94299C8.92282 5.34472 8.14951 5 7.33472 5H6.76955C5.23996 5 4 6.19227 4 7.66303V27.3363C4 28.807 5.23996 29.9993 6.76955 29.9993C7.73249 29.9993 8.62653 29.5192 9.13096 28.7301L14.5656 20.9718C14.7427 20.7161 14.6708 20.3714 14.4049 20.2011C14.1893 20.063 13.9042 20.0801 13.7079 20.2424L8.35839 24.7039C8.26951 24.7808 8.13247 24.7729 8.05248 24.6875C8.01618 24.6483 7.99692 24.5977 7.99766 24.5457V10.5746C7.99766 10.4592 8.0947 10.3667 8.21469 10.3667C8.2784 10.3667 8.33988 10.3937 8.38062 10.4414L24.549 29.057C25.0757 29.6546 25.849 29.9993 26.6631 30H27.2282C28.7578 30.0007 29.9985 28.8092 30 27.3384V7.66303C29.9993 6.19227 28.7593 5 27.2297 5Z"
                  fill="currentColor"
                />
              </svg>
              <h3>Ecosystem partners</h3>
            </Trigger>
          </Header>
          <Content>
            Engage with Web3 communities, DAOs, and incubators to provide
            workshops and resources to current and aspiring founders.
          </Content>
        </Item>

        <Item value="education">
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
                  d="M21.9584 19.2298V15.3476C21.9584 15.1157 21.9584 14.9998 21.9231 14.8975C21.8919 14.807 21.8409 14.7246 21.7739 14.6562C21.6982 14.5788 21.5945 14.527 21.3872 14.4233L15.5 11.4798M5.16671 12.7714V21.5633C5.16671 22.0437 5.16671 22.2839 5.24165 22.4942C5.3079 22.6801 5.41587 22.8484 5.55728 22.9861C5.71724 23.1418 5.9356 23.2419 6.37229 23.442L14.639 27.2309C14.9557 27.3761 15.1141 27.4487 15.2791 27.4773C15.4253 27.5027 15.5748 27.5027 15.721 27.4773C15.886 27.4487 16.0444 27.3761 16.3611 27.2309L24.6278 23.442C25.0645 23.2419 25.2828 23.1418 25.4428 22.9861C25.5842 22.8484 25.6922 22.6801 25.7584 22.4942C25.8334 22.2839 25.8334 22.0437 25.8334 21.5633V12.7714M2.58337 11.4798L15.0379 5.25249C15.2074 5.16776 15.2921 5.1254 15.3809 5.10873C15.4597 5.09396 15.5404 5.09396 15.6191 5.10873C15.708 5.1254 15.7927 5.16776 15.9622 5.25249L28.4167 11.4798L15.9622 17.707C15.7927 17.7918 15.708 17.8341 15.6191 17.8508C15.5404 17.8656 15.4597 17.8656 15.3809 17.8508C15.2921 17.8341 15.2074 17.7918 15.0379 17.707L2.58337 11.4798Z"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Education partners</h3>
            </Trigger>
          </Header>
          <Content>
            Design hackathons, fellowships, educational content for students,
            early career engineers and current founders.
          </Content>
        </Item>
      </Accordion>
      <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
    </div>
    <ImgContainer>
      <img src={mapImage(images.desktop)} alt="partners" />
      <img src={mapImage(images.mobile)} alt="partners" />
    </ImgContainer>
  </Container>
);
