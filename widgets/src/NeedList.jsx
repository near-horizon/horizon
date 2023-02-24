const ownerId = "contribut3.near";
const search = props.search;
const accountId = props.accountId;
const isAdmin = props.isAdmin;

const needs = accountId
  ? Near.view(
    ownerId,
    isAdmin
      ? "get_admin_contribution_needs"
      : "get_entity_contribution_needs",
    { account_id: accountId },
    "final",
    true
  )
  : Near.view(ownerId, "get_contribution_needs", {}, "final", true);

if (!needs) {
  return "Loading...";
}

if (
  (Array.isArray(needs) && needs.length === 0) ||
  Object.keys(needs).length === 0
) {
  return "Couldn't find any contribution needs!";
}

const allNeeds = isAdmin
  ? needs.filter(([entityId]) => entityId.includes(search))
  : Object.keys(needs)
    .reduce((list, accountIdOrCid) => {
      if (props.accountId) {
        return [
          ...list,
          [props.accountId, accountIdOrCid, needs[accountIdOrCid]],
        ];
      }

      const entityNeeds = needs[accountIdOrCid];
      const needsList = Object.keys(entityNeeds).map((cid) => [
        accountIdOrCid,
        cid,
        entityNeeds[cid],
      ]);

      return [...list, ...needsList];
    }, [])
    .filter(
      ([accountId, _, need]) =>
        accountId.includes(search) ||
        need.description.includes(search) ||
        need.contribution_type.includes(search)
    );

if (!allNeeds || allNeeds.length === 0) {
  return "No contribution needs found!";
}

return (
  <>
    {allNeeds.map(([accountId, cid]) => (
      <div key={cid} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Need`}
          props={{
            accountId,
            cid,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
