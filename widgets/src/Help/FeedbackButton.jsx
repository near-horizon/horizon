const Container = styled("Tooltip.Trigger")`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.5em;
  margin: 1em;
  background: #ffffff;
  border-radius: 100%;
  border: none;
  height: 7em;
  width: 7em;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
`;

return (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Container>
        <a href="mailto:horizon@near.foundation">Send feedback</a>
      </Container>
    </Tooltip.Root>
  </Tooltip.Provider>
);
