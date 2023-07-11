const tags = Object.keys(props.tags || {});
const all = props.all ?? false;

const TagItem = styled.span`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  gap: 3px;
  background: #fff;
  border: 1px solid #e6e8eb;
  border-radius: 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #475467;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.5em;
  max-width: 100%;
  overflow: hidden;
`;

return (
  <Container>
    {tags.slice(0, all ? tags.length : 6).map((tag) => (
      <TagItem key={tag}>{tag}</TagItem>
    ))}
  </Container>
);
