const description = props.description || "";
const lengthCutoff = 80;

State.init({
  showAll: description.length <= lengthCutoff,
});

return (
  <div className="d-flex flex-row justify-content-start align-items-start">
    <div>
      <Markdown
        text={
          state.showAll
            ? description
            : description.substring(0, lengthCutoff) + "..."
        }
      />
    </div>
    {state.showAll && description.length > lengthCutoff ? (
      <a
        className="btn fw-bold text-primary ms-2 p-0 text-nowrap"
        onClick={() => State.update({ showAll: false })}
      >
        Show less
      </a>
    ) : description.length < lengthCutoff ? (
      <></>
    ) : (
      <a
        className="btn fw-bold text-primary ms-2 p-0 text-nowrap"
        onClick={() => State.update({ showAll: true })}
      >
        Read more
      </a>
    )}
  </div>
);
