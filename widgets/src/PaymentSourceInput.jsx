
const paymentSource = props.paymentSource ?? [];
const text = props.text ?? "Payment method *";
const update = props.update;
const allPaymentSources = props.allPaymentSources ?? [];

if (!update) {
  return "Cannot render payment type input without update function!";
}

return (
  <>
    <label htmlFor="paymentSource">{text}</label>
    <Typeahead
      id="paymentSource"
      labelKey="name"
      onChange={update}
      options={allPaymentSources}
      placeholder="Peer-to-peer."
      selected={paymentSource}
      positionFixed
    />
  </>
);