const ownerId = "nearhorizon.near";
const label = props.label ?? "File";
const id = props.id ?? "file";
const fileAccept = props.fileAccept ?? ["images/*", "video/*", ".pdf"];
const noLabel = props.noLabel ?? false;
const value = props.value ?? ",,,";
const [cid, filename, size, uploaded] = value.split(",");
const onSave = props.onSave ?? (() => {});
const validate = props.validate ?? (() => {});
const error = props.error ?? "";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
  padding: 1em;
  background: #ffffff;
  border: 1px solid #eceef0;
  box-shadow:
    0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  width: 100%;

  .files-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1em;
    gap: 0.5em;
    background: #fafafa;
    border: 1px solid #eceef0;
    border-radius: 50px;
    color: #006adc;
    font-style: normal;
    font-weight: 600;
    font-size: 0.95em;
    line-height: 1em;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const FileDetails = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5em 1em 0.75em;
  gap: 0.75em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 8px;
  width: 100%;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75em;
    width: 100%;
  }
`;

const Small = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #7e868c;
`;

State.init({
  uploading: false,
  cid,
  filename,
  size,
  uploaded,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const formatBytes = () => {
  const size = Number(state.size);
  const unit =
    size < 1000
      ? "byte"
      : size < 1000000
      ? "kilobyte"
      : size < 1000000000
      ? "megabyte"
      : "gigabyte";
  const value =
    size < 1000
      ? size
      : size < 1000000
      ? size / 1000
      : size < 1000000000
      ? size / 1000000
      : size / 1000000000;
  return value.toLocaleString("en-US", {
    unit,
    style: "unit",
    unitDisplay: "narrow",
  });
};

const formatValue = (cid, filename, size, uploaded) =>
  `${cid},${filename},${size},${uploaded}`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0.5em;
`;

const Empty = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 1px solid #000000;
`;

return (
  <Container>
    <Label>
      {cid ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="12" fill="#00EC97" />
          <path
            d="M10.3333 16L7 12.5957L8.16667 11.4043L10.3333 13.617L15.8333 8L17 9.19149L10.3333 16Z"
            fill="black"
          />
        </svg>
      ) : (
        <Empty />
      )}
      {label}
      <Widget
        src={`${ownerId}/widget/Tooltip`}
        props={{ content: props.tooltip }}
      />
    </Label>
    {state.cid ? (
      <FileDetails>
        <span>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 1.70215V4.80005C8.5 5.22009 8.5 5.43011 8.58175 5.59055C8.65365 5.73167 8.76839 5.8464 8.90951 5.91831C9.06994 6.00005 9.27996 6.00005 9.7 6.00005H12.7979M10 9.75H4M10 12.75H4M5.5 6.75H4M8.5 1.5H4.6C3.33988 1.5 2.70982 1.5 2.22852 1.74524C1.80516 1.96095 1.46095 2.30516 1.24524 2.72852C1 3.20982 1 3.83988 1 5.1V12.9C1 14.1601 1 14.7902 1.24524 15.2715C1.46095 15.6948 1.80516 16.039 2.22852 16.2548C2.70982 16.5 3.33988 16.5 4.6 16.5H9.4C10.6601 16.5 11.2902 16.5 11.7715 16.2548C12.1948 16.039 12.539 15.6948 12.7548 15.2715C13 14.7902 13 14.1601 13 12.9V6L8.5 1.5Z"
              stroke="#7E868C"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <a href={ipfsUrl(state.cid)} download>
            {state.filename}
          </a>
          <Small>{formatBytes()}</Small>
        </span>
        <Small>
          Uploaded {new Date(Number(state.uploaded)).toLocaleDateString()}
        </Small>
      </FileDetails>
    ) : (
      <></>
    )}
    {props.canEdit ? (
      <Row>
        <Files
          multiple={false}
          accepts={props.fileAccept}
          minFileSize={1}
          clickable
          className="files-button"
          onChange={(files) => {
            if (!files || !files.length) return;

            const [body] = files;

            State.update({ uploading: true, cid: null });
            asyncFetch("https://ipfs.near.social/add", {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            }).then(({ body: { cid } }) => {
              State.update({
                cid,
                filename: body.name,
                size: body.size,
                uploaded: new Date().getTime(),
                uploading: false,
              });
              // props.update(cid);
            });
          }}
        >
          {state.uploading ? "Uploading" : state.cid ? "Replace" : "Upload"}
        </Files>
        <SaveButton
          onClick={() =>
            onSave(
              formatValue(
                state.cid,
                state.filename,
                state.size,
                state.uploaded,
              ),
            )
          }
        >
          Save
        </SaveButton>
      </Row>
    ) : (
      <></>
    )}
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
