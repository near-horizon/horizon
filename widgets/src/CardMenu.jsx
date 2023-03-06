const items = props.items ?? [];

State.init({
  show: false,
});

const DropdownDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  clear: both;
  padding: 1em;
  font-weight: 400;
  white-space: nowrap;
  text-decoration: none;
  color: black;
  border: 0;
  text-align: left;
  transition: background-color 0.2s ease-in-out;
  background-color: white;

  &:hover {
    color: black;
    text-decoration: none;
    background-color: #e9ecef;
  }
`;

const DropdownLi = styled.li`
  cursor: pointer;
`;

const menuItems = items.reduce(
  (list, { text, icon, href, onClick }) => [
    ...list,
    list.length > 0 ? (
      <li>
        <DropdownDivider />
      </li>
    ) : (
      <></>
    ),
    <DropdownLi>
      <DropdownItem onClick={onClick} {...(href ? { href } : {})}>
        <i className={icon} />
        <span>{text}</span>
      </DropdownItem>
    </DropdownLi>,
  ],
  []
);

const DropdownList = styled.ul`
  z-index: 3;
  dislpay: block;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  list-style-type: none;
  position: absolute;
  inset: 0px 0px auto auto;
  padding: 0px;
  margin: 0px;
  transform: translate(-44px, 0px) scale(0);
  transition: transform 0.2s ease-in-out;
  transform-origin: top right;

  &.show {
    transform: translate(-44px, 0px) scale(1);
  }
`;

const dots = (
  <svg
    width="4"
    height="16"
    viewBox="0 0 4 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.00008 8.83325C2.46032 8.83325 2.83341 8.46016 2.83341 7.99992C2.83341 7.53968 2.46032 7.16659 2.00008 7.16659C1.53984 7.16659 1.16675 7.53968 1.16675 7.99992C1.16675 8.46016 1.53984 8.83325 2.00008 8.83325Z"
      stroke="#344054"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.00008 2.99992C2.46032 2.99992 2.83341 2.62682 2.83341 2.16659C2.83341 1.70635 2.46032 1.33325 2.00008 1.33325C1.53984 1.33325 1.16675 1.70635 1.16675 2.16659C1.16675 2.62682 1.53984 2.99992 2.00008 2.99992Z"
      stroke="#344054"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.00008 14.6666C2.46032 14.6666 2.83341 14.2935 2.83341 13.8333C2.83341 13.373 2.46032 12.9999 2.00008 12.9999C1.53984 12.9999 1.16675 13.373 1.16675 13.8333C1.16675 14.2935 1.53984 14.6666 2.00008 14.6666Z"
      stroke="#344054"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MenuIcon = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

return (
  <DropdownContainer>
    <MenuIcon
      onClick={() => State.update({ show: !state.show })}
      onBlur={() => State.update({ show: false })}
    >
      {dots}
    </MenuIcon>

    <DropdownList className={state.show ? "show" : ""}>
      {menuItems}
    </DropdownList>
  </DropdownContainer>
);
