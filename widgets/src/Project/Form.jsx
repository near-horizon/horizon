const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: .95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px .5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

State.init({
  name: "",
  accountId: "",
  category: null,
  integration: null,
  dev: null,
  tagline: "",
  description: "",
  tags: [],
  website: "",
  geo: "",
  team: null,
});

return (
  <Container>
    <div>
      <Header>Create new project</Header>
      <SubHeader>
        Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
      </SubHeader>
    </div>
    <Form>
      <FormHeader>General</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Project name *",
          placeholder: "Layers",
          value: state.name,
          onChange: (name) => State.update({ name }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.AccountId`}
        props={{
          label: "NEAR Account *",
          placeholder: "layers.near",
          value: state.accountId,
          onChange: (accountId) => State.update({ accountId }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Project category *",
          placeholder: "Wallets",
          options: [{ text: "Wallets", value: "wallets" }, { text: "Games", value: "games" }],
          value: state.category,
          onChange: (category) => State.update({ category }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Integration with NEAR *",
          placeholder: "Native",
          options: [{ text: "Native", value: "native" }, { text: "Multichain", value: "multichain" }],
          value: state.integration,
          onChange: (integration) => State.update({ integration }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Development phase *",
          placeholder: "Testnet launched",
          options: [{ text: "Testnet launched", value: "testnet" }, { text: "Mainnet launched", value: "mainnet" }, { text: "In development", value: "development" }],
          value: state.dev,
          onChange: (dev) => State.update({ dev }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Tagline",
          placeholder: "Simple solutions for complex tasks",
          value: state.tagline,
          onChange: (tagline) => State.update({ tagline }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.TextArea`}
        props={{
          label: "Description",
          placeholder: "Crypto ipsum bitcoin ethereum dogecoin litecoin. Holo stacks fantom kava flow algorand. Gala dogecoin gala XRP binance flow. Algorand polygon bancor arweave avalanche. Holo kadena telcoin kusama BitTorrent flow holo velas horizen. TerraUSD helium filecoin terra shiba-inu. Serum algorand horizen kava flow maker telcoin algorand enjin. Dai bitcoin.",
          value: state.description,
          onChange: (description) => State.update({ description }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.MultiSelect`}
        props={{
          label: "Tags",
          placeholder: "Add tags",
          options: [{ name: "wallets" }, { name: "games" }],
          value: state.tags,
          onChange: (tags) => State.update({ tags }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Website",
          placeholder: "https://layers.app",
          value: state.website,
          onChange: (website) => State.update({ website }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Number`}
        props={{
          label: "Team size",
          placeholder: 10,
          value: state.team,
          onChange: (team) => State.update({ team }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Location",
          placeholder: "San Fancisco, CA",
          value: state.geo,
          onChange: (geo) => State.update({ geo }),
        }}
      />
      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Green`}
          props={{
            onClick: () => {
              Near.call([
                {
                  contractName: "social.near",
                  methodName: "set",
                  args: {
                    data: {
                      [state.accountId]: {
                        profile: {
                          name: state.name,
                          tagline: state.tagline,
                          description: state.description,
                          tags: state.tags.map(
                            (acc, { name }) => Object.assign(acc, { [name]: "" }),
                            {}
                          ),
                          linktree: {
                            ...state.socials,
                            website: state.website,
                          },
                          category: state.category,
                          team: state.team,
                        }
                      }
                    }
                  }
                },
                {
                  contractName: ownerId,
                  methodName: "add_project",
                  args: { account_id: state.accountId },
                },
                {
                  contractName: ownerId,
                  methodName: "edit_project",
                  args: {
                    account_id: state.accountId,
                    project: {
                      application: {
                        integration: state.integration,
                        stage: state.dev,
                        geo: state.geo,
                      }
                    }
                  }
                }
              ])
            },
            text: <>
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.875 16.5V12.75M2.875 5.25V1.5M1 3.375H4.75M1 14.625H4.75M9.25 2.25L7.94937 5.63165C7.73786 6.18157 7.6321 6.45653 7.46765 6.68781C7.32189 6.8928 7.1428 7.07189 6.93781 7.21765C6.70653 7.3821 6.43157 7.48786 5.88165 7.69937L2.5 9L5.88165 10.3006C6.43157 10.5121 6.70653 10.6179 6.93781 10.7824C7.1428 10.9281 7.32189 11.1072 7.46765 11.3122C7.6321 11.5435 7.73786 11.8184 7.94937 12.3684L9.25 15.75L10.5506 12.3684C10.7621 11.8184 10.8679 11.5435 11.0324 11.3122C11.1781 11.1072 11.3572 10.9281 11.5622 10.7824C11.7935 10.6179 12.0684 10.5121 12.6184 10.3006L16 9L12.6184 7.69937C12.0684 7.48786 11.7935 7.3821 11.5622 7.21765C11.3572 7.07189 11.1781 6.8928 11.0324 6.68781C10.8679 6.45653 10.7621 6.18157 10.5506 5.63165L9.25 2.25Z" stroke="#11181C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Create project
            </>
          }}
        />
      </FormFooter>
    </Form>
  </Container>
);
