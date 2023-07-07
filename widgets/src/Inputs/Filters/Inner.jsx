const ownerId = "nearhorizon.near";
const filters = props.filters ?? {
  first: {
    text: "Vertical",
    value: "vertical",
    options: [
      { text: "DeSci", value: "desci" },
      { text: "DeFi", value: "defi" },
      { text: "Gaming", value: "gaming" },
      { text: "Metaverse", value: "metaverse" },
      { text: "Commercial", value: "commercial" },
      { text: "Sports and Entertainment", value: "sports-and-entertainment" },
      { text: "Infrastructure", value: "infrastructure" },
      { text: "Social", value: "social" },
      { text: "Social Impact", value: "social-impact" },
      { text: "Creative", value: "creative" },
      { text: "Education", value: "education" },
    ],
  },
  second: [
    {
      text: "Readiness",
      value: "readiness",
      options: [
        { text: "Pitch ready", value: "pitch-ready" },
        { text: "Profile completed", value: "profile-completed" },
        { text: "Documents ready", value: "documents-ready" },
      ],
    },
    {
      text: "Team size",
      value: "size",
      options: [
        { text: "1-10", value: "1-10" },
        { text: "10-50", value: "10-50" },
        { text: "50-100", value: "50-100" },
        { text: "100+", value: "100-1000" },
      ],
    },
    {
      text: "Chain",
      value: "integration",
      options: [
        { text: "NEAR native", value: "native" },
        { text: "Multichain", value: "multichain" },
        { text: "Interested", value: "interested" },
      ],
    },
    {
      text: "Distribution",
      value: "distribution",
      options: [
        { text: "Open source", value: "open-source" },
        { text: "Partial", value: "partial" },
        { text: "Proprietary", value: "proprietary" },
      ],
    },
    {
      text: "Stage",
      value: "dev",
      options: [
        { text: "Idea stage", value: "idea" },
        { text: "Testnet launched", value: "testnet" },
        { text: "Mainnet launched", value: "mainnet" },
        { text: "Scaling startup", value: "scaling" },
        { text: "Established business", value: "established" },
      ],
    },
    {
      text: "Funding stage",
      value: "stage",
      options: [
        { text: "Pre-seed", value: "pre-seed" },
        { text: "Seed", value: "seed" },
        { text: "Series A", value: "series-a" },
        { text: "Series B", value: "series-b" },
        { text: "Series C", value: "series-c" },
        { text: "Series D", value: "series-d" },
      ],
    },
  ],
};
const quickFilters = props.quickFilters ?? [
  { text: "Infrastructure", value: "infrastructure", key: "vertical" },
  { text: "DeFi", value: "defi", key: "vertical" },
  { text: "DeSci", value: "desci", key: "vertical" },
  { text: "Metaverse", value: "metaverse", key: "vertical" },
  { text: "Creative", value: "creative", key: "vertical" },
  { text: "Education", value: "education", key: "vertical" },
  { text: "Pitch ready", value: "pitch-ready", key: "readiness" },
  { text: "NEAR native", value: "native", key: "integration" },
  { text: "Open source", value: "open-source", key: "distribution" },
];
State.init({
  value: props.urlFilters ?? {},
  search: props.search ?? "",
});
const update = (value) => State.update({ value: { ...state.value, ...value } });
const getSort = () =>
  Storage.get(`${props.entity ?? "projects"}-sort`) ?? "timedesc";
const clear = () => {
  State.update({ value: {}, search: "" });
  Storage.set(`${props.entity ?? "projects"}-sort`, "timedesc");
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  & > a {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    background: #00ec97;
    border: 1px solid #00ec97;
    border-radius: 50px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 142%;
    text-align: center;
    color: #101828;
    white-space: nowrap;
  }

  &.not {
    display: none;
  }

  &.selected {
    justify-content: flex-start;
    gap: 13px;

    & > a.clear {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 3px 8px;
      gap: 3px;
      background: #11181c;
      border: 1px solid #11181c;
      border-radius: 6px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #ffffff;

      &:hover,
      &:focus,
      &:active {
        text-decoration: none;
      }
    }

    & > div {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 3px 4px 3px 8px;
      gap: 3px;
      background: #ffffff;
      border: 1px solid #e6e8eb;
      border-radius: 6px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: #11181c;

      & > button {
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &:hover,
        &:focus,
        &:active {
          outline: none !important;
          background: transparent !important;
          border: none !important;
        }
      }
    }
  }

  &.bottom {
    justify-content: flex-start;
    gap: 13px;

    & > button {
      white-space: nowrap;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: #006adc;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;

      &:hover,
      &:focus,
      &:active {
        outline: none !important;
        background: transparent !important;
        border: none !important;
        color: #006adc !important;
      }
    }
  }

  & > span {
    white-space: nowrap;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #11181c;
  }
`;

const Search = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 8px;
  width: 100%;
  height: 2.4em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.01em;
    color: #101828;
  }
`;

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
`;

const CollapsibleContent = styled("Collapsible.Content")`
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  gap: 24px;
  width: 100%;
  background: #fafafa;

  &[data-state="open"] {
    animation: ${slideDown} 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms ease-out;
  }

  & > div.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 24px;

    span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 142%;
      text-align: center;
      color: #11181c;
    }

    div.column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;
    }

    div.row {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: flex-start;
      gap: 6px;

      &.large {
        flex-wrap: nowrap;
        justify-content: space-between;

        @media screen and (max-width: 1044px) {
          flex-wrap: wrap;
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 14px;
        width: fit-content;
        margin: 0;
        padding: 0;
      }
    }

    & button {
      width: fit-content;
      white-space: nowrap;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 18px;
      gap: 5px;
      background: #ffffff;
      border: 1px solid #eceef0;
      border-radius: 50px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 142%;
      text-align: center;
      letter-spacing: 0.01em;
      color: #101828;

      &.selected {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 18px;
        gap: 5px;
        background: #11181c;
        border: 1px solid #eceef0;
        border-radius: 50px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 142%;
        text-align: center;
        letter-spacing: 0.01em;
        color: #ffffff;
      }
    }
  }

  & > div.buttons {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;

    & > div {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;
      gap: 24px;

      &.left {
        justify-content: flex-start;
      }

      & > button {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        gap: 8px;
        background: #ffffff;
        border: 1px solid #eceef0;
        border-radius: 50px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 142%;
        text-align: center;
        color: #101828;

        &.green {
          background: #00ec97;
          border-radius: 50px;
          border: none;
        }
      }

      & > a {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        gap: 8px;
        background: #00ec97;
        border: 1px solid #00ec97;
        border-radius: 50px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 142%;
        text-align: center;
        color: #101828;
      }
    }
  }
