const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.contributorId;
const id = props.id;
const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

State.init({
  endDate: props.endDate ?? createDate(),
});

const onSubmit = () => {
  const args = {
    entity_id: entityId,
    contributor_id: contributorId,
    end_date: `${new Date(state.endDate).getTime()}`,
  };

  Near.call(ownerId, "finish_contribution", args);
};

const body = (
  <div className="row">
    <div className="col-lg-6 mb-2">
      <Widget
        src={`${ownerId}/widget/DateInput`}
        props={{
          id: "end-date",
          text: "End date *",
          date: state.endDate,
          update: (endDate) => State.update({ endDate }),
        }}
      />
    </div>
  </div>
);

return (
  <Widget
    src={`${ownerId}/widget/Modal`}
    props={{
      title: "Finish contribution",
      confirmText: (
        <>
          <i className="bi-slash-circle" />
          <span>Finish contribution</span>
        </>
      ),
      onConfirm: onSubmit,
      hidden: props.hidden,
      onClose: props.onClose,
      body,
      id,
    }}
  />
);
