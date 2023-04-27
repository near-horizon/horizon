State.init({
  code: null,
  codeIsFetched: false,
});

if (!state.codeIsFetched) {
  asyncFetch(
    "https://ipfs.io/ipfs/QmRQSP6FJHHyeQFDyspn4h9B9iszm2WMHYNZqwaVENguQ5?filename=NEARHorizonTCsv1.1Final.html"
  ).then((res) => {
    State.update({ code: res.body, codeIsFetched: true });
  });
  return <>Loading...</>;
}

return <iframe style={{ width: "100%", height: "80vh" }} srcDoc={state.code} />;
