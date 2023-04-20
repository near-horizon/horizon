const ownerId = "contribut3.near";

const Row = styled.div`
  display: flex;
  flex-direction: row;

  &.reverse {
    flex-direction: row-reverse;
  }

  justify-content: space-between;
  align-items: center;
  gap: 2.5em;
  width: 100%;

  @media (max-width: 768px) {
    &.reverse {
      flex-direction: column;
    }

    flex-direction: column;
    justify-content: flex-start;
  }
`;

const SectionHeader = styled.h3`
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 120%;
  color: #000000;
  padding: 2em 0;

  &.black {
    font-size: 3em;
    color: #ffffff;
  }
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  text-align: left;

  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 120%;
    color: #000000;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 150%;
    color: #000000;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const MainSubSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  text-align: left;

  h1 {
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 2.375em;
    line-height: 120%;
    color: #000000;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.125em;
    line-height: 150%;
    color: #000000;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Link = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 36px;
  gap: 24px;
  background: #66a0ff;
  border-radius: 1000px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  text-align: center;
  color: #ffffff;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 0.5em;
  width: 100%;

  div {
    width: 20%;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    div {
      width: 49%;
    }

    div:last-child {
      width: 100%;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;

  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 120%;
    color: #000000;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1em;
  width: 33%;

  @media (max-width: 768px) {
    width: 100%;
  }

  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    color: #ffffff;
  }

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
    color: #ffffff;
  }

  ul {
    list-style: none;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    color: #cde0ff;
  }

  li {
    padding: 0.5em 0;
  }
`;

const SubHeading = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 120%;
  color: #ffffff;
`;

const listSymbol = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4747 7.40963L9.41088 6.58912L8.59037 0.525328C8.49031 -0.175109 7.48968 -0.175109 7.40963 0.525328L6.58912 6.58912L0.525328 7.40963C-0.175109 7.50969 -0.175109 8.51032 0.525328 8.59037L6.58912 9.41088L7.40963 15.4747C7.50969 16.1751 8.51032 16.1751 8.59037 15.4747L9.41088 9.41088L15.4747 8.59037C16.1751 8.49031 16.1751 7.48968 15.4747 7.40963Z"
      fill="white"
    />
  </svg>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Narrow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Section = styled.div`
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 2em;
  margin: 4em 0;

  &.dark {
    background: #000000;
  }

  &.blue {
    background: #cde0ff;
  }
