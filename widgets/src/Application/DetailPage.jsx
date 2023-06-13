const ownerId = "nearhorizon.near";
const accountId = props.accountId ?? context.accountId;

const EncodeStyle = styled.svg`
  .cls-1 {
    fill: url("#linear-gradient");
  }
  .cls-2 {
    fill: #fff;
  }
`;

const MLHStyle = styled.svg`
  .cls-1 {
    fill: #242425;
  }
  .cls-2 {
    fill: #e73427;
  }
  .cls-3 {
    fill: #1d539f;
  }
  .cls-4 {
    fill: #f8b92a;
  }
`;

const items = [
  {
    name: "Encode Club",
    imageSvg: true,
    imageSrc: (
      <EncodeStyle
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 141.73 141.73"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="22.1"
            y1="21.51"
            x2="120.47"
            y2="119.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0bc6df" />
            <stop offset="0.13" stop-color="#0ab3df" />
            <stop offset="0.4" stop-color="#0781de" />
            <stop offset="0.77" stop-color="#0332de" />
            <stop offset="0.99" stop-color="#00d" />
          </linearGradient>
        </defs>
        <rect
          class="cls-1"
          x="1.72"
          y="1.14"
          width="139.12"
          height="139.12"
          rx="69.56"
          ry="69.56"
        />
        <path
          class="cls-2"
          d="M122.24,73.77a.78.78,0,0,1,.5.31l1.12,1.22a.84.84,0,0,1,0,1.19,8,8,0,0,1-5.4,1.76c-5,0-8.28-3.15-8.28-7.47s3.29-7.47,7.76-7.47c3.62,0,6.68,2.11,7.35,5.8a1.57,1.57,0,0,1-1.25,1.8l-9.34,1.81a3.83,3.83,0,0,0,3.86,2.15,5,5,0,0,0,2.86-.79l.32-.19A.77.77,0,0,1,122.24,73.77Zm-1-5.17a3.37,3.37,0,0,0-3.3-2.11,3.48,3.48,0,0,0-3.61,3.41Z"
        />
        <path
          class="cls-2"
          d="M93.28,88.92A3.09,3.09,0,0,1,98.64,87l-.83.77a1.81,1.81,0,0,0-1.41-.66,1.8,1.8,0,1,0,0,3.59,1.79,1.79,0,0,0,1.41-.67l.83.77a3.09,3.09,0,0,1-5.36-1.9Z"
        />
        <path class="cls-2" d="M101.81,86.11h1.3v4.56h2.82v1.06h-4.11Z" />
        <path
          class="cls-2"
          d="M108.83,89.26V86.11h1.3v3.1c0,1.07.47,1.51,1.25,1.51s1.25-.44,1.25-1.51v-3.1h1.28v3.14a2.54,2.54,0,1,1-5.09,0Z"
        />
        <path
          class="cls-2"
          d="M122.65,90.2c0,1-.77,1.53-2.25,1.53h-2.9V86.11h2.74c1.4,0,2.12.59,2.12,1.46a1.35,1.35,0,0,1-.75,1.24A1.39,1.39,0,0,1,122.65,90.2Zm-3.86-3.1v1.32h1.29c.63,0,1-.22,1-.67s-.34-.66-1-.66Zm2.55,3c0-.47-.36-.7-1-.7h-1.52v1.39h1.52C121,90.75,121.34,90.54,121.34,90.06Z"
        />
        <path
          class="cls-2"
          d="M30.5,73.77a.78.78,0,0,1,.5.31l1.12,1.22a.84.84,0,0,1,0,1.19,8,8,0,0,1-5.4,1.76c-5,0-8.28-3.15-8.28-7.47s3.29-7.47,7.76-7.47c3.62,0,6.68,2.11,7.35,5.8a1.57,1.57,0,0,1-1.25,1.8L23,72.72a3.83,3.83,0,0,0,3.86,2.15,5,5,0,0,0,2.86-.79l.32-.19A.77.77,0,0,1,30.5,73.77Zm-1-5.17a3.37,3.37,0,0,0-3.3-2.11,3.48,3.48,0,0,0-3.61,3.41Z"
        />
        <path
          class="cls-2"
          d="M51.45,69.73v7.44a.85.85,0,0,1-.85.85H48.1a.85.85,0,0,1-.85-.85V70.38C47.24,68,46.17,67,44.31,67c-2,0-3.48,1.24-3.48,3.9v6.31A.85.85,0,0,1,40,78H37.49a.85.85,0,0,1-.85-.85V64.39a.85.85,0,0,1,.85-.85h2.2c.73,0,1,.38,1,1v.69a6.34,6.34,0,0,1,4.79-1.91C48.86,63.32,51.45,65.32,51.45,69.73Z"
        />
        <path
          class="cls-2"
          d="M55.22,70.78c0-4.36,3.37-7.46,8.08-7.46a6.87,6.87,0,0,1,6.09,2.94A.83.83,0,0,1,69,67.42l-1.85,1a.86.86,0,0,1-1.08-.27,3.5,3.5,0,0,0-2.84-1.37,4,4,0,0,0,0,8,3.47,3.47,0,0,0,2.84-1.36.86.86,0,0,1,1.09-.27l1.83,1a.87.87,0,0,1,.28,1.26,7,7,0,0,1-6,2.81C58.59,78.24,55.22,75.15,55.22,70.78Z"
        />
        <path
          class="cls-2"
          d="M72.21,70.9c0-4.36,3.37-7.46,8-7.46s7.94,3.1,7.94,7.46-3.34,7.46-7.94,7.46S72.21,75.26,72.21,70.9Zm11.66,0c0-2.5-1.59-4-3.69-4a4,4,0,0,0,0,8C82.28,74.91,83.87,73.4,83.87,70.9Z"
        />
        <path
          class="cls-2"
          d="M106.89,60.85V77.17A.85.85,0,0,1,106,78H103.8a.89.89,0,0,1-.92-.91v-.76a5.57,5.57,0,0,1-4.52,1.88,7,7,0,0,1-7.24-7.46,7,7,0,0,1,7.24-7.46,5.56,5.56,0,0,1,4.33,1.75V60.85a.85.85,0,0,1,.85-.85H106A.85.85,0,0,1,106.89,60.85Zm-4.12,9.93a3.71,3.71,0,1,0-3.69,4A3.67,3.67,0,0,0,102.77,70.78Z"
        />
        <path
          class="cls-2"
          d="M118.15,34.47A1.15,1.15,0,1,0,117,35.63,1.15,1.15,0,0,0,118.15,34.47Zm0,18.2A1.15,1.15,0,1,0,117,53.83,1.15,1.15,0,0,0,118.15,52.68Zm0,54.61a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,118.15,107.29ZM99.95,52.68a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,99.95,52.68Zm0,54.61a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,99.95,107.29ZM81.75,34.47a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,81.75,34.47Zm0,18.2a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,81.75,52.68Zm0,36.41a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,81.75,89.09Zm0,18.2a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,81.75,107.29ZM63.54,34.47a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,63.54,34.47Zm0,18.2a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,63.54,52.68Zm0,36.41a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,63.54,89.09Zm-18.2,0a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,45.34,89.09Zm0,18.2a1.15,1.15,0,1,0-1.15,1.15A1.15,1.15,0,0,0,45.34,107.29ZM27.14,34.47A1.15,1.15,0,1,0,26,35.63,1.15,1.15,0,0,0,27.14,34.47Zm0,18.2A1.15,1.15,0,1,0,26,53.83,1.15,1.15,0,0,0,27.14,52.68Zm0,36.41A1.15,1.15,0,1,0,26,90.24,1.15,1.15,0,0,0,27.14,89.09Z"
        />
      </EncodeStyle>
    ),
    subheader: "Hackathon, Accelerator",
    open: true,
    tagline: (
      <>
        Encode Club is a web3 education community. We help ambitious, talented
        people achieve their personal and professional goals together in web3.
        We do this through organizing great programs like educational workshops,
        hackathons, coding bootcamps and accelerators in partnership with the
        leading blockchain protocols. With a track record of over 100 programmes
        and 10,000s developers trained, Encode helps developers learn, hack and
        build their own Web3 startups.
      </>
    ),
    href: "https://www.encode.club/near2023",
    duration: "Rolling applications",
    // equity: "4%",
    chain: "Chain agnostic",
    location: "Global",
    tags: { Generalist: "" },
    linktree: {
      twitter: "encodeclub",
      discord: "invite/encodeclub",
      website: "www.encode.club",
    },
  },
  {
    name: "Outlier Ventures",
    imageSvg: false,
    imageSrc:
      "https://outlierventures.io/wp-content/uploads/2019/11/Outlier_Ventures_Official_logo_Black-5-e1574692790237.png",
    subheader: "Startup Accelerator",
    open: true,
    tagline: (
      <>
        Outlier Ventures has been backing Web 3 founders since 2014 and is the
        world’s leading Open Metaverse accelerator program, and was one of the
        first VC firms dedicated to investing in the emerging crypto ecosystem.
        Their portfolio includes notable projects across DeFi, NFTs and
        blockchain infrastructure with a focus on emergent Open Metaverse use
        cases such as NFT-based play-to-earn games, augmented reality and more.
        <br />
        The NEAR Base Camp is the NEAR Foundation & Outlier Ventures accelerator
        program, actively looking to support teams building real-world use
        cases, web2.5, AI and infrastructure for scalability. Outlier Ventures
        provides funding, mentorship, and strategic support to the selected
        projects.
      </>
    ),
    href: "https://outlierventures.io/base-camp/near/",
    duration: "12 weeks",
    // equity: "4%",
    chain: "NEAR Native",
    location: "Global",
    tags: {
      AI: "",
      Gaming: "",
      "Web2.5": "",
      Infrastructure: "",
      "Real-world Use Cases": "",
    },
    linktree: {
      website: "outlierventures.io",
    },
  },
  {
    name: "Major League Hacking",
    imageSvg: true,
    imageSrc: (
      <MLHStyle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.59 130.78">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="mlh-logo-color-dark">
              <g id="Major_League_Hacking" data-name="Major League Hacking">
                <path
                  class="cls-1"
                  d="M15.65,114.54a2.79,2.79,0,0,1,1.68,2.51v13.22a.45.45,0,0,1-.45.44H13.62a.39.39,0,0,1-.3-.12.47.47,0,0,1-.12-.32v-12H10.57v12a.45.45,0,0,1-.12.31.34.34,0,0,1-.3.13h-3a.44.44,0,0,1-.44-.44h0v-12H4.13v12a.39.39,0,0,1-.33.44H.45A.4.4,0,0,1,0,130.4V114.76a.39.39,0,0,1,.33-.44H14.57A2.52,2.52,0,0,1,15.65,114.54Z"
                />
                <path
                  class="cls-1"
                  d="M32,114.32A2.75,2.75,0,0,1,34.55,116a2.56,2.56,0,0,1,.23,1.06v13.22a.42.42,0,0,1-.42.44H31.08a.45.45,0,0,1-.45-.44h0v-4.2a.44.44,0,0,0-.11-.31.38.38,0,0,0-.31-.13H25.57a.45.45,0,0,0-.45.44h0v4.2a.38.38,0,0,1-.32.44H21.45a.38.38,0,0,1-.45-.32V117.06a2.75,2.75,0,0,1,.21-1.06,2.6,2.6,0,0,1,.59-.91,2.91,2.91,0,0,1,.91-.59,2.58,2.58,0,0,1,1.06-.22Zm-1.41,7.81V118h-5.5v4.12Z"
                />
                <path
                  class="cls-1"
                  d="M49.52,114.45a.37.37,0,0,1,.13.31V128a2.58,2.58,0,0,1-.22,1.06,3,3,0,0,1-.59.91,2.47,2.47,0,0,1-.9.59,2.8,2.8,0,0,1-1.07.21h-7a2.8,2.8,0,0,1-1.07-.21A2.74,2.74,0,0,1,37.12,128v-5a.4.4,0,0,1,.33-.45H40.8a.41.41,0,0,1,.45.33v3.47a.41.41,0,0,0,.12.31.46.46,0,0,0,.32.11h3.4a.44.44,0,0,0,.31-.11.38.38,0,0,0,.13-.31V114.76a.45.45,0,0,1,.12-.31.37.37,0,0,1,.31-.13h3.26A.39.39,0,0,1,49.52,114.45Z"
                />
                <path
                  class="cls-1"
                  d="M64.35,114.32a2.58,2.58,0,0,1,1.06.22A2.64,2.64,0,0,1,66.86,116a2.56,2.56,0,0,1,.23,1.06v10.89a2.64,2.64,0,0,1-.23,1.07,2.78,2.78,0,0,1-.58.9,2.51,2.51,0,0,1-.91.59,2.54,2.54,0,0,1-1.06.21H56.05A2.61,2.61,0,0,1,55,130.5a2.71,2.71,0,0,1-1.68-2.5V117.11a2.8,2.8,0,0,1,.21-1.07,2.45,2.45,0,0,1,.58-.9,2.91,2.91,0,0,1,.91-.59,2.55,2.55,0,0,1,1.06-.22Zm-1.41,4h-5.5v8.44H63Z"
                />
                <path
                  class="cls-1"
                  d="M85.06,130.35a.22.22,0,0,1,0,.27.27.27,0,0,1-.25.11H81.09a.7.7,0,0,1-.37-.11.75.75,0,0,1-.29-.27L78,125.9a.17.17,0,0,0-.17-.09H75a.1.1,0,0,0-.12.08,0,0,0,0,0,0,0v4.36a.38.38,0,0,1-.34.43H71.21a.39.39,0,0,1-.44-.32.24.24,0,0,1,0-.12V114.76a.38.38,0,0,1,.32-.44H81.81a2.62,2.62,0,0,1,1.06.22A2.78,2.78,0,0,1,84.32,116a2.58,2.58,0,0,1,.22,1.06v6.16a2.66,2.66,0,0,1-.53,1.61,2.58,2.58,0,0,1-1.35,1h-.07c-.11,0-.14.08-.08.14v0ZM80.4,118.14H74.75v4H80.4Z"
                />
                <path
                  class="cls-1"
                  d="M107.12,126.74a.39.39,0,0,1,.31.12.47.47,0,0,1,.12.32v3.1a.45.45,0,0,1-.12.31.37.37,0,0,1-.31.13H97a.4.4,0,0,1-.45-.32V114.76a.39.39,0,0,1,.33-.44h3.35a.39.39,0,0,1,.44.33.2.2,0,0,1,0,.11v11.56a.4.4,0,0,0,.13.31.47.47,0,0,0,.32.12Z"
                />
                <path
                  class="cls-1"
                  d="M122.28,114.45a.4.4,0,0,1,.13.31v2.95a.37.37,0,0,1-.13.31.45.45,0,0,1-.31.12h-7.86a.09.09,0,0,0-.11.08s0,0,0,0v2.55c0,.06,0,.09.11.09h6.7a.37.37,0,0,1,.3.13.45.45,0,0,1,.12.31v2.35a.45.45,0,0,1-.12.31.37.37,0,0,1-.3.13h-6.7a.1.1,0,0,0-.11.08,0,0,0,0,0,0,0v2.53a.09.09,0,0,0,.07.12H122a.44.44,0,0,1,.44.43v3a.43.43,0,0,1-.43.44H110.32a.4.4,0,0,1-.45-.32V114.76a.45.45,0,0,1,.45-.44H122A.42.42,0,0,1,122.28,114.45Z"
                />
                <path
                  class="cls-1"
                  d="M137.15,114.32a2.6,2.6,0,0,1,1.07.22,2.69,2.69,0,0,1,1.46,1.45,2.55,2.55,0,0,1,.22,1.06v13.22a.42.42,0,0,1-.42.44h-3.31a.44.44,0,0,1-.44-.44h0v-4.2a.45.45,0,0,0-.12-.31.37.37,0,0,0-.31-.13h-4.57a.45.45,0,0,0-.45.44h0v4.2a.39.39,0,0,1-.33.44H126.6a.38.38,0,0,1-.44-.32.24.24,0,0,1,0-.12V117.06a2.75,2.75,0,0,1,.21-1.06,2.6,2.6,0,0,1,.59-.91,2.91,2.91,0,0,1,.91-.59,2.55,2.55,0,0,1,1.06-.22Zm-1.4,7.81V118h-5.51v4.12Z"
                />
                <path
                  class="cls-1"
                  d="M157.2,121.9a.41.41,0,0,1,.12.32V128a2.58,2.58,0,0,1-.22,1.06,3.21,3.21,0,0,1-.58.91,2.6,2.6,0,0,1-.91.59,2.78,2.78,0,0,1-1.06.21h-8.3a2.73,2.73,0,0,1-2.74-2.74v-10.9a2.78,2.78,0,0,1,.21-1.06,2.44,2.44,0,0,1,.58-.91,3,3,0,0,1,.9-.59,2.81,2.81,0,0,1,1.07-.22H156a.45.45,0,0,1,.45.45h0v3.09a.45.45,0,0,1-.45.45h-7.85a.47.47,0,0,0-.32.12.44.44,0,0,0-.13.31v7.59a.42.42,0,0,0,.13.3.43.43,0,0,0,.32.12h4.64a.4.4,0,0,0,.42-.38v-4.14a.42.42,0,0,1,.42-.44h3.28A.43.43,0,0,1,157.2,121.9Z"
                />
                <path
                  class="cls-1"
                  d="M174.49,114.45a.44.44,0,0,1,.13.31V128a2.59,2.59,0,0,1-.23,1.06,3,3,0,0,1-.58.91,2.6,2.6,0,0,1-.91.59,2.8,2.8,0,0,1-1.07.21h-8.3a2.78,2.78,0,0,1-1.06-.21A2.75,2.75,0,0,1,161,129.1a2.8,2.8,0,0,1-.21-1.07V114.76a.39.39,0,0,1,.33-.44h3.35a.39.39,0,0,1,.44.33.2.2,0,0,1,0,.11v11.56a.4.4,0,0,0,.13.31.47.47,0,0,0,.32.12H170a.42.42,0,0,0,.3-.12.37.37,0,0,0,.12-.31V114.76a.45.45,0,0,1,.45-.44h3.26A.39.39,0,0,1,174.49,114.45Z"
                />
                <path
                  class="cls-1"
                  d="M190.73,114.45a.44.44,0,0,1,.13.31v2.95a.4.4,0,0,1-.13.31.47.47,0,0,1-.32.12h-7.85a.1.1,0,0,0-.12.08v2.59c0,.06,0,.09.12.09h6.7a.39.39,0,0,1,.3.13.45.45,0,0,1,.12.31v2.35a.45.45,0,0,1-.12.31.39.39,0,0,1-.3.13h-6.7a.11.11,0,0,0-.12.08v2.57a.1.1,0,0,0,.08.12h7.89a.45.45,0,0,1,.45.43v3a.44.44,0,0,1-.43.44H178.77a.39.39,0,0,1-.45-.32.24.24,0,0,1,0-.12V114.76a.45.45,0,0,1,.45-.44h11.64A.42.42,0,0,1,190.73,114.45Z"
                />
                <path
                  class="cls-1"
                  d="M215.88,114.32a.42.42,0,0,1,.44.42v15.54a.43.43,0,0,1-.43.44h-3.27a.45.45,0,0,1-.45-.44h0v-5.45a.4.4,0,0,0-.38-.42h-4.67a.45.45,0,0,0-.32.12.37.37,0,0,0-.13.31v5.45a.39.39,0,0,1-.33.44.21.21,0,0,1-.11,0H203a.39.39,0,0,1-.44-.33.2.2,0,0,1,0-.11V114.76a.39.39,0,0,1,.33-.44h3.35a.39.39,0,0,1,.44.33.2.2,0,0,1,0,.11V120a.39.39,0,0,0,.33.44h4.75a.39.39,0,0,0,.31-.12.47.47,0,0,0,.12-.32v-5.25a.45.45,0,0,1,.45-.44h3.25Z"
                />
                <path
                  class="cls-1"
                  d="M231.06,114.32a2.6,2.6,0,0,1,1.07.22,2.69,2.69,0,0,1,1.46,1.45,2.55,2.55,0,0,1,.22,1.06v13.22a.42.42,0,0,1-.42.44h-3.28a.44.44,0,0,1-.44-.44v-4.2a.45.45,0,0,0-.12-.31.37.37,0,0,0-.31-.13h-4.65a.44.44,0,0,0-.44.44h0v4.2a.39.39,0,0,1-.33.44h-3.35a.39.39,0,0,1-.45-.32V117.06a2.75,2.75,0,0,1,.21-1.06,2.6,2.6,0,0,1,.59-.91,3,3,0,0,1,.91-.59,2.62,2.62,0,0,1,1.06-.22Zm-1.4,7.81V118h-5.51v4.12Z"
                />
                <path
                  class="cls-1"
                  d="M241.68,118.42a.39.39,0,0,0-.12.31v7.59a.39.39,0,0,0,.12.31.47.47,0,0,0,.32.12h7.53a.42.42,0,0,1,.44.42v3.12a.42.42,0,0,1-.42.44h-9.37a2.71,2.71,0,0,1-1.06-.21,2.6,2.6,0,0,1-.91-.59,2.92,2.92,0,0,1-.79-2V117.07a2.71,2.71,0,0,1,.21-1.06,2.44,2.44,0,0,1,.58-.91,2.91,2.91,0,0,1,.91-.59,2.55,2.55,0,0,1,1.06-.22h9.35a.44.44,0,0,1,.44.43v3.11a.44.44,0,0,1-.42.45H242A.45.45,0,0,0,241.68,118.42Z"
                />
                <path
                  class="cls-1"
                  d="M263,121.23a.12.12,0,0,0,0,.16l5.44,9a.22.22,0,0,1,0,.27.27.27,0,0,1-.25.11h-3.9a.7.7,0,0,1-.37-.11.66.66,0,0,1-.28-.27L260.13,124c0-.09-.09-.09-.12,0l-1.94,2.13a.9.9,0,0,0-.2.34,1.1,1.1,0,0,0-.08.4v3.47a.41.41,0,0,1-.33.45h-3.28a.39.39,0,0,1-.44-.33.24.24,0,0,1,0-.12V114.76a.39.39,0,0,1,.33-.44h3.35a.39.39,0,0,1,.44.33.2.2,0,0,1,0,.11v7l6.05-7.08a1,1,0,0,1,.26-.27.93.93,0,0,1,.4-.09h3.89c.13,0,.2,0,.23.09s0,.15-.08.24Z"
                />
                <path
                  class="cls-1"
                  d="M275.65,130.28a.38.38,0,0,1-.32.44H272a.39.39,0,0,1-.45-.32V114.76a.39.39,0,0,1,.33-.44h3.35a.39.39,0,0,1,.44.33.2.2,0,0,1,0,.11Z"
                />
                <path
                  class="cls-1"
                  d="M291.4,114.54a2.76,2.76,0,0,1,1.46,1.45,2.57,2.57,0,0,1,.21,1.06v13.22a.42.42,0,0,1-.42.44h-3.24a.39.39,0,0,1-.31-.12.47.47,0,0,1-.12-.32V118.72a.37.37,0,0,0-.13-.31.45.45,0,0,0-.31-.12H283.9a.47.47,0,0,0-.32.12.4.4,0,0,0-.13.31v11.56a.39.39,0,0,1-.33.44h-3.35a.39.39,0,0,1-.44-.32.24.24,0,0,1,0-.12V114.76a.39.39,0,0,1,.33-.44h10.71A2.45,2.45,0,0,1,291.4,114.54Z"
                />
                <path
                  class="cls-1"
                  d="M310.41,121.9a.42.42,0,0,1,.13.32V128a2.59,2.59,0,0,1-.23,1.06,2.82,2.82,0,0,1-.58.91,2.51,2.51,0,0,1-.91.59,2.71,2.71,0,0,1-1.06.21h-8.3a2.78,2.78,0,0,1-1.06-.21,2.74,2.74,0,0,1-1.64-2.56V117.11A2.8,2.8,0,0,1,297,116a2.45,2.45,0,0,1,.58-.9,2.91,2.91,0,0,1,.91-.59,2.55,2.55,0,0,1,1.06-.22h9.68a.44.44,0,0,1,.44.44v3.1a.44.44,0,0,1-.44.44h-7.86a.45.45,0,0,0-.31.12.37.37,0,0,0-.13.31v7.59a.37.37,0,0,0,.13.31.4.4,0,0,0,.31.11h4.59a.4.4,0,0,0,.42-.38v-4.14a.42.42,0,0,1,.42-.44h3.28A.43.43,0,0,1,310.41,121.9Z"
                />
              </g>
              <g id="M">
                <path
                  class="cls-2"
                  d="M98.85,1.41A17.32,17.32,0,0,1,108,10.57a16.51,16.51,0,0,1,1.41,6.68v86.06a2.78,2.78,0,0,1-2.75,2.8H86a2.43,2.43,0,0,1-1.92-.82,2.82,2.82,0,0,1-.74-2V25.12H66.79v78.22a2.87,2.87,0,0,1-.74,2,2.52,2.52,0,0,1-1.93.82H45.47a2.78,2.78,0,0,1-2.82-2.74V25.12H26.07v78.22a2.49,2.49,0,0,1-2.82,2.81H2.82A2.49,2.49,0,0,1,0,103.34V2.81A2.49,2.49,0,0,1,2.82,0H92.11A16.46,16.46,0,0,1,98.85,1.41Z"
                />
              </g>
              <g id="L">
                <path
                  class="cls-3"
                  d="M199.19,80.38a2.69,2.69,0,0,1,2,.83,2.89,2.89,0,0,1,.78,2.05v20a2.83,2.83,0,0,1-.78,2,2.67,2.67,0,0,1-2,.84h-70.5c-2,0-3-1-3-2.88V2.88c0-1.92,1-2.88,3-2.88h21.64c2,0,3,1,3,2.88V77.65a2.49,2.49,0,0,0,.91,2,3.09,3.09,0,0,0,2.11.77Z"
                />
              </g>
              <g id="H">
                <path
                  class="cls-4"
                  d="M307.54,0a2.94,2.94,0,0,1,2.14.84,2.76,2.76,0,0,1,.91,2.05V103.57a2.76,2.76,0,0,1-.91,2.05,2.94,2.94,0,0,1-2.14.84H285.62a2.93,2.93,0,0,1-2.13-.84,2.69,2.69,0,0,1-.91-2.05V68.44a2.63,2.63,0,0,0-.79-2,2.82,2.82,0,0,0-2.05-.76H249a3.09,3.09,0,0,0-2.13.76,2.5,2.5,0,0,0-.91,2v35.13c0,1.92-1,2.89-3,2.89H221.2c-2,0-3-1-3-2.89V2.89c0-1.93,1-2.89,3-2.89H243c2,0,3,1,3,2.89V37c0,1.92,1,2.88,3,2.88h30.81a2.74,2.74,0,0,0,2.06-.83,2.93,2.93,0,0,0,.79-2V2.89a2.71,2.71,0,0,1,.9-2.05A2.92,2.92,0,0,1,285.62,0Z"
                />
              </g>
            </g>
          </g>
        </g>
      </MLHStyle>
    ),
    subheader: "Hackathon, Incubator",
    open: true,
    tagline: (
      <>
        Major League Hacking (MLH) is a 500k+ global member community empowering
        the next generation of developers to learn through hackathons and the
        Open Source MLH Fellowship. MLH partners with software engineering,
        human capital management, Open Source, and DevRel leaders who wish to
        support the developers of tomorrow.
      </>
    ),
    href: "https://organize.mlh.io/participants/events/9852-web3-build-hackathon-hosted-in-partnership-with-near-horizon",
    duration: "12 weeks",
    // equity: "4%",
    chain: "NEAR Native",
    location: "Global",
    tags: {
      AI: "",
      Gaming: "",
      "Web2.5": "",
      Infrastructure: "",
      "Real-world Use Cases": "",
    },
    linktree: {
      twitter: "mlhacks",
      github: "mlh-fellowhip",
      website: "fellowship.mlh.io",
    },
  },
];

