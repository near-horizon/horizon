const formName = props.formName;
const icon = props.icon;
const text = props.text;

if (!formName || !icon || !text) {
  return "Cannot render navbar control without form name, icon or text!";
}

return (
  <li className="nav-item">
    <a
      className="nav-link active"
      aria-current="page"
      href="#"
      data-bs-toggle="collapse"
      href={`#collapse${formName}Form`}
      role="button"
      aria-expanded="false"
      aria-controls={`collapse${formName}Form`}
    >
      <i className={icon} />
      {text}
    </a>
  </li>
);
