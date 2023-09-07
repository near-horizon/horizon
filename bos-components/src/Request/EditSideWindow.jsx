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
      title: "Edit request",
      description: (
        <Widget
          src={`${ownerId}/widget/Request.Line`}
          props={{ accountId, cid }}
        />
      ),
      trigger: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clip-path="url(#clip0_4631_7572)">
              <path
                d="M8.25 2.99919H5.1C3.83988 2.99919 3.20982 2.99919 2.72852 3.24443C2.30516 3.46014 1.96095 3.80435 1.74524 4.22772C1.5 4.70902 1.5 5.33908 1.5 6.59919V12.8992C1.5 14.1593 1.5 14.7894 1.74524 15.2707C1.96095 15.694 2.30516 16.0382 2.72852 16.254C3.20982 16.4992 3.83988 16.4992 5.1 16.4992H11.4C12.6601 16.4992 13.2902 16.4992 13.7715 16.254C14.1948 16.0382 14.539 15.694 14.7548 15.2707C15 14.7894 15 14.1593 15 12.8992V9.74919M5.99998 11.9992H7.25589C7.62277 11.9992 7.80622 11.9992 7.97885 11.9577C8.1319 11.921 8.27822 11.8604 8.41243 11.7782C8.5638 11.6854 8.69352 11.5557 8.95294 11.2963L16.125 4.12419C16.7463 3.50287 16.7463 2.49551 16.125 1.87419C15.5037 1.25287 14.4963 1.25287 13.875 1.87419L6.70293 9.04625C6.4435 9.30568 6.31378 9.43539 6.22102 9.58677C6.13878 9.72098 6.07817 9.86729 6.04143 10.0203C5.99998 10.193 5.99998 10.3764 5.99998 10.7433V11.9992Z"
                stroke="currentColor"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4631_7572">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Edit request
        </>
      ),
      children: (
        <Widget
          src={`${ownerId}/widget/Request.EditForm`}
          props={{ accountId, cid }}
        />
      ),
      minWidth: "400px",
    }}
  />
);
