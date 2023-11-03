const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const image = "bafkreiej5x7dhlryiqpunbvumpqs2txmmwjb2mwtjeza6sm4svx3c3xq4m";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  flex: 1 0 0;
  width: 100%;
  padding: 5.0625rem 0rem 4.5rem 0rem;
  border-radius: 1rem;
  background: var(--gray-50, #f9fafb);

  & > h2 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.875rem; /* 127.778% */
    letter-spacing: 0.0225rem;
    padding: 0 3rem;
  }

  & > p {
    color: var(--gray-600, #475467);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.3rem */
    padding: 0 3rem;
    margin-top: -1.5rem;
  }

  & > a {
    display: flex;
    padding: 0.875rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3.125rem;
    background: var(--primary-primary-default, #00ec97);
    color: var(--ui-elements-black, #000);
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
    letter-spacing: 0.00875rem;

    @media screen and (max-width: 768px) {
      align-self: center;
    }

    &:hover,
    &:focus,
    &:active {
      background: var(--primary-primary-hover, #00ec97);
      color: var(--text-text-dark, #11181c);
      text-decoration: none;
    }
  }
`;

return (
  <Container>
    <h2>Still have questions?</h2>
    <p>
      Can’t find the answer you’re looking for? Feel free to join our community!
    </p>
    <a href="mailto:support.horizon@near.foundation" target="_blank">
      Talk to us
    </a>
  </Container>
);
