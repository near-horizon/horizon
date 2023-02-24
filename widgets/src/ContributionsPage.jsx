const ownerId = "contribut3.near";

const header = (
  <div>
    <h1 className="fs-2">My contributions</h1>
  </div>
);

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div></div>
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">
      <Widget
        src={`${ownerId}/widget/ContributionList`}
        props={{
          accountId: context.accountId,
          isEntity: false,
          search: props.search,
          update: props.update,
        }}
      />
    </div>
  </div>
);
