const ownerId = "nearhorizon.near";

State.init({
  isOwner: false,
  isOwnerFetched: false,
  projects: [],
  vendors: [],
});

// TODO: THIS IS A HACK AND SHOULD BE REMOVED ASAP - NEED TO ADD PERMISSION SYSTEM
const allowedUsers = ["lccc.near", "jarrodbarnes.near"];

if (context.accountId && !state.isOwnerFetched) {
  Near.asyncView(
    ownerId,
    "check_is_owner",
    { account_id: context.accountId },
    "final",
    false,
  ).then((isOwner) =>
    State.update({
      isOwner: isOwner || allowedUsers.includes(context.accountId),
      isOwnerFetched: true,
    }),
  );
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false,
  ).then((projects) => State.update({ projects }));
  Near.asyncView(
    ownerId,
    "get_admin_vendors",
    { account_id: context.accountId },
    "final",
    false,
  ).then((vendors) => State.update({ vendors }));
}

const notifications = [
  ...new Set([...state.projects, ...state.vendors, context.accountId]),
]
  .reduce((allNotifications, accountId) => {
    const notificationsForAccount = Social.index("inbox", accountId, {
      order: "desc",
      subscribe: true,
    });

    if (!notificationsForAccount) {
      return allNotifications;
    }

    return [...allNotifications, ...notificationsForAccount];
  }, [])
  .sort((a, b) => b.blockHeight - a.blockHeight);

const NavItem = styled.a`
  position: relative;
  cursor: pointer;
  margin: 0.25em 0;
  color: var(--ui-elements-dark, #11181c);
  font-size: 0.8125rem;
  font-family: Inter;
  font-weight: 500;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ selected }) => (selected ? "#f2f4f7" : "none")};
  display: flex;
  padding: 0rem 0.625rem 0rem 0rem;
  align-items: center;
  gap: 0.6875rem;
  align-self: stretch;

  @media screen and (max-width: 768px) {
    padding: 0.25rem 0.625rem 0.25rem 0rem;
  }

  &:hover {
    color: #667085;
    text-decoration: none;
    background-color: #f9fafb;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
  }
`;

const CountIndicator = styled.div`
  border-radius: 100%;
  background-color: #f04438;
  min-width: 1.5em;
  min-height: 1.5em;
  color: white;
  text-align: center;
  position: absolute;
  inset: auto 0.5em auto auto;
  align-items: center;
  justify-content: center;
  display: ${({ show }) => (show ? "flex" : "none")};
`;

const navItem = ({ text, icon, id, count }) => (
  <NavItem
    selected={id === props.tab}
    href={`/${ownerId}/widget/Index?tab=${id}`}
    onClick={() => props.update({ tab: id, content: "", search: "" })}
  >
    {icon}
    <span>{text}</span>
    <CountIndicator show={!!count && count > 0}>{count}</CountIndicator>
  </NavItem>
);

const NavTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: var(--ui-elements-dark, #11181c);
  font-size: 1rem;
  font-family: Inter;
  font-weight: 700;
  line-height: 140%;
`;

const navSection = ({ title, items }) => (
  <NavContainer className="inner">
    <NavTitle>{title}</NavTitle>
    {items.map(navItem)}
  </NavContainer>
);

const NavContainer = styled.div`
  display: flex;
  padding: 0rem 1rem 1.5rem 0rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.875rem;
  align-self: stretch;

  &.inner {
    gap: 0.5rem;
    padding: 0rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const rotateLeft = styled.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-90deg);
  }
`;

const rotateRight = styled.keyframes`
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Trigger = styled("Collapsible.Trigger")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 0.5em;
  border: none;
  background-color: #f9fafb;
  transition: transform 0.25s ease-in-out;
  width: 40px;
  height: 40px;

  &[data-state="open"] {
    transform: rotate(-90deg);
  }

  &[data-state="closed"] {
    transform: rotate(0deg);
  }
`;

const slideRight = styled.keyframes`
  from {
    width: 0;
    height: 0;
  }
  to {
    width: var(--radix-collapsible-content-width);
    height: var(--radix-collapsible-content-height);
  }
`;

const slideLeft = styled.keyframes`
  from {
    width: var(--radix-collapsible-content-width);
    height: var(--radix-collapsible-content-height);
  }
  to {
    width: 0;
    height: 0;
  }
`;

const Content = styled("Collapsible.Content")`
  width: 100%;
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideRight} 0.25s ease-out;
  }

  &[data-state="closed"] {
    animation: ${slideLeft} 0.25s ease-out;
  }
`;

const Root = styled("Collapsible.Root")`
  dislay: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  transition: all 0.25s ease-in-out;
  gap: 1.5em;
  width: 100%;
  margin-bottom: 1.5em;

  &[data-state="open"] {
    display: flex;
  }

  &[data-state="closed"] {
    display: flex;
  }
