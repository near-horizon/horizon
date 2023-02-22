const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const additionalText = props.additionalText;
const additionalRow = props.additionalRow;
const alignment = additionalRow ? "start" : "center";
const additionalColumn = props.additionalColumn;
const imageSize = props.imageSize;

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final"
).then((data) => State.update({ data }));

const profile = Social.getr(`${accountId}/profile`);

if (!state.data && !profile) {
  return (
    <div className="d-flex flex-row justify-content-start">
      <div className="m-2">
        <Widget
          src={`${ownerId}/widget/ProfileCircle`}
          props={{ accountId, size: imageSize }}
        />
      </div>
      <div className="d-flex flex-column justify-content-between align-items-start w-100">
        <div className="w-100 d-flex flex-row justify-content-between align-items-start">
          <div>
            <b>Loading...</b>
            <span className="text-muted mx-1">@loading.near</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const fullName = profile.name || state.data.name || accountId;
const href = `https://near.social/#/${ownerId}/widget/Index?tab=${isEntity ? "entity" : "contributor"
  }&accountId=${accountId}`;

return (
  <div
    className={`d-flex flex-row justify-content-start align-items-${alignment}`}
  >
    <a
      className="text-dark"
      href={href}
      onClick={() =>
        props.update && props.update(isEntity ? "entity" : "contributor")
      }
    >
      <div className="m-2">
        <Widget
          src={`${ownerId}/widget/ProfileCircle`}
          props={{ accountId, size: imageSize, isEntity }}
        />
      </div>
    </a>
    <div className="d-flex flex-column justify-content-between align-items-start w-100">
      <div className="w-100 d-flex flex-row justify-content-between align-items-start">
        <div>
          <a
            className="text-dark"
            href={href}
            onClick={() =>
              props.update && props.update(isEntity ? "entity" : "contributor")
            }
          >
            <b>{fullName}</b>
            <span className="text-muted mx-1">@{accountId}</span>
          </a>
          {additionalText}
        </div>
      </div>
      {additionalRow}
    </div>
    {additionalColumn}
  </div>
);
