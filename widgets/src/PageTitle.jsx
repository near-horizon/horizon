
const Heading1 = styled.div`
    font-family: 'Space Grotesk';
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
`;
const Text = styled.div`
    font-family: 'Inter';
    font-size: 14px;    
    font-weight: 400;
    line-height: 20px;
`;
return (
    <div class="text-center">
    <Heading1>{props.title}</Heading1>
    <Text>
     {props.subtitle}
    </Text>
  </div>
)