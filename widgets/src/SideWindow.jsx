const trigger = props.trigger;
const triggerButton = props.triggerButton;
const title = props.title;
const description = props.description;
const children = props.children;
const minWidth = props.minWidth ?? "unset";

const fadeIn = styled.keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 200ms ease-out;
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.125em;
    line-height: 1.5em;
    color: #000000;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: #7e868c;
  transform: translate(1em, -1em);
`;

const slideIn = styled.keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  inset: 74px 0 0 auto;
  padding: 1.5em 2em 2em;
  gap: 0.625em;
  isolation: isolate;
  animation: ${slideIn} 200ms ease-out;
  overflow-y: auto;
  background: #fff;
  z-index: 10;
  min-width: min(${minWidth}, 100dvw);
  max-width: 800px;
`;

const Button = styled("Dialog.Trigger")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  color: #006adc;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
`;

const Description = styled.div`
  width: 100%;
`;

return (
  <Dialog.Root>
    {triggerButton ? triggerButton : <Button>{trigger}</Button>}

    <Dialog.Overlay asChild>
      <Overlay />
    </Dialog.Overlay>

    <Dialog.Content asChild>
      <Content>
        <Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Close asChild>
            <CloseButton>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </CloseButton>
          </Dialog.Close>
        </Header>
        <Dialog.Description asChild>
          <Description>{description}</Description>
        </Dialog.Description>
        {children}
      </Content>
    </Dialog.Content>
  </Dialog.Root>
);
