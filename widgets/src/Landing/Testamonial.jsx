const Container = styled.div`
  display: flex;
  padding: 3.6875rem 4.1875rem;
  align-items: center;
  gap: 3.625rem;
  border-radius: 28px;
  background: var(--ui-elements-dark, #11181c);

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.8125rem;
  width: 75%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  & > p {
    color: #fff;
    font-size: 1.5rem;
    font-family: FK Grotesk;
    font-weight: 700;
    line-height: 2.25rem;
    letter-spacing: 0.015rem;
  }

  & > span {
    color: #fff;
    font-size: 1rem;
    font-family: Inter;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0.01rem;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > small {
      font-size: 0.9rem;
      font-weight: 400;
      text-transform: none;
    }
  }
`;

const ImageContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <Column>
      <p>
        Joining Horizon's accelerator was a game-changer for our NFT startup.
        The mentors provided invaluable guidance, the community offered
        meaningful collaborations, and access to funding opportunities propelled
        our growth. Highly recommended for Web3 founders looking to thrive
      </p>
      <span>
        John Doe
        <small>Founder & CEO, CryptoTech Solutions</small>
      </span>
    </Column>
    <ImageContainer>
      <img
        src={mapImage(
          "bafkreib32ap4w2oqpw3qcf2eviyelrqkxxyfzfa4ylunfyvadfkrgwdajm"
        )}
        alt="John Doe"
      />
    </ImageContainer>
  </Container>
);
