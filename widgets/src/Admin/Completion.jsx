const ownerId = "nearhorizon.near";
const urlPrefix = "https://api-op3o.onrender.com/data";

/** @type {{url: string; render(data: any):JSX.Element}[]} */
const data = [
  {
    url: "projects/completion",
    render: (data) => (
      <div>
        <div>Completion:</div>
        {JSON.stringify(data.avg)}
      </div>
    ),
  },
  {
    url: "metrics",
    render: (data) => (
      <div>
        <div>Metrics:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
  {
    url: "metrics/counts",
    render: (data) => (
      <div>
        <div>Counts:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
  {
    url: "metrics/avarage/fulfillment",
    render: (data) => (
      <div>
        <div>Avarage Fulfillment:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
  {
    url: "metrics/avarage/project/transactions",
    render: (data) => (
      <div>
        <div>Avarage Transactions:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
  {
    url: "metrics/avarage/project/requests",
    render: (data) => (
      <div>
        <div>Avarage Requests:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
  {
    url: "metrics/avarage/project/mau",
    render: (data) => (
      <div>
        <div>Avarage MAU:</div>
        {JSON.stringify(data)}
      </div>
    ),
  },
];

return (
  <>
    {data.map(({ url, render }) => (
      <div key={url}>
        <Widget
          src={`${ownerId}/widget/Layout.Fetcher`}
          props={{ url: `${urlPrefix}/${url}`, render }}
        />
      </div>
    ))}
  </>
);