const data = items.find((item) => item.name === accountId);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  margin-bottom: 0.25em;
`;

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;

  & > span {
    &.open {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #12b76a;
    }

    &.closed {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #ff7966;
    }
  }

  & > h3 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #101828;
  }

  & > h4 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #11181c;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
  padding-top: 0.25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

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
  border-radius: 100%;
  overflow: hidden;
`;

const CTARow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75em;
  margin-top: 1em;
`;

const Admin = styled.div`
  width: 100%;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

const AboutHeading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

const Button = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  height: 2.5em;
  background: #00ec97;
  border-radius: 50px;
  border: 1px solid #00ec97;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

return (
  <Container>
    <Header>
      <ImageContainer title={`${data.name}`} size="94px">
        {data.imageSvg ? (
          data.imageSrc
        ) : (
          <ImageCircle src={data.imageSrc} alt="profile image" />
        )}
      </ImageContainer>
      <HeaderDetails>
        <h3>{data.name}</h3>
        <h4>{data.subheader}</h4>
        <span className={data.open ? "open" : "closed"}>
          {data.open ? (
            <>
              <svg
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3.5" cy="3.5" r="3.5" fill="#12B76A" />
              </svg>
              Receiving applications
            </>
          ) : (
            "Applications closed"
          )}
        </span>
      </HeaderDetails>
    </Header>
    <CTARow>
      <Button href={data.href}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.87464 10.1251L15.7496 2.25013M7.97033 10.3712L9.94141 15.4397C10.1151 15.8862 10.2019 16.1094 10.327 16.1746C10.4354 16.2311 10.5646 16.2312 10.6731 16.1748C10.7983 16.1098 10.8854 15.8866 11.0596 15.4403L16.0023 2.77453C16.1595 2.37164 16.2381 2.1702 16.1951 2.04148C16.1578 1.92969 16.0701 1.84197 15.9583 1.80462C15.8296 1.76162 15.6281 1.84023 15.2252 1.99746L2.55943 6.94021C2.11313 7.11438 1.88997 7.20146 1.82494 7.32664C1.76857 7.43516 1.76864 7.56434 1.82515 7.67279C1.89033 7.7979 2.11358 7.88472 2.56009 8.05836L7.62859 10.0294C7.71923 10.0647 7.76455 10.0823 7.80271 10.1095C7.83653 10.1337 7.86611 10.1632 7.89024 10.1971C7.91746 10.2352 7.93508 10.2805 7.97033 10.3712Z"
            stroke="#11181C"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Apply
      </Button>
    </CTARow>
    <ContentContainer>
      <MainContent>
        <AboutContainer>
          <h4>Description</h4>
          {data.tagline}
        </AboutContainer>
      </MainContent>
      <Sidebar>
        <Widget src={`${ownerId}/widget/Application.Sidebar`} props={data} />
      </Sidebar>
    </ContentContainer>
  </Container>
);
