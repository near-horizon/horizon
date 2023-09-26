const ownerId = "nearhorizon.near";
const apiUrl = "https://api-op3o.onrender.com";
/** @type {{id: string; url?: string; code?: string; claimed?: boolean; requirements?: {requirement: string; completed: boolean;}[]; fields: {price:number; name: string; logo: string; about: string; benefit: string; categories: string[]; instructions: string;}}} */
const perk = props.perk;

const Container = styled.div`
  width: 100%;
  height: 32rem;
  border-radius: 0.5rem;
  border: 1px solid var(--slate-light-4, #eceef0);
  background: var(--base-white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.06),
    0px 1px 3px 0px rgba(16, 24, 40, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  & > div {
    padding: 1.25rem 1.375rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    flex-grow: 1;
  }
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;

  & > h4 {
    color: var(--gray-900, #101828);
    font-family: Inter;
    font-size: 1.1875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  & > img {
    height: 2.5rem;
    width: auto;
  }
`;

const Benefit = styled.div`
  display: flex;
  padding: 0.4375rem 0.8125rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.375rem;
  border-radius: 0.5rem;
  border: 1px dashed #c0ab8b;
  background: linear-gradient(180deg, #fcfbe9 0%, rgba(252, 251, 233, 0) 100%);
  width: 100%;
  height: 82px;

  & > b {
    color: var(--ui-elements-dark, #11181c);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > span {
    color: var(--gray-900, #101828);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;
  height: 36px;

  & > b {
    color: var(--ui-elements-dark, #11181c);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > span {
    color: var(--gray-900, #101828);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.375rem;
  width: 100%;

  & > b {
    color: var(--ui-elements-dark, #11181c);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
    width: 100%;

    & > span {
      color: var(--ui-elements-gray, #7e868c);
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 1.225rem */

      &.completed {
        text-decoration-line: line-through;
      }

      &.next {
        color: var(--text-text-link, #006adc);
      }
    }
  }
`;

const Separator = styled("Separator.Root")`
  width: 100%;
  height: 1px;
  background: var(--slate-light-4, #eceef0);
  margin: 0;
  padding: 0 !important;
  flex-grow: 0 !important;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center !important;
  padding: 1.5rem !important;
  width: 100%;
  flex-grow: 0 !important;
`;

const NotEligible = styled.div`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 3.125rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--ui-elements-light, #eceef0);
  color: var(--text-text-disabled, #878a8e);
  text-align: center;
  font-family: "Mona Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 142%; /* 1.2425rem */
`;

const ClaimButton = styled.div`
  width: 100%;

  & > a {
    display: flex;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3.125rem;
    background: var(--primary-primary-default, #00ec97);
    color: var(--text-text-dark, #11181c);
    text-align: center;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
    white-space: nowrap;
    width: 100%;
  }
`;

const UnlockButton = styled.button`
  display: flex;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--primary-primary-default, #161615);
  border-radius: 3.125rem;
  background: var(--background-black-2, #161615);
  color: var(--text-text-white, #fff);
  text-align: center;
  font-family: FK Grotesk;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 142%; /* 1.33125rem */
  width: 100%;

  & > span {
    color: var(--text-text-white, #fff);
    font-family: FK Grotesk;
    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 142%;
  }
`;

const ClaimDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.375rem;
  align-self: stretch;

  & > b {
    color: var(--ui-elements-dark, #11181c);
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > ul {
    list-style-position: inside;

    & > li {
      color: var(--gray-900, #101828);
      font-family: "Mona Sans";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 1.225rem */
    }
  }
`;

const ClipboardButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  justify-content: flex-start;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;

  & > span {
    display: flex;
    padding: 0.125rem 0.5rem;
    align-items: center;
    gap: 0.5625rem;
    align-self: stretch;
    border-radius: 0.375rem;
    background: var(--gray-blue-100, #eaecf5);
    color: var(--ui-elements-dark, #11181c);
    leading-trim: both;
    text-edge: cap;
    font-family: FK Grotesk SemiMono;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
    letter-spacing: 0.035rem;
  }
`;

const TooltipContent = styled("Tooltip.Content")`
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 40ch;
  transform: translateY(100%);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  & > b {
    color: var(--ui-elements-dark, #11181c);
    leading-trim: both;
    text-edge: cap;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 142%; /* 1.2425rem */
  }

  & > span {
    color: var(--gray-900, #101828);
    leading-trim: both;
    text-edge: cap;
    font-family: "Mona Sans";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 1.225rem */
  }
`;

const completedCount = perk.requirements
  ? perk.requirements.filter(({ completed }) => completed).length
  : 0;
const allCompleted =
  completedCount === (perk.requirements ? perk.requirements.length : 0);

State.init({
  claiming: false,
  error: null,
  url: null,
  code: null,
});

const claimPerk = () => {
  State.update({ claiming: true });
  asyncFetch(`${apiUrl}/data/perks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      perk_id: perk.id,
      account_id: context.accountId,
    }),
  }).then(({ body, ok }) => {
    if (!ok) {
      State.update({
        claiming: false,
        claimed: false,
        error: "Not enough credits to claim perk",
      });
      return;
    }
    State.update({
      claiming: false,
      claimed: true,
      url: body.url,
      code: body.code,
    });
  });
};

const requirementMapping = {
  "profile-created": "Create Profile",
  "profile-completed": "Complete Profile Overview",
};

const criteria = perk.requirements.map(({ requirement, completed }, index) => {
  let className = "";
  if (completed) {
    className = "completed";
  } else if (index === completedCount) {
    className = "next";
  }

  return (
    <div key={requirement}>
      {!completed ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z"
            stroke="#a8acb3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.875 2.75H4.125C3.76044 2.75036 3.41091 2.89534 3.15313 3.15313C2.89534 3.41091 2.75036 3.76044 2.75 4.125V17.875C2.75036 18.2396 2.89534 18.5891 3.15313 18.8469C3.41091 19.1047 3.76044 19.2496 4.125 19.25H17.875C18.2396 19.2496 18.5891 19.1047 18.8469 18.8469C19.1047 18.5891 19.2496 18.2396 19.25 17.875V4.125C19.2496 3.76044 19.1047 3.41091 18.8469 3.15313C18.5891 2.89534 18.2396 2.75036 17.875 2.75ZM15.2559 9.43433L10.2138 14.2468C10.0861 14.3692 9.91602 14.4375 9.73914 14.4375C9.56225 14.4375 9.3922 14.3692 9.26447 14.2468L6.74408 11.8406C6.67865 11.7783 6.62616 11.7037 6.58958 11.6211C6.55301 11.5385 6.53309 11.4495 6.53095 11.3592C6.52881 11.2689 6.5445 11.179 6.57712 11.0948C6.60974 11.0106 6.65866 10.9336 6.72106 10.8683C6.78346 10.8029 6.85814 10.7506 6.9408 10.7141C7.02347 10.6777 7.1125 10.6579 7.20282 10.656C7.29313 10.654 7.38295 10.6698 7.46713 10.7026C7.55132 10.7354 7.62821 10.7844 7.69342 10.8469L9.73914 12.7993L14.3066 8.44067C14.3718 8.37816 14.4487 8.32911 14.5329 8.29634C14.617 8.26358 14.7069 8.24773 14.7972 8.24971C14.8875 8.25169 14.9765 8.27146 15.0592 8.30789C15.1419 8.34432 15.2165 8.39669 15.2789 8.46201C15.3413 8.52732 15.3903 8.6043 15.4229 8.68854C15.4555 8.77278 15.4712 8.86263 15.469 8.95294C15.4669 9.04325 15.447 9.13225 15.4104 9.21485C15.3738 9.29746 15.3213 9.37204 15.2559 9.43433H15.2559Z"
            fill="#04a46e"
          />
        </svg>
      )}
      <span className={className}>{requirementMapping[requirement]}</span>
    </div>
  );
});

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const heading = (
  <Heading>
    <h4>{perk.fields.name}</h4>
    <img src={perk.fields.logo[0].url} alt={perk.fields.name} />
  </Heading>
);

const about = (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <About>
          <span>{perk.fields.description}</span>
        </About>
      </Tooltip.Trigger>
      <TooltipContent>{perk.fields.description}</TooltipContent>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const benefit = (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Benefit>
          <b>Benefit</b>
          <span>{perk.fields.benefit}</span>
        </Benefit>
      </Tooltip.Trigger>
      <TooltipContent>{perk.fields.benefit}</TooltipContent>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const requirements = (
  <>
    {perk.requirements && perk.requirements.length > 0 ? (
      <Criteria>
        <b>Eligibility criteria</b>
        {criteria}
      </Criteria>
    ) : (
      <></>
    )}
  </>
);

const notEligible = (
  <NotEligible>
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 7.5V6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6V7.5M9 10.875V12.375M6.6 15.75H11.4C12.6601 15.75 13.2902 15.75 13.7715 15.5048C14.1948 15.289 14.539 14.9448 14.7548 14.5215C15 14.0402 15 13.4101 15 12.15V11.1C15 9.83988 15 9.20982 14.7548 8.72852C14.539 8.30516 14.1948 7.96095 13.7715 7.74524C13.2902 7.5 12.6601 7.5 11.4 7.5H6.6C5.33988 7.5 4.70982 7.5 4.22852 7.74524C3.80516 7.96095 3.46095 8.30516 3.24524 8.72852C3 9.20982 3 9.83988 3 11.1V12.15C3 13.4101 3 14.0402 3.24524 14.5215C3.46095 14.9448 3.80516 15.289 4.22852 15.5048C4.70982 15.75 5.33988 15.75 6.6 15.75Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Eligibility criteria not met ({completedCount}/{perk.requirements.length})
  </NotEligible>
);

const unlocked = (
  <ClaimButton>
    <a href={state.url || perk.url} target="_blank">
      Claim perk
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.70796 0H12V5.29204H10.7987V2.05099L6.0977 6.752L5.67325 7.17646L4.82354 6.32755L5.248 5.9031L9.94901 1.20208H6.70796V0ZM1.60171 2.79018H4.80513V1.58889H1.60171C1.17691 1.58889 0.769508 1.75765 0.46913 2.05802C0.168751 2.3584 0 2.7658 0 3.1906V10.3983C0 10.8231 0.168751 11.2305 0.46913 11.5309C0.769508 11.8312 1.17691 12 1.60171 12H8.8094C9.2342 12 9.6416 11.8312 9.94198 11.5309C10.2424 11.2305 10.4111 10.8231 10.4111 10.3983V7.19487H9.20982V10.3983C9.20982 10.5045 9.16764 10.6063 9.09254 10.6814C9.01745 10.7565 8.9156 10.7987 8.8094 10.7987H1.60171C1.49551 10.7987 1.39366 10.7565 1.31856 10.6814C1.24347 10.6063 1.20128 10.5045 1.20128 10.3983V3.1906C1.20128 3.0844 1.24347 2.98255 1.31856 2.90746C1.39366 2.83236 1.49551 2.79018 1.60171 2.79018Z"
          fill="currentColor"
        />
      </svg>
    </a>
  </ClaimButton>
);

const errorMessage = (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Error>Error occured (hover to see details)</Error>
      </Tooltip.Trigger>
      <TooltipContent>{state.error}</TooltipContent>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const unlockable = (
  <UnlockButton onClick={claimPerk} disabled={state.claiming}>
    {state.claiming ? (
      "Claiming..."
    ) : (
      <>
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.25 7.5V6C13.25 3.92893 11.5711 2.25 9.5 2.25C7.42893 2.25 5.75 3.92893 5.75 6V7.5M9.5 10.875V12.375M7.1 15.75H11.9C13.1601 15.75 13.7902 15.75 14.2715 15.5048C14.6948 15.289 15.039 14.9448 15.2548 14.5215C15.5 14.0402 15.5 13.4101 15.5 12.15V11.1C15.5 9.83988 15.5 9.20982 15.2548 8.72852C15.039 8.30516 14.6948 7.96095 14.2715 7.74524C13.7902 7.5 13.1601 7.5 11.9 7.5H7.1C5.83988 7.5 5.20982 7.5 4.72852 7.74524C4.30516 7.96095 3.96095 8.30516 3.74524 8.72852C3.5 9.20982 3.5 9.83988 3.5 11.1V12.15C3.5 13.4101 3.5 14.0402 3.74524 14.5215C3.96095 14.9448 4.30516 15.289 4.72852 15.5048C5.20982 15.75 5.83988 15.75 7.1 15.75Z"
            stroke="currentColor"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Unlock perk
        {perk.fields.price && perk.fields.price > 0 ? (
          <>
            {" for "}
            <span>{perk.fields.price}NHZN</span>
          </>
        ) : (
          <></>
        )}
      </>
    )}
  </UnlockButton>
);

const code = (
  <li>
    Enter the code
    <ClipboardButton
      onClick={() => clipboard.writeText(state.code || perk.code)}
    >
      <span>{state.code || perk.code}</span>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_5107_25599)">
          <path
            d="M5.3335 5.58301V3.71634C5.3335 2.9696 5.3335 2.59624 5.47882 2.31102C5.60665 2.06014 5.81063 1.85616 6.06151 1.72833C6.34672 1.58301 6.72009 1.58301 7.46683 1.58301H12.5335C13.2802 1.58301 13.6536 1.58301 13.9388 1.72833C14.1897 1.85616 14.3937 2.06014 14.5215 2.31102C14.6668 2.59624 14.6668 2.9696 14.6668 3.71634V8.78301C14.6668 9.52974 14.6668 9.90311 14.5215 10.1883C14.3937 10.4392 14.1897 10.6432 13.9388 10.771C13.6536 10.9163 13.2802 10.9163 12.5335 10.9163H10.6668M3.46683 14.9163H8.5335C9.28023 14.9163 9.6536 14.9163 9.93882 14.771C10.1897 14.6432 10.3937 14.4392 10.5215 14.1883C10.6668 13.9031 10.6668 13.5297 10.6668 12.783V7.71634C10.6668 6.9696 10.6668 6.59624 10.5215 6.31102C10.3937 6.06014 10.1897 5.85616 9.93882 5.72833C9.6536 5.58301 9.28023 5.58301 8.5335 5.58301H3.46683C2.72009 5.58301 2.34672 5.58301 2.06151 5.72833C1.81063 5.85616 1.60665 6.06014 1.47882 6.31102C1.3335 6.59624 1.3335 6.9696 1.3335 7.71634V12.783C1.3335 13.5297 1.3335 13.9031 1.47882 14.1883C1.60665 14.4392 1.81063 14.6432 2.06151 14.771C2.34672 14.9163 2.72009 14.9163 3.46683 14.9163Z"
            stroke="#006ADC"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_5107_25599">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.25)"
            />
          </clipPath>
        </defs>
      </svg>
    </ClipboardButton>
  </li>
);

const instructions = (
  <ClaimDetails>
    <b>How to claim:</b>
    <ul>
      {perk.fields.instructions.split("\n").map((instruction) => (
        <li key={instruction}>{instruction}</li>
      ))}
      {perk.fields.code ? code : <></>}
    </ul>
  </ClaimDetails>
);

const credits = (
  <Price>
    <b>Required credits: </b>
    <span>{perk.fields.price} NHZN</span>
    <Widget
      src={`${ownerId}/widget/Tooltip`}
      props={{
        content:
          "Horizon credits are accepted forms of payments by Horizon-approved Service Providers",
      }}
    />
  </Price>
);

return (
  <Container>
    <div>
      {heading}
      {about}
      <Widget
        src={`${ownerId}/widget/Tags`}
        props={{
          tags: Object.fromEntries(
            perk.fields.category.map((category) => [category, ""])
          ),
        }}
      />
      {benefit}
      {allCompleted && (state.claimed || perk.claimed)
        ? instructions
        : requirements}
      {!allCompleted && perk.fields.price && perk.fields.price > 0 ? (
        credits
      ) : (
        <></>
      )}
    </div>
    <Separator />
    <Footer>
      {allCompleted && (state.claimed || perk.claimed)
        ? unlocked
        : state.error
        ? errorMessage
        : unlockable}
    </Footer>
  </Container>
);
