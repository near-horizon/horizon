const onSave = props.onSave ?? (() => {});
const ownerId = "contribut3.near";
const isAdmin = props.isAdmin;

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
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Links`}
      props={{
        label: "Links",
        id: "links",
        value: { github: "near-horizon", twitter: "nearhorizon" },
        onSave: (links) => onSave({ links }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Category",
        id: "category",
        value: [{ name: "Wallets" }],
        options: [
          { name: "Wallets" },
          { name: "Games" },
          { name: "Social" },
          { name: "Other" },
        ],
        onSave: ([{ name: category }]) => onSave({ category }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Integration",
        id: "integration",
        value: [{ name: "Native" }],
        options: [{ name: "Native" }, { name: "Multichain" }],
        onSave: ([{ name: integration }]) => onSave({ integration }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Development phase",
        id: "phase",
        value: [{ name: "Testnet launched" }],
        options: [
          { name: "Testnet launched" },
          { name: "Mainnet launched" },
          { name: "In development" },
          { name: "Concept" },
        ],
        onSave: ([{ name: phase }]) => onSave({ phase }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "User base (MAA)",
        id: "userbase",
        value: 3500,
        onSave: (userbase) => onSave({ userbase }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Stage",
        id: "stage",
        value: [{ name: "Pre-Seed" }],
        options: [
          { name: "Pre-Seed" },
          { name: "Seed" },
          { name: "Series A" },
          { name: "Series B" },
          { name: "Series C" },
          { name: "Series D" },
          { name: "Late Stage" },
          { name: "IPO" },
        ],
        onSave: ([{ name: stage }]) => onSave({ stage }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Funding goal",
        id: "goal",
        value: 1000000,
        onSave: (goal) => onSave({ goal }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Raised",
        id: "raised",
        value: 600000,
        onSave: (raised) => onSave({ raised }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.AccountId`}
      props={{
        label: "CEO",
        id: "ceo",
        value: "petarvujovic.near",
        onSave: (ceo) => onSave({ ceo }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.AccountId`}
      props={{
        label: "CTO",
        id: "cto",
        value: "petarvujovic.near",
        onSave: (cto) => onSave({ cto }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Company size",
        id: "size",
        value: 10,
        onSave: (team) => onSave({ team }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Tags",
        id: "tags",
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
        onSave: (tags) => onSave({ tags: tags.map(({ name }) => name) }),
        canEdit: isAdmin
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: "San Francisco, CA",
        onSave: (geo) => onSave({ geo }),
        canEdit: isAdmin
      }}
    />
  </Container>
);
