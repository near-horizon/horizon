const ownerId = "nearhorizon.near";

const Button = styled.div`
  & > a {
    display: flex;
    padding: 0.875rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3.125rem;
    border: 1px solid var(--ui-elements-light, #eceef0);
    background: var(--background-light, #fafafa);
    cursor: pointer;
    color: var(--text-text-primary, #101828);
    text-align: center;
    font-family: Inter;
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
      text-decoration: none;
    }
  }
`;

return (
  <Button>
    <Link href={`/${ownerId}/widget/Index`}>Explore Horizon</Link>
  </Button>
);
