const ownerId = "nearhorizon.near";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 200ms ease-out;
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 1.5em 2em 2em;
  gap: 0.625em;
  isolation: isolate;
  animation: ${slideIn} 200ms ease-out;
  overflow-y: auto;
  background: #fff;
  z-index: 10;
  min-width: ${minWidth};
  max-width: 800px;

  &.focus-visible {
    outline: none !important;
  }
`;

const Container = styled.div`
  &.focus-visible {
    outline: none !important;
  }
`;

return (
  <Container>
    <Dialog.Root open={props.open}>
      <Dialog.Trigger asChild>
        <div style={{ display: "none" }} />
      </Dialog.Trigger>
      <Dialog.Overlay asChild>
        <Overlay />
      </Dialog.Overlay>
      <Dialog.Content asChild>
        <Content>
          <Dialog.Title>Terms and Conditions</Dialog.Title>
          <Widget
            src={`${ownerId}/widget/TNCForm`}
            props={{ accept: props.accept }}
          />
        </Content>
      </Dialog.Content>
    </Dialog.Root>
  </Container>
);
