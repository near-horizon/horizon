const ownerId = "nearhorizon.near";
/**
 * @param {{ipfs_cid?:string;url?:string}} image
 **/
const getImageSrc = (image) => {
  if (image.ipfs_cid) {
    return `https://ipfs.near.social/ipfs/${image.ipfs_cid}`;
  } else if (image.url) {
    return image.url;
  } else {
    return "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  padding-bottom: 0px;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 7rem;
  height: 7rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 3px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  overflow: hidden;
`;

const ImageBlock = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Details = styled.div`
  display: flex;
  padding-top: 1px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    & > :nth-child(n + 2) {
      display: none;
    }
  }
`;

const NameArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const CTA = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.9375rem;
`;

const CTAButton = styled.button`
  display: flex;
  height: 1.875rem;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--text-text-primary, #101828);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.0375rem; /* 138.333% */
`;

const Tagline = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--gray-900, #101828);
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
  letter-spacing: 0.00875rem;
`;

const Content = styled.div`
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.06rem;
  width: 100%;

  @media screen and (min-width: 769px) {
    & > :nth-child(n + 2) {
      display: none;
    }
  }
`;

State.init({
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${props.accountId}/profile/**`] },
    "final",
    false
  ).then((profile) => {
    State.update({
      profile: profile[props.accountId].profile,
      profileIsFetched: true,
    });
  });
  return <>Loading...</>;
}

return (
  <Container>
    <Column>
      <Header>
        <ImageContainer>
          <ImageBlock src={getImageSrc(state.profile.image)} />
        </ImageContainer>
        <Details>
          <NameArea>
            <Widget
              src={`${ownerId}/widget/NameAndAccount`}
              props={{
                accountId,
                name: state.profile.name,
                nameSize: "1.5625rem",
                accountSize: ".875rem",
              }}
            />
            <CTA>
              <CTAButton>Edit</CTAButton>
              <CTAButton>Share</CTAButton>
            </CTA>
          </NameArea>
          <Tagline>{state.profile.tagline}</Tagline>
          <Widget
            src={`${ownerId}/widget/Tags`}
            props={{ tags: state.profile.verticals }}
          />
        </Details>
      </Header>
      <div>
        <Tagline>{state.profile.tagline}</Tagline>
        <Widget
          src={`${ownerId}/widget/Tags`}
          props={{ tags: state.profile.verticals }}
        />
      </div>
    </Column>
    <Content>{props.children}</Content>
  </Container>
);
