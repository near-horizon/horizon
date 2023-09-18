const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  width: 100%;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1rem;

  & > h1 {
    color: var(--gray-900, #101828);
    font-family: FK Grotesk;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.5rem; /* 125% */
    letter-spacing: 0.02rem;
  }

  & > span {
    color: var(--ui-elements-gray, #7e868c);
    leading-trim: both;
    text-edge: cap;
    font-family: "FK Grotesk";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem; /* 166.667% */
    letter-spacing: 0.015rem;
  }
`;

const SubHeader = styled.h2`
  color: var(--gray-900, #101828);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 142.857% */
`;

State.init({
  perks: [],
  perksIsFetched: false,
  categories: [],
  options: [],
  search: "",
});

if (!state.perksIsFetched) {
  asyncFetch(`${apiUrl}/data/perks/${context.accountId}`).then(
    ({ body: perks }) => {
      State.update({
        perks: (perks ?? []).sort(
          (a, b) =>
            new Date(a.created_time).getTime() -
            new Date(b.created_time).getTime()
        ),
        perksIsFetched: true,
        options: [
          "All",
          ...new Set(perks.flatMap((perk) => perk.fields.category).sort()),
        ],
      });
    }
  );
  return <>Loading...</>;
}

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
  max-width: 100%;
  height: 36px;
  border-radius: 6.25rem;
  border: 1px solid var(--gray-300, #d0d5dd);
  background: var(--base-white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;

const Icon = styled.div`
  position: absolute;
  inset: 0.3em auto auto 0.6em;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 100%;
`;

const SearchArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Perks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;

  & > div {
    width: 100%;

    @media screen and (min-width: 768px) {
      width: calc((100% - 1.5rem) / 2);
    }

    @media screen and (min-width: 1024px) {
      width: calc((100% - 1.5rem * 2) / 3);
    }
  }
`;

const toRender = state.perks
  .filter((perk) => {
    if (
      state.categories.length > 0 &&
      !state.categories.includes("All") &&
      !perk.fields.category.some((category) =>
        state.categories.includes(category)
      )
    ) {
      return false;
    }

    return (
      perk.fields.name.toLowerCase().includes(state.search.toLowerCase()) ||
      perk.fields.description
        .toLowerCase()
        .includes(state.search.toLowerCase()) ||
      perk.fields.benefit.toLowerCase().includes(state.search.toLowerCase())
    );
  })
  .map((perk, index) => (
    <div key={perk.id + index}>
      <Widget src={`${ownerId}/widget/Perks.Card`} props={{ perk }} />
    </div>
  ));

return (
  <Container>
    <Heading>
      <Header>
        <h1>Perks</h1>
        <span>{state.perks.length}</span>
      </Header>
      <SubHeader>
        Whether you are a early stage founder or are on mainnet, we’ve got your
        covered! Discover the top tools & perks to build in web3.
      </SubHeader>
    </Heading>
    <SearchArea>
      <Widget
        src={`${ownerId}/widget/Perks.Categories`}
        props={{
          categories: state.options,
          selected: state.categories,
          setCategories: (categories) => State.update({ categories }),
          results: state.perks,
        }}
      />
      <SearchContainer>
        <Icon>{icon}</Icon>
        <SearchInput
          type="search"
          value={state.search}
          placeholder="Search"
          onChange={(e) => State.update({ search: e.target.value })}
        />
      </SearchContainer>
    </SearchArea>
    <Perks>{toRender}</Perks>
  </Container>
);
