export const logOrderInfo = (order) => {
  const { id, shipping } = order;
  const { address1 } = shipping;

  console.log(`Order ID: ${id}`);
  if (address1) {
    console.log(`Shipping Address: ${address1}`);
  }

  console.log("\n");
};
