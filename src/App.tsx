import { useState, FC } from 'react'
import { calculateDeliveryFee } from '../utils/deliveryFee'
import { UseFormRegister, useForm } from 'react-hook-form';

type FormData = {
  cartValue: string;
  deliveryDistance: string;
  numberOfItems: string;
  orderTime: string;
};

const InputNumber: FC<{
  label: string, name: keyof FormData, 
  required: boolean, isInteger?: boolean, register: UseFormRegister<FormData>
}> = ({label, name, required, isInteger, register}) => (
<label className="block">
  <span className="text-gray-700">{label}</span>
  <input 
    type="number" 
    step={isInteger ? '1' : 'any'}
    min='0'
    required={required}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
    {...register(name)}
    />
</label>
)

function DeliveryFeeCaculator() {
  const { register, handleSubmit } = useForm<FormData>();
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const handleFormSubmit = (data:FormData) => {
    const { cartValue, deliveryDistance, numberOfItems, orderTime } = data;
    const deliveryPrice = calculateDeliveryFee({
      cartValue: parseFloat(cartValue),
      deliveryDistance: parseInt(deliveryDistance),
      cartItemsAmount: parseInt(numberOfItems),
      orderTime: new Date(orderTime),
    })
    setDeliveryPrice(deliveryPrice)
  }

  return (
    <div className="md:container md:mx-auto px-4 mt-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold w-full text-center" > 
        Delivery Fee Calculator
      </h1>
      <div className="mt-8 max-w-md w-full">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 gap-6">
          <InputNumber 
            label='Cart Value (€)' 
            name='cartValue' 
            required
            register={register}
          />
          <InputNumber 
            label='Delivery Distance (km)' 
            name='deliveryDistance' 
            required
            isInteger
            register={register}
          />
          <InputNumber
            label='Number of items' 
            name='numberOfItems' 
            required
            isInteger
            register={register}
          />
          <label className="block">
            <span className="text-gray-700">Order Time</span>
              <span className='flex gap-x-2'>
                <input 
                  type="datetime-local"
                  data-test-id="orderTime"
                  aria-label="Select date for the order time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  {...register('orderTime')}
                  />
              </span>
          </label>
          <div className="block">
            <div className="mt-2">
              <button 
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md" 
                type="submit"
                aria-label="Calculate delivery price from input details"
                >
                Calculate delivery price
              </button>
            </div>
          </div>
        </form>
        <div className='flex justify-end'>
          <h2 className="text-2xl font-bold mt-10">Delivery price:&nbsp;
            <span data-test-id="fee">{deliveryPrice}</span>€</h2>
        </div>
      </div>
    </div>
  )
}

export default DeliveryFeeCaculator