`;

const home = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.33333 13.9587H12.6667M8.72234 2.6885L3.35302 6.86464C2.9941 7.1438 2.81464 7.28338 2.68535 7.45818C2.57083 7.61302 2.48552 7.78746 2.4336 7.97292C2.375 8.18229 2.375 8.40964 2.375 8.86433V14.592C2.375 15.4787 2.375 15.9221 2.54757 16.2608C2.69937 16.5587 2.94159 16.801 3.23952 16.9527C3.57821 17.1253 4.02158 17.1253 4.90833 17.1253H14.0917C14.9784 17.1253 15.4218 17.1253 15.7605 16.9527C16.0584 16.801 16.3006 16.5587 16.4524 16.2608C16.625 15.9221 16.625 15.4787 16.625 14.592V8.86433C16.625 8.40964 16.625 8.18229 16.5664 7.97292C16.5145 7.78746 16.4292 7.61302 16.3146 7.45818C16.1854 7.28338 16.0059 7.1438 15.647 6.86464L10.2777 2.6885C9.99953 2.47218 9.86046 2.36401 9.7069 2.32244C9.57141 2.28575 9.42859 2.28575 9.2931 2.32244C9.13954 2.36401 9.00047 2.47218 8.72234 2.6885Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const projects = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.78747 9.3252C4.28364 9.3252 3.78476 9.22335 3.31929 9.02547C2.85382 8.82759 2.43088 8.53756 2.07462 8.17193C1.71837 7.8063 1.43577 7.37223 1.24297 6.89451C1.05016 6.41679 0.950928 5.90478 0.950928 5.3877C0.950928 4.87062 1.05016 4.3586 1.24297 3.88088C1.43577 3.40316 1.71837 2.96909 2.07462 2.60346C2.43088 2.23783 2.85382 1.9478 3.31929 1.74992C3.78476 1.55204 4.28364 1.4502 4.78747 1.4502C5.80498 1.4502 6.78082 1.86504 7.50031 2.60346C8.2198 3.34189 8.624 4.34341 8.624 5.3877C8.624 6.43199 8.2198 7.4335 7.50031 8.17193C6.78082 8.91035 5.80498 9.3252 4.78747 9.3252ZM5.21375 18.0752C4.19623 18.0752 3.2204 17.6604 2.50091 16.9219C1.78142 16.1835 1.37721 15.182 1.37721 14.1377C1.37721 13.0934 1.78142 12.0919 2.50091 11.3535C3.2204 10.615 4.19623 10.2002 5.21375 10.2002C6.23126 10.2002 7.2071 10.615 7.92659 11.3535C8.64608 12.0919 9.05029 13.0934 9.05029 14.1377C9.05029 15.182 8.64608 16.1835 7.92659 16.9219C7.2071 17.6604 6.23126 18.0752 5.21375 18.0752ZM13.7394 9.3252C13.2356 9.3252 12.7367 9.22335 12.2712 9.02547C11.8057 8.82759 11.3828 8.53756 11.0265 8.17193C10.6703 7.8063 10.3877 7.37223 10.1949 6.89451C10.0021 6.41679 9.90285 5.90478 9.90285 5.3877C9.90285 4.87062 10.0021 4.3586 10.1949 3.88088C10.3877 3.40316 10.6703 2.96909 11.0265 2.60346C11.3828 2.23783 11.8057 1.9478 12.2712 1.74992C12.7367 1.55204 13.2356 1.4502 13.7394 1.4502C14.7569 1.4502 15.7327 1.86504 16.4522 2.60346C17.1717 3.34189 17.5759 4.34341 17.5759 5.3877C17.5759 6.43199 17.1717 7.4335 16.4522 8.17193C15.7327 8.91035 14.7569 9.3252 13.7394 9.3252ZM13.7394 18.0752C12.7219 18.0752 11.746 17.6604 11.0265 16.9219C10.3071 16.1835 9.90285 15.182 9.90285 14.1377C9.90285 13.0934 10.3071 12.0919 11.0265 11.3535C11.746 10.615 12.7219 10.2002 13.7394 10.2002C14.7569 10.2002 15.7327 10.615 16.4522 11.3535C17.1717 12.0919 17.5759 13.0934 17.5759 14.1377C17.5759 15.182 17.1717 16.1835 16.4522 16.9219C15.7327 17.6604 14.7569 18.0752 13.7394 18.0752ZM4.78747 7.5752C5.35275 7.5752 5.89488 7.34473 6.2946 6.93449C6.69432 6.52426 6.91888 5.96786 6.91888 5.3877C6.91888 4.80753 6.69432 4.25114 6.2946 3.8409C5.89488 3.43066 5.35275 3.2002 4.78747 3.2002C4.22218 3.2002 3.68005 3.43066 3.28033 3.8409C2.88061 4.25114 2.65606 4.80753 2.65606 5.3877C2.65606 5.96786 2.88061 6.52426 3.28033 6.93449C3.68005 7.34473 4.22218 7.5752 4.78747 7.5752ZM5.21375 16.3252C5.77903 16.3252 6.32117 16.0947 6.72088 15.6845C7.1206 15.2743 7.34516 14.7179 7.34516 14.1377C7.34516 13.5575 7.1206 13.0011 6.72088 12.5909C6.32117 12.1807 5.77903 11.9502 5.21375 11.9502C4.64846 11.9502 4.10633 12.1807 3.70661 12.5909C3.3069 13.0011 3.08234 13.5575 3.08234 14.1377C3.08234 14.7179 3.3069 15.2743 3.70661 15.6845C4.10633 16.0947 4.64846 16.3252 5.21375 16.3252ZM13.7394 7.5752C14.3047 7.5752 14.8468 7.34473 15.2465 6.93449C15.6462 6.52426 15.8708 5.96786 15.8708 5.3877C15.8708 4.80753 15.6462 4.25114 15.2465 3.8409C14.8468 3.43066 14.3047 3.2002 13.7394 3.2002C13.1741 3.2002 12.632 3.43066 12.2323 3.8409C11.8325 4.25114 11.608 4.80753 11.608 5.3877C11.608 5.96786 11.8325 6.52426 12.2323 6.93449C12.632 7.34473 13.1741 7.5752 13.7394 7.5752ZM13.7394 16.3252C14.3047 16.3252 14.8468 16.0947 15.2465 15.6845C15.6462 15.2743 15.8708 14.7179 15.8708 14.1377C15.8708 13.5575 15.6462 13.0011 15.2465 12.5909C14.8468 12.1807 14.3047 11.9502 13.7394 11.9502C13.1741 11.9502 12.632 12.1807 12.2323 12.5909C11.8325 13.0011 11.608 13.5575 11.608 14.1377C11.608 14.7179 11.8325 15.2743 12.2323 15.6845C12.632 16.0947 13.1741 16.3252 13.7394 16.3252Z"
      fill="#979FA4"
      stroke="white"
      stroke-width="0.35"
    />
  </svg>
);

const requests = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_3754_55150)">
      <path
        d="M7.76033 2.95252C7.26049 2.95252 6.78112 3.16702 6.42768 3.54883C6.07424 3.93065 5.87568 4.4485 5.87568 4.98846V8.74711C5.87568 8.87172 5.82986 8.99122 5.7483 9.07934C5.66674 9.16745 5.55611 9.21695 5.44077 9.21695H1.96143C1.46159 9.21695 0.98222 9.43145 0.628781 9.81326C0.275342 10.1951 0.0767818 10.7129 0.0767818 11.2529V15.0115C0.0767818 15.2789 0.12553 15.5436 0.220242 15.7907C0.314954 16.0377 0.453776 16.2621 0.628781 16.4512C0.803786 16.6402 1.01155 16.7902 1.2402 16.8925C1.46886 16.9948 1.71393 17.0475 1.96143 17.0475H11.2397C11.4872 17.0475 11.7322 16.9948 11.9609 16.8925C12.1895 16.7902 12.3973 16.6402 12.5723 16.4512C12.7473 16.2621 12.8861 16.0377 12.9809 15.7907C13.0756 15.5436 13.1243 15.2789 13.1243 15.0115V11.2529C13.1243 11.1283 13.1701 11.0088 13.2517 10.9207C13.3333 10.8326 13.4439 10.7831 13.5592 10.7831H17.0386C17.5384 10.7831 18.0178 10.5686 18.3712 10.1867C18.7247 9.80493 18.9232 9.28708 18.9232 8.74711V4.98846C18.9232 4.4485 18.7247 3.93065 18.3712 3.54883C18.0178 3.16702 17.5384 2.95252 17.0386 2.95252H7.76033ZM17.0386 9.21695H13.1243V4.51863H17.0386C17.1539 4.51863 17.2645 4.56813 17.3461 4.65624C17.4277 4.74435 17.4735 4.86385 17.4735 4.98846V8.74711C17.4735 8.87172 17.4277 8.99122 17.3461 9.07934C17.2645 9.16745 17.1539 9.21695 17.0386 9.21695ZM11.6746 9.21695H7.32541V4.98846C7.32541 4.86385 7.37123 4.74435 7.45279 4.65624C7.53436 4.56813 7.64498 4.51863 7.76033 4.51863H11.6746V9.21695ZM5.87568 10.7831V15.4814H1.96143C1.84608 15.4814 1.73545 15.4319 1.65389 15.3438C1.57233 15.2557 1.52651 15.1361 1.52651 15.0115V11.2529C1.52651 11.1283 1.57233 11.0088 1.65389 10.9207C1.73545 10.8326 1.84608 10.7831 1.96143 10.7831H5.87568ZM7.32541 10.7831H11.6746V15.0115C11.6746 15.1361 11.6288 15.2557 11.5472 15.3438C11.4656 15.4319 11.355 15.4814 11.2397 15.4814H7.32541V10.7831Z"
        fill="#979FA4"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.37159 3.4959C6.73896 3.09903 7.23839 2.875 7.76033 2.875H17.0386C17.5605 2.875 18.0599 3.09903 18.4273 3.4959C18.7945 3.89259 19 4.42956 19 4.98846V8.74711C19 9.30601 18.7945 9.84298 18.4273 10.2397C18.0599 10.6365 17.5605 10.8606 17.0386 10.8606H13.5592C13.466 10.8606 13.3754 10.9005 13.3078 10.9736C13.24 11.0468 13.2011 11.1472 13.2011 11.2529V15.0115C13.2011 15.2884 13.1506 15.5626 13.0525 15.8186C12.9543 16.0747 12.8103 16.3076 12.6284 16.5041C12.4465 16.7006 12.2303 16.8567 11.992 16.9634C11.7537 17.07 11.498 17.125 11.2397 17.125H1.96143C1.7031 17.125 1.44744 17.07 1.20909 16.9634C0.970763 16.8567 0.754561 16.7006 0.572685 16.5041C0.390819 16.3076 0.246808 16.0747 0.148638 15.8186C0.0504708 15.5626 0 15.2884 0 15.0115V11.2529C0 10.694 0.205474 10.157 0.572685 9.76033C0.940061 9.36346 1.43948 9.13942 1.96143 9.13942H5.44077C5.53401 9.13942 5.62458 9.09946 5.6922 9.0264C5.75999 8.95317 5.7989 8.85279 5.7989 8.74711V4.98846C5.7989 4.42956 6.00438 3.89259 6.37159 3.4959ZM7.76033 3.03004C7.28259 3.03004 6.82328 3.23501 6.48378 3.60177C6.14411 3.9687 5.95247 4.46743 5.95247 4.98846V8.74711C5.95247 8.89065 5.89973 9.02928 5.8044 9.13227C5.7089 9.23543 5.57822 9.29447 5.44077 9.29447H1.96143C1.48369 9.29447 1.02438 9.49944 0.684877 9.86619C0.34521 10.2331 0.153564 10.7319 0.153564 11.2529V15.0115C0.153564 15.2694 0.200588 15.5247 0.291845 15.7627C0.3831 16.0007 0.516732 16.2166 0.684877 16.3982C0.853012 16.5799 1.05233 16.7236 1.27131 16.8216C1.49028 16.9196 1.72476 16.97 1.96143 16.97H11.2397C11.4763 16.97 11.7108 16.9196 11.9298 16.8216C12.1488 16.7236 12.3481 16.5799 12.5162 16.3982C12.6844 16.2166 12.818 16.0007 12.9093 15.7627C13.0005 15.5247 13.0475 15.2694 13.0475 15.0115V11.2529C13.0475 11.1093 13.1003 10.9707 13.1956 10.8677C13.2911 10.7646 13.4218 10.7055 13.5592 10.7055H17.0386C17.5163 10.7055 17.9756 10.5006 18.3151 10.1338C18.6548 9.76687 18.8464 9.26815 18.8464 8.74711V4.98846C18.8464 4.46743 18.6548 3.9687 18.3151 3.60177C17.9756 3.23501 17.5163 3.03004 17.0386 3.03004H7.76033ZM7.76033 4.59615C7.66708 4.59615 7.57652 4.63612 7.50889 4.70917C7.4411 4.7824 7.40219 4.88278 7.40219 4.98846V9.13942H11.5978V4.59615H7.76033ZM7.3967 4.60331C7.4922 4.50014 7.62288 4.44111 7.76033 4.44111H11.7514V9.29447H7.24863V4.98846C7.24863 4.84492 7.30136 4.70629 7.3967 4.60331ZM13.0475 4.44111H17.0386C17.176 4.44111 17.3067 4.50014 17.4022 4.60331C17.4975 4.70629 17.5503 4.84492 17.5503 4.98846V8.74711C17.5503 8.89065 17.4975 9.02928 17.4022 9.13227C17.3067 9.23543 17.176 9.29447 17.0386 9.29447H13.0475V4.44111ZM13.2011 4.59615V9.13942H17.0386C17.1318 9.13942 17.2224 9.09946 17.29 9.0264C17.3578 8.95317 17.3967 8.85279 17.3967 8.74711V4.98846C17.3967 4.88278 17.3578 4.7824 17.29 4.70917C17.2224 4.63612 17.1318 4.59615 17.0386 4.59615H13.2011ZM1.96143 10.8606C1.86818 10.8606 1.77761 10.9005 1.70999 10.9736C1.6422 11.0468 1.60329 11.1472 1.60329 11.2529V15.0115C1.60329 15.1172 1.6422 15.2176 1.70999 15.2908C1.77761 15.3639 1.86818 15.4038 1.96143 15.4038H5.7989V10.8606H1.96143ZM1.5978 10.8677C1.6933 10.7646 1.82397 10.7055 1.96143 10.7055H5.95247V15.5589H1.96143C1.82397 15.5589 1.6933 15.4999 1.5978 15.3967C1.50246 15.2937 1.44973 15.1551 1.44973 15.0115V11.2529C1.44973 11.1093 1.50246 10.9707 1.5978 10.8677ZM7.24863 10.7055H11.7514V15.0115C11.7514 15.1551 11.6986 15.2937 11.6033 15.3967C11.5078 15.4999 11.3771 15.5589 11.2397 15.5589H7.24863V10.7055ZM7.40219 10.8606V15.4038H11.2397C11.3329 15.4038 11.4235 15.3639 11.4911 15.2908C11.5589 15.2176 11.5978 15.1172 11.5978 15.0115V10.8606H7.40219Z"
        fill="#979FA4"
      />
      <path
        d="M7.76033 2.95252C7.26049 2.95252 6.78112 3.16702 6.42768 3.54883C6.07424 3.93065 5.87568 4.4485 5.87568 4.98846V8.74711C5.87568 8.87172 5.82986 8.99122 5.7483 9.07934C5.66674 9.16745 5.55611 9.21695 5.44077 9.21695H1.96143C1.46159 9.21695 0.98222 9.43145 0.628781 9.81326C0.275342 10.1951 0.0767818 10.7129 0.0767818 11.2529V15.0115C0.0767818 15.2789 0.12553 15.5436 0.220242 15.7907C0.314954 16.0377 0.453776 16.2621 0.628781 16.4512C0.803786 16.6402 1.01155 16.7902 1.2402 16.8925C1.46886 16.9948 1.71393 17.0475 1.96143 17.0475H11.2397C11.4872 17.0475 11.7322 16.9948 11.9609 16.8925C12.1895 16.7902 12.3973 16.6402 12.5723 16.4512C12.7473 16.2621 12.8861 16.0377 12.9809 15.7907C13.0756 15.5436 13.1243 15.2789 13.1243 15.0115V11.2529C13.1243 11.1283 13.1701 11.0088 13.2517 10.9207C13.3333 10.8326 13.4439 10.7831 13.5592 10.7831H17.0386C17.5384 10.7831 18.0178 10.5686 18.3712 10.1867C18.7247 9.80493 18.9232 9.28708 18.9232 8.74711V4.98846C18.9232 4.4485 18.7247 3.93065 18.3712 3.54883C18.0178 3.16702 17.5384 2.95252 17.0386 2.95252H7.76033ZM17.0386 9.21695H13.1243V4.51863H17.0386C17.1539 4.51863 17.2645 4.56813 17.3461 4.65624C17.4277 4.74435 17.4735 4.86385 17.4735 4.98846V8.74711C17.4735 8.87172 17.4277 8.99122 17.3461 9.07934C17.2645 9.16745 17.1539 9.21695 17.0386 9.21695ZM11.6746 9.21695H7.32541V4.98846C7.32541 4.86385 7.37123 4.74435 7.45279 4.65624C7.53436 4.56813 7.64498 4.51863 7.76033 4.51863H11.6746V9.21695ZM5.87568 10.7831V15.4814H1.96143C1.84608 15.4814 1.73545 15.4319 1.65389 15.3438C1.57233 15.2557 1.52651 15.1361 1.52651 15.0115V11.2529C1.52651 11.1283 1.57233 11.0088 1.65389 10.9207C1.73545 10.8326 1.84608 10.7831 1.96143 10.7831H5.87568ZM7.32541 10.7831H11.6746V15.0115C11.6746 15.1361 11.6288 15.2557 11.5472 15.3438C11.4656 15.4319 11.355 15.4814 11.2397 15.4814H7.32541V10.7831Z"
        stroke="white"
        stroke-width="0.15"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.37159 3.4959C6.73896 3.09903 7.23839 2.875 7.76033 2.875H17.0386C17.5605 2.875 18.0599 3.09903 18.4273 3.4959C18.7945 3.89259 19 4.42956 19 4.98846V8.74711C19 9.30601 18.7945 9.84298 18.4273 10.2397C18.0599 10.6365 17.5605 10.8606 17.0386 10.8606H13.5592C13.466 10.8606 13.3754 10.9005 13.3078 10.9736C13.24 11.0468 13.2011 11.1472 13.2011 11.2529V15.0115C13.2011 15.2884 13.1506 15.5626 13.0525 15.8186C12.9543 16.0747 12.8103 16.3076 12.6284 16.5041C12.4465 16.7006 12.2303 16.8567 11.992 16.9634C11.7537 17.07 11.498 17.125 11.2397 17.125H1.96143C1.7031 17.125 1.44744 17.07 1.20909 16.9634C0.970763 16.8567 0.754561 16.7006 0.572685 16.5041C0.390819 16.3076 0.246808 16.0747 0.148638 15.8186C0.0504708 15.5626 0 15.2884 0 15.0115V11.2529C0 10.694 0.205474 10.157 0.572685 9.76033C0.940061 9.36346 1.43948 9.13942 1.96143 9.13942H5.44077C5.53401 9.13942 5.62458 9.09946 5.6922 9.0264C5.75999 8.95317 5.7989 8.85279 5.7989 8.74711V4.98846C5.7989 4.42956 6.00438 3.89259 6.37159 3.4959ZM7.76033 3.03004C7.28259 3.03004 6.82328 3.23501 6.48378 3.60177C6.14411 3.9687 5.95247 4.46743 5.95247 4.98846V8.74711C5.95247 8.89065 5.89973 9.02928 5.8044 9.13227C5.7089 9.23543 5.57822 9.29447 5.44077 9.29447H1.96143C1.48369 9.29447 1.02438 9.49944 0.684877 9.86619C0.34521 10.2331 0.153564 10.7319 0.153564 11.2529V15.0115C0.153564 15.2694 0.200588 15.5247 0.291845 15.7627C0.3831 16.0007 0.516732 16.2166 0.684877 16.3982C0.853012 16.5799 1.05233 16.7236 1.27131 16.8216C1.49028 16.9196 1.72476 16.97 1.96143 16.97H11.2397C11.4763 16.97 11.7108 16.9196 11.9298 16.8216C12.1488 16.7236 12.3481 16.5799 12.5162 16.3982C12.6844 16.2166 12.818 16.0007 12.9093 15.7627C13.0005 15.5247 13.0475 15.2694 13.0475 15.0115V11.2529C13.0475 11.1093 13.1003 10.9707 13.1956 10.8677C13.2911 10.7646 13.4218 10.7055 13.5592 10.7055H17.0386C17.5163 10.7055 17.9756 10.5006 18.3151 10.1338C18.6548 9.76687 18.8464 9.26815 18.8464 8.74711V4.98846C18.8464 4.46743 18.6548 3.9687 18.3151 3.60177C17.9756 3.23501 17.5163 3.03004 17.0386 3.03004H7.76033ZM7.76033 4.59615C7.66708 4.59615 7.57652 4.63612 7.50889 4.70917C7.4411 4.7824 7.40219 4.88278 7.40219 4.98846V9.13942H11.5978V4.59615H7.76033ZM7.3967 4.60331C7.4922 4.50014 7.62288 4.44111 7.76033 4.44111H11.7514V9.29447H7.24863V4.98846C7.24863 4.84492 7.30136 4.70629 7.3967 4.60331ZM13.0475 4.44111H17.0386C17.176 4.44111 17.3067 4.50014 17.4022 4.60331C17.4975 4.70629 17.5503 4.84492 17.5503 4.98846V8.74711C17.5503 8.89065 17.4975 9.02928 17.4022 9.13227C17.3067 9.23543 17.176 9.29447 17.0386 9.29447H13.0475V4.44111ZM13.2011 4.59615V9.13942H17.0386C17.1318 9.13942 17.2224 9.09946 17.29 9.0264C17.3578 8.95317 17.3967 8.85279 17.3967 8.74711V4.98846C17.3967 4.88278 17.3578 4.7824 17.29 4.70917C17.2224 4.63612 17.1318 4.59615 17.0386 4.59615H13.2011ZM1.96143 10.8606C1.86818 10.8606 1.77761 10.9005 1.70999 10.9736C1.6422 11.0468 1.60329 11.1472 1.60329 11.2529V15.0115C1.60329 15.1172 1.6422 15.2176 1.70999 15.2908C1.77761 15.3639 1.86818 15.4038 1.96143 15.4038H5.7989V10.8606H1.96143ZM1.5978 10.8677C1.6933 10.7646 1.82397 10.7055 1.96143 10.7055H5.95247V15.5589H1.96143C1.82397 15.5589 1.6933 15.4999 1.5978 15.3967C1.50246 15.2937 1.44973 15.1551 1.44973 15.0115V11.2529C1.44973 11.1093 1.50246 10.9707 1.5978 10.8677ZM7.24863 10.7055H11.7514V15.0115C11.7514 15.1551 11.6986 15.2937 11.6033 15.3967C11.5078 15.4999 11.3771 15.5589 11.2397 15.5589H7.24863V10.7055ZM7.40219 10.8606V15.4038H11.2397C11.3329 15.4038 11.4235 15.3639 11.4911 15.2908C11.5589 15.2176 11.5978 15.1172 11.5978 15.0115V10.8606H7.40219Z"
        stroke="white"
        stroke-width="0.15"
      />
    </g>
    <defs>
      <clipPath id="clip0_3754_55150">
        <rect
          width="19"
          height="19"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const contributors = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.4167 17.125V15.5417C17.4167 14.0661 16.4075 12.8263 15.0417 12.4748M12.2708 3.10518C13.4313 3.57495 14.25 4.7127 14.25 6.04167C14.25 7.37063 13.4313 8.50838 12.2708 8.97815M13.4583 17.125C13.4583 15.6495 13.4583 14.9118 13.2173 14.3298C12.8959 13.5539 12.2794 12.9374 11.5035 12.616C10.9216 12.375 10.1838 12.375 8.70833 12.375H6.33333C4.85785 12.375 4.12011 12.375 3.53816 12.616C2.76224 12.9374 2.14577 13.5539 1.82438 14.3298C1.58333 14.9118 1.58333 15.6495 1.58333 17.125M10.6875 6.04167C10.6875 7.79057 9.26973 9.20833 7.52083 9.20833C5.77193 9.20833 4.35416 7.79057 4.35416 6.04167C4.35416 4.29276 5.77193 2.875 7.52083 2.875C9.26973 2.875 10.6875 4.29276 10.6875 6.04167Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const backers = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.625 17.125H3.64167C3.19829 17.125 2.9766 17.125 2.80726 17.0387C2.6583 16.9628 2.53719 16.8417 2.46129 16.6927C2.375 16.5234 2.375 16.3017 2.375 15.8583V2.875M16.625 6.04167L12.3228 10.3438C12.1661 10.5006 12.0877 10.579 11.9973 10.6083C11.9178 10.6342 11.8322 10.6342 11.7527 10.6083C11.6623 10.579 11.5839 10.5006 11.4272 10.3438L9.94783 8.8645C9.79108 8.70774 9.7127 8.62937 9.62232 8.6C9.54282 8.57417 9.45718 8.57417 9.37768 8.6C9.2873 8.62937 9.20892 8.70774 9.05217 8.8645L5.54167 12.375M16.625 6.04167H13.4583M16.625 6.04167V9.20833"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const tools = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.875 3.66634V2.08301M11.875 13.1663V11.583M6.33333 7.62467H7.91667M15.8333 7.62467H17.4167M14.0917 9.84134L15.0417 10.7913M14.0917 5.40801L15.0417 4.45801M2.375 17.1247L9.5 9.99967M9.65833 5.40801L8.70833 4.45801"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const mail = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.97916 10.0003H4.65655C5.19901 10.0003 5.6949 10.3068 5.93749 10.792C6.18009 11.2772 6.67598 11.5837 7.21844 11.5837H11.7816C12.324 11.5837 12.8199 11.2772 13.0625 10.792C13.3051 10.3068 13.801 10.0003 14.3434 10.0003H17.0208M7.09852 3.66699H11.9015C12.754 3.66699 13.1803 3.66699 13.5566 3.7968C13.8894 3.91159 14.1925 4.09892 14.444 4.34525C14.7284 4.6238 14.919 5.00507 15.3003 5.76758L17.0155 9.19797C17.1651 9.49721 17.2399 9.64683 17.2927 9.80363C17.3395 9.94289 17.3734 10.0862 17.3937 10.2317C17.4167 10.3955 17.4167 10.5628 17.4167 10.8974V12.5337C17.4167 13.8638 17.4167 14.5288 17.1578 15.0369C16.9301 15.4838 16.5668 15.8471 16.1199 16.0748C15.6118 16.3337 14.9468 16.3337 13.6167 16.3337H5.38333C4.0532 16.3337 3.38814 16.3337 2.8801 16.0748C2.43322 15.8471 2.06989 15.4838 1.84219 15.0369C1.58333 14.5288 1.58333 13.8638 1.58333 12.5337V10.8974C1.58333 10.5628 1.58333 10.3955 1.60627 10.2317C1.62664 10.0862 1.66047 9.94289 1.70732 9.80363C1.76008 9.64683 1.83489 9.49721 1.9845 9.19797L3.6997 5.76758C4.08096 5.00506 4.27159 4.6238 4.55599 4.34525C4.80749 4.09892 5.11061 3.91159 5.44341 3.7968C5.81974 3.66699 6.246 3.66699 7.09852 3.66699Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const myProjects = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8333 17.125C15.8333 16.0202 15.8333 15.4678 15.697 15.0183C15.39 14.0062 14.598 13.2142 13.5859 12.9072C13.1364 12.7708 12.584 12.7708 11.4792 12.7708H7.52084C6.41602 12.7708 5.86361 12.7708 5.4141 12.9072C4.40203 13.2142 3.61004 14.0062 3.30303 15.0183C3.16667 15.4678 3.16667 16.0202 3.16667 17.125M13.0625 6.4375C13.0625 8.40501 11.4675 10 9.5 10C7.53249 10 5.9375 8.40501 5.9375 6.4375C5.9375 4.46999 7.53249 2.875 9.5 2.875C11.4675 2.875 13.0625 4.46999 13.0625 6.4375Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const myRequests = myProjects;

const myQuestions = myProjects;

const myContracts = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6667 6.04167C12.6667 5.30544 12.6667 4.93733 12.5857 4.6353C12.3661 3.81571 11.7259 3.17554 10.9064 2.95593C10.6043 2.875 10.2362 2.875 9.49999 2.875C8.76377 2.875 8.39565 2.875 8.09363 2.95593C7.27404 3.17554 6.63386 3.81571 6.41425 4.6353C6.33333 4.93733 6.33333 5.30544 6.33333 6.04167M4.11666 17.125H14.8833C15.7701 17.125 16.2135 17.125 16.5521 16.9524C16.8501 16.8006 17.0923 16.5584 17.2441 16.2605C17.4167 15.9218 17.4167 15.4784 17.4167 14.5917V8.575C17.4167 7.68825 17.4167 7.24488 17.2441 6.90618C17.0923 6.60826 16.8501 6.36604 16.5521 6.21424C16.2135 6.04167 15.7701 6.04167 14.8833 6.04167H4.11666C3.22991 6.04167 2.78654 6.04167 2.44784 6.21424C2.14992 6.36604 1.9077 6.60826 1.7559 6.90618C1.58333 7.24488 1.58333 7.68825 1.58333 8.575V14.5917C1.58333 15.4784 1.58333 15.9218 1.7559 16.2605C1.9077 16.5584 2.14992 16.8006 2.44784 16.9524C2.78654 17.125 3.22991 17.125 4.11666 17.125Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const myApplications = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.125 9.99967L8.70833 11.583L12.2708 8.02051M14.1718 4.45683C14.3348 4.8511 14.6477 5.16449 15.0417 5.32811L16.4233 5.90041C16.8176 6.06373 17.1309 6.377 17.2942 6.7713C17.4575 7.16561 17.4575 7.60864 17.2942 8.00294L16.7223 9.3836C16.5589 9.77808 16.5587 10.2216 16.7228 10.6158L17.2937 11.9961C17.3747 12.1914 17.4164 12.4007 17.4164 12.6121C17.4164 12.8235 17.3748 13.0329 17.2939 13.2282C17.213 13.4235 17.0944 13.601 16.9449 13.7505C16.7954 13.8999 16.6179 14.0185 16.4226 14.0993L15.0419 14.6712C14.6477 14.8342 14.3343 15.1471 14.1707 15.5412L13.5984 16.9228C13.4351 17.3171 13.1218 17.6304 12.7275 17.7937C12.3333 17.957 11.8902 17.957 11.496 17.7937L10.1153 17.2218C9.72105 17.0589 9.27819 17.0592 8.88414 17.2227L7.50253 17.7942C7.10847 17.9572 6.66584 17.957 6.27187 17.7938C5.8779 17.6307 5.56482 17.3178 5.40139 16.9239L4.82894 15.5418C4.66592 15.1475 4.35301 14.8341 3.959 14.6705L2.5774 14.0982C2.18328 13.935 1.87011 13.6219 1.70674 13.2278C1.54336 12.8338 1.54313 12.3909 1.70612 11.9967L2.27799 10.616C2.4409 10.2217 2.44057 9.77884 2.27706 9.38477L1.70601 8.00213C1.62505 7.80684 1.58336 7.5975 1.58333 7.38609C1.58329 7.17468 1.62492 6.96534 1.70582 6.77002C1.78672 6.5747 1.90531 6.39724 2.05482 6.24777C2.20433 6.0983 2.38182 5.97976 2.57716 5.89892L3.95777 5.32703C4.35168 5.16415 4.66488 4.85162 4.82861 4.45805L5.40089 3.0764C5.56421 2.6821 5.87747 2.36883 6.27175 2.2055C6.66604 2.04218 7.10906 2.04218 7.50334 2.2055L8.88396 2.77739C9.27825 2.94031 9.72111 2.93998 10.1152 2.77647L11.4973 2.20639C11.8916 2.04316 12.3345 2.04319 12.7287 2.20648C13.1229 2.36977 13.4361 2.68296 13.5995 3.07715L14.1719 4.45922L14.1718 4.45683Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const community = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.91666 12.3747L5.48208 14.8397C5.14249 15.1835 4.9727 15.3554 4.82675 15.3676C4.70013 15.3781 4.57616 15.3272 4.49346 15.2307C4.39814 15.1195 4.39814 14.8779 4.39814 14.3946V13.1597C4.39814 12.7261 4.04309 12.4124 3.61411 12.3496V12.3496C2.57587 12.1975 1.76048 11.3821 1.6084 10.3439C1.58333 10.1727 1.58333 9.96842 1.58333 9.55986V5.88301C1.58333 4.55288 1.58333 3.88782 1.84219 3.37978C2.06989 2.9329 2.43322 2.56957 2.8801 2.34187C3.38814 2.08301 4.0532 2.08301 5.38333 2.08301H11.2417C12.5718 2.08301 13.2368 2.08301 13.7449 2.34187C14.1918 2.56957 14.5551 2.9329 14.7828 3.37978C15.0417 3.88782 15.0417 4.55288 15.0417 5.88301V9.20801M15.0417 17.9163L13.3187 16.7185C13.0765 16.5501 12.9554 16.4659 12.8236 16.4062C12.7066 16.3532 12.5836 16.3146 12.4573 16.2914C12.315 16.2651 12.1675 16.2651 11.8726 16.2651H10.45C9.56324 16.2651 9.11987 16.2651 8.78118 16.0926C8.48325 15.9408 8.24103 15.6986 8.08923 15.4006C7.91666 15.0619 7.91666 14.6186 7.91666 13.7318V11.7413C7.91666 10.8546 7.91666 10.4112 8.08923 10.0725C8.24103 9.7746 8.48325 9.53238 8.78118 9.38058C9.11987 9.20801 9.56324 9.20801 10.45 9.20801H14.8833C15.7701 9.20801 16.2135 9.20801 16.5521 9.38058C16.8501 9.53238 17.0923 9.7746 17.2441 10.0725C17.4167 10.4112 17.4167 10.8546 17.4167 11.7413V13.8902C17.4167 14.6279 17.4167 14.9968 17.2961 15.2877C17.1354 15.6757 16.8272 15.9839 16.4392 16.1446C16.1483 16.2652 15.7794 16.2651 15.0417 16.2651V17.9163Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const learn = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4583 11.979V9.59958C13.4583 9.45749 13.4583 9.38645 13.4367 9.32373C13.4176 9.26826 13.3863 9.21774 13.3453 9.17583C13.2989 9.12843 13.2353 9.09666 13.1082 9.03311L9.49999 7.22899M3.16666 8.02066V13.4092C3.16666 13.7037 3.16666 13.8509 3.21259 13.9798C3.2532 14.0937 3.31937 14.1969 3.40604 14.2812C3.50408 14.3767 3.63792 14.438 3.90557 14.5607L8.97223 16.8829C9.16638 16.9719 9.26345 17.0164 9.36457 17.034C9.45418 17.0495 9.54581 17.0495 9.63542 17.034C9.73654 17.0164 9.83361 16.9719 10.0278 16.8829L15.0944 14.5607C15.3621 14.438 15.4959 14.3767 15.5939 14.2812C15.6806 14.1969 15.7468 14.0937 15.7874 13.9798C15.8333 13.8509 15.8333 13.7037 15.8333 13.4092V8.02066M1.58333 7.22899L9.21676 3.41228C9.32061 3.36035 9.37254 3.33439 9.427 3.32417C9.47524 3.31512 9.52475 3.31512 9.57299 3.32417C9.62745 3.33439 9.67938 3.36035 9.78323 3.41228L17.4167 7.22899L9.78323 11.0457C9.67938 11.0976 9.62745 11.1236 9.57299 11.1338C9.52475 11.1429 9.47524 11.1429 9.427 11.1338C9.37254 11.1236 9.32061 11.0976 9.21676 11.0457L1.58333 7.22899Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const faq = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.91667 6.8351C8.05616 6.43858 8.33148 6.10421 8.69387 5.89123C9.05627 5.67825 9.48234 5.60039 9.89664 5.67146C10.3109 5.74252 10.6867 5.95791 10.9574 6.27949C11.2281 6.60106 11.3763 7.00807 11.3756 7.42841C11.3756 8.61503 9.59573 9.20833 9.59573 9.20833M9.61867 11.5833H9.62659M5.54167 14.75V16.5989C5.54167 17.0208 5.54167 17.2317 5.62814 17.34C5.70334 17.4342 5.81738 17.4891 5.93793 17.4889C6.07654 17.4888 6.24124 17.357 6.57064 17.0935L8.45913 15.5827C8.84491 15.2741 9.0378 15.1198 9.25259 15.01C9.44316 14.9127 9.64601 14.8415 9.85563 14.7985C10.0919 14.75 10.3389 14.75 10.833 14.75H12.825C14.1551 14.75 14.8202 14.75 15.3282 14.4911C15.7751 14.2634 16.1384 13.9001 16.3661 13.4532C16.625 12.9452 16.625 12.2801 16.625 10.95V6.675C16.625 5.34488 16.625 4.67981 16.3661 4.17177C16.1384 3.72489 15.7751 3.36156 15.3282 3.13386C14.8202 2.875 14.1551 2.875 12.825 2.875H6.175C4.84488 2.875 4.17981 2.875 3.67177 3.13386C3.22489 3.36156 2.86156 3.72489 2.63386 4.17177C2.375 4.67981 2.375 5.34488 2.375 6.675V11.5833C2.375 12.3196 2.375 12.6877 2.45593 12.9897C2.67554 13.8093 3.31571 14.4495 4.1353 14.6691C4.43733 14.75 4.80544 14.75 5.54167 14.75Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const terms = (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.625 9.99968L7.125 9.99967M16.625 5.24968L7.125 5.24967M16.625 14.7497L7.125 14.7497M3.95833 9.99967C3.95833 10.4369 3.60389 10.7913 3.16667 10.7913C2.72944 10.7913 2.375 10.4369 2.375 9.99967C2.375 9.56245 2.72944 9.20801 3.16667 9.20801C3.60389 9.20801 3.95833 9.56245 3.95833 9.99967ZM3.95833 5.24967C3.95833 5.6869 3.60389 6.04134 3.16667 6.04134C2.72944 6.04134 2.375 5.6869 2.375 5.24967C2.375 4.81245 2.72944 4.45801 3.16667 4.45801C3.60389 4.45801 3.95833 4.81245 3.95833 5.24967ZM3.95833 14.7497C3.95833 15.1869 3.60389 15.5413 3.16667 15.5413C2.72944 15.5413 2.375 15.1869 2.375 14.7497C2.375 14.3124 2.72944 13.958 3.16667 13.958C3.60389 13.958 3.95833 14.3124 3.95833 14.7497Z"
      stroke="#979FA4"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const admin = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 11.4999L11 13.4999L15.5 8.99987M20 11.9999C20 16.9083 14.646 20.4783 12.698 21.6147C12.4766 21.7439 12.3659 21.8085 12.2097 21.842C12.0884 21.868 11.9116 21.868 11.7903 21.842C11.6341 21.8085 11.5234 21.7439 11.302 21.6147C9.35396 20.4783 4 16.9083 4 11.9999V7.21747C4 6.41796 4 6.0182 4.13076 5.67457C4.24627 5.37101 4.43398 5.10015 4.67766 4.8854C4.9535 4.64231 5.3278 4.50195 6.0764 4.22122L11.4382 2.21054C11.6461 2.13258 11.75 2.0936 11.857 2.07815C11.9518 2.06444 12.0482 2.06444 12.143 2.07815C12.25 2.0936 12.3539 2.13258 12.5618 2.21054L17.9236 4.22122C18.6722 4.50195 19.0465 4.64231 19.3223 4.8854C19.566 5.10015 19.7537 5.37101 19.8692 5.67457C20 6.0182 20 6.41796 20 7.21747V11.9999Z"
      stroke="#979FA4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const content = (
  <NavContainer>
    {navSection({
      title: "Explore",
      items: [
        {
          text: "Home",
          icon: home,
          id: "home",
        },
        {
          text: "Projects",
          icon: projects,
          id: "projects",
        },
        {
          text: "Requests",
          icon: requests,
          id: "requests",
        },
        {
          text: "Contributors",
          icon: contributors,
          id: "contributors",
        },
        {
          text: "Backers",
          icon: backers,
          id: "backers",
        },
        // {
        //   text: "Tools", icon: tools, id: "tools"
        // }
      ],
    })}
    {navSection({
      title: "Manage",
      items: [
        {
          text: "Inbox",
          icon: mail,
          id: "inbox",
          count: notifications.length,
        },
        {
          text: "My projects",
          icon: myProjects,
          id: "my-projects",
        },
        {
          text: "My requests",
          icon: myRequests,
          id: "my-requests",
        },
        // {
        //   text: "My questions",
        //   icon: myQuestions,
        //   id: "my-questions",
        // },
        {
          text: "My contracts",
          icon: myContracts,
          id: "my-contracts",
        },
        {
          text: "My applications",
          icon: myApplications,
          id: "my-applications",
        },
      ],
    })}
    {navSection({
      title: "Get help",
      items: [
        // {
        //   text: "Ask community",
        //   icon: community,
        //   id: "community",
        // },
        {
          text: "Learning resources",
          icon: learn,
          id: "learn",
        },
        {
          text: "FAQ",
          icon: faq,
          id: "faq",
        },
        {
          text: "Terms & Conditions",
          icon: terms,
          id: "legal",
        },
      ],
    })}
    {state.isOwnerFetched && state.isOwner ? (
      navSection({
        title: "Admin",
        items: [
          {
            text: "Admin Dashboard",
            icon: admin,
            id: "admin",
          },
        ],
      })
    ) : (
      <></>
    )}
  </NavContainer>
);

if (props.collapsible) {
  return (
    <Root open={state.open} onOpenChange={(open) => State.update({ open })}>
      <Trigger>
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H19M1 1H19M1 13H19"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Trigger>
      <Content>{content}</Content>
    </Root>
  );
}

return content;