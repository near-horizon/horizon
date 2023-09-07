const ownerId = "nearhorizon.near";
const accountId = props.accountId;
const large = props.large ?? false;

State.init({
  tags: null,
  tagsIsFetched: false,
  profile: null,
  profileIsFetched: false,
  contributions: null,
  contributionsIsFetched: false,
  vendor: null,
  vendorIsFetched: false,
  isSuperAdmin: false,
  isSuperAdminFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/tags`] },
    "final",
    false,
  ).then((tags) => State.update({ tags, tagsIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((data) =>
    State.update({ profile: data[accountId].profile, profileIsFetched: true }),
  );
}

if (!state.contributionsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor_completed_contributions",
    { account_id: accountId },
    "final",
    false,
  ).then((contributions) =>
    State.update({ contributions, contributionsIsFetched: true }),
  );
}

if (!state.vendorIsFetched) {
  Near.asyncView(
    ownerId,
    "get_vendor",
    { account_id: accountId },
    "final",
    false,
  ).then((vendor) => State.update({ vendor, vendorIsFetched: true }));
}

if (!state.isSuperAdminFetched && context.accountId) {
  Near.asyncView(
    ownerId,
    "check_is_owner",
    { account_id: context.accountId },
    "final",
    false,
  ).then((isSuperAdmin) =>
    State.update({ isSuperAdmin, isSuperAdminFetched: true }),
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  margin-bottom: 0.25em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #11181c;
  }
`;

const Tagline = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #1d2939;
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0px 0px;
  gap: 1.5em;
  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 0.4em;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
`;

const requestsCompleted = (
  <Item>
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.85189 0.323442C7.37836 0.323442 6.92422 0.526653 6.58939 0.88837C6.25455 1.25009 6.06644 1.74068 6.06644 2.25223V5.81306C6.06644 5.93111 6.02303 6.04432 5.94576 6.12779C5.86849 6.21127 5.76369 6.25816 5.65441 6.25816H2.35819C1.88466 6.25816 1.43052 6.46137 1.09569 6.82309C0.76085 7.1848 0.572741 7.6754 0.572741 8.18694V11.7478C0.572741 12.0011 0.618923 12.2519 0.70865 12.4859C0.798377 12.7199 0.929893 12.9325 1.09569 13.1116C1.26148 13.2907 1.45831 13.4328 1.67493 13.5297C1.89155 13.6267 2.12372 13.6766 2.35819 13.6766H11.1481C11.3826 13.6766 11.6148 13.6267 11.8314 13.5297C12.048 13.4328 12.2448 13.2907 12.4106 13.1116C12.5764 12.9325 12.7079 12.7199 12.7977 12.4859C12.8874 12.2519 12.9336 12.0011 12.9336 11.7478V8.18694C12.9336 8.06889 12.977 7.95568 13.0542 7.87221C13.1315 7.78873 13.2363 7.74184 13.3456 7.74184H16.6418C17.1153 7.74184 17.5695 7.53863 17.9043 7.17691C18.2391 6.81519 18.4273 6.3246 18.4273 5.81306V2.25223C18.4273 1.74068 18.2391 1.25009 17.9043 0.88837C17.5695 0.526653 17.1153 0.323442 16.6418 0.323442H7.85189ZM16.6418 6.25816H12.9336V1.80712H16.6418C16.7511 1.80712 16.8559 1.85402 16.9332 1.93749C17.0104 2.02096 17.0538 2.13418 17.0538 2.25223V5.81306C17.0538 5.93111 17.0104 6.04432 16.9332 6.12779C16.8559 6.21127 16.7511 6.25816 16.6418 6.25816ZM11.5601 6.25816H7.43986V2.25223C7.43986 2.13418 7.48327 2.02096 7.56054 1.93749C7.63781 1.85402 7.74261 1.80712 7.85189 1.80712H11.5601V6.25816ZM6.06644 7.74184V12.1929H2.35819C2.24892 12.1929 2.14412 12.146 2.06684 12.0625C1.98957 11.979 1.94616 11.8658 1.94616 11.7478V8.18694C1.94616 8.06889 1.98957 7.95568 2.06684 7.87221C2.14412 7.78873 2.24892 7.74184 2.35819 7.74184H6.06644ZM7.43986 7.74184H11.5601V11.7478C11.5601 11.8658 11.5167 11.979 11.4395 12.0625C11.3622 12.146 11.2574 12.1929 11.1481 12.1929H7.43986V7.74184Z"
        fill="#7E868C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.53624 0.838222C6.88428 0.462242 7.35742 0.25 7.85189 0.25H16.6418C17.1363 0.25 17.6094 0.462242 17.9575 0.838222C18.3053 1.21403 18.5 1.72274 18.5 2.25223V5.81306C18.5 6.34254 18.3053 6.85125 17.9575 7.22706C17.6094 7.60304 17.1363 7.81528 16.6418 7.81528H13.3456C13.2573 7.81528 13.1715 7.85314 13.1074 7.92235C13.0432 7.99173 13.0063 8.08683 13.0063 8.18694V11.7478C13.0063 12.01 12.9585 12.2699 12.8655 12.5124C12.7725 12.755 12.6361 12.9757 12.4638 13.1618C12.2915 13.3479 12.0866 13.4958 11.8608 13.5969C11.635 13.6979 11.3928 13.75 11.1481 13.75H2.35819C2.11346 13.75 1.87126 13.6979 1.64546 13.5969C1.41967 13.4958 1.21485 13.3479 1.04254 13.1618C0.87025 12.9757 0.733818 12.755 0.640815 12.5124C0.547814 12.2699 0.5 12.01 0.5 11.7478V8.18694C0.5 7.65746 0.694659 7.14875 1.04254 6.77294C1.39058 6.39696 1.86372 6.18472 2.35819 6.18472H5.65441C5.74275 6.18472 5.82855 6.14685 5.89261 6.07764C5.95684 6.00827 5.9937 5.91317 5.9937 5.81306V2.25223C5.9937 1.72274 6.18836 1.21403 6.53624 0.838222ZM7.85189 0.396884C7.3993 0.396884 6.96416 0.591063 6.64253 0.938517C6.32074 1.28614 6.13918 1.75862 6.13918 2.25223V5.81306C6.13918 5.94904 6.08922 6.08037 5.9989 6.17794C5.90843 6.27568 5.78463 6.3316 5.65441 6.3316H2.35819C1.9056 6.3316 1.47047 6.52578 1.14883 6.87324C0.827041 7.22086 0.645481 7.69333 0.645481 8.18694V11.7478C0.645481 11.9921 0.690031 12.2339 0.776485 12.4594C0.862937 12.6848 0.989535 12.8894 1.14883 13.0615C1.30812 13.2336 1.49695 13.3698 1.7044 13.4626C1.91184 13.5554 2.13399 13.6031 2.35819 13.6031H11.1481C11.3723 13.6031 11.5945 13.5554 11.8019 13.4626C12.0094 13.3698 12.1982 13.2336 12.3575 13.0615C12.5168 12.8894 12.6434 12.6848 12.7298 12.4594C12.8163 12.2339 12.8608 11.9921 12.8608 11.7478V8.18694C12.8608 8.05096 12.9108 7.91963 13.0011 7.82206C13.0916 7.72432 13.2154 7.6684 13.3456 7.6684H16.6418C17.0944 7.6684 17.5295 7.47422 17.8512 7.12676C18.173 6.77914 18.3545 6.30667 18.3545 5.81306V2.25223C18.3545 1.75862 18.173 1.28614 17.8512 0.938517C17.5295 0.591063 17.0944 0.396884 16.6418 0.396884H7.85189ZM7.85189 1.88056C7.76355 1.88056 7.67775 1.91843 7.61369 1.98764C7.54946 2.05702 7.5126 2.15211 7.5126 2.25223V6.18472H11.4874V1.88056H7.85189ZM7.5074 1.88734C7.59787 1.78961 7.72167 1.73368 7.85189 1.73368H11.6329V6.3316H7.36712V2.25223C7.36712 2.11624 7.41708 1.98491 7.5074 1.88734ZM12.8608 1.73368H16.6418C16.772 1.73368 16.8958 1.78961 16.9863 1.88734C17.0766 1.98491 17.1266 2.11624 17.1266 2.25223V5.81306C17.1266 5.94904 17.0766 6.08037 16.9863 6.17794C16.8958 6.27568 16.772 6.3316 16.6418 6.3316H12.8608V1.73368ZM13.0063 1.88056V6.18472H16.6418C16.7301 6.18472 16.8159 6.14685 16.88 6.07764C16.9442 6.00827 16.9811 5.91317 16.9811 5.81306V2.25223C16.9811 2.15211 16.9442 2.05702 16.88 1.98764C16.8159 1.91843 16.7301 1.88056 16.6418 1.88056H13.0063ZM2.35819 7.81528C2.26986 7.81528 2.18406 7.85314 2.11999 7.92235C2.05577 7.99173 2.01891 8.08683 2.01891 8.18694V11.7478C2.01891 11.8479 2.05577 11.943 2.11999 12.0124C2.18406 12.0816 2.26986 12.1194 2.35819 12.1194H5.9937V7.81528H2.35819ZM2.0137 7.82206C2.10417 7.72432 2.22798 7.6684 2.35819 7.6684H6.13918V12.2663H2.35819C2.22798 12.2663 2.10417 12.2104 2.0137 12.1127C1.92338 12.0151 1.87342 11.8838 1.87342 11.7478V8.18694C1.87342 8.05096 1.92338 7.91963 2.0137 7.82206ZM7.36712 7.6684H11.6329V11.7478C11.6329 11.8838 11.5829 12.0151 11.4926 12.1127C11.4021 12.2104 11.2783 12.2663 11.1481 12.2663H7.36712V7.6684ZM7.5126 7.81528V12.1194H11.1481C11.2364 12.1194 11.3222 12.0816 11.3863 12.0124C11.4505 11.943 11.4874 11.8479 11.4874 11.7478V7.81528H7.5126Z"
        fill="#7E868C"
      />
    </svg>
    {state.contributions.length} requests completed
  </Item>
);

const rate = state.profile.rate ? (
  <Item>
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 6.25V9.25M13.5 4.75V7.75M12.75 1C14.5865 1 15.5799 1.28107 16.0741 1.49908C16.1399 1.52812 16.1728 1.54263 16.2678 1.63328C16.3247 1.68761 16.4287 1.84705 16.4554 1.92107C16.5 2.04455 16.5 2.11205 16.5 2.24706V10.3084C16.5 10.9899 16.5 11.3307 16.3978 11.5059C16.2938 11.6841 16.1936 11.7669 15.999 11.8354C15.8076 11.9027 15.4215 11.8285 14.6491 11.6801C14.1085 11.5762 13.4674 11.5 12.75 11.5C10.5 11.5 8.25 13 5.25 13C3.41347 13 2.42015 12.7189 1.92591 12.5009C1.86009 12.4719 1.82718 12.4574 1.7322 12.3667C1.67526 12.3124 1.57134 12.153 1.5446 12.0789C1.5 11.9554 1.5 11.8879 1.5 11.7529L1.5 3.69164C1.5 3.01006 1.5 2.66928 1.60221 2.49411C1.70618 2.31592 1.80644 2.23309 2.00104 2.16461C2.19235 2.09729 2.57853 2.17149 3.35087 2.31989C3.89146 2.42376 4.53261 2.5 5.25 2.5C7.5 2.5 9.75 1 12.75 1ZM10.875 7C10.875 8.03553 10.0355 8.875 9 8.875C7.96447 8.875 7.125 8.03553 7.125 7C7.125 5.96447 7.96447 5.125 9 5.125C10.0355 5.125 10.875 5.96447 10.875 7Z"
        stroke="#7E868C"
        stroke-width="1.35"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    {state.profile.rate}/hr
  </Item>
) : (
  <></>
);

const Description = styled.p`
  margin: 0;
`;

const body = (
  <>
    <Container>
      <a href={`/${ownerId}/widget/Index?tab=vendor&accountId=${accountId}`}>
        <Widget
          src={`${ownerId}/widget/Vendor.Icon`}
          props={{ accountId: props.accountId, size: "64px" }}
        />
      </a>
      <Details>
        <a href={`/${ownerId}/widget/Index?tab=vendor&accountId=${accountId}`}>
          <Widget
            src={`${ownerId}/widget/NameAndAccount`}
            props={{
              accountId: props.accountId,
              name: state.profile.name,
              nameSize: "1.125em",
            }}
          />
        </a>
        <Row>
          <span>
            {state.profile.organization === "true"
              ? "Organization"
              : state.profile.organization === "false"
              ? "Individual"
              : "Organization"}
          </span>
          {state.profile.active !== undefined ? (
            <Widget
              src={`${ownerId}/widget/ActiveIndicator`}
              props={{
                active: state.profile.active === "true",
                activeText: "Available",
                inactiveText: "Not available",
              }}
            />
          ) : (
            <></>
          )}
        </Row>
        {state.vendor.verified ? (
          <Widget
            src={`${ownerId}/widget/BadgeList`}
            props={{
              badges: [{ value: "Verified" }],
            }}
          />
        ) : (
          <></>
        )}
      </Details>
    </Container>
    <Tagline>{state.profile.tagline}</Tagline>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.profile.description }}
    />
    <Widget
      src={`${ownerId}/widget/Tags`}
      props={{ tags: state.profile.tags }}
    />
    {large ? (
      <Items>
        {requestsCompleted}
        {rate}
      </Items>
    ) : (
      <></>
    )}
  </>
);

const FooterButton = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 48%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: ${({ blue }) => (blue ? "#006ADC" : "#101828")};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SecondCta = state.isSuperAdmin ? (
  <FooterButton
    onClick={() =>
      Near.call({
        contractName: ownerId,
        methodName: "verify_vendor",
        args: { account_id: accountId },
      })
    }
  >
    Verify vendor
  </FooterButton>
) : (
  <Widget
    src={`${ownerId}/widget/Vendor.InviteSideWindow`}
    props={{ accountId }}
  />
);

const footer = (
  <Footer>
    <FooterButton
      href={`/${ownerId}/widget/Index?tab=vendor&accountId=${accountId}`}
      onClick={() =>
        props.update({
          tab: "vendor",
          content: "",
          search: "",
          accountId,
        })
      }
    >
      View details
    </FooterButton>
    {SecondCta}
  </Footer>
);

if (large) {
  return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
}

return <Widget src={`${ownerId}/widget/Card`} props={{ body }} />;
