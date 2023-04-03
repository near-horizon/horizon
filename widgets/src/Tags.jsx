const tags = Object.keys(props.tags || {});

const TagItem = styled.span`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.15em 0.5em;
  gap: 0.15em;
  background: #ffffff;
  border: 1px solid #e6e8eb;
  border-radius: 6px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Container = styled.div`
  max-width: 400px;
  overflow: hidden;
`;

return (
  <Container>
    {tags.map((tag) => (
      <TagItem key={tag}>{tag}</TagItem>
    ))}
  </Container>
);
