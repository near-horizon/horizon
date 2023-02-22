const description = props.description || "";
const lengthCutoff = 120;

return (
  <div className="text-truncate my-2">
    {description.length > lengthCutoff
      ? description.substring(0, lengthCutoff - 10)
      : description}
    {description.length > lengthCutoff ? (
      <b className="text-primary">Read more</b>
    ) : (
      <></>
    )}
  </div>
);
