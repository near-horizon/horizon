const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributorId = props.accountId ?? context.accountId;

if (!entityId) {
  return "Cannot show invite without entityId or contributorId!";
}

const invite = Near.view(
  ownerId,
  "get_invite",
  { entity_id: entityId, contributor_id: contributorId },
  "final"
);

const descriptionArea = <Markdown text={invite.description} />;

const controls =
  contributorId === context.accountId ? (
    <div className="d-flex flex-column justify-content-start align-items-stretch">
      <a
        className="btn btn-success"
        onClick={() =>
          Near.call(ownerId, "accept_invite", { account_id: entityId })
        }
      >
        <i className="bi-check" />
        <span>Accept</span>
      </a>
      <a
        className="btn btn-outline-danger mt-2 d-flex flex-row justify-content-center"
        style={{ minWidth: "7em" }}
        onClick={() =>
          Near.call(ownerId, "reject_invite", { account_id: entityId })
        }
      >
        <i className="bi-x" />
        <span>Reject</span>
      </a>
    </div>
  ) : (
    <></>
  );

const body = (
  <div
    className="d-flex flex-row justify-content-start"
    id={accountId}
    style={{ minHeight: "8em" }}
  >
    <div className="flex-grow-1 py-3">
      <Widget
        src={`${ownerId}/widget/ProfileLine`}
        props={{
          accountId: entityId,
          isEntity: true,
          imageSize: "3em",
          update: props.update,
          additionalText: (
            <b>
              invited{" "}
              {contributorId === context.accountId ? (
                "you"
              ) : (
                <Widget
                  src={`${ownerId}/widget/ProfileLine`}
                  props={{ accountId: contributorId }}
                />
              )}{" "}
              to contribute to
            </b>
          ),
          additionalColumn: controls,
          additionalRow: (
            <>
              {/* <Widget */}
              {/*   src={`${ownerId}/widget/ProfileLine`} */}
              {/*   props={{ */}
              {/*     accountId: founder, */}
              {/*     update: props.update, */}
              {/*     imageSize: contributionRequest.need ? "1.5em" : "2em", */}
              {/*   }} */}
              {/* /> */}
              <b>
                Need{" "}
                {typeof invite.contribution_type === "string"
                  ? invite.contribution_type
                  : invite.contribution_type.Other}
              </b>
              <div className="mt-2 ps-2 border-start border-3 border-info">
                <Widget
                  src={`${ownerId}/widget/DescriptionArea`}
                  props={{ description: invite.description }}
                />
              </div>
            </>
          ),
        }}
      />
    </div>
  </div>
);

return (
  <div className="card border-0" style={{ backgroundColor: "#f0f9ff" }}>
    <div className="px-3 py-0">{body}</div>
  </div>
);
