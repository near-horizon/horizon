const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
const urlPrefix = `${apiUrl}/data`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #eaeaea;

  &:first-child {
    border-top: none;
  }

  & > div:first-child {
    border-right: 1px solid #eaeaea;
    width: 75%;
    background: #f8f8f8;
  }

  & > div:last-child {
    font-weight: 600;
    width: 25%;
    text-align: right;
  }

  & > div {
    padding: 8px 16px;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
`;

/** @type {{url: string; render(data: any):JSX.Element}[]} */
const data = [
  // {
  //   url: "projects/completion",
  //   render: (data) => {
  //     const avg = Number(data.avg).toLocaleString("en-US", {
  //       style: "percent",
  //       minimumFractionDigits: 2,
  //     });
  //
  //     return (
  //       <Row>
  //         <div>Completion:</div>
  //         <div>{avg}</div>
  //       </Row>
  //     );
  //   },
  // },
  {
    url: "metrics?above=100",
    render: ({ average, completed }) => {
      const avg = Number(average).toLocaleString("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
      });

      return (
        <>
          <Row>
            <div>Avarage completion</div>
            <div>{avg}</div>
          </Row>
          <Row>
            <div>Count of projects with completed profiles</div>
            <div>{completed}</div>
          </Row>{" "}
        </>
      );
    },
    fallback: (loader) => {
      <>
        <Row>
          <div>Avarage completion</div>
          <div>{loader}</div>
        </Row>
        <Row>
          <div>Count of projects with completed profiles</div>
          <div>{loader}</div>
        </Row>
      </>;
    },
  },
  {
    url: "metrics?above=90",
    render: ({ completed }) => {
      return (
        <Row>
          <div>Count of projects with 90% completed profiles</div>
          <div>{completed}</div>
        </Row>
      );
    },
    fallback: (loader) => {
      <>
        <Row>
          <div>Count of projects with 90% completed profiles</div>
          <div>{loader}</div>
        </Row>
      </>;
    },
  },
  {
    url: "metrics/counts",
    render: (data) => {
      return (
        <>
          {Object.keys(data).map((key) => {
            const value = data[key];

            return (
              <Row key={key}>
                <div>Number of {key}</div>
                <div>{value}</div>
              </Row>
            );
          })}
        </>
      );
    },
    fallback: (loader) => {
      <>
        <Row>
          <div>Number of projects</div>
          <div>{loader}</div>
        </Row>
        <Row>
          <div>Number of vendors</div>
          <div>{loader}</div>
        </Row>
        <Row>
          <div>Number of requests</div>
          <div>{loader}</div>
        </Row>
        <Row>
          <div>Number of proposals</div>
          <div>{loader}</div>
        </Row>
        <Row>
          <div>Number of contributions</div>
          <div>{loader}</div>
        </Row>
      </>;
    },
  },
  {
    url: "metrics/average/fulfillment",
    render: (data) => (
      <Row>
        <div>Avarage days to fulfillment</div>
        <div>{data}</div>
      </Row>
    ),
    fallback: (loader) => (
      <Row>
        <div>Avarage days to fulfillment</div>
        <div>{loader}</div>
      </Row>
    ),
  },
  {
    url: "metrics/average/project/transactions",
    render: (data) => (
      <Row>
        <div>Avarage number of transactions per project</div>
        <div>
          {Number(data).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
        </div>
      </Row>
    ),
    fallback: (loader) => (
      <Row>
        <div>Avarage number of transactions per project</div>
        <div>{loader}</div>
      </Row>
    ),
  },
  {
    url: "metrics/average/project/requests",
    render: (data) => (
      <Row>
        <div>Avarage number of requests per project</div>
        <div>
          {Number(data).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
        </div>
      </Row>
    ),
    fallback: (loader) => (
      <Row>
        <div>Avarage number of requests per project</div>
        <div>{loader}</div>
      </Row>
    ),
  },
  {
    url: "metrics/average/project/mau",
    render: (data) => (
      <Row>
        <div>Avarage MAU per project</div>
        <div>
          {Number(data.average_without_max).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
        </div>
      </Row>
    ),
    fallback: (loader) => (
      <Row>
        <div>Avarage MAU per project</div>
        <div>{loader}</div>
      </Row>
    ),
  },
];

return (
  <Table>
    {data.map(({ url, render, fallback }) => (
      <Widget
        src={`${ownerId}/widget/Layout.Fetcher`}
        props={{ url: `${urlPrefix}/${url}`, render, fallback }}
      />
    ))}
  </Table>
);
