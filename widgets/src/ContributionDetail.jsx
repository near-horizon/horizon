const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributionType = props.contributionType;
const description = props.description;
const need = props.need;

const formatDate = (date) => {
  if (date.length > 13) {
    return new Date(Number(date.substring(0, 13))).toLocaleDateString();
  }

  return new Date(Number(date)).toLocaleDateString();
};

const startDate = formatDate(props.startDate);
const endDate = formatDate(props.endDate);

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">
      <h4>
        {contributionType} from {startDate} to {endDate}
      </h4>
      {need ? (
        <a
          href={`/#/${ownerId}/widget/Index?accountId=${entityId}&cid=${cid}`}
          onClick={() =>
            props.update({
              accountId: entityId,
              cid: need,
              tab: "need",
              search: "",
              content: "",
            })
          }
        >
          For this request
        </a>
      ) : (
        <></>
      )}
      <Widget
        src={`${ownerId}/widget/DescriptionArea`}
        props={{ description }}
      />
    </div>
  </div>
);
