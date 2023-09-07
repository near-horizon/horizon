const ownerId = "nearhorizon.near";

const images = {
  desktop: "bafkreigrs36in3bq4mf6mv2cezjqdq5nobevgqitsj3tsexnf22phv2tmu",
  mobile: "bafkreihdikmkpfklanm5yafjha4bhrxdi3b4is6hjnj7klxkpwifxix3ym",
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
            Discover and connect directly with 200+ promising startups and
            founders ranging from early-stage to growth-stage.
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
            Match with vetted and verified projects you want to support. Easily
            find white papers, team bios, stats, and more all on the project's
            profile page.
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
            Easily filter projects based on your specific criteria. Attend
            Horizon Networking and Pitch events to discover multiple, promising
            projects at the same time.
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
