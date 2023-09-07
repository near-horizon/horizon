const ownerId = "nearhorizon.near";

const hero = {
  founders: (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.4998 21.876L14.6248 18.001M18.4998 21.876C20.3041 21.1898 22.035 20.3243 23.6665 19.2926M18.4998 21.876V28.3343C18.4998 28.3343 22.4136 27.6239 23.6665 25.751C25.0615 23.6585 23.6665 19.2926 23.6665 19.2926M14.6248 18.001C15.3122 16.2177 16.1777 14.5084 17.2082 12.8989C18.7132 10.4925 20.8088 8.51116 23.2958 7.14334C25.7827 5.77552 28.5783 5.0667 31.4165 5.0843C31.4165 8.59764 30.409 14.7718 23.6665 19.2926M14.6248 18.001H8.1665C8.1665 18.001 8.87692 14.0872 10.7498 12.8343C12.8423 11.4393 17.2082 12.8343 17.2082 12.8343M8.81234 23.8135C6.87484 25.441 6.229 30.2718 6.229 30.2718C6.229 30.2718 11.0598 29.626 12.6873 27.6885C13.6044 26.6035 13.5915 24.9372 12.5711 23.9297C12.069 23.4505 11.4077 23.1736 10.714 23.1522C10.0203 23.1307 9.34305 23.3662 8.81234 23.8135Z"
        stroke="black"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  contributors: (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6668 6.97919C25.5807 7.93031 26.896 9.90531 26.896 12.1875C26.896 14.4697 25.5807 16.4447 23.6668 17.3958M26.2502 24.1566C28.2025 25.04 29.9605 26.4798 31.4168 28.3333M5.5835 28.3333C8.09771 25.1333 11.5112 23.1667 15.271 23.1667C19.0308 23.1667 22.4443 25.1333 24.9585 28.3333M21.0835 12.1875C21.0835 15.3977 18.4812 18 15.271 18C12.0608 18 9.4585 15.3977 9.4585 12.1875C9.4585 8.97734 12.0608 6.375 15.271 6.375C18.4812 6.375 21.0835 8.97734 21.0835 12.1875Z"
        stroke="black"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  backers: (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.125 29.625H8.94167C8.21827 29.625 7.85656 29.625 7.58026 29.4842C7.33722 29.3604 7.13962 29.1628 7.01578 28.9197C6.875 28.6434 6.875 28.2817 6.875 27.5583V6.375M30.125 11.5417L23.1057 18.561C22.8499 18.8168 22.722 18.9446 22.5746 18.9925C22.4449 19.0347 22.3051 19.0347 22.1754 18.9925C22.028 18.9446 21.9001 18.8168 21.6443 18.561L19.2307 16.1473C18.9749 15.8916 18.847 15.7637 18.6996 15.7158C18.5699 15.6736 18.4301 15.6736 18.3004 15.7158C18.153 15.7637 18.0251 15.8916 17.7693 16.1473L12.0417 21.875M30.125 11.5417H24.9583M30.125 11.5417V16.7083"
        stroke="black"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};

const DoubleItem = styled.div`
  display: flex;
  padding: 0rem 0rem 1.5rem 0rem;
  align-items: center;
  gap: 1.375rem;

  & > div {
    width: 50%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    &.reverse {
      flex-direction: column-reverse;
    }

    & > div {
      width: 100%;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    align-items: center;

    & > h1 {
      text-align: center;
    }
  }

  & > h1 {
    color: #000;
    font-size: 2.25rem;
    font-family: FK Grotesk;
    font-weight: 700;
    line-height: 2.875rem;
    letter-spacing: 0.0225rem;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    list-style: none;
    padding: 0;
    color: var(--black, #000);
    font-size: 1.1875rem;
    font-family: Inter;
    letter-spacing: 0.01188rem;
  }
`;

const heroImage = "bafkreibcddxzaxmjl2ulqkgl52zec6crzhrde2mz5qwobdjyo7m73fhcju";

const mapImage = (src) => `https://ipfs.near.social/ipfs/${src}`;

return (
  <DoubleItem className="reverse">
    <Hero>
      <h1>NEAR Horizon connects people building on NEAR</h1>
      <ul>
        <li>
          {hero.founders}
          <b>Founders</b> can find help and resources
        </li>
        <li>
          {hero.contributors}
          <b>Contributors</b> can offer services and and get hired
        </li>
        <li>
          {hero.backers}
          <b>Backers</b> can find discover promising projects to support
        </li>
      </ul>
      <Widget src={`${ownerId}/widget/Buttons.CreateProfile`} />
    </Hero>
    <ImageContainer>
      <Img src={mapImage(heroImage)} />
    </ImageContainer>
  </DoubleItem>
);
