const ownerId = "contribut3.near";
const creditId = `credits.${ownerId}`;

State.init({
  credits: 0,
  creditsIsFetched: false,
});

if (!state.creditsIsFetched) {
  Near.asyncView(
    creditId,
    "ft_balance_of",
    { account_id: context.accountId },
    "final",
    false
  ).then((credits) => State.update({ credits, creditsIsFetched: true }));
}

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

const stats = (
  <Stats>
    <span>Available credits:</span>
    <Credits>{state.credits} NHZN</Credits>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.30283 5.2513C5.43997 4.86144 5.71066 4.5327 6.06697 4.3233C6.42327 4.11389 6.84218 4.03735 7.24951 4.10722C7.65684 4.17709 8.0263 4.38886 8.29245 4.70503C8.55861 5.0212 8.70427 5.42136 8.70366 5.83464C8.70366 7.0013 6.95366 7.58464 6.95366 7.58464M7.00033 9.91797H7.00616M12.8337 7.0013C12.8337 10.223 10.222 12.8346 7.00033 12.8346C3.77866 12.8346 1.16699 10.223 1.16699 7.0013C1.16699 3.77964 3.77866 1.16797 7.00033 1.16797C10.222 1.16797 12.8337 3.77964 12.8337 7.0013Z"
        stroke="#7E868C"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Stats>
);

const actions = (
  <ActionArea>
    {stats}
    <Widget src={`${ownerId}/widget/CreateNewInput`} />
  </ActionArea>
);

return (
  <Navbar>
    {logo}
    {actions}
  </Navbar>
);