`;

const Button = styled("Collapsible.Trigger")`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;

  &.selected {
    background: #161615;
    border: 1px solid #161615;
    color: white;
  }

  &.close {
    background: #ffffff;
    border: 1px solid #eceef0;
    color: #101828;
  }
`;

const selected = () => {
  const selectedKeys = Object.keys(state.value);
  return (
    selectedKeys.length > 0 &&
    selectedKeys.some((key) => state.value[key].size > 0)
  );
};

return (
  <>
    <Row>
      <Search>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 16.5L11.5001 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Input
          placeholder="Search"
          type="search"
          value={state.search}
          onKeyUp={({ key }) => {
            if (key === "Enter") {
              props.change({ filters: state.value, search: state.search });
            }
          }}
          onChange={({ target: { value } }) => State.update({ search: value })}
        />
      </Search>
      {props.noFilters ? (
        <a
          href={`/${ownerId}/widget/Index?tab=${
            props.entity ?? "projects"
          }&${props.url({ filters: state.value })}`}
        >
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1.5L4.75 9.75L1 6"
              stroke="#11181C"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Apply filters
        </a>
      ) : (
        <Button className={selected() ? "selected" : ""}>
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 6H12.5M1.25 1.5H14.75M5.75 10.5H10.25"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Filters
        </Button>
      )}
    </Row>
    {props.noFilters ? (
      <></>
    ) : (
      <>
        <CollapsibleContent>
          <div className="content">
            <div>
              <span>{filters.first.text}</span>
              <div className="row">
                {filters.first.options.map(({ value, text }) => {
                  const selected = state.value[filters.first.value]
                    ? state.value[filters.first.value].has(value)
                    : false;

                  return (
                    <button
                      className={selected ? "selected" : ""}
                      key={value}
                      onClick={() => {
                        if (selected) {
                          state.value[filters.first.value].delete(value);
                        } else if (state.value[filters.first.value]) {
                          state.value[filters.first.value].add(value);
                        } else {
                          state.value[filters.first.value] = new Set([value]);
                        }
                        update({
                          [filters.first.value]:
                            state.value[filters.first.value],
                        });
                      }}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="row large">
              {filters.second.map(({ value, text, options }) => (
                <div key={value}>
                  <span>{text}</span>
                  <div className="column">
                    {options.map((option) => {
                      const selected = state.value[value]
                        ? state.value[value].has(option.value)
                        : false;

                      return (
                        <button
                          className={selected ? "selected" : ""}
                          key={option.value}
                          onClick={() => {
                            if (selected) {
                              state.value[value].delete(option.value);
                            } else if (state.value[value]) {
                              state.value[value].add(option.value);
                            } else {
                              state.value[value] = new Set([option.value]);
                            }
                            update({
                              [value]: state.value[value],
                            });
                          }}
                        >
                          {option.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="buttons">
            <div className="left">
              <Button>Close</Button>
            </div>
            <div>
              <button onClick={() => clear()}>Clear</button>
              <a
                href={`/${ownerId}/widget/Index?tab=${
                  props.entity ?? "projects"
                }&${props.url({ filters: state.value })}`}
              >
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 1.5L4.75 9.75L1 6"
                    stroke="#11181C"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Apply filters
              </a>
            </div>
          </div>
        </CollapsibleContent>
        <Row className={selected() ? "selected" : "not"}>
          <a
            className="clear"
            href={`/${ownerId}/widget/Index?tab=${props.entity ?? "projects"}`}
          >
            Clear all
          </a>
          {Object.keys(state.value).map((key) => {
            /** @type {Set<string>} */
            const set = state.value[key];
            /** @type {{value: string;text: string}[]} */
            const selected =
              key === filters.first.value
                ? filters.first.options.filter(({ value }) => set.has(value))
                : filters.second
                    .find(({ value }) => value === key)
                    .options.filter(({ value }) => set.has(value));

            return selected.map(({ value, text }) => (
              <div key={`${key}-${value}`}>
                {text}
                <button
                  onClick={() => {
                    state.value[key].delete(value);
                    update({ [key]: state.value[key] });
                  }}
                >
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 1.5L1.5 6.5M1.5 1.5L6.5 6.5"
                      stroke="#98A2B3"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ));
          })}
        </Row>
        {/*<Row className="bottom">
          <span>Quick filters:</span>
          {quickFilters.map(({ text, value, key }) => (
            <button
              key={`${key}-${value}`}
              onClick={() => {
                if (!state.value[key]) {
                  state.value[key] = new Set([value]);
                } else {
                  state.value[key].add(value);
                }
                update({ [key]: state.value[key] });
              }}
            >
              {text}
            </button>
          ))}
        </Row>*/}
      </>
    )}
  </>
);
