interface DeliverFeeInputParams {
  cartValue: number, 
  deliveryDistance: number, 
  cartItemsAmount: number,
  orderTime: Date
}

export function calculate_delivery_fee({
  cartValue, 
  deliveryDistance, 
  cartItemsAmount,
  orderTime
}: DeliverFeeInputParams) {
  const maxDeliveryFee = 15;
  const freeDeliveryThreshold = 200;
  // The delivery is free (0€) when the cart value is equal or more than 200€.
  if (cartValue >= freeDeliveryThreshold) {
    return 0;
  }
  const cartValueSurcharge = calculate_cart_value_surcharge(cartValue);
  const deliveryDistanceSurcharge =  calculate_fee_for_delivery_distance(deliveryDistance);
  const cartItemsAmountSurcharge = calculate_cartItems_surcharge(cartItemsAmount);
  const totalFee = cartValueSurcharge + deliveryDistanceSurcharge + cartItemsAmountSurcharge;
  const rushhour_adjust_fee = calcalate_rushhour_surcharge(orderTime, totalFee)
  return Math.min(parseFloat(rushhour_adjust_fee.toFixed(2)), maxDeliveryFee);
}

function calculate_cart_value_surcharge(cartValue: number) {
  const cartValueBase = 10;
  if (cartValue < cartValueBase) {
    return cartValueBase - cartValue;
  }
  return 0;
}

function calculate_fee_for_delivery_distance(deliveryDistance: number) {
  // base fee for the first 1000 meters
  const baseFee = 2;
  const baseDistance = 1000;

  if (deliveryDistance <= baseDistance) {
    return baseFee;
  } else {
    const extraDistance = deliveryDistance - baseDistance;
    // every additional 500 meters adds 1 euro to the fee (the minimum fee is 1 even if the distance is less than 500 meters)
    const feeForExtraDistance = Math.ceil(extraDistance / 500);
    return baseFee + feeForExtraDistance;
  }
}

function calculate_cartItems_surcharge(cartItemsAmount: number) {
  // if the cart has more than 10 items, every additional item adds 0.5 euro to the fee
  const baseItems = 5;
  const bulkAmount = 12;
  const bulkFee = 1.2;

  let fee = 0
  // an aditional 50 cent surcharge for each item above 5 and include the fifth item
  if (cartItemsAmount >= baseItems) {
    const extraItems = cartItemsAmount - baseItems + 1;
    fee = extraItems * 0.5;
  }

  if (cartItemsAmount > bulkAmount) {
    fee = fee + bulkFee;
  }
  return fee;
}

function calcalate_rushhour_surcharge(orderDate: Date, fee: number) {
 // get current time of browser
  const rushhourFeeFactor = 1.2;
  // check if current time is between 15:00 and 19:00
  const isRushHour = orderDate.getHours() >= 15 && orderDate.getHours() <= 19;
  if (!isRushHour) {
    return fee;
  }
  return fee * rushhourFeeFactor;
}