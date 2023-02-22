const active = props.active ?? false;
const activeText = props.activeText ?? "Active";
const inactiveText = props.inactiveText ?? "Not active";

return (
  <div
    className={`text-${active ? "success" : "muted"
      } me-3 d-flex flex-row justify-content-start align-items-center`}
  >
    {active ? (
      <i
        className="d-block bg-success rounded-circle"
        style={{ width: ".6em", height: ".6em" }}
      />
    ) : (
      <></>
    )}
    <span className="d-block ms-1 text-nowrap" style={{ fontSize: ".95em" }}>
      {active ? activeText : inactiveText}
    </span>
  </div>
);
