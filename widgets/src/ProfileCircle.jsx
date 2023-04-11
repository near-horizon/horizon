const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const size = props.size ?? "1.5em";

State.init({
  data: null,
  fetched: false,
  profile: null,
  profileFetched: false,
});

if (!state.fetched) {
  Near.asyncView(
    ownerId,
    isEntity ? "get_project" : "get_vendor",
    { account_id: accountId },
    "final",
    false
  ).then((data) => State.update({ data, fetched: true }));
}

if (!state.profileFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((profile) => State.update({ profile: profile[accountId].profile, profileFetched: true }));
  return <>Loading...</>;
}

const fullName = state.profile.name || state.data.name || accountId;
const image = state.profile.image;
const url =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const imageSrc = `https://i.near.social/thumbnail/${url}`;

const ImageCircle = styled.img`
  border-radius: ${({ isEntity }) => isEntity ? "8px" : "100%"};
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  --size: ${({ size }) => size};
  width: var(--size, 1.5em);
  height: var(--size, 1.5em);
`;

return (
  <ImageContainer title={`${fullName} @${accountId}`} size={size}>
    <ImageCircle src={imageSrc} isEntity={isEntity} alt="profile image" />
  </ImageContainer>
);
