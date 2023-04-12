const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const view = props.view ?? (() => <></>);
const edit = props.edit ?? (() => <></>);
const big = props.big ?? false;
const noLabel = props.noLabel ?? false;
const canEdit = props.canEdit ?? false;

State.init({
  value,
  edit: false,
  change: false,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
  width: 100%;

  &.big {
    gap: 0.625em;
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: ${({ big }) => (big ? "1em" : ".95em")};
  line-height: ${({ big }) => (big ? "1.4em" : "1em")};
  color: #11181c;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const EditButton = styled.button`
  font-weight: 400;
  font-size: 0.9em;
  line-height: 1em;
  color: #006adc;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: absolute;
  inset: auto auto auto 0;

  &.hidden {
    transform: scaleX(0);
  }

  &.left {
    transform-origin: left;
  }

  &.right {
    transform-origin: right;
  }
`;

const EditButtonContainer = styled.div`
  position: relative;
  width: min-content;
  height: 1em;
`;

return (
  <Container className={big ? "big" : ""}>
    <Row>
      {noLabel ? (
        view
      ) : (
        <Label htmlFor={id} big={big}>
          {label}
        </Label>
      )}
      {canEdit &&
        <EditButtonContainer>
          <EditButton
            onClick={() => State.update({ edit: false })}
            className={`right ${state.edit ? "" : "hidden"}`}
          >
            Cancel
          </EditButton>
          <EditButton
            onClick={() => State.update({ edit: true })}
            className={`left ${state.edit ? "hidden" : ""}`}
          >
            Edit
          </EditButton>
        </EditButtonContainer>
      }
    </Row>

    {state.edit && canEdit ? (
      edit((value) => State.update({ value }), state.value)
    ) : noLabel ? (
      <></>
    ) : (
      view
    )}
  </Container>
);
