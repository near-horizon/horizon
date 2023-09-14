const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const images = {
  laura: {
    url: "bafkreid2l6w6e2kjalojd2ubtdur3pr2o63nnrm6vy4vl4m3pjufannxgq",
    signature: "bafkreie7o2qqjhispqowfn3bfci3zfcojkltwhptjmjjice5tafyxbz2au",
  },
  jarrod: {
    url: "bafkreih3n2cagiefsg2d3coiekucdmpkrff7jzprsddwacycr3kt2mmh4m",
    signature: "bafkreighkjmwpjp2yh43a6xfbdzo5zl547lt56cqmzrppv4rhguxirpsra",
  },
};

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

  @media screen and (max-width: 768px) {
    & > div {
      flex-direction: column;
      gap: 1.5rem !important;
    }
  }

  & > div {
    display: flex;
    align-items: flex-start;
    gap: 4.5625rem;
    width: 100%;

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      & > p {
        padding: 0;
        margin: 0;
        color: var(--background-dark, #3a3f42);
        font-family: "Mona Sans";
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.75rem; /* 155.556% */
      }
    }
  }
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.375rem;
  width: 100%;

  & > img:first-child {
    display: flex;
    width: 5.3125rem;
    height: 5.3125rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 6.25rem;
    object-fit: cover;
  }

  & > div {
    display: flex;
    width: 11rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;

    & > span {
      color: var(--gray-900, #101828);
      text-align: center;
      font-family: FK Grotesk;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.75rem; /* 155.556% */
    }

    & > small {
      color: var(--background-dark, #3a3f42);
      text-align: center;
      font-family: "Mona Sans";
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.75rem; /* 175% */
    }
  }

  & > img:last-child {
    max-width: 40%;
  }

  @media screen and (max-width: 768px) {
    & > img:last-child {
      display: none;
    }
  }
`;

return (
  <Container>
    <h2>What is HZN?</h2>
    <div>
      <div>
        <p>
          Horizon Founders are building the future of the internet - the Open
          Web - in which people have control of their data, assets, identities
          and power of governance. We harness the power of blockchain to solve
          urgent problems in delightful ways and showcase the true value of Web3
          through our products. We are a community of visionaries, and allies
          who believe we can make the world a better place.
        </p>
        <p>
          At NEAR Horizon, we know firsthand the hurdles of building a web3
          startup. The ever-shifting landscape, the dizzying tech advancements,
          the challenge of securing funds, and the pressure to scale within a
          market that's just getting started. We've been there.
        </p>
        <p>
          HZN1 is real, grounded support tailored specifically for you - all
          equity-free. We're all in on helping you grow without taking a slice
          of your hard work.
        </p>
      </div>
      <div>
        <p>
          We're not just a program. We're a community of creators, pioneers, and
          friends who believe in making the world more open, one project at a
          time. Join us?
        </p>
        <Avatar>
          <img src={mapImage(images.laura.url)} alt="Laura Cunningham Image" />
          <div>
            <span>Laura Cunningham</span>
            <small>General Manager</small>
          </div>
          <img
            src={mapImage(images.laura.signature)}
            alt="Laura Cunningham Signature"
          />
        </Avatar>
        <Avatar>
          <img src={mapImage(images.jarrod.url)} alt="Jarrod Barnes Image" />
          <div>
            <span>Jarrod Barnes</span>
            <small>Head of Ecosystem</small>
          </div>
          <img
            src={mapImage(images.jarrod.signature)}
            alt="Jarrod Barnes Signature"
          />
        </Avatar>
      </div>
    </div>
  </Container>
);
