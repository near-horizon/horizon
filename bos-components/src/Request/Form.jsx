const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const createDate = (date) => {
  const d = date ? new Date(date) : new Date();
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  return `${d.getFullYear()}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;

  img {
    vertical-align: top;
  }
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #101828;
`;

const AccountId = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1em;
  color: #7e868c;
`;

const ImageCircle = styled.img`
  background: #fafafa;
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
`;

const createProjectLine = (accountId, name, image) => {
  const fullName = name ?? accountId;
  const url =
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || "https://thewiki.io/static/media/sasha_anon.6ba19561.png";
  const imageSrc = `https://i.near.social/thumbnail/${url}`;

  return (
    <LineContainer>
      <ImageContainer title={`${fullName} @${accountId}`}>
        <ImageCircle src={imageSrc} alt="profile image" />
      </ImageContainer>
      <Name>{name}</Name>
      <AccountId>@{accountId}</AccountId>
    </LineContainer>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-top: 2em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  margin-bottom: 0.5em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.375em;
  width: 100%;
  height: 0.5em;
  padding: 0;
  margin: 0;

  div {
    flex-grow: 1;
    height: 100%;
    width: 50%;
    background: #00ec97;
  }

  &.half {
    div:last-child {
      background: #eceef0;
    }
  }
`;

const CancelButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

State.init({
  project: null,
  projectId: null,
  projectIdError: "",
  projects: [],
  projectsIsFetched: false,
  tags: [],
  tagsError: "",
  title: "",
  titleError: "",
  description: "",
  descriptionError: "",
  requestType: null,
  requestTypes: [],
  requestTypeError: "",
  paymentType: null,
  paymentTypes: [],
  paymentTypeError: "",
  paymentSource: null,
  paymentSources: [],
  paymentSourceError: "",
  budget: null,
  budgetError: "",
  deadline: createDate(),
  deadlineError: "",
});

const validateForm = () => {
  return (
    state.title &&
    state.titleError === "" &&
    state.description &&
    state.descriptionError === "" &&
    state.requestType &&
    state.requestTypeError === "" &&
    state.paymentType &&
    state.paymentTypeError === "" &&
    state.paymentSource &&
    (state.project.credits || state.paymentSource.value === "Other") &&
    state.paymentSourceError === "" &&
    state.budget &&
    state.budgetError === "" &&
    state.deadline &&
    state.deadlineError === ""
  );
};

if (!state.projectsIsFetched) {
  Near.asyncView(ownerId, "get_payment_types", {}, "final", false).then(
    (paymentTypes) =>
      State.update({
        paymentTypes: paymentTypes.map((value) => ({ value, text: value })),
      }),
  );
  Near.asyncView(ownerId, "get_payment_sources", {}, "final", false).then(
    (paymentSources) =>
      State.update({
        paymentSources: paymentSources.map((value) => ({ value, text: value })),
      }),
  );
  Near.asyncView(ownerId, "get_request_types", {}, "final", false).then(
    (requestTypes) =>
      State.update({
        requestTypes: requestTypes.map((value) => ({ value, text: value })),
      }),
  );
  Near.asyncView(
    ownerId,
    "get_admin_projects",
    { account_id: context.accountId },
    "final",
    false,
  ).then((projects) => {
    Near.asyncView(
      "social.near",
      "get",
      { keys: projects.map((accountId) => `${accountId}/profile/**`) },
      "final",
      false,
    ).then((data) =>
      State.update({
        projects: projects.map((accountId) => ({
          // text: <Widget
          //   src={`${ownerId}/widget/Project.Line`}
          //   props={{ accountId, size: "1em" }}
          // />,
          text: createProjectLine(
            accountId,
            data[accountId].profile.name,
            data[accountId].profile.image,
          ),
          value: accountId,
        })),
        projectsIsFetched: true,
        ...(accountId
          ? {
              projectId: {
                text: createProjectLine(
                  accountId,
                  data[accountId].profile.name,
                  data[accountId].profile.image,
                ),
                value: accountId,
              },
            }
          : {}),
      }),
    );
  });
  return <>Loading...</>;
}

if (!state.projects.length) {
  return (
    <Widget
      src={`${ownerId}/widget/InfoSegment`}
      props={{
        title: "No project to request for!",
        description: (
          <>
            You need to log in with an account that has admin rights to a
            project or create a{" "}
            <a href={`/${ownerId}/widget/Index?tab=createproject`}>
              new project
            </a>
            !
          </>
        ),
      }}
    />
  );
}

const HalfWidth = styled.div`
  width: 50%;
`;

return (
  <Container>
    {/*<ProgressBar className={state.step === "step1" ? "half" : ""}><div /><div /></ProgressBar>*/}
    <div>
      <Header>Create new contribution request</Header>
      <SubHeader>
        Use this form to post your business needs and match with reputable
        contributors and service providers with ease
      </SubHeader>
    </div>
    <Form>
      <FormHeader>Request details</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Request as *",
          value: state.projectId,
          options: state.projects,
          onChange: (projectId) => {
            Near.asyncView(
              ownerId,
              "get_project",
              { account_id: projectId.value },
              "final",
              false,
            ).then((project) => State.update({ project }));
            State.update({ projectId });
          },
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Title",
          placeholder: "",
          value: state.title,
          onChange: (title) => State.update({ title }),
          validate: () => {
            if (state.title.length < 3) {
              State.update({
                titleError: "Title must be at least 3 characters",
              });
              return;
            }

            if (state.title.length > 50) {
              State.update({
                titleError: "Title must be less than 50 characters",
              });
              return;
            }

            State.update({ titleError: "" });
          },
          error: state.titleError,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Description",
          placeholder: "",
          value: state.description,
          onChange: (description) => State.update({ description }),
          validate: () => {
            if (state.description.length < 10) {
              State.update({
                descriptionError: "Description must be at least 10 characters",
              });
              return;
            }

            if (state.description.length > 5000) {
              State.update({
                descriptionError:
                  "Description must be less than 5000 characters",
              });
              return;
            }

            State.update({ descriptionError: "" });
          },
          error: state.descriptionError,
        }}
      />
      {/*<Widget
        src={`${ownerId}/widget/Inputs.MultiSelect`}
        props={{
          label: "Tags",
          placeholder: "Start typing",
          options: [{ name: "Wallets" }, { name: "Games" }],
          value: state.tags,
          onChange: (tags) =>
            State.update({
              tags: tags.map(({ name }) => ({
                name: name.trim().replaceAll(/\s+/g, "-"),
              })),
            }),
        }}
      />*/}
      <HalfWidth>
        <Widget
          src={`${ownerId}/widget/Inputs.Select`}
          props={{
            label: "Request type *",
            options: state.requestTypes,
            value: state.requestType,
            onChange: (requestType) => State.update({ requestType }),
          }}
        />
      </HalfWidth>
      <HalfWidth>
        <Widget
          src={`${ownerId}/widget/Inputs.Select`}
          props={{
            label: "Payment type *",
            options: state.paymentTypes,
            value: state.paymentType,
            onChange: (paymentType) => State.update({ paymentType }),
          }}
        />
      </HalfWidth>
      <HalfWidth>
        <Widget
          src={`${ownerId}/widget/Inputs.Select`}
          props={{
            label: "Payment source *",
            options: state.paymentSources.filter(
              ({ value }) => state.project.credits || value === "Other",
            ),
            value: state.paymentSource,
            onChange: (paymentSource) => State.update({ paymentSource }),
          }}
        />
      </HalfWidth>
      <HalfWidth>
        <Widget
          src={`${ownerId}/widget/Inputs.Number`}
          props={{
            label: "Budget *",
            placeholder: 0.0,
            hasDollar: true,
            value: state.budget,
            onChange: (budget) => State.update({ budget }),
            validate: () => {
              if (state.budget < 1) {
                State.update({
                  budgetError: "Budget must be at least 1",
                });
                return;
              }

              State.update({ budgetError: "" });
            },
            error: state.budgetError,
          }}
        />
      </HalfWidth>
      <HalfWidth>
        <Widget
          src={`${ownerId}/widget/Inputs.Date`}
          props={{
            label: "Deadline *",
            value: state.deadline,
            onChange: (deadline) => State.update({ deadline }),
            validate: () => {
              if (new Date(state.deadline) < new Date()) {
                State.update({
                  deadlineError: "Deadline must be in the future",
                });
                return;
              }

              State.update({ deadlineError: "" });
            },
            error: state.deadlineError,
          }}
        />
      </HalfWidth>
      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Green`}
          props={{
            disabled: !validateForm(),
            onClick: () => {
              if (!validateForm()) return;
              Near.call(ownerId, "add_request", {
                request: {
                  project_id: state.projectId.value,
                  title: state.title,
                  description: state.description,
                  open: true,
                  request_type: state.requestType.value,
                  payment_type: state.paymentType.value,
                  tags: state.tags.map(({ name }) => name),
                  source: state.paymentSource.value,
                  deadline: `${new Date(state.deadline).getTime()}`,
                  budget: Number(state.budget),
                },
              });
            },
            text: (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.87464 10.1251L15.7496 2.25013M7.97033 10.3712L9.94141 15.4397C10.1151 15.8862 10.2019 16.1094 10.327 16.1746C10.4354 16.2311 10.5646 16.2312 10.6731 16.1748C10.7983 16.1098 10.8854 15.8866 11.0596 15.4403L16.0023 2.77453C16.1595 2.37164 16.2381 2.1702 16.1951 2.04148C16.1578 1.92969 16.0701 1.84197 15.9583 1.80462C15.8296 1.76162 15.6281 1.84023 15.2252 1.99746L2.55943 6.94021C2.11313 7.11438 1.88997 7.20146 1.82494 7.32664C1.76857 7.43516 1.76864 7.56434 1.82515 7.67279C1.89033 7.7979 2.11358 7.88472 2.56009 8.05836L7.62859 10.0294C7.71923 10.0647 7.76455 10.0823 7.80271 10.1095C7.83653 10.1337 7.86611 10.1632 7.89024 10.1971C7.91746 10.2352 7.93508 10.2805 7.97033 10.3712Z"
                    stroke="#11181C"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Publish request
              </>
            ),
          }}
        />
        <CancelButton href={`/${ownerId}/widget/Index`}>Cancel</CancelButton>
      </FormFooter>
    </Form>
  </Container>
);
