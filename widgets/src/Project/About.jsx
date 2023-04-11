const onSave = props.onSave ?? (() => { });
const ownerId = "contribut3.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

State.init({
  description: "",
  descriptionIsFetched: false,
});

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/description`] },
    "final",
    false,
  ).then((data) => State.update({ description: data[accountId].profile.description, descriptionIsFetched: true }));
  return <>Loading...</>;
}

return (
  <Container>
    <Heading>About project</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.description,
        onSave: (description) => Near.call("social.near", "set", { data: { [accountId]: { profile: { description } } } }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What problem(s) are you solving?",
        id: "problem",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (problem) => onSave({ problem }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What makes your team uniquely positioned for success?",
        id: "success_position",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (success_position) => onSave({ success_position }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Why are you building on neaNEAR?",
        id: "why",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (why) => onSave({ why }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "What's your 5 year vision? 1B users project evolution?",
        id: "vision",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (vision) => onSave({ vision }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Are you going to launch your token?",
        id: "token",
        value:
          "Ethereum bought lots of cold wallet although VeChain waited some dead cat bounce during many ICO. NFT proves the digital signature until a burned, nor since ERC20 token standard generates many quick distributed ledger, Lightning Network halving a REKT in many decentralised application! Because Silk Road broadcast some provably bagholder, Ripple sharded some instant all-time-high, nor when TRON returns lots of peer-to-peer FUD, Ripple counted a accidental fork at the dead cat bounce! When blockchain could be a provably fair consensus process of some fork, Cardano required few burned bollinger band in many zero confirmation transaction",
        onSave: (token) => onSave({ token }),
      }}
    />
  </Container>
);
