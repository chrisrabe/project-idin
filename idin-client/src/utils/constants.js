export const transStatus = {
  awaitingPayment: 'AWAITING_PAYMENT',
  pendingDelivery: 'PENDING_DELIVERY',
  inTransit: 'IN_TRANSIT',
  completed: 'COMPLETED',
  canceled: 'CANCELED',
  paid: 'PAID',
};

export const transStatusDisplay = {
  AWAITING_PAYMENT: 'Awaiting Payment',
  PENDING_DELIVERY: 'Pending Delivery',
  IN_TRANSIT: 'In Transit',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled',
  PAID: 'Paid',
};

export const transactionType = {
  add: 'ADD',
  remove: 'REMOVE',
  donate: 'DONATE',
  purchase: 'PURCHASE',
};

export const transStatusList = Object.keys(transStatusDisplay)
  .map((key) => ({ key, value: transStatusDisplay[key] }));

export const reqStatus = {
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  declined: 'DECLINED',
};

export const unitTypes = {
  boxes: 'BOXES',
};
