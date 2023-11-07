/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

function Section({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-start gap-6 p-0">{children}</div>;
}

export default function FAQPage() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-6 rounded-xl border border-ui-elements-light bg-background-white p-12 pt-6 shadow">
      {/* <Widget */}
      {/*   src={"nearhorizon.near/widget/InfoSegment"} */}
      {/*   props={{ */}
      {/*     title: "Need help?", */}
      {/*     description: ( */}
      {/*       <> */}
      {/*         Have a question not listed? Reach out to the Horizon team : */}
      {/*         <a href="mailto:support.horizon@near.foundation"> */}
      {/*           support.horizon@near.foundation */}
      {/*         </a> */}
      {/*         ! */}
      {/*       </> */}
      {/*     ), */}
      {/*   }} */}
      {/* /> */}
      <div className="flex flex-col items-start p-0">
        <h1 className="text-3xl font-bold text-ui-elements-dark">
          Horizon FAQ
        </h1>
        <h2 className="text-ui-elements-gray">
          Welcome to the Horizon FAQ page. This document covers common questions
          and troubleshooting issues. It will be regularly updated as we receive
          new feedback. If your question is not listed, please reach out to the
          team.
        </h2>
      </div>
      <Section>
        <h3 className="text-2xl font-bold text-ui-elements-dark">General</h3>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          What is Horizon?
        </h4>

        <div className="relative w-[90%]">
          <a
            href="https://youtu.be/EN7TIUr_fkg"
            className="flex w-full flex-col items-center justify-center"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                alt="play button"
                src="https://nearhorizonassets.s3.amazonaws.com/icon_circled-play.png"
                fill
                unoptimized
              />
            </div>
            <Image
              src="https://nearhorizonassets.s3.amazonaws.com/petar-nh-walkthrough_thumbnail.jpg"
              alt="NH Application Walkthrough"
              fill
              unoptimized
            />
          </a>
          <p className="mt-4 text-center">
            Video Walkthrough of the Horizon Application
          </p>
        </div>
        <p>Horizon is a Web3 startup support platform built on the NEAR BOS.</p>
        <p>
          Horizon’s mission is to attract high-quality founders and support
          their growth by facilitating connections with the right resources all
          in one place.
        </p>
      </Section>
      <Section>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          What stage should my project be at before joining Horizon?
        </h4>
        <p>
          Horizon can help you at any stage of your startup journey. With both
          guided and self-guided paths, you can connect to the resources and
          people you need to get to the next step towards a successful launch.
          To begin, simply create a project profile.
        </p>
      </Section>
      <Section>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          How do I get started?
        </h4>
        <p>
          <strong>1.</strong> Create a{" "}
          <a href="https://wallet.near.org/">NEAR account</a> if you don&apos;t
          have one
          <br />
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
          <br />
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
          <br />
          <img
            src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_landing.jpg"
            alt="horizon app landing page"
            width="50%"
          />
        </p>

        <p>
          <strong>4.</strong>
          <a href="https://www.youtube.com/watch?v=EN7TIUr_fkg">
            Video explainer
            <br />
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
            <br />
            <img
              src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_app_help-pg.png"
              alt="horizon help page"
              width="50%"
            />
          </a>
        </p>
      </Section>
      <Section>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          Where do I find help?
        </h4>
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
        <h3 className="text-2xl font-bold text-ui-elements-dark">
          Troubleshooting
        </h3>
        <p>
          <strong>Common issues:</strong>
        </p>

        <h4 className="text-xl font-semibold text-ui-elements-dark">
          How do I find projects
        </h4>
        <p>
          You can search all current projects on the NEAR Horizon Application
          page
        </p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_all-projects.jpg"
          alt="Project search"
          width="50%"
        />

        <p>
          In addition to the search bar, you can apply various filters to your
          search
        </p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_projects_filters.jpg"
          alt="Project search"
          width="50%"
        />
        <p>There is also a sort feature for displaying results</p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_projects_sort.jpg"
          alt="Project search"
          width="50%"
        />
        <br />
      </Section>
      <Section>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          Are there analytics?
        </h4>
        <p>
          Yes! The main application page will display ecosystem stats from{" "}
          <a href="https://nearatlas.com/#/">Atlas</a>. We also use{" "}
          <a href="https://flipsidecrypto.xyz/azerbaijan/near-horizon-activity-vSci5p">
            Flipside
          </a>{" "}
          to collect on-chain data.
        </p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_stats_new.jpg"
          alt="atlas stats"
          width="50%"
        />
      </Section>
      <Section>
        <h4 className="text-xl font-semibold text-ui-elements-dark">
          I tried to create a project but the transaction didn’t go through, I
          got an error message similar to this:
        </h4>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/error-msg_project-create.png"
          width="50%"
          alt="alt_text"
          title="image_tooltip"
        />
        <p>
          This error is caused when creating a project with an account different
          than the users NEAR Discovery account that is actively logged in:
          (e.g. janedoe.near is creating a project for janedoeproject.near)
        </p>
        <p>
          Your project has its own account. In order to add admins on a project,
          including yourself, you must log in with the project account id, and
          visit the link to grant appropriate permissions to yourself and your
          team. Once completed, log back in with your user account (the account
          you are using now) to complete the setup process.
        </p>
      </Section>
      <Section>
        <h4>I don’t know how to claim a project</h4>
        <p>Claiming a project can be done in two simple steps:</p>

        <p>
          <strong>1.</strong> On the project&apos;s profile page, click
          &quot;Claim Project&quot;
        </p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_claim_project_cta.png"
          width="50%"
          alt="alt_text"
        />
        <p>
          <strong>2.</strong> Complete and submit the form that appears. The
          Horizon team will review your request and add you as the admin to the
          project.
        </p>
        <img
          src="https://s3.us-east-2.amazonaws.com/nearhorizon.assets/nh_app_claim_project_form.png"
          width="50%"
          alt="alt_text"
        />
      </Section>
    </div>
  );
}
