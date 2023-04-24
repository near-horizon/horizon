const ownerId = "contribut3.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const cid = props.cid;

State.init({
  description: "",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CloseButton = styled.button`
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  padding-bottom: 1em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
  flex-wrap: wrap;
`;

const DetailHeading = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000000;
  width: 100%;
`;

const DetailInput = styled.div`
  width: 48%;
`;

return (
  <Container>
    <Form>
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Action description *",
          placeholder: "Describe the contribution action",
          value: state.description,
          onChange: (description) => State.update({ description }),
        }}
      />
    </Form>
    <Footer>
      <Dialog.Close asChild>
        <CloseButton>Close</CloseButton>
      </Dialog.Close>
      <Widget
        src={`${ownerId}/widget/Buttons.Green`}
        props={{
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
              Add action
            </>
          ),
          onClick: () =>
            Near.call(ownerId, "add_contribution_action", {
              project_id: projectId,
              vendor_id: vendorId,
              cid: cid,
              description: state.description,
            }),
        }}
      />
    </Footer>
  </Container>
);
