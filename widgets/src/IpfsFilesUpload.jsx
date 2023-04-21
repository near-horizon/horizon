const fileAccept = props.fileAccept || "*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";

if (!props.update) return "Update function is required";

State.init({
  uploading: false,
  files: [],
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (files) => {
  State.update({
    uploading: true,
    files: [],
  });
  if (files?.length > 0) {
    files.map((file, index) => {
      const body = file;
      asyncFetch("https://ipfs.near.social/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body,
      }).then((res) => {
        const cid = res.body.cid;
        State.update({
          files: [...state.files, { index, name: file.name, cid }],
        });
      });
    });
    State.update({ uploading: false });
    props.update(state.files);
  } else {
    State.update({
      uploading: false,
      files: null,
    });
  }
};

const onClickDelete = (index) => {
  const filesUpdated = state.files.filter((file) => file.index !== index);
  State.update({ files: filesUpdated });
};

const filesUploaded = () => {
  if (state.files.length > 0) {
    return state.files.map((file) => (
      <div class="d-flex flex-row gap-2 align-items-center">
        <button
          class="btn btn-danger rounded-0"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          onClick={() => onClickDelete(file.index)}
        >
          <i class="bi bi-trash" />
        </button>
        <i class={`bi fs-3 ${fileIcon}`} />
        <p>{file.name}</p>
      </div>
    ));
  }
  return <></>;
};

return (
  <div className="d-inline-block">
    {filesUploaded()}
    <Files
      multiple={true}
      accepts={[fileAccept]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.uploading
        ? "Uploading"
        : state.files.length > 0
        ? "Replace All"
        : buttonText}
    </Files>
  </div>
);