`;

const foundersImages = [
  "bafkreiaypep5xqg5vhbw7gralttufuzbqk5oggts2uyfbnjgpshtk5mggu",
  "bafkreiajakictce47mjdcpro45s3hasoozmuik4n3dkcstizpqv4igbx74",
  "bafkreihefba6pk23b3jcq2dugs7mw5ktkqtvcuqj5c2owrpkhspthuahyu",
];
const contributorsImage =
  "bafkreidy4y7x4l2xc2jnin3x4h2cniusviood54cknrsb5nioe63aluune";
const investorsImage =
  "bafkreie3zrtr3ynis5xlgq4wjtef7f43ycyll5re3ko3nnrsv3kbjd7xvm";
const mainImage = "bafkreiafxt54wrdulmbyff4pqknm562fcpsj2edu2fywroke4snirrbnnq";
const logo = "bafkreihxjdgrt6iun2xkinwjzp4h6tkhkrpbxuzyeanrrecsp7yzsdr3ru";
const endingImage =
  "bafkreibfk6pkeoxsl6banldzxearj3swh53p3gmn7unhz7nag4nco4p2sm";
const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <Container>
    <Section style={{ padding: "4em 0 0 0" }}>
      <Row style={{ padding: "0 0 4em 0" }}>
        <img src={mapImage(mainImage)} />
        <MainSubSection>
          <img src={mapImage(logo)} />
          <h1>Accelerate your Web3 Startup</h1>
          <p>
            NEAR Horizon is an early stage accelerator revolutionizing how
            founders and builders find support in Web3. Build and scale great
            projects alongside a thriving community, while tapping into a robust
            backer network and diverse supporting resources.
          </p>
          <Link href="/nearhorizon.near/widget/Index">Try It Now</Link>
        </MainSubSection>
      </Row>
      <Stats>
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: "1077",
            label: "Projects",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: "1M+",
            label: "Monthly active accounts",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: "25M+",
            label: "Total accounts",
          }}
        />
        <Widget
          src={`${ownerId}/widget/Stats.Card`}
          props={{
            value: "$88M+",
            label: "Raised",
          }}
        />
        <Widget src={`${ownerId}/widget/Stats.Link`} className="link" />
      </Stats>
    </Section>
    <Section className="dark" style={{ padding: "4em 0" }}>
      {/*<svg width="111" height="222" viewBox="0 0 222 444" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: "0 auto auto 0" }}>
        <path d="M0 443.126C141.506 344.16 87.0596 304.869 33.9785 266.562C21.7825 257.761 9.65857 249.012 0 239.602V443.126Z" fill="white" />
        <path d="M0 157.384C10.4491 145.188 25.4545 131.68 46.0689 116.546C68.4236 100.135 85.876 82.3307 102.188 65.6899C135.817 31.3826 164.6 2.02013 221.5 0H0V157.384Z" fill="white" />
      </svg>
      <svg width="257" height="194" viewBox="0 0 514 388" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: "auto -2px -2px auto" }}>
        <path d="M448.372 121.428C454.416 88.5481 461.506 49.9822 513.5 0V387.151H0C113.496 387.151 149.128 353.266 188.262 316.051C216.021 289.654 245.541 261.581 305.862 242.734C433.397 202.888 439.844 167.817 448.372 121.428Z" fill="#CDE0FF" />
      </svg>*/}
      <SubHeading>Welcome to your new Web3 community</SubHeading>
      <Row style={{ padding: "2.25em", alignItems: "flex-start", zIndex: "2" }}>
        <List>
          <h4>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.75 17.9375H50.3125C53.4538 17.9375 56 15.3912 56 12.25V5.6875C56 2.54625 53.4538 0 50.3125 0H43.75C40.6087 0 38.0625 2.54625 38.0625 5.6875V7.4375H18.375V5.6875C18.375 2.54625 15.8287 0 12.6875 0H5.6875C2.54625 0 0 2.54625 0 5.6875V12.6875C0 15.8287 2.54625 18.375 5.6875 18.375H7.875V22.9688C7.875 26.11 10.4213 28.6562 13.5625 28.6562H17.5V32.1562C17.5 35.2975 20.0462 37.8438 23.1875 37.8438H26.6875V45.5H18.375V43.3125C18.375 40.1712 15.8287 37.625 12.6875 37.625H5.6875C2.54625 37.625 0 40.1712 0 43.3125V50.3125C0 53.4538 2.54625 56 5.6875 56H12.6875C15.8287 56 18.375 53.4538 18.375 50.3125V48.125H37.625V50.3125C37.625 53.4538 40.1712 56 43.3125 56H50.3125C53.4538 56 56 53.4538 56 50.3125V43.3125C56 40.1712 53.4538 37.625 50.3125 37.625H43.3125C40.1712 37.625 37.625 40.1712 37.625 43.3125V45.5H29.3125V29.7063C29.3125 29.085 29.6931 28.6562 30.1263 28.6562H30.1744C30.6513 28.6562 31.0363 28.9931 31.1325 29.4219L32.2044 37.4631C32.235 37.6819 32.4188 37.8438 32.6375 37.8438H32.8169C35.9581 37.8438 38.5044 35.2975 38.5044 32.1562V22.5312C38.5044 19.39 35.9581 16.8438 32.8169 16.8438H23.1919C20.0506 16.8438 17.5044 19.39 17.5044 22.5312V26.0312H13.5669C11.8737 26.0312 10.5044 24.6619 10.5044 22.9688V18.375H12.6919C15.8331 18.375 18.3794 15.8287 18.3794 12.6875V10.0625H38.0669V12.25C38.0669 15.3912 40.6131 17.9375 43.7544 17.9375H43.75Z"
                fill="#66A0FF"
              />
            </svg>
            Backers
          </h4>
          <p>Access the most promising projects and founders</p>
          <ul>
            <li>
              {listSymbol} Vetted projects with the best chances of success
            </li>
            <li>{listSymbol} Refined GTM strategies and business models</li>
            <li>
              {listSymbol} Detailed profiles with everyting you need to evaluate
              teams and projects
            </li>
          </ul>
        </List>
        <List>
          <h4>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.6932 30.1863C52.0726 30.1863 55.5813 26.3801 55.0826 21.9001C54.7019 18.492 51.9501 15.7401 48.5419 15.3595C44.0619 14.8607 40.2557 18.3695 40.2557 22.7488C40.2557 22.9632 40.2688 23.1732 40.2863 23.3832L34.6557 24.897C33.9732 23.2345 32.8751 21.7863 31.4969 20.6795L35.3688 14.3576C36.5676 14.8257 37.9107 15.0051 39.3238 14.7645C42.5701 14.2045 45.1207 11.5051 45.4619 8.22822C45.9651 3.43322 41.8701 -0.578654 37.0444 0.0688461C33.7632 0.506346 31.1251 3.1576 30.6963 6.43885C30.3551 9.04197 31.3744 11.422 33.1332 12.9882L29.2613 19.3101C27.9444 18.7107 26.4832 18.3782 24.9432 18.3782C22.8694 18.3782 20.9357 18.9863 19.3038 20.0276L13.5594 13.1063C14.8938 11.527 15.5894 9.38322 15.2176 7.08635C14.7013 3.8926 12.0851 1.36385 8.87818 0.943846C4.02193 0.305096 -0.0905683 4.39135 0.500057 9.24322C0.898182 12.5245 3.51006 15.1932 6.78256 15.6701C8.52381 15.9238 10.1688 15.5607 11.5426 14.7776L17.2869 21.6988C15.5282 23.5757 14.4432 26.1001 14.4432 28.8738C14.4432 31.0482 15.1082 33.0651 16.2413 34.7451L12.0807 38.3851C10.6019 37.1995 8.66381 36.5651 6.57693 36.8013C3.22131 37.182 0.491307 39.8638 0.0625567 43.2151C-0.558693 48.0713 3.53631 52.1751 8.38818 51.567C11.5819 51.1688 14.1938 48.6838 14.7538 45.5163C15.0907 43.6176 14.6838 41.8282 13.8001 40.3626L17.9651 36.7182C19.8201 38.3676 22.2613 39.3738 24.9344 39.3738C27.2269 39.3738 29.3488 38.6345 31.0769 37.3788L37.3594 44.112C36.1694 45.6957 35.5876 47.7651 35.9988 49.9701C36.5544 52.9276 38.9126 55.3032 41.8701 55.8588C46.9319 56.8126 51.3244 52.5951 50.6813 47.577C50.2657 44.3526 47.7282 41.732 44.5213 41.2157C42.5788 40.9051 40.7501 41.3601 39.2801 42.3138L26.5576 28.9001C26.1769 28.502 26.1551 27.9901 26.4351 27.7232L26.4657 27.6926C26.7719 27.3995 27.2269 27.3776 27.5507 27.5963L34.0563 32.807C34.2882 32.9951 34.6338 32.8945 34.7432 32.6145C35.1894 31.4507 35.4388 30.1907 35.4388 28.8695C35.4388 28.3795 35.4038 27.8982 35.3382 27.4301L40.9688 25.912C42.1632 28.432 44.7226 30.182 47.6888 30.182L47.6932 30.1863Z"
                fill="#66A0FF"
              />
            </svg>
            Founders
          </h4>
          <p>Find support at every stage of your journey</p>
          <ul>
            <li>{listSymbol} Early stage accelerator programming</li>
            <li>
              {listSymbol} Support vendors (e.g. legal, marketing, technical)
            </li>
            <li>{listSymbol} Self-service learning resources and tooling</li>
            <li>{listSymbol} Thriving community of founders and mentors</li>
          </ul>
        </List>
        <List>
          <h4>
            <svg
              width="57"
              height="56"
              viewBox="0 0 57 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.5066 20.1786C34.0554 20.1786 38.5714 15.6516 38.5714 10.0893C38.5714 4.52702 34.0554 0 28.5066 0C22.9578 0 18.4417 4.52702 18.4417 10.0893C18.4417 15.6516 22.9578 20.1786 28.5066 20.1786ZM11.1687 26.434C14.7877 26.434 17.7328 23.4817 17.7328 19.854C17.7328 16.2262 14.7877 13.274 11.1687 13.274C7.54978 13.274 4.60471 16.2262 4.60471 19.854C4.60471 23.4817 7.54978 26.434 11.1687 26.434ZM45.5074 26.434C49.1264 26.434 52.0715 23.4817 52.0715 19.854C52.0715 16.2262 49.1264 13.274 45.5074 13.274C41.8885 13.274 38.9434 16.2262 38.9434 19.854C38.9434 23.4817 41.8885 26.434 45.5074 26.434ZM50.8243 29.316H41.2145C40.8251 26.548 38.4576 24.4161 35.587 24.4161H21.8594C18.9887 24.4161 16.6213 26.548 16.2318 29.316H6.18883C3.04685 29.316 0.5 31.869 0.5 35.0186V47.7092C0.5 48.5646 0.990115 49.3411 1.75592 49.7227C4.95042 51.3107 8.30245 52.6267 11.7814 53.6356C12.0396 53.7102 12.3065 53.5347 12.3371 53.2671L12.8316 49.42L14.6127 35.4705C14.6958 35.0888 15.0197 34.7862 15.431 34.7862H15.4704C15.838 34.7862 16.1662 35.1678 16.1662 35.7249V54.3594C16.1662 54.5699 16.315 54.7498 16.5163 54.7937C20.389 55.5789 24.3931 56 28.4978 56C32.6025 56 36.9217 55.5438 40.9389 54.7015C41.1402 54.6577 41.2889 54.4778 41.2889 54.2673V49.42V35.7249C41.2889 35.1722 41.6303 34.7862 42.011 34.7862H42.0547C42.4792 34.7862 42.8205 35.0844 42.9037 35.4705L45.1005 53.1311C45.1355 53.3987 45.4024 53.5786 45.6606 53.4996C48.982 52.5126 52.1852 51.2449 55.2397 49.7227C56.0055 49.3411 56.5 48.5646 56.5 47.7048V35.0143C56.5 31.8646 53.9532 29.3116 50.8112 29.3116L50.8243 29.316Z"
                fill="#66A0FF"
              />
            </svg>
            Contributors
          </h4>
          <p>
            Partner with businesses to help them on the road to launch and
            beyond
          </p>
          <ul>
            <li>{listSymbol} Services (e.g. legal, marketing, product)</li>
            <li>{listSymbol} Mentorship</li>
            <li>{listSymbol} Full and part time talent</li>
          </ul>
        </List>
      </Row>
    </Section>
    <Section className="blue" style={{ padding: "2em 0 4em 0" }}>
      <Narrow>
        <SectionHeader>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.6932 30.1863C52.0726 30.1863 55.5813 26.3801 55.0826 21.9001C54.7019 18.492 51.9501 15.7401 48.5419 15.3595C44.0619 14.8607 40.2557 18.3695 40.2557 22.7488C40.2557 22.9632 40.2688 23.1732 40.2863 23.3832L34.6557 24.897C33.9732 23.2345 32.8751 21.7863 31.4969 20.6795L35.3688 14.3576C36.5676 14.8257 37.9107 15.0051 39.3238 14.7645C42.5701 14.2045 45.1207 11.5051 45.4619 8.22822C45.9651 3.43322 41.8701 -0.578654 37.0444 0.0688461C33.7632 0.506346 31.1251 3.1576 30.6963 6.43885C30.3551 9.04197 31.3744 11.422 33.1332 12.9882L29.2613 19.3101C27.9444 18.7107 26.4832 18.3782 24.9432 18.3782C22.8694 18.3782 20.9357 18.9863 19.3038 20.0276L13.5594 13.1063C14.8938 11.527 15.5894 9.38322 15.2176 7.08635C14.7013 3.8926 12.0851 1.36385 8.87818 0.943846C4.02193 0.305096 -0.0905683 4.39135 0.500057 9.24322C0.898182 12.5245 3.51006 15.1932 6.78256 15.6701C8.52381 15.9238 10.1688 15.5607 11.5426 14.7776L17.2869 21.6988C15.5282 23.5757 14.4432 26.1001 14.4432 28.8738C14.4432 31.0482 15.1082 33.0651 16.2413 34.7451L12.0807 38.3851C10.6019 37.1995 8.66381 36.5651 6.57693 36.8013C3.22131 37.182 0.491307 39.8638 0.0625567 43.2151C-0.558693 48.0713 3.53631 52.1751 8.38818 51.567C11.5819 51.1688 14.1938 48.6838 14.7538 45.5163C15.0907 43.6176 14.6838 41.8282 13.8001 40.3626L17.9651 36.7182C19.8201 38.3676 22.2613 39.3738 24.9344 39.3738C27.2269 39.3738 29.3488 38.6345 31.0769 37.3788L37.3594 44.112C36.1694 45.6957 35.5876 47.7651 35.9988 49.9701C36.5544 52.9276 38.9126 55.3032 41.8701 55.8588C46.9319 56.8126 51.3244 52.5951 50.6813 47.577C50.2657 44.3526 47.7282 41.732 44.5213 41.2157C42.5788 40.9051 40.7501 41.3601 39.2801 42.3138L26.5576 28.9001C26.1769 28.502 26.1551 27.9901 26.4351 27.7232L26.4657 27.6926C26.7719 27.3995 27.2269 27.3776 27.5507 27.5963L34.0563 32.807C34.2882 32.9951 34.6338 32.8945 34.7432 32.6145C35.1894 31.4507 35.4388 30.1907 35.4388 28.8695C35.4388 28.3795 35.4038 27.8982 35.3382 27.4301L40.9688 25.912C42.1632 28.432 44.7226 30.182 47.6888 30.182L47.6932 30.1863Z"
              fill="#66A0FF"
            />
          </svg>
          Web3 Founders
        </SectionHeader>
        <Row>
          <img
            src={mapImage(foundersImages[0])}
            alt="Join an acceleration program"
          />
          <SubSection>
            <h4>Join an acceleration program</h4>
            <p>
              Join an accelerator cohort where you will participate in live
              sessions focused on building, launching, and scaling a successful
              Web3 business.
            </p>
          </SubSection>
        </Row>
        <Row className="reverse">
          <img
            src={mapImage(foundersImages[1])}
            alt="Connect with top backers"
          />
          <SubSection>
            <h4>Connect with top backers</h4>
            <p>
              Whether you are have joined an accelerator cohort or chosen the
              self-guided path, you will have all the resources necessary to
              fill any missing gaps in your GTM strategy, polish your business
              model, build a winning pitch, and connect to potential backers
              looking for founders just like you.
            </p>
          </SubSection>
        </Row>
        <Row>
          <img
            src={mapImage(foundersImages[2])}
            alt="Fulfill your business needs"
          />
          <SubSection>
            <h4>Fulfill your business needs</h4>
            <p>
              Easily source reputable contributors for any and every business
              need you have, including back office finance management,
              recruitment, development, legal, and marketing.
            </p>
          </SubSection>
        </Row>
        <SectionHeader>
          <svg
            width="57"
            height="56"
            viewBox="0 0 57 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.5066 20.1786C34.0554 20.1786 38.5714 15.6516 38.5714 10.0893C38.5714 4.52702 34.0554 0 28.5066 0C22.9578 0 18.4417 4.52702 18.4417 10.0893C18.4417 15.6516 22.9578 20.1786 28.5066 20.1786ZM11.1687 26.434C14.7877 26.434 17.7328 23.4817 17.7328 19.854C17.7328 16.2262 14.7877 13.274 11.1687 13.274C7.54978 13.274 4.60471 16.2262 4.60471 19.854C4.60471 23.4817 7.54978 26.434 11.1687 26.434ZM45.5074 26.434C49.1264 26.434 52.0715 23.4817 52.0715 19.854C52.0715 16.2262 49.1264 13.274 45.5074 13.274C41.8885 13.274 38.9434 16.2262 38.9434 19.854C38.9434 23.4817 41.8885 26.434 45.5074 26.434ZM50.8243 29.316H41.2145C40.8251 26.548 38.4576 24.4161 35.587 24.4161H21.8594C18.9887 24.4161 16.6213 26.548 16.2318 29.316H6.18883C3.04685 29.316 0.5 31.869 0.5 35.0186V47.7092C0.5 48.5646 0.990115 49.3411 1.75592 49.7227C4.95042 51.3107 8.30245 52.6267 11.7814 53.6356C12.0396 53.7102 12.3065 53.5347 12.3371 53.2671L12.8316 49.42L14.6127 35.4705C14.6958 35.0888 15.0197 34.7862 15.431 34.7862H15.4704C15.838 34.7862 16.1662 35.1678 16.1662 35.7249V54.3594C16.1662 54.5699 16.315 54.7498 16.5163 54.7937C20.389 55.5789 24.3931 56 28.4978 56C32.6025 56 36.9217 55.5438 40.9389 54.7015C41.1402 54.6577 41.2889 54.4778 41.2889 54.2673V49.42V35.7249C41.2889 35.1722 41.6303 34.7862 42.011 34.7862H42.0547C42.4792 34.7862 42.8205 35.0844 42.9037 35.4705L45.1005 53.1311C45.1355 53.3987 45.4024 53.5786 45.6606 53.4996C48.982 52.5126 52.1852 51.2449 55.2397 49.7227C56.0055 49.3411 56.5 48.5646 56.5 47.7048V35.0143C56.5 31.8646 53.9532 29.3116 50.8112 29.3116L50.8243 29.316Z"
              fill="#66A0FF"
            />
          </svg>
          Contributors
        </SectionHeader>
        <Row className="reverse">
          <img
            src={mapImage(contributorsImage)}
            alt="Contribute and earn as an individual"
          />
          <SubSection>
            <h4>Contribute and earn as an individual</h4>
            <p>
              Join a growing community of founders building top Web3 projects
              who are looking for support. Whether you are an individual
              contributor or a global vendor, you can tap into a growing pool of
              projects that are hungry for what you have to offer.
            </p>
          </SubSection>
        </Row>
        <SectionHeader>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.75 17.9375H50.3125C53.4538 17.9375 56 15.3912 56 12.25V5.6875C56 2.54625 53.4538 0 50.3125 0H43.75C40.6087 0 38.0625 2.54625 38.0625 5.6875V7.4375H18.375V5.6875C18.375 2.54625 15.8287 0 12.6875 0H5.6875C2.54625 0 0 2.54625 0 5.6875V12.6875C0 15.8287 2.54625 18.375 5.6875 18.375H7.875V22.9688C7.875 26.11 10.4213 28.6562 13.5625 28.6562H17.5V32.1562C17.5 35.2975 20.0462 37.8438 23.1875 37.8438H26.6875V45.5H18.375V43.3125C18.375 40.1712 15.8287 37.625 12.6875 37.625H5.6875C2.54625 37.625 0 40.1712 0 43.3125V50.3125C0 53.4538 2.54625 56 5.6875 56H12.6875C15.8287 56 18.375 53.4538 18.375 50.3125V48.125H37.625V50.3125C37.625 53.4538 40.1712 56 43.3125 56H50.3125C53.4538 56 56 53.4538 56 50.3125V43.3125C56 40.1712 53.4538 37.625 50.3125 37.625H43.3125C40.1712 37.625 37.625 40.1712 37.625 43.3125V45.5H29.3125V29.7063C29.3125 29.085 29.6931 28.6562 30.1263 28.6562H30.1744C30.6513 28.6562 31.0363 28.9931 31.1325 29.4219L32.2044 37.4631C32.235 37.6819 32.4188 37.8438 32.6375 37.8438H32.8169C35.9581 37.8438 38.5044 35.2975 38.5044 32.1562V22.5312C38.5044 19.39 35.9581 16.8438 32.8169 16.8438H23.1919C20.0506 16.8438 17.5044 19.39 17.5044 22.5312V26.0312H13.5669C11.8737 26.0312 10.5044 24.6619 10.5044 22.9688V18.375H12.6919C15.8331 18.375 18.3794 15.8287 18.3794 12.6875V10.0625H38.0669V12.25C38.0669 15.3912 40.6131 17.9375 43.7544 17.9375H43.75Z"
              fill="#66A0FF"
            />
          </svg>
          Web3 Investors
        </SectionHeader>
        <Row>
          <img
            src={mapImage(investorsImage)}
            alt="Find the next big innovation in Web3"
          />
          <SubSection>
            <h4>Find the next big innovation in Web3</h4>
            <p>
              Gain access to nurtured projects ready for backers with details on
              their GTM strategies, pitch decks, team profiles, previous work,
              white papers and more.
            </p>
          </SubSection>
          {/*<svg width="214" height="184" viewBox="0 0 429 369" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: "auto auto -1px 0" }}>
            <path d="M0 368.43H428.538C369.254 357.09 341.966 331.14 312.723 303.331C284.964 276.933 255.443 248.86 195.123 230.014C67.5881 190.168 61.1408 155.097 52.6129 108.708C47.0914 78.6724 40.6976 43.8925 0 0V368.43Z" fill="white" />
          </svg>*/}
        </Row>
      </Narrow>
    </Section>
    <Footer style={{ padding: "2em 0 8em 0" }}>
      <img src={mapImage(endingImage)} alt="Accelerate your Web3 Startup!" />
      <h2>Accelerate your Web3 Startup!</h2>
      <Link href="/nearhorizon.near/widget/Index">Try it Now</Link>
    </Footer>
  </Container>
);
