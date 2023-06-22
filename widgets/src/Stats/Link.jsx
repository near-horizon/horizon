const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1.25em 0.625em;
  background-color: #fafafa;
  border-radius: 16px;
`;

const Anchor = styled.a`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #66a0ff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5em;

  svg {
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    svg {
      transform: translateX(5px) scale(1.1);
    }
  }
`;

const arrow = (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.09985 11L6.09985 6L1.09985 1"
      stroke="#66a0ff"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

return (
  <Container>
    <Anchor href="https://nearatlas.com/#/">Explore stats {arrow}</Anchor>
  </Container>
);
