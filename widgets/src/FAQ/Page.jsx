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

const FirstSubSection = styled.div`
  position: relative;
  width: 90%;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  p {
    text-align: center;
    margin-top: 1em;
  }

  img.play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img.image {
    width: 100%;
  }
`;

return (
  <Container>
    <Widget
      src={"nearhorizon.near/widget/InfoSegment"}
      props={{
        title: "Need help?",
        description: (
          <>
            Have a question not listed? Reach out to the Horizon team{" "}: 
            <a href="mailto:horizon@near.foundation">horizon@near.foundation</a>
            !
          </>
        ),
      }}
    />
    <Heading>
      <h1>Horizon FAQ</h1>
      <h2>
       Welcome to the Horizon FAQ page. This document covers common questions and troubleshooting issues. It will be regularly updated as we receive new feedback. If your question is not listed, please reach out to the team.{" "}
      </h2>
    </Heading>
    <Section>
      <h3>General</h3>
      <h4>What is Horizon?</h4>
    
      <FirstSubSection>
        <a href="https://youtu.be/EN7TIUr_fkg">
          <img
            className="play"
            src="https://nearhorizonassets.s3.amazonaws.com/icon_circled-play.png"
          />
          <img
            className="image"
            src="https://nearhorizonassets.s3.amazonaws.com/petar-nh-walkthrough_thumbnail.jpg"
            alt="NH Application Walkthrough"
          />
        </a>
        <p>Video Walkthrough of the Horizon Application</p>
      </FirstSubSection>
      <p>Horizon is a Web3 startup support platform built on the NEAR BOS.</p>
      <p>
        Horizon’s mission is to attract high-quality founders and support their
        growth by facilitating connections with the right resources all in one
        place.
      </p>
    
    </Section>
    <Section>
      <h4>What stage should my project be at before joining Horizon?</h4>
    <p>
      Horizon can help you at any stage of your startup journey. With both
      guided and self-guided paths, you can connect to the resources and people
      you need to get to the next step towards a successful launch. To begin,
      simply create a project profile.
    </p>
    </Section>
    <Section>
      <h4>How do I get started?</h4>
    <p>
      <strong>1.</strong> Create a{" "}
      <a href="https://wallet.near.org/">NEAR account</a> if you don't have one
      <br/>
      <img
        src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/account-create.png"
        alt="account create"
      />
    </p>

    <p>
      <strong>2.</strong> If you are a founder of a project,{" "}
      <a href="https://near.org/nearhorizon.near/widget/Index?tab=createproject">
        create a project{" "}
      </a>
      in the project page.
      <br/>
      <img
        src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/project-create.png"
        alt="project create"
      />
    </p>

    <p>
      <strong>3.</strong>
      <a href="https://near.org/nearhorizon.near/widget/Index">
        {" "}
        Explore and discover
      </a>{" "}
      Horizon
      <br/>
      <img
        src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_app_landing.png"
        alt="horizon app landing page"
        width="50%"
      />
    </p>

    <p>
      <strong>4.</strong>
      <a href="https://www.youtube.com/watch?v=EN7TIUr_fkg">
        Video explainer
      <br/>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh-walkthrough.gif"
          alt="horizon app walkthrough"
        />
      </a>
    </p>
    <p>
      <strong>5.</strong>{" "}
      <a href="https://near.org/nearhorizon.near/widget/Index?tab=help">
        Additional help
     <br/>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_app_help-pg.png"
          alt="horizon help page"
          width="50%"
        />
      </a>
    </p>
    </Section>
    <Section>
      <h4>Where do I find help?</h4>
    <p>
      <a href="https://near.org/nearhorizon.near/widget/Index?tab=help">
        Horizon help page
      </a>
    </p>
    <p>

        Email Horizon Team:{" "}
        <a href="mailto:horizon@near.foundation">horizon@near.foundation</a>
  
    </p>
    <p>
      Email NEAR Foundation Team:
      <a href="mailto:hello@near.foundation">hello@near.foundation</a>
    </p>

    </Section>
    <Section>
      <h3>Troubleshooting</h3>
          <p>
      <strong>Common issues:</strong>
    </p>

    <h4>How do I find projects</h4>
        <p>
      You can search all current projects on the NEAR Horizon Application page
    </p>
    <img
      src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_project_search.jpg"
      alt="Project search"
      width="50%"
    />
    <br/>
    </Section>
    <Section>
      <h4>Are there analytics?</h4>
          <p>
      Yes! The main application page will display ecosystem stats from{" "}
      <a href="https://nearatlas.com/#/">Atlas</a>. We also use{" "}
      <a href="https://flipsidecrypto.xyz/azerbaijan/near-horizon-activity-vSci5p">
        Flipside
      </a>{" "}
      to collect on-chain data.
    </p>
    <img
      src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_stats.jpg"
      alt="atlas stats"
      width="50%"
    />

    </Section>
    <Section>
      <h4>  I tried to create a project but the transaction didn’t go through, I got
        an error message similar to this:
      </h4>
    <img
      src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/error-msg_project-create.png"
      width="50%"
      alt="alt_text"
      title="image_tooltip"
    />
    <p>
      This error is caused when creating a project with an account different
      than the users NEAR Discovery account that is actively logged in: (e.g.
      janedoe.near is creating a project for janedoeproject.near)
    </p>
    <p>
      Your project has its own account. In order to add admins on a project,
      including yourself, you must log in with the project account id, and visit
      the link to grant appropriate permissions to yourself and your team. Once
      completed, log back in with your user account (the account you are using
      now) to complete the setup process.
    </p>

    </Section>
    <Section>
      <h4>I don’t know how to claim a project</h4>
    <p>
      Claiming a project can be done in two simple steps:
    </p>

      <p><strong>1.</strong> On the project's profile page, click "Claim Project"</p>
      <img
        src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_claim_project_cta.png"
        width="50%"
      />
      <p><strong>2.</strong> Complete and submit the form that appears. The Horizon
      team will review your request and add you as the admin to the project.</p>
            <img
        src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_app_claim_project_form.png"
        width="50%"
      />
    </Section>

  </Container>
);

