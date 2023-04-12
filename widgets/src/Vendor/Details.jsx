const onSave = props.onSave ?? (() => {});
const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  max-width: 100%;
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

return (
  <Container>
    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Website",
        id: "website",
        value: "layers.gg",
        link: "https://layers.gg",
        onSave: (website) => onSave({ website }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: { github: "near-horizon", twitter: "nearhorizon" },
        onSave: (links) => onSave({ links }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Vendor type",
        id: "type",
        value: [{ name: "Individual contributor", id: "individual" }],
        options: [
          { name: "Individual contributor", id: "individual" },
          { name: "Organization", id: "organization" },
        ],
        onSave: ([{ id: type }]) => onSave({ type }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Skills",
        id: "skills",
        value: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (skills) =>
          onSave({
            skills: tags.reduce(
              (acc, { name }) => Object.assign(acc, { [name]: "" }),
              {}
            ),
          }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.MultiSelect`}
      props={{
        label: "Payment",
        id: "payment",
        value: [{ name: "Fiat", id: "fiat" }],
        options: [
          { name: "Fiat", id: "fiat" },
          { name: "Crypto", id: "crypto" },
          { name: "Credits", id: "credits" },
        ],
        onSave: (payments) =>
          onSave({
            payments: payments.reduce(
              (acc, { id }) => Object.assign(acc, { [id]: "" }),
              {}
            ),
          }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Rate",
        id: "rate",
        value: 35,
        onSave: (rate) => onSave({ rate }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.MultiSelect`}
      props={{
        label: "Available for",
        id: "work",
        value: [
          { name: "Short-term work", id: "short" },
          { name: "Long-term work", id: "long" },
          { name: "Full-time job", id: "full" },
        ],
        options: [
          { name: "Short-term work", id: "short" },
          { name: "Long-term work", id: "long" },
          { name: "Full-time job", id: "full" },
        ],
        onSave: (work) =>
          onSave({
            work: work.reduce(
              (acc, { id }) => Object.assign(acc, { [id]: "" }),
              {}
            ),
          }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: "San Francisco, CA",
        onSave: (geo) => onSave({ geo }),
      }}
    />
  </Container>
);
