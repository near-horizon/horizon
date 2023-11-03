const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const image = "bafkreicediliywii236fdx7nekbcwhk2nxwo6ctd4ritdv3lmf6tv45i3q";

const Container = styled.div`
  display: flex;
  padding: 4rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  align-self: stretch;
`;

const Quote = styled.div`
  display: flex;
  padding: 3.125rem 2.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  border-radius: 1rem;
  background: var(--primary-50, #f9f5ff);
  color: var(--gray-900, #101828);
  text-align: center;
  font-family: FK Grotesk;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 3.0625rem; /* 136.111% */
  letter-spacing: -0.045rem;
`;

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & > img {
    display: flex;
    width: 5.625rem;
    height: 5.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 6.25rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5625rem;
    align-self: stretch;

    & > span {
      color: var(--gray-900, #101828);
      text-align: center;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > small {
      color: var(--gray-600, #475467);
      text-align: center;
      font-family: "Mona Sans";
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 1.3rem */
    }
  }
`;

return (
  <Container>
    <Quote>
      Joining Horizon's accelerator was a game-changer for our NFT startup. The
      mentors provided invaluable guidance, the community offered meaningful
      collaborations, and access to funding opportunities propelled our growth.
      Highly recommended for Web3 founders looking to thrive
    </Quote>
    <Avatar>
      <img src={mapImage(image)} alt="avatar" />
      <div>
        <span>John Doe</span>
        <small>Web Developer, Sisyphus</small>
      </div>
    </Avatar>
  </Container>
);
