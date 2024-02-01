import { calculate_delivery_fee } from '../../../utils/deliveryFee';

describe('calculate_delivery_fee', () => {
  it('should add a small order surcharge if cart value is less than 10€', () => {
    const fee = calculate_delivery_fee({
      cartValue:8.9, 
      deliveryDistance:1000, 
      cartItemsAmount:1, 
      orderTime: new Date()
    });
    // 2€ base fee + 1.1€ surcharge
    expect(fee).toBe(2 + 1.1); 
  });

  it('should add 1€ for one additional 500 meters', () => {
     const fee = calculate_delivery_fee({
      cartValue:10, 
      deliveryDistance:1499, 
      cartItemsAmount:1, 
      orderTime: new Date()
     });
     // 2€ base fee + 1€ for the first 500 m
     expect(fee).toBe(2 + 1); 
   });

   it('should add 2€ for two additional 500 meters', () => {
    const fee = calculate_delivery_fee({
     cartValue:10, 
     deliveryDistance:1501, 
     cartItemsAmount:1, 
     orderTime: new Date()
    });
     // 2€ base fee + 2 * 1€ for the first two 500 m
    expect(fee).toBe(2 + 2);
  });

  it('should add 50 cents surcharge for each item above and including the fifth item', () => {
    const fee = calculate_delivery_fee(
      {
        cartValue:10, 
        deliveryDistance:1000, 
        cartItemsAmount:5, 
        orderTime: new Date()
      });
    expect(fee).toBe(2 + 0.5); // 2€ base fee + 0.5€ surcharge
  });

  it('should add an extra "bulk" fee for more than 12 items', () => {
    const fee = calculate_delivery_fee({
      cartValue:10, 
      deliveryDistance:1000, 
      cartItemsAmount:13, 
      orderTime: new Date()
    });
    expect(fee).toBe(2 + 4.5 + 1.2); // 2€ base fee + 4.5€ surcharge (9 * 50 cents) + 1.2€ bulk fee
  });

  it('should not exceed 15€', () => {
    const fee = calculate_delivery_fee({
      cartValue:10, 
      deliveryDistance:5000, 
      cartItemsAmount:20, 
      orderTime: new Date()
    });
    expect(fee).toBe(15);
  });

  it('should be free when the cart value isBe or more than 200€', () => {
    const fee = calculate_delivery_fee({
      cartValue:200, 
      deliveryDistance:1000, 
      cartItemsAmount:1, 
      orderTime: new Date()
    });
    expect(fee).toBe(0);
  });

  it('should multiply the fee by 1.2x during the Friday rush', () => {
    const fridayRush = new Date(2024, 1, 2, 16); // month is 0-indexed
    const fee = calculate_delivery_fee({
      cartValue:10, 
      deliveryDistance:1000, 
      cartItemsAmount:1, 
      orderTime: fridayRush
    });
    expect(fee).toBe(2 * 1.2); // 2€ base fee * 1.2
  });
});
