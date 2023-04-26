const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const personPlus = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3.5L14.25 1.25M14.25 1.25L16.5 3.5M14.25 1.25V5.75M12 14.75V13.85C12 12.5899 12 11.9598 11.7548 11.4785C11.539 11.0552 11.1948 10.711 10.7715 10.4952C10.2902 10.25 9.66012 10.25 8.4 10.25H5.1C3.83988 10.25 3.20982 10.25 2.72852 10.4952C2.30516 10.711 1.96095 11.0552 1.74524 11.4785C1.5 11.9598 1.5 12.5899 1.5 13.85V14.75M9.375 4.625C9.375 6.07475 8.19975 7.25 6.75 7.25C5.30025 7.25 4.125 6.07475 4.125 4.625C4.125 3.17525 5.30025 2 6.75 2C8.19975 2 9.375 3.17525 9.375 4.625Z"
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
      title: "Propose a contribution",
      description: (
        <Widget
          src={`${ownerId}/widget/SelectedLine`}
          props={{ accountId, label: "Project", isProject: true }}
        />
      ),
      trigger: <>{personPlus}Propose contribution</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Project.ProposalForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
