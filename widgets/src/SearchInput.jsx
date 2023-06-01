const icon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
      stroke="#667085"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const SearchInput = styled.input`
  display: block;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  padding-left: 2.25em;
  gap: 0.5em;
  width: 359px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const Icon = styled.div`
  position: absolute;
  inset: 0.3em auto auto 0.6em;
`;

const Container = styled.div`
  position: relative;
`;

State.init({ search: props.search });

return (
  <Container>
    <Icon>{icon}</Icon>
    <SearchInput
      type="search"
      value={state.search}
      placeholder="Search"
      onChange={(e) => State.update({ search: e.target.value })}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          props.update({ search: state.search });
        }
      }}
    />
  </Container>
);
