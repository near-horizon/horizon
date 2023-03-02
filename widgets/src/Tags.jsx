const tags = Object.keys(props.tags || {});

return (
  <div className="text-truncate text-muted" style={{ maxWidth: "400px" }}>
    {tags.length > 0 ? (
      <>
        {tags.map((tag) => (
          <span
            className="d-inline-block mx-1 py-1 px-2 badge border border-secondary text-secondary text-muted text-center"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </>
    ) : (
      <></>
    )}
  </div>
);
