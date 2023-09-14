const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const image = "bafkreiej5x7dhlryiqpunbvumpqs2txmmwjb2mwtjeza6sm4svx3c3xq4m";

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

  & > div {
    width: 100%;

    & > img {
      width: 100%;
      object-fit: contain;
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
      <img src={mapImage(image)} alt="Journey Image" />
    </div>
  </Container>
);
