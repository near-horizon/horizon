const ownerId = "nearhorizon.near";

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  width: 100%;

  & > h5 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 1.4rem */
  }

  & > p {
    color: var(--ui-elements-gray, #7e868c);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
  }
`;

State.init({
  inbox: Social.index("inbox", context.accountId, {
    order: "desc",
    subscribe: true,
  }),
});

return (
  <Centered>
    {!Array.isArray(state.inbox) ? (
      "Loading..."
    ) : state.inbox.length === 0 ? (
      <>
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.10409 13.0001H6.62697C7.34072 13.0001 7.99322 13.4033 8.31242 14.0417C8.63162 14.6802 9.28412 15.0834 9.99787 15.0834H16.002C16.7157 15.0834 17.3682 14.6802 17.6874 14.0417C18.0066 13.4033 18.6591 13.0001 19.3729 13.0001H22.8958M9.84009 4.66675H16.1597C17.2815 4.66675 17.8424 4.66675 18.3375 4.83754C18.7754 4.98858 19.1743 5.23508 19.5052 5.55919C19.8794 5.9257 20.1302 6.42737 20.6319 7.43068L22.8887 11.9444C23.0856 12.3381 23.184 12.535 23.2534 12.7413C23.3151 12.9245 23.3596 13.1131 23.3864 13.3045C23.4166 13.5201 23.4166 13.7402 23.4166 14.1804V16.3334C23.4166 18.0836 23.4166 18.9587 23.076 19.6271C22.7764 20.2151 22.2983 20.6932 21.7103 20.9928C21.0418 21.3334 20.1667 21.3334 18.4166 21.3334H7.58325C5.83309 21.3334 4.95801 21.3334 4.28953 20.9928C3.70153 20.6932 3.22346 20.2151 2.92386 19.6271C2.58325 18.9587 2.58325 18.0836 2.58325 16.3334V14.1804C2.58325 13.7402 2.58325 13.5201 2.61343 13.3045C2.64024 13.1131 2.68475 12.9245 2.7464 12.7413C2.81581 12.535 2.91425 12.3381 3.11112 11.9444L5.36795 7.43068C5.86961 6.42736 6.12044 5.9257 6.49465 5.55919C6.82558 5.23508 7.22441 4.98858 7.6623 4.83754C8.15747 4.66675 8.71835 4.66675 9.84009 4.66675Z"
            stroke="#7E868C"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h5>You don’t have any updates yet</h5>
        <p>
          You will be notified about meaningful activities like new proposals or
          updates on your applications
        </p>
      </>
    ) : (
      state.inbox.map((item) => item.toString())
    )}
  </Centered>
);
