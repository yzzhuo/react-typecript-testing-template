interface DeliverFeeInputParams {
  cartValue: number, 
  deliveryDistance: number, 
  cartItemsAmount: number,
  orderTime: Date
}

export function calculateDeliveryFee({
  cartValue, 
  deliveryDistance, 
  cartItemsAmount,
  orderTime
}: DeliverFeeInputParams) {
  const MAX_DELIVERY_FEE = 15;
  const FREE_DELIVERY_THRESHOLD = 200;
  // The delivery is free (0€) when the cart value is equal or more than 200€.
  if (cartValue >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  const cartValueSurcharge = calculateCartValueSurcharge(cartValue);
  const deliveryDistanceSurcharge =  calculateFeeForDeliveryDistance(deliveryDistance);
  const cartItemsAmountSurcharge = calculateCartItemsSurcharge(cartItemsAmount);
  const totalFee = cartValueSurcharge + deliveryDistanceSurcharge + cartItemsAmountSurcharge;
  const rushhour_adjust_fee = calculateRushhourSurcharge(orderTime, totalFee)
  return Math.min(rushhour_adjust_fee, MAX_DELIVERY_FEE);
}

function calculateCartValueSurcharge(cartValue: number) {
  const CART_VALUE_BASE = 10;
  if (cartValue < CART_VALUE_BASE) {
    return CART_VALUE_BASE - cartValue;
  }
  return 0;
}

function calculateFeeForDeliveryDistance(deliveryDistance: number) {
  // base fee for the first 1000 meters
  const BASE_FEE = 2;
  const BASE_DISTANCE = 1000;

  if (deliveryDistance <= BASE_DISTANCE) {
    return BASE_FEE;
  } else {
    const extraDistance = deliveryDistance - BASE_DISTANCE;
    const EXTRA_DISTANCE_UNIT = 500;
    // every additional 500 meters adds 1 euro to the fee (the minimum fee is 1 even if the distance is less than 500 meters)
    const feeForExtraDistance = Math.ceil(extraDistance / EXTRA_DISTANCE_UNIT);
    return BASE_FEE + feeForExtraDistance;
  }
}

function calculateCartItemsSurcharge(cartItemsAmount: number) {
  // if the cart has more than 10 items, every additional item adds 0.5 euro to the fee
  const BASE_ITEMS = 5;
  const BULK_AMOUNT = 12;
  const BULK_FEE = 1.2;
  const FEE_FOR_EXTRA_ITEM = 0.5;
  let fee = 0
  // an aditional 50 cent surcharge for each item above 5 and include the fifth item
  if (cartItemsAmount >= BASE_ITEMS) {
    const extraItems = cartItemsAmount - BASE_ITEMS + 1;
    fee = extraItems * FEE_FOR_EXTRA_ITEM;
  }
  if (cartItemsAmount > BULK_AMOUNT) {
    fee = fee + BULK_FEE;
  }
  return fee;
}

function calculateRushhourSurcharge(orderDate: Date, fee: number) : number {
  const RUSH_HOUR_FEE_FACTOR = 1.2; // for rush hour, the fee will be multiplied by 1.2x
  const RUSH_DAY = 5; // Friday
  const RUSH_HOUR_START = 15; // 15:00
  const RUSH_HOUR_END = 19; // 19:00
  let finalFee = fee
  //  rushhour is between 15:00 and 19:00 of Friday
  const isRushDay = orderDate.getDay() === RUSH_DAY;
  const isRushHour = orderDate.getHours() >= RUSH_HOUR_START && orderDate.getHours() <= RUSH_HOUR_END;
  if (isRushDay && isRushHour) {
    finalFee = finalFee * RUSH_HOUR_FEE_FACTOR;
  }
  return parseFloat(finalFee.toFixed(2));
}