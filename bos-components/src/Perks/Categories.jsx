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
  open: false,
});

const Popover = styled("Popover.Root")``;

const PopoverTrigger = styled("Popover.Trigger")`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 1rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
  color: var(--ui-elements-black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
  letter-spacing: 0.0175rem;

  & > svg {
    transition: transform 0.2s ease-in-out;
  }

  &[data-state="open"] {
    & > svg {
      transform: rotate(-180deg);
    }
  }
`;

const scaleIn = styled.keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const PopoverContent = styled("Popover.Content")`
  display: flex;
  width: 24.375rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: #fff;
  box-shadow:
    0px 4px 6px -2px rgba(16, 24, 40, 0.13),
    0px 12px 16px -4px rgba(16, 24, 40, 0.18);
  transform-origin: var(--radix-popover-content-transform-origin);
  animation: ${scaleIn} 0.2s ease-out;

  & > div:first-child {
    display: flex;
    padding: 1.5rem 1.5rem 0rem 1.5rem;
    align-items: flex-start;
    align-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
  }

  & > div:last-child {
    display: flex;
    padding: 0rem 0rem 1.5rem 0rem;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5rem;
    width: 100%;
  }
`;

return (
  <Popover onOpenChange={(open) => State.update({ open })} open={state.open}>
    <PopoverTrigger>
      Category
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </PopoverTrigger>
    <PopoverContent align="start">
      <Widget
        src={`${ownerId}/widget/Perks.CategoriesInner`}
        props={{
          categories,
          selected,
          results,
          setCategories: (categories) => {
            State.update({ open: false });
            setCategories(categories);
          },
        }}
      />
    </PopoverContent>
  </Popover>
);
