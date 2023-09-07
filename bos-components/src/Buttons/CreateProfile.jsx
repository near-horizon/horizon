const ownerId = "nearhorizon.near";

const RegisterButton = styled.div`
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
  <RegisterButton>
    <Link href={`/${ownerId}/widget/Onboarding.Page`}>Create profile</Link>
  </RegisterButton>
);
