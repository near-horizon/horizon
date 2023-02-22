const ownerId = "contribut3.near";

const entities = Near.view(
  ownerId,
  "get_contributor_admin_entities",
  { account_id: context.accountId },
  "final",
  true
);

if (!entities) {
  return "Loading...";
}

if (
  !Array.isArray(entities) ||
  (Array.isArray(entities) && entities.length === 0)
) {
  return "No entities with Admin access for your account!";
}

const allEntities = entities.sort((a, b) => a.localeCompare(b));

const allNeeds = allEntities.reduce(
  (needs, accountId) => [
    ...needs,
    Near.view(
      ownerId,
      "get_entity_contribution_needs",
      { account_id: accountId },
      "final",
      true
    ),
  ],
  []
);

if (!allNeeds[0]) {
  return "Loading...";
}

return <div></div>;
