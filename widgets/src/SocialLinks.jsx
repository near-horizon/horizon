const links = props.links;

const supportedLinks = [
  { name: "github", url: "https://github.com/", icon: "bi-github" },
  { name: "discord", url: "https://discord.com/", icon: "bi-discord" },
  { name: "reddit", url: "https://reddit.com/u/", icon: "bi-reddit" },
  { name: "twitter", url: "https://twitter.com/", icon: "bi-twitter" },
  { name: "youtube", url: "https://youtube.com/", icon: "bi-youtube" },
  { name: "website", url: "https://", icon: "bi-globe2" },
];

const linksList = supportedLinks
  .filter(({ name }) => name in links)
  .map(({ name, url, icon }) => (
    <li className="list-group-item border-0 p-2">
      <a href={`${url}${links[name]}`} target="_blank">
        <i className={`${icon} text-secondary fs-5`} />
      </a>
    </li>
  ));

return <ul className="list-group list-group-horizontal">{linksList}</ul>;
