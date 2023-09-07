const ownerId = "nearhorizon.near";
const size = props.size ?? "1.5em";

State.init({
  accountId: props.accountId || context.accountId,
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${state.accountId}/profile/**`] },
    "final",
    false,
  ).then((profile) =>
    State.update({
      profile: profile[state.accountId].profile,
      profileIsFetched: true,
    }),
  );
  return "Loading...";
}

const fullName = state.profile.name || state.profile.name || state.accountId;
const image = state.profile.image;
const imageSrc =
  (image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const ImageCircle = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  background: #fafafa;
  sizing: border-box;
  display: inline-block;
  --size: ${({ size }) => size};
  width: var(--size, 1.5em);
  height: var(--size, 1.5em);
  border-radius: 8px;
  overflow: hidden;
`;

return (
  <ImageContainer title={`${fullName} @${state.accountId}`} size={size}>
    <ImageCircle src={imageSrc} alt="profile image" />
  </ImageContainer>
);
