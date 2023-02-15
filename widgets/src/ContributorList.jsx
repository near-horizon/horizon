const ownerId = "contribut3.near";
const search = props.search ?? "";

const allContributors = (
  Near.view(ownerId, "get_contributors", {}, "final", true) ?? []
)
  .filter((accountId) => (search ? accountId.includes(search) : true))
  .sort((a, b) => a.localeCompare(b));

if (!allContributors || allContributors.length === 0) {
  return "No contributors found!";
}

return (
  <>
    {allContributors.map((accountId) => (
      <div key={accountId} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Contributor`}
          props={{ accountId, notStandalone: true }}
        />
      </div>
    ))}
  </>
);
