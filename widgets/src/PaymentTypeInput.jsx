
const paymentType = props.paymentType ?? [];
const text = props.text ?? "Payment type *";
const update = props.update;
const allPaymentTypes = props.allPaymentTypes ?? [];

if (!update) {
  return "Cannot render payment type input without update function!";
}

return (
  <>
    <label htmlFor="paymentType">{text}</label>
    <Typeahead
      id="paymentType"
      labelKey="name"
      onChange={update}
      options={allPaymentTypes}
      placeholder="Flat rate, Hourly rate..."
      selected={paymentType}
      positionFixed 
      allowNew
    />
  </>
);