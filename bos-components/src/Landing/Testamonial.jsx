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
        NEAR Horizon has strengthened awareness for the droplinked protocol
        while accelerating partnerships with both builders and backers. The team
        and I are excited to support the next phase of the ecosystems growth
        with the community.
      </p>
      <span>
        Ali S.
        <small>Founder, Droplinked</small>
      </span>
    </Column>
    <ImageContainer>
      <img
        src={mapImage(
          "bafkreiawuljv6qq66awmh5tyoehc34wsl74cktt4tr6jummuukzma7mnza",
        )}
        alt="Ali S."
      />
    </ImageContainer>
  </Container>
);
