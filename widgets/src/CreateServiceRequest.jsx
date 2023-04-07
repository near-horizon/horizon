
const ownerId = "contribut3.near";

const STEP_1 = "step1";
const STEP_2 = "step2";
const propsData = {
  step1: {
    nextButtonText: "Publish request",
    nextButtonIcon: "bi-send",
    progress: 100
  },
  step2: {
    nextButtonText: "Publish request",
    nextButtonIcon: "bi-send",
    progress: 100
  }
};

const FundingProgress = styled.div`
   width:${(props) => props.progress}%;
`;
const ProgressBar = styled.div`
     height:7px;
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    row-gap: 16px;
    justify-content: space-between;
  `;
const CancelButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #ECEEF0;
  border-radius: 50px;
  padding: 8px 16px;
  gap: 8px;
  align-items: center;
  `;

const NextButton = styled.button`
  color: #FFFFFF;
  background: #161615;
  border-radius: 50px;
  padding: 8px 16px;
  gap: 8px;
  align-items: center;
`;

const FormContainer = styled.div`
  justify-content: center;
  align-items: flex-start;
  padding: 32px 0px 24px;
  gap: 36px;
`;

State.init({
  step: STEP_1
});

const renderStepOne = () => {
  return (
    <Widget
      src={`${ownerId}/widget/CreateServiceRequest_Step1`}
      props={{}}
    />
  );
};

const renderStepTwo = () => {
  return (
    <Widget
      src={`${ownerId}/widget/CreateServiceRequest_Step2`}
      props={{}}
    />

  );
};
const renderForm = {
  step1: renderStepOne(),
  step2: renderStepTwo(),
}[state.step];


const onNextStepClick = () => {
//   if (state.step == STEP_1) {
//     State.update({ step: STEP_2, ...propsData.step2 })
//   } else {
//     // Call Publish request
//   }
}

const onPublishRequestClick = () => {
   // Call Publish request
}

return (
  <>
    <div class="progress mb-3" style={{ height: "7px" }}>
      <FundingProgress
        className="progress-bar bg-success"
        role="progressbar"
        aria-valuenow={propsData[state.step].progress}
        aria-valuemin="0"
        aria-valuemax="100"
        progress={propsData[state.step].progress}
      />
    </div>

    <Widget
      src={`${ownerId}/widget/PageTitle`}
      props={{
        title: "Create new contribution request",
        subtitle:
          "Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena",
      }}
    />
    <FormContainer>
      {renderForm}
    </FormContainer>
    <Footer>
      <CancelButton>Cancel</CancelButton>
      <NextButton onClick={onPublishRequestClick}>
        <i class={`bi ${propsData[state.step].nextButtonIcon}`}></i>{propsData[state.step].nextButtonText}
      </NextButton>
    </Footer>
  </>
);
