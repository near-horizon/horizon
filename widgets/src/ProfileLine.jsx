const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const additionalText = props.additionalText;
const additionalRow = props.additionalRow;
const alignment = additionalRow ? "flex-start" : "center";
const additionalColumn = props.additionalColumn;
const imageSize = props.imageSize;
const linkNavigate = () =>
  props.update({
    tab: isEntity ? "entity" : "contributor",
    accountId,
    content: "",
    search: "",
  });

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final",
  false
).then((data) => State.update({ data }));

const profile = Social.get(`${accountId}/profile/**`, "final", {
  subscribe: false,
});

const fullName = profile.name || state.data.name || accountId;
const href = `/#/${ownerId}/widget/Index?tab=${isEntity ? "entity" : "contributor"
  }&accountId=${accountId}`;

const ImageContainer = styled.div`
  margin: 0.5em;
`;

const ImageLink = styled.a`
  color: #667085;
  transition: font-weight 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    color: #667085;
    font-weight: 500;
  }

  span {
    color: #687076;
    margin: 0 0.25em;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: ${({ alignment }) => alignment};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: between;
  align-items: flex-start;
  flex-grow: 1;
`;

return (
  <Container alignment={alignment}>
    <ImageLink href={href} onClick={linkNavigate}>
      <ImageContainer>
        <Widget
          src={`${ownerId}/widget/ProfileCircle`}
          props={{ accountId, size: imageSize, isEntity }}
        />
      </ImageContainer>
    </ImageLink>
    <Column>
      <div>
        <ImageLink href={href} onClick={linkNavigate}>
          <b>{fullName}</b>
          <span>@{accountId}</span>
        </ImageLink>
        {additionalText}
      </div>
      {additionalRow}
    </Column>
    {additionalColumn}
  </Container>
);
