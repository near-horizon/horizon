const ownerId = "nearhorizon.near";
/** @type {string[]} */
const categories = props.categories;
/** @type {string[]} */
const selected = props.selected;
/** @type {{categories:string[];}[]} */
const results = props.results;
/** @type {(string[]) => void} */
const setCategories = props.setCategories;

State.init({
  selected,
});

const setCategory = (category) => {
  selected.push(category);
  State.update({ selected });
};

const removeCategory = (category) => {
  const index = selected.indexOf(category);
  selected.splice(index, 1);
  State.update({ selected });
};

const Category = styled.button`
  display: flex;
  padding: 0.375rem 1.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 142%; /* 1.15375rem */
  letter-spacing: 0.01625rem;

  &.selected {
    border-radius: 3.125rem;
    background: var(--ui-elements-dark, #11181c);
    color: var(--ui-elements-white, #fff);
    border: none;
    text-align: center;
    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 142%; /* 1.15375rem */
    letter-spacing: 0.01625rem;
  }
`;

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background: var(--ui-elements-light, #eceef0);
`;

const ClearButton = styled.button`
  display: flex;
  width: 7rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: none;
  background: var(--background-black-2, #161615);
  color: var(--text-text-white, #fff);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const ShowButton = styled.button`
  display: flex;
  width: 9.1875rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: none;
  background: var(--primary-primary-default, #00ec97);
  color: var(--text-text-dark, #11181c);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.00875rem;
`;

const resultCount = results.filter(
  ({ fields: { category: categories } }) =>
    state.selected.length === 0 ||
    state.selected.includes("All") ||
    categories.some((category) => state.selected.includes(category)),
).length;

return (
  <>
    <div>
      {categories.map((category) => {
        const isSelected = state.selected.includes(category);
        const onClick = () => {
          if (isSelected) {
            removeCategory(category);
          } else {
            setCategory(category);
          }
        };

        return (
          <Category
            key={category}
            onClick={onClick}
            // disabled={isSelected}
            className={isSelected ? "selected" : ""}
          >
            {category}
          </Category>
        );
      })}
    </div>
    <Separator />
    <div>
      <ClearButton onClick={() => State.update({ selected: [] })}>
        Clear filters
      </ClearButton>
      <ShowButton onClick={() => setCategories(state.selected)}>
        Show {resultCount} results
      </ShowButton>
    </div>
  </>
);
