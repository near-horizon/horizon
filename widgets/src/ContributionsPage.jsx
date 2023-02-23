const ownerId = "contribut3.near";

const header = (
  <div>
    <h1 className="fs-2">My contributions</h1>
  </div>
);

const searchBar = (
  <div className="w-25 col-12 col-md-10 col-lg-8">
    <div className="card card-sm">
      <div className="card-body row p-0 ps-2 align-items-center">
        <div className="col-auto pe-0 me-0">
          <i className="bi-search" />
        </div>
        <div className="col ms-0">
          <input
            className="form-control border-0"
            type="search"
            value={props.search}
            placeholder="Search"
            onChange={(e) => props.update({ search: e.target.value })}
          />
        </div>
      </div>
    </div>
  </div>
);

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
      <div className="d-flex flex-row justify-content-end">{searchBar}</div>
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
