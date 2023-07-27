const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const cid = props.cid;

const Trigger = styled("Dialog.Trigger")`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  background: var(--primary-primary-default, #00ec97);
  border: 1px solid var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
`;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Propose contribution",
      description: (
        <Widget
          src={`${ownerId}/widget/Request.Line`}
          props={{ accountId, cid }}
        />
      ),
      triggerButton: (
        <Trigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M12 4.5L14.25 2.25M14.25 2.25L16.5 4.5M14.25 2.25V6.75M12 15.75V14.85C12 13.5899 12 12.9598 11.7548 12.4785C11.539 12.0552 11.1948 11.711 10.7715 11.4952C10.2902 11.25 9.66012 11.25 8.4 11.25H5.1C3.83988 11.25 3.20982 11.25 2.72852 11.4952C2.30516 11.711 1.96095 12.0552 1.74524 12.4785C1.5 12.9598 1.5 13.5899 1.5 14.85V15.75M9.375 5.625C9.375 7.07475 8.19975 8.25 6.75 8.25C5.30025 8.25 4.125 7.07475 4.125 5.625C4.125 4.17525 5.30025 3 6.75 3C8.19975 3 9.375 4.17525 9.375 5.625Z"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Propose contribution
        </Trigger>
      ),
      children: (
        <Widget
          src={`${ownerId}/widget/Request.ProposeForm`}
          props={{ accountId, cid }}
        />
      ),
      minWidth: "400px",
    }}
  />
);
