const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  max-width: 100%;
  font-size: 0.9em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

const url = (website) => {
  if (!website) return "";
  return `https://${website}`;
};

return (
  <Container>
    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Website",
        id: "website",
        value: props.website ?? props.linktree.website,
        link: url(props.website ?? props.linktree.website),
        // onSave: (website) => onSave({ linktree: { website } }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: { ...props.linktree },
        // onSave: (linktree) => onSave({ linktree }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Type",
        id: "type",
        value: props.type || props.subheader,
        // onSave: (location) => onSave({ location }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Specialization",
        id: "specialization",
        value: Object.keys({ ...props.tags }).map((tag) => ({
          name: tag,
        })),
        // options: [{ value: "Venture investments", text: "venture" }],
        // onSave: ({ value: specialization }) => onSave({ specialization }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Supported blockchains",
        id: "chains",
        value: props.chain,
        // onSave: (location) => onSave({ location }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Program duration",
        id: "duration",
        value: props.duration,
        // onSave: (location) => onSave({ location }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Terms",
        id: "terms",
        value: props.terms,
        // onSave: (location) => onSave({ location }),
        // canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: props.location,
        // onSave: (location) => onSave({ location }),
        // canEdit: isAdmin,
      }}
    />
  </Container>
);
