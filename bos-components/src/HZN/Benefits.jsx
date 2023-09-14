const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 4rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Separator = styled("Separator.Root")`
  background: var(--gray-200, #eaecf0);

  width: 100%;
  height: 1px;

  @media screen and (min-width: 768px) {
    height: 8rem;
    width: 1px;
  }
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  & > span {
    color: #66a0ff;
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.3125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 4.5rem; /* 194.595% */
    letter-spacing: -0.04625rem;
  }

  & > small {
    color: var(--gray-900, #101828);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 1.4rem */
  }
`;

return (
  <Container>
    <Benefit>
      <span>90+ days</span>
      <small>Program duration</small>
    </Benefit>
    <Separator />
    <Benefit>
      <span>Equity-free</span>
      <small>We don't demand any shares</small>
    </Benefit>
    <Separator />
    <Benefit>
      <span>25 projects</span>
      <small>In our first cohort</small>
    </Benefit>
  </Container>
);
