const ownerId = "contribut3.near";
const accountId = props.accountId;

const circleArrowUp = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9L9 6M9 6L6 9M9 6V12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Claim project",
      description: (
        <Widget
          src={`${ownerId}/widget/SelectedLine`}
          props={{ accountId, label: "Project", isProject: true }}
        />
      ),
      trigger: <>{circleArrowUp}Claim project</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Project.ClaimForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
