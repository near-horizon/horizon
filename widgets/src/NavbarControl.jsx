const ownerId = "nearhorizon.near";

const Navbar = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.75em 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  position: sticky;
  top: 0;
  transform: translateY(-1em);
`;

const LogoArea = styled.a`
  display: block;
  width: 14em;
  padding: 0px;
  gap: 0.7em;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 1em;
  color: #11181c;

  &:hover {
    text-decoration: none;
    color: #11181c;
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  gap: 1em;
`;

const logo = (
  <LogoArea
    href={`/${ownerId}/widget/Index`}
    onClick={() => props.update({ tab: "home", content: "", search: "" })}
  >
    <Widget src={`${ownerId}/widget/Logo`} />
  </LogoArea>
);

const Credits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.55em;
  gap: 1em;
  background: #eceef0;
  border-radius: 100px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  color: #11181c;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
`;

const actions = (
  <ActionArea>
    <Widget src={`${ownerId}/widget/CreateNewInput`} />
  </ActionArea>
);

return (
  <Navbar>
    {logo}
    {actions}
  </Navbar>
);
