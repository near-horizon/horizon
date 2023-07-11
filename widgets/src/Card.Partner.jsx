const title = props.title ?? "Title";
const link = props.link ?? "*";
const description = props.description ?? "Description";
const img = props.img ?? "";
const height = props.height ?? "375px";
const video =
  props.video ?? "https://youtu.be/QZLUQSOv7VY?origin=https://near.org/";

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  background: #ffffff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  width: 100%;
  min-width: 300px;

  img {
    max-width: 80%;
    margin: auto;
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em;
  gap: 1em;
  width: 100%;
  flex-grow: 1;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }

  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.125em;
    text-align: left;
    color: #101828;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 0.95em;
    line-height: 150%;
    text-align: left;
    color: #11181c;
  }
`;

const LinkSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5em;
  gap: 1em;
  border-top: 1px solid #eceef0;
  width: 100%;
  flex-grow: 0;
`;

const Link = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: left;
  color: #006adc;
`;

const linkIcon = (
  <svg
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9167 5.25001L12.9167 1.75001M12.9167 1.75001H9.41674M12.9167 1.75001L7.66675 7M6.50008 1.75H5.21675C4.23666 1.75 3.74661 1.75 3.37226 1.94074C3.04298 2.10852 2.77527 2.37623 2.60749 2.70552C2.41675 3.07986 2.41675 3.56991 2.41675 4.55V9.45C2.41675 10.4301 2.41675 10.9201 2.60749 11.2945C2.77527 11.6238 3.04298 11.8915 3.37226 12.0593C3.74661 12.25 4.23666 12.25 5.21675 12.25H10.1167C11.0968 12.25 11.5869 12.25 11.9612 12.0593C12.2905 11.8915 12.5582 11.6238 12.726 11.2945C12.9167 10.9201 12.9167 10.4301 12.9167 9.45V8.16667"
      stroke="#006ADC"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

return (
  <Card>
    <DetailsSection>
      <h4>{title}</h4>
      <p>{description}</p>
      {img && video ? (
        <a href={video}>
          <img src={img} />
        </a>
      ) : (
        <></>
      )}
    </DetailsSection>
    <LinkSection>
      <Link href={link}>Watch Video {linkIcon}</Link>
    </LinkSection>
  </Card>
);