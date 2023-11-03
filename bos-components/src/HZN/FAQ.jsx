const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  flex: 1 0 0;
  width: 100%;

  & > h2 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.875rem; /* 127.778% */
    letter-spacing: 0.0225rem;
  }

  @media screen and (max-width: 768px) {
    & > div {
      flex-direction: column;
      gap: 1.5rem !important;
    }
  }

  & > div {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;

    & > div {
      @media screen and (max-width: 768px) {
        width: 100% !important;
      }

      width: calc(50% - 1rem);
      padding-top: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;

      & > b {
        color: var(--ui-elements-black, #000);
        font-family: FK Grotesk;
        font-size: 1.1875rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.01188rem;
      }

      & > p {
        padding: 0;
        margin: 0;
        color: var(--background-dark, #3a3f42);
        font-family: Montserrat;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem; /* 150% */
      }
    }

    & > div:nth-child(n + 3) {
      border-top: 1px solid var(--gray-200, #eaecf0);
    }

    @media screen and (max-width: 768px) {
      & > div:nth-child(n + 2) {
        border-top: 1px solid var(--gray-200, #eaecf0) !important;
      }
    }
  }
`;

const faqs = [
  {
    question: "What is NEAR Horizon?",
    answer:
      "NEAR Horizon is a startup support platform powered by NEAR Protocol. We focus on accelerating the growth and success of early-stage Web3 startups. Since our launch in April 2023, we have onboarded over 200 projects and attracted 50+ contributors. We provide a robust community, immersive learning experiences, mentorship, technical support, and more, all designed to facilitate the growth of your Web3 startup.",
  },
  {
    question: "What all is included in HZN1?",
    answer:
      'HZN1 is a comprehensive program for founders that includes cohort-based learning, expert-led sessions, networking opportunities, product audits, a "Ready-to-Raise" bootcamp, Catalyst mentorship program, and more. All these components are designed to provide you with the knowledge, connections, and skills to scale your startup successfully in the Web3.',
  },
  {
    question: "How long is HZN1?",
    answer: "HZN1 runs for three months from September to Mid-December 2023",
  },
  {
    question: "When does the cohort start?",
    answer:
      "The inaugural cohort of HZN1 will commence in September 2023. Register your interest now to stay updated with the latest announcements and preparations.",
  },
  {
    question: "What is the time commitment?",
    answer:
      "Participation in HZN1 requires a time commitment of 2-4 hours per week. This includes attending sessions, engaging in discussions, working on challenges and projects, and participating in other program elements.",
  },
  {
    question: "How much does HZN1 cost?",
    answer:
      "HZN1 is an equity-free program. We do not make an investment or take equity in participating startups. The program, designed to support and elevate early-stage Web3 founders, is completely free of charge for HZN1.",
  },
  {
    question: "How does the admissions process work?",
    answer:
      "The admissions process for HZN1 begins with a registration of interest. Following this, there will be a thorough review of applications to ensure a mutual fit. More details on the admissions process will be provided upon registration. Upon acceptance, founders will be prompted to create a profile on Horizon and join our private Discord server.",
  },
].map(({ question, answer }) => (
  <div key={question}>
    <b>{question}</b>
    <p>{answer}</p>
  </div>
));

return (
  <Container>
    <h2>Frequently asked questions</h2>
    <div>{faqs}</div>
  </Container>
);
