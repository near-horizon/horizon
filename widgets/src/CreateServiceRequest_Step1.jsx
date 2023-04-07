
const ownerId = "contribut3.near";

State.init({
    // The entity to which to request a contribution.
    entity: props.entity ? [{ name: props.entity }] : [],
    title: "",
    description: "",
    files: [],
    tags: [],
    requestType: props.requestType ? [{ name: props.requestType }] : [],
    paymentType: props.paymentType ? [{ name: props.paymentType }] : [],
    paymentSource: props.paymentSource ? [{ name: props.paymentSource }] : [],
    budget: undefined,
    specifyBudget: true,
    deadline: "",
    specifyDeadline: true,
});
const allEntities = (
    Near.view(ownerId, "get_entities", {}, "final", true) ?? []
).map((name) => ({ name }));

const allRequestTypes = (
    Near.view(ownerId, "get_request_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const allPaymentTypes = (
    Near.view(ownerId, "get_payment_types", {}, "final", true) ?? []
).map((name) => ({ name }));

const allPaymentSources = (
    Near.view(ownerId, "get_payment_sources", {}, "final", true) ?? []
).map((name) => ({ name }));

const tagsMetadata = Social.getr(`${accountId}/project/tags`, "final");

// styled components
const Heading3 = styled.div`
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
`;

const Title = styled.div`
  border-bottom: 1px solid #ECEEF0;
`;

const renderEntity = (
    <div className="col-lg-12 mb-3">
        <label htmlFor="enity-id">Request as *</label>
        <Typeahead
            id="entity-id"
            labelKey="name"
            onChange={(entity) => State.update({ entity })}
            options={allEntities}
            placeholder="social.near, contribut3.near"
            selected={state.entity}
            positionFixed
            renderMenuItemChildren={(option, { text }) => (
                <Widget
                    src={`${ownerId}/widget/EntityOneLineProfile`}
                    props={{
                        accountId: option.name,
                    }}
                />
            )}
        />
    </div>
);

const renderDescription = (
    <div className="col-lg-12 mb-3">
        <Widget
            src={`${ownerId}/widget/DescriptionInput`}
            props={{
                description: state.description,
                text: "Description",
                update: (description) => State.update({ description }),
            }}
        />
    </div>
);
const onUpdateAttachFiles = (files) => {
    console.log('Files update', files)
    State.update({ files })
}
const renderAttachFiles = (
    <div className="w-100 mb-3">
    <Widget
        src={`${ownerId}/widget/IpfsFilesUpload`}
        props={{
            fileAccept: "application/pdf",
            fileIcon: "bi-file-earmark-pdf",
            buttonText: "Upload a pfd",
            update: onUpdateAttachFiles
        }}
    />
    </div>
);

const renderRequestTypeInput = (
    <div className="w-75 mb-3">
        <Widget
            src={`${ownerId}/widget/ContributionTypeInput`}
            props={{
                contributionType: state.requestType,
                update: (requestType) => State.update({ requestType }),
                allRequestTypes,
                text: "Request type *",
            }}
        />
    </div>
);

const renderTitle = (
    <div className="mb-3">
        <label htmlFor="title">Title *</label>
        <input
            type="text"
            id="title"
            placeholder="Looking for a Rust developer to create a smart contract"
            value={state.title}
            onChange={({ target }) => State.update({ title: target.value })}
        />
    </div>
);
const renderTagSelection = (
    <div className="mb-3" style={{ minHeight: "62px" }}>
        {metadata !== null ? (
            <Widget
                src={"mob.near/widget/MetadataEditor"}
                props={{
                    initialMetadata: metadata,
                    onChange: (metadata) => {
                        State.update({ metadata });
                    },
                    options: {
                        tags: {
                            label: "Tags",
                            placeholder: "defi, staking",
                        },
                    },
                }}
            />
        ) : (
            "Loading"
        )}
    </div>
);

const renderPaymentTypeInput = (
    <div className="w-75 mb-3">
        <Widget
            src={`${ownerId}/widget/PaymentTypeInput`}
            props={{
                paymentType: state.paymentType,
                update: (paymentType) => State.update({ paymentType }),
                allPaymentTypes,
            }}
        />
    </div>
);

const renderPaymentSourceInput = (
    <div className="w-75 mb-3">
        <Widget
            src={`${ownerId}/widget/PaymentSourceInput`}
            props={{
                paymentSource: state.paymentSource,
                update: (paymentSource) => State.update({ paymentSource }),
                allPaymentSources,
            }}
        />
    </div>
);

const renderBudgetInput = (
    <div className="w-75 mb-3">
        <label htmlFor="budget">Budget</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">$</span>
            </div>
            <input
                type="number"
                min="0"
                id="budget"
                disabled={!state.specifyBudget}
                placeholder="1500"
                value={state.budget}
                onChange={({ target }) => State.update({ budget: target.value })}
            />
        </div>
        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value={!state.specifyBudget}
                id="specifyBudget"
                onChange={() => State.update({ specifyBudget: !state.specifyBudget })}
            />
            <label class="form-check-label" for="specifyBudget">
                Don't specify
            </label>
        </div>
    </div>
);

const renderDeadlineInput = (
    <div className="w-50 mb-3">
        <label htmlFor="deadline">Deadline</label>
        <input
            type="date"
            id="deadline"
            disabled={!state.specifyDeadline}
            value={state.deadline}
            onChange={({ target }) => State.update({ deadline: target.value })}
        />

        <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                value={!state.specifyDeadline}
                id="specifyBudget"
                onChange={() =>
                    State.update({ specifyDeadline: !state.specifyDeadline })
                }
            />
            <label class="form-check-label" for="specifyDeadline">
                Don't specify
            </label>
        </div>
    </div>
);
return (
    <div className="row my-4 mx-12">
        <Title class="mb-3">
            <Heading3>Request details</Heading3>
        </Title>

        <div>
            {renderEntity}
            {renderTitle}
            {renderDescription}
            {renderAttachFiles}
            {renderTagSelection}
            {renderRequestTypeInput}
            {renderPaymentTypeInput}
            {renderPaymentSourceInput}
            {renderBudgetInput}
            {renderDeadlineInput}
        </div>
    </div>
);