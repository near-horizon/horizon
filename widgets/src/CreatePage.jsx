const ownerId = "contribut3.near";

const availableContent = ["request", "entity"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "request";
  }

  return content;
};

const content = {
  request: (
    <Widget
      src={`${ownerId}/widget/NeedForm`}
      props={{ search: state.search, update: props.update }}
    />
  ),
  entity: (
    <Widget
      src={`${ownerId}/widget/EntityForm`}
      props={{ search: state.search, update: props.update, kind: props.kind }}
    />
  ),
}[getContent(props.content)];

return content;
