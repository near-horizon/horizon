const description = props.description || "";
const width = props.width || "20ch";

State.init({
  showAll: false,
});

const Elipsiss = styled.b`
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  background-color: white;
  position: absolute;
  padding-right: 0.4em;
  right: 0;
  top: 0;
`;

const ShowToggle = styled.a`
  --blue: RGBA(13, 110, 253, 1);
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  cursor: pointer;
  font-weight: bold;
  color: var(--blue);
  text-decoration: none;
  margin-left: 0.5em;
  padding: 0;
  white-space: nowrap;

  &:hover {
    color: var(--blue);
    text-decoration: none;
  }

  &:visited {
    color: var(--blue);
    text-decoration: none;
  }
`;

const TextArea = styled.div`
  position: relative;
  font-weight: 400;
  color: #667085;
  overflow: hidden;
  flex-grow: 1;
  transition: height 0.3s ease-in-out;
  height: ${({ wrap }) => (wrap ? "unset" : "1.5em")};
  /* overflow: hidden; */
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 3; */

  p {
    max-width: ${width};
    font-weight: 500;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

return (
  <Description>
    <TextArea wrap={state.showAll}>
      <Markdown text={description} />
      <Elipsiss hidden={state.showAll || description.length < 100}>
        ...
      </Elipsiss>
    </TextArea>
    <ShowToggle
      hidden={description.length < 100}
      onClick={() => State.update({ showAll: !state.showAll })}
    >
      {state.showAll ? "Show less" : "Read more"}
    </ShowToggle>
  </Description>
);
