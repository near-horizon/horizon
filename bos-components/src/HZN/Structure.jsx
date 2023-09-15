const mapImage = (url) => `https://ipfs.near.social/ipfs/${url}`;
const image = "bafkreiej5x7dhlryiqpunbvumpqs2txmmwjb2mwtjeza6sm4svx3c3xq4m";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  flex: 1 0 0;
  width: 100%;
  padding: 5.0625rem 0rem 4.5rem 0rem;
  border-radius: 1.5rem;
  background: var(--background-light, #fafafa);

  & > h2 {
    color: var(--ui-elements-dark, #11181c);
    text-align: center;
    font-family: FK Grotesk;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.875rem; /* 127.778% */
    letter-spacing: 0.0225rem;
    padding: 0 3rem;
  }

  & > p {
    color: var(--background-dark, #3a3f42);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 2rem */
    padding: 0 3rem;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  overflow-x: scroll;
  scrollbar-width: none;

  & > div {
    display: flex;
    padding: 0rem 2rem;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1.625rem;
  }
`;

const Card = styled.div`
  display: flex;
  width: 18.75rem;
  padding: 1.5rem 2rem 2rem 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1.9375rem;
  border-radius: 1rem;
  background: #fff;

  &.blue,
  &.orange {
    & > div > h6 {
      color: var(--ui-elements-white, #fff);
    }
  }

  &.blue {
    background: linear-gradient(90deg, #0096ea 3.17%, #32ceff 90.93%);
  }

  &.orange {
    background: linear-gradient(90deg, #ff6c4a 3.17%, #ffa654 90.93%);
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    height: 100%;

    & > h6 {
      color: var(--ui-elements-black, #000);
      text-align: center;
      font-family: Inter;
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    & > ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.6875rem;
      padding: 0.625rem;

      & > li {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0.9375rem;
        width: 100%;
        color: var(--background-dark, #3a3f42);
        font-family: FK Grotesk;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 1.6rem */

        & > svg {
          width: 1.5rem;
          min-width: 1.5rem;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-elements-white, #fff);
      text-align: center;
      font-family: FK Grotesk;
      font-size: 2.625rem;
      font-style: normal;
      font-weight: 700;
      line-height: 140%; /* 3.675rem */
      height: 100%;
    }
  }
`;

const Check = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <rect y="0.71875" width="24" height="24" rx="12" fill="#D1FADF" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.0964 8.10879L9.93638 15.0188L8.03638 12.9888C7.68638 12.6588 7.13638 12.6388 6.73638 12.9188C6.34638 13.2088 6.23638 13.7188 6.47638 14.1288L8.72638 17.7888C8.94638 18.1288 9.32638 18.3388 9.75638 18.3388C10.1664 18.3388 10.5564 18.1288 10.7764 17.7888C11.1364 17.3188 18.0064 9.12879 18.0064 9.12879C18.9064 8.20879 17.8164 7.39879 17.0964 8.09879V8.10879Z"
      fill="#04A46E"
    />
  </svg>
);

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background: var(--ui-elements-gray, #eceef0);
`;

const cards = [
  {
    heading: "Week 1",
    items: [
      "Cohort onboarding & welcome",
      "Signature session / Fireside chat",
      "Cohort social meetup",
      "Mentorship kickoff & introductions",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 2",
    items: [
      "Designing an Organizational Culture as a Founder",
      "Tech Tree walkthrough",
      "Product Demo Day #1",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 3",
    items: [
      "Tech Tree walkthrough",
      "Service Provider AMA",
      "IRL Meetup 1",
      "Fundraising Bootcamp Kickoff: Storytelling 101",
      "Consumer Products 101 and Product Design in Web3",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 4",
    items: [
      "DISCOVERY Kickoff: How to Run Effective User Research",
      "Co-working Day (Hybrid / New York City)",
      "Fundraising Bootcamp: How to Run a Fundraising Process",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 5",
    items: [
      "Cohort onboarding & welcome",
      "Signature session / Fireside chat",
      "Cohort social meetup",
      "Mentorship kickoff & introductions",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 6",
    items: [
      "Designing an Organizational Culture as a Founder",
      "Tech Tree walkthrough",
      "Product Demo Day #1",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 7",
    items: [
      "Tech Tree walkthrough",
      "Service Provider AMA",
      "IRL Meetup 1",
      "Fundraising Bootcamp Kickoff: Storytelling 101",
      "Consumer Products 101 and Product Design in Web3",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 8",
    subheading: "Founder Retreat",
    highlight: "blue",
  },
  {
    heading: "Week 9",
    items: [
      "DISCOVERY Kickoff: How to Run Effective User Research",
      "Co-working Day (Hybrid / New York City)",
      "Fundraising Bootcamp: How to Run a Fundraising Process",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 10",
    items: [
      "DISCOVERY Kickoff: How to Run Effective User Research",
      "Co-working Day (Hybrid / New York City)",
      "Fundraising Bootcamp: How to Run a Fundraising Process",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 11",
    items: [
      "DISCOVERY Kickoff: How to Run Effective User Research",
      "Co-working Day (Hybrid / New York City)",
      "Fundraising Bootcamp: How to Run a Fundraising Process",
      "Weekly product audit",
    ],
  },
  {
    heading: "Week 12",
    subheading: "Final Demo Day & Celebration!",
    highlight: "orange",
  },
].map(({ heading, items, subheading, highlight }) => (
  <Card key={heading} className={highlight}>
    <div>
      <h6>{heading}</h6>
      {items ? (
        <ul>
          {items.reduce((items, item) => {
            if (items.length === 0) {
              return [
                <li key={item}>
                  {Check}
                  {item}
                </li>,
              ];
            }

            items.push(<Separator />);
            items.push(
              <li key={item}>
                {Check}
                {item}
              </li>
            );

            return items;
          }, [])}
        </ul>
      ) : (
        <div>{subheading}</div>
      )}
    </div>
  </Card>
));

return (
  <Container>
    <h2>HZN Cohort Structure</h2>
    <p>
      In HZN1, the cohort experience is crafted to provide flexibility alongside
      immersive learning. These sessions are designed to cover the spectrum of
      project needs - from tech know-how to fundraising strategies, leadership
      skills, and more. The schedule allows for a global participation,
      accommodating different time zones and work schedules.
    </p>
    <Row>
      <div>{cards}</div>
    </Row>
  </Container>
);
