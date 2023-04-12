const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const imageSize = props.imageSize;
const linkNavigate = () =>
  props.update({
    tab: isEntity ? "project" : "vendor",
    accountId,
    content: "",
    search: "",
  });

State.init({
  profile: null,
  profileFetched: false,
});

if (!state.profileFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((profile) =>
    State.update({ profile: profile[accountId].profile, profileFetched: true })
  );
  return <>Loading...</>;
}

const fullName = state.profile.name || accountId;
const href = `/${ownerId}/widget/Index?tab=${isEntity ? "project" : "vendor"
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
  align-items: flex-start;
  width: 100%;
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
      <b>{fullName}</b>
      <span>@{accountId}</span>
    </ImageLink>
  </Container>
);
