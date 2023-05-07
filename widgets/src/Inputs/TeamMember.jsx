const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const name = props.name;
const permission = props.permission;
const onToggle = props.onToggle;
const onRemove = props.onRemove;

const Name = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
  width: 70%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  color: #7e868c;
`;

return (
  <Container>
    <Name
      href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
    >
      <Widget
        src={`${ownerId}/widget/Vendor.Icon`}
        props={{ accountId, size: "2em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId,
          name,
          nameSize: ".9em",
        }}
      />
    </Name>
    <Other>
      <Widget
        src={`${ownerId}/widget/Filter`}
        props={{
          noLabel: true,
          options: [
            { id: "Admin", text: "Admin" },
            { id: "Member", text: "Member" },
          ],
          selected: permission.id,
          update: (permission) => onToggle(permission),
        }}
      />
    </Other>
    <Other>
      <CloseButton onClick={() => onRemove()}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </CloseButton>
    </Other>
  </Container>
);
