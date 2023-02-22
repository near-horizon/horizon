const ownerId = "contribut3.near";
const buttons = props.buttons ?? [];
const tab = props.tab;
const accountId = props.accountId;
const content = props.content;
const cid = props.cid;

return (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {buttons.map(({ id, text, icon, count }) => (
      <a
        className={`btn ${props.content === id ? "btn-secondary" : "btn-outline-secondary"
          }`}
        href={`https://near.social/#/${ownerId}/widget/Index?tab=${tab}&content=${id}${props.search ? "&search=" + props.search : ""
          }${accountId ? "&accountId=" + accountId : ""}${cid ? "&cid=" + cid : ""
          }`}
        onClick={() => props.update(id)}
        key={id}
      >
        <i className={icon} />
        <span>{text}</span>
        {!!count && count > 0 ? (
          <div
            className="d-inline-block rounded-circle bg-danger text-center"
            style={{ minWidth: "1.5em", height: "1.5em", color: "#FFF" }}
          >
            {count}
          </div>
        ) : (
          <></>
        )}
      </a>
    ))}
  </div>
);
