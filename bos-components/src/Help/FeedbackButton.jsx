const Container = styled("Tooltip.Trigger")`
  a {
    font-size: 0.9em;
    font-style: normal;
    font-weight: 400;
    line-height: 1em;
    color: #000000;
    text-decoration: none;

    &:hover,
    &:visited {
      color: #000000;
      text-decoration: none;
    }
  }

  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.5em 1em;
  margin: 2em;
  background: #fff;
  border-radius: 16px;
  border: none;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  z-index: 10;
`;

const StyledTooltip = styled("Tooltip.Content")`
  z-index: 1000;

  .arrow {
    fill: #fff;
  }

  border-radius: 4px;
  padding: 10px 15px;
  background-color: white;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  font-style: normal;
  font-weight: 700;
  font-size: 0.95em;
  line-height: 1.4em;
  color: #11181c;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: ${slideRightAndFade};
  }
`;

return (
  <Tooltip.Provider>
    <Tooltip.Root>
      <a href="mailto:support.horizon@near.foundation">
        <Container>
          <b>Give feedback</b>
        </Container>
        <StyledTooltip align="center">
          Click here to give us any feedback you want via email
          <Tooltip.Arrow className="arrow" />
        </StyledTooltip>
      </a>
    </Tooltip.Root>
  </Tooltip.Provider>
);
