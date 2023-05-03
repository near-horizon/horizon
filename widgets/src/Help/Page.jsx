const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5em;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 1.5em;

  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 36px;
    color: #000000;
  }
`;

return (
  <Container>
    <Heading>
      <h1>NEAR Horizon Getting Started Guide</h1>
      <h2>
        Welcome to the NEAR Horizon Getting Started Guide. This guide will help
        you get started with NEAR Horizon, a Web3 platform for connecting
        startups to contributors, services, resources, and financing.{" "}
      </h2>
    </Heading>
    <Section>
      <h3>Landing Page</h3>
      <p>
        Whether you've navigated to the NEAR Horizon landing page from a shared
        link or found it through a BOS Gateway, you'll be greeted with a
        personalized dashboard.{" "}
      </p>
      <img
        alt="near horizon landing page"
        src="https://nearhorizonassets.s3.amazonaws.com/landing_basic_features_optimized.gif"
      />
      <p>
        Here you can create a new project, manage your existing projects, update
        your profile, check your inbox, and more. These options are available in
        the sidebar on the left.
      </p>
    </Section>
    <Section>
      <h3>Creating a Project</h3>
      <p>
        To create a new project, click the "Create new" button on the top right
        of the page. A drop-down will appear. Select "Project". A form will
        appear. Fill out the form with the details of your project.
      </p>
      <img
        alt="creating a project on near horizon"
        src="https://nearhorizonassets.s3.amazonaws.com/create_project_optimized.gif"
      />
      <p>
        When you are ready, click the "Create project" button at the bottom of
        the form. Or you can save the form and complete later by clicking the
        "Save for later" button (also at the bottom of the form). Once created,
        you will be navigated to the project page.{" "}
      </p>
      <p>
        Take a moment to review your project details which are displayed in the
        sidebar on the right. You can edit any of these details by clicking the
        "Edit" button next to the detail you would like to change.
      </p>
      <p>
        That's it! You've created your first project on NEAR Horizon.
        Congratulations!
      </p>
    </Section>
  </Container>
);
