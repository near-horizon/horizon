const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  margin-top: -3rem;

  & > div {
    height: 100%;
    min-width: 15rem;
  }
`;

const RegisterButton = styled.a`
  display: flex;
  padding: 0.75rem 1.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 50px;
  background: var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-size: 1.125rem;
  font-family: Inter;
  font-weight: 600;
  align-self: flex-start;

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
`;

const registerButton = ({ text, href }) => (
  <RegisterButton href={href ?? `${ownerId}/widget/Index?tab=createbacker`}>
    {text}
  </RegisterButton>
);

return (
  <Container>
    <div>
      <Widget src={`${ownerId}/widget/Logo`} />
    </div>
    {registerButton({ text: "Create profile" })}
  </Container>
);
