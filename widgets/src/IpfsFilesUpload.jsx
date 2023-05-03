const fileAccept = props.fileAccept || "*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";

// if (!props.update) return "Update function is required";

State.init({
  uploading: false,
  cid: null,
  filename: null,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

return (
  <div>
    {state.cid ? (
      <a href={ipfsUrl(state.cid)} download>
        {state.filename}
      </a>
    ) : (
      <></>
    )}
    <Files
      multiple={false}
      accepts={["image/*", "video/*", ".pdf"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={(files) => {
        if (!files || !files.length) return;

        const [body] = files;

        State.update({ uploading: true, cid: null });
        asyncFetch("https://ipfs.near.social/add", {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        }).then(({ body: { cid } }) => {
          State.update({ cid, filename: body.name, uploading: false });
          // props.update(cid);
        });
      }}
    >
      {state.uploading ? "Uploading" : state.cid ? "Replace" : buttonText}
    </Files>
  </div>
);
