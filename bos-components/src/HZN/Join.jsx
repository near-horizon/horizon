const ownerId = "nearhorizon.near";
const videoUrl =
  "https://s3-figma-videos-production-sig.figma.com/video/997014367794546530/TEAM/82ee/d904/-8d2f-4850-9ac8-3c823acdcdd8?Expires=1695600000&Signature=HsR-SejEZ9gGzHU1jAOohJEOkqI9AZ5QfU7vAOutKanXvzOoR-C80LgsWXk1sCzLQeilFxdKSiwu56GIj2dHbmQVB5JVtpQawRTsnyge7DcYy0awV7ZhIn7iXkNyjDUPSuHP8po9aT9z79YfVwVIRzSuglMQgp1syV0--5Qm-XrQpv~g06d4jI0M4GgNm42xY4n7ZDZnO3tH1KcUGBFvJLsDFMS32cjbSYqkl7Eh7QR~7wpNmj0JZ~ghkrmaG8uyZz~pxBMdonTR2akAP28-Okwu6WshUaKbOzdieGm5JC~c4TQeTWVORMoAKdXtgy5Ngc4cmTE84TBKlIstTg4diA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 490px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 1.5rem;
  overflow: hidden;

  & > iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    overflow: hidden;
    z-index: -1;
  }
`;

const iframeCode = `
  <html style="width: 100%; padding: 0; margin: 0; height: 100%; overflow: hidden;">
    <body style="width: 100%; padding: 0; margin: 0; height: 100%; overflow: hidden;">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        src="${videoUrl}" 
        style="object-fit: cover; width: 100%; padding: 0; margin: 0; height: 100%; overflow: hidden;" 
      />
    </body>
  </html>
`;

const videoBackground = <iframe srcDoc={iframeCode} />;

const Hero = styled.div`
  display: flex;
  padding: 6rem 7.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  & > h2 {
    color: #fff;
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02625rem;
  }

  & > p {
    max-width: 48rem;
    color: rgba(195, 226, 255, 0.72);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 2.25rem */

    & > b {
      color: #fff;
    }
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
`;

const ApplyButton = styled.a`
  display: flex;
  padding: 1.0625rem 1.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  background: var(--primary-primary-default, #00ec97);
  border: 1px solid var(--primary-primary-default, #00ec97);
  color: var(--ui-elements-dark, #11181c);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: FK Grotesk;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.01125rem;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    color: var(--ui-elements-dark, #11181c);
    text-decoration: none;
  }
`;

return (
  <Container>
    {videoBackground}
    <Hero>
      <h2>Join HZN2 and get from idea to Mainnet in 90 days</h2>
      <p>
        <b>HZN2</b> will be kicking off in <b>January 2024</b>, applications are
        considered on a rolling basis.
      </p>
      <div>
        <ApplyButton
          href="https://airtable.com/appFoIqAoY0ikoVIb/shrst8Tt4PUtYTSvD"
          target="_blank"
        >
          Apply for HZN2
        </ApplyButton>
      </div>
    </Hero>
  </Container>
);
