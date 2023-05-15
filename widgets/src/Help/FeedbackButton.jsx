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
  padding: 0.5em;
  margin: 2em;
  background: #fff;
  border-radius: 100%;
  border: none;
  height: 3em;
  width: 3em;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  z-index: 1000;
`;

const StyledTooltip = styled("Tooltip.Content")`
  z-index: 1000;

  .arrow {
    fill: #fff;
  }

  border-radius: 4px;
  padding: 10px 15px;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
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
  <a href="mailto:horizon@near.foundation">
    <Tooltip.Provider>
      <Tooltip.Root>
        <Container>
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.91699 11.25L4.61055 13.5853C4.28883 13.911 4.12797 14.0739 3.98971 14.0854C3.86975 14.0953 3.7523 14.0471 3.67396 13.9557C3.58366 13.8504 3.58366 13.6215 3.58366 13.1637V11.9937C3.58366 11.583 3.2473 11.2858 2.84089 11.2262V11.2262C1.8573 11.0822 1.08482 10.3097 0.940749 9.3261C0.916992 9.16391 0.916992 8.97039 0.916992 8.58333V5.1C0.916992 3.83988 0.916992 3.20982 1.16223 2.72852C1.37794 2.30516 1.72215 1.96095 2.14551 1.74524C2.62681 1.5 3.25687 1.5 4.51699 1.5H10.067C11.3271 1.5 11.9572 1.5 12.4385 1.74524C12.8618 1.96095 13.206 2.30516 13.4218 2.72852C13.667 3.20982 13.667 3.83988 13.667 5.1V8.25M13.667 16.5L12.0347 15.3652C11.8052 15.2056 11.6905 15.1259 11.5656 15.0693C11.4548 15.0191 11.3383 14.9826 11.2187 14.9606C11.0839 14.9357 10.9441 14.9357 10.6647 14.9357H9.31699C8.47691 14.9357 8.05687 14.9357 7.73601 14.7722C7.45376 14.6284 7.22429 14.3989 7.08048 14.1167C6.91699 13.7958 6.91699 13.3758 6.91699 12.5357V10.65C6.91699 9.80992 6.91699 9.38988 7.08048 9.06901C7.22429 8.78677 7.45376 8.5573 7.73601 8.41349C8.05687 8.25 8.47691 8.25 9.31699 8.25H13.517C14.3571 8.25 14.7771 8.25 15.098 8.41349C15.3802 8.5573 15.6097 8.78677 15.7535 9.06901C15.917 9.38988 15.917 9.80992 15.917 10.65V12.6857C15.917 13.3846 15.917 13.7341 15.8028 14.0097C15.6506 14.3773 15.3586 14.6693 14.991 14.8215C14.7154 14.9357 14.3659 14.9357 13.667 14.9357V16.5Z"
              stroke="#000"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Container>
        <StyledTooltip side="left" align="center">
          Send feedback
          <Tooltip.Arrow className="arrow" />
        </StyledTooltip>
      </Tooltip.Root>
    </Tooltip.Provider>
  </a>
);
