const tags = Object.keys(props.tags || {});

const TagItem = styled.span`
  display: inline-block;
  border: 1px solid #e6e8eb;
  font-size: 0.8em;
  font-weight: 500;
  border-radius: 6px;
  padding: 0.25em 0.5em;
  color: #687076;
  margin: 0.25em;
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
