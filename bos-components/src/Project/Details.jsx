const ownerId = "nearhorizon.near";
const isAdmin = props.isAdmin;
const accountId = props.accountId;
const canEdit = isAdmin;

const horizonOnSave = (project) => {
  State.update({
    project: {
      ...state.project,
      ...project,
    },
  });
  Near.call(ownerId, "edit_project", {
    account_id: accountId,
    project: state.project,
  });
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5em;
  padding: 0.5em 0.2em;
  max-width: 100%;
  font-size: 0.9em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.1875rem;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

State.init({
  profile: null,
  profileIsFetched: false,
  project: null,
  projectIsFetched: false,
  metric: { value: "MAA", text: "Monthly Active Accounts" },
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile ?? {},
      profileIsFetched: true,
    }),
  );
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false,
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched || !state.projectIsFetched) {
  return <>Loading...</>;
}

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: state.project.founders.map((key) => `${key}/profile/name`),
    },
    "final",
    false,
  ).then((names) => {
    State.update({
      names: new Map(
        Object.keys(names).map((account) => [
          account,
          names[account].profile.name,
        ]),
      ),
      namesIsFetched: true,
    });
  });
}

const onSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

const stageMap = {
  "pre-seed": "Pre-seed",
  seed: "Seed",
  "series-a": "Series A",
  "series-b": "Series B",
  "series-c": "Series C",
  "series-d": "Series D",
};

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  &.full {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5em 0px;
  border-bottom: 1px solid #eaecf0;
`;

return (
  <Container>
    <Heading>Details</Heading>
    <Markdown text={state.profile.description} />
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Number`}
        props={{
          label: "Company size",
          id: "size",
          value: state.profile.team,
          onSave: (team) => onSave({ profile: { team: `${team}` } }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Links`}
        props={{
          label: "Links",
          id: "links",
          value: state.profile.linktree ?? {},
          onSave: (linktree) => onSave({ profile: { linktree } }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Text`}
        props={{
          label: "Location",
          id: "location",
          value: state.project.geo,
          onSave: (geo) => horizonOnSave({ geo }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Text`}
        props={{
          label: "Website",
          id: "website",
          value: state.profile.linktree?.website ?? state.profile.website ?? "",
          link: `https://${
            state.profile.linktree.website ?? state.profile.website
          }`,
          onSave: (website) => onSave({ profile: { linktree: { website } } }),
          canEdit: isAdmin,
        }}
      />
    </Details>

    <Separator />

    <Heading>Project stats</Heading>
    <Details className="full">
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Metric",
          options: [
            { value: "DAA", text: "Daily Active Accounts" },
            { value: "MAA", text: "Monthly Active Accounts" },
            { value: "MAT", text: "Monthly Average Transactions" },
            { value: "DAT", text: "Daily Average Transactions" },
          ],
          value: state.metric,
          onChange: (metric) => State.update({ metric }),
        }}
      />
      <Widget
        src="y3k.near/widget/widgets.external.horizon_project_stats"
        props={{
          project_name: accountId,
          selectedMetric: state.metric,
        }}
      />
    </Details>

    <Separator />

    <Heading>Tech info</Heading>
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Integration`}
        props={{
          label: "Integration",
          value: state.project.integration,
          onSave: ({ value: integration }) => horizonOnSave({ integration }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Phase`}
        props={{
          label: "Development phase",
          value: state.profile.dev,
          onSave: ({ value: dev }) => onSave({ profile: { dev } }),
          canEdit: isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Distribution`}
        props={{
          label: "Distribution",
          value: state.profile.distribution,
          onSave: ({ value: distribution }) =>
            onSave({ profile: { distribution } }),
          canEdit: isAdmin,
        }}
      />
    </Details>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Verticals`}
      props={{
        label: "Verticals",
        value: state.profile.verticals ?? { [state.profile.category]: "" },
        onSave: (verticals) =>
          onSave({
            profile: {
              verticals: verticals.reduce(
                (acc, vertical) => Object.assign(acc, { [vertical]: "" }),
                {},
              ),
            },
          }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.ProductType`}
      props={{
        label: "Product Type",
        value: state.profile.product_type,
        onSave: (productType) =>
          onSave({
            profile: {
              product_type: productType.reduce(
                (acc, productType) => Object.assign(acc, { [productType]: "" }),
                {},
              ),
            },
          }),
        canEdit: isAdmin,
      }}
    />

    <Separator />

    <Heading>Funding info</Heading>
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Select`}
        props={{
          label: "Stage",
          id: "stage",
          value: {
            value: state.profile.stage,
            text: stageMap[state.profile.stage],
          },
          options: [
            { text: "Pre-seed", value: "pre-seed" },
            { text: "Seed", value: "seed" },
            { text: "Series A", value: "series-a" },
            { text: "Series B", value: "series-b" },
            { text: "Series C", value: "series-c" },
            { text: "Series D", value: "series-d" },
          ],
          onSave: ({ value: stage }) => onSave({ profile: { stage } }),
          canEdit: isAdmin,
        }}
      />
    </Details>

    <Separator />

    <Heading>Documents</Heading>

    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Pitch deck",
        id: "pitch-deck",
        fileAccept: [".pdf"],
        value: state.project.deck,
        onSave: (deck) => horizonOnSave({ deck }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "White paper",
        id: "white-paper",
        fileAccept: [".pdf"],
        value: state.project.white_paper,
        onSave: (white_paper) => horizonOnSave({ white_paper }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Roadmap",
        id: "roadmap",
        fileAccept: [".pdf"],
        value: state.project.roadmap,
        onSave: (roadmap) => horizonOnSave({ roadmap }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Team",
        id: "team",
        fileAccept: [".pdf"],
        value: state.project.team_deck,
        onSave: (team_deck) => horizonOnSave({ team_deck }),
        canEdit,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.File`}
      props={{
        label: "Demo video",
        id: "demo-video",
        fileAccept: ["video/*"],
        value: state.project.demo,
        onSave: (demo) => horizonOnSave({ demo }),
        canEdit,
      }}
    />

    <Separator />

    <Heading>Founders</Heading>
    {props.isAdmin ? (
      <Widget
        src={`${ownerId}/widget/Inputs.Founders`}
        props={{
          founders: state.project.founders,
          update: (founders) => State.update({ founders }),
          onSave: (founders) => horizonOnSave({ founders }),
        }}
      />
    ) : !state.names ? (
      <>Loading...</>
    ) : (
      <List>
        {state.project.founders.map((founder) => (
          <Item>
            <Widget
              src="near/widget/AccountProfileOverlay"
              props={{
                accountId: founder,
                children: (
                  <>
                    <Widget
                      src={`${ownerId}/widget/Vendor.Icon`}
                      props={{ accountId: founder, size: "2em" }}
                    />
                    <Widget
                      src={`${ownerId}/widget/NameAndAccount`}
                      props={{
                        accountId: founder,
                        name: state.names.get(founder),
                        nameSize: ".9em",
                      }}
                    />
                  </>
                ),
                inline: true,
              }}
            />
          </Item>
        ))}
      </List>
    )}

    <Separator />

    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What problem(s) are you solving?",
        id: "problem",
        value: state.project.problem,
        onSave: (problem) => horizonOnSave({ problem }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What makes your team uniquely positioned for success?",
        id: "success_position",
        value: state.project.success_position,
        onSave: (success_position) => horizonOnSave({ success_position }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Why are you building on NEAR?",
        id: "why",
        value: state.project.why,
        onSave: (why) => horizonOnSave({ why }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What's your 5 year vision?",
        id: "vision",
        value: state.project.vision,
        onSave: (vision) => horizonOnSave({ vision }),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
