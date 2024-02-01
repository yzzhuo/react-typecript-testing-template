import { useState } from 'react'
import './App.css'
import { getFormatDayAndTime } from '../utils/time'
import { calculate_delivery_fee } from '../utils/deliveryFee'
import { useForm } from 'react-hook-form';

type FormData = {
  cartValue: string;
  deliveryDistance: string;
  amountOfItems: string;
  day: string;
  time: string;
};

function App() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const {day, time} = getFormatDayAndTime(new Date());
  const [formValues, setFormValues] = useState({ 
    cartValue: '',
    deliveryDistance: '',
    amountOfItems: '',
    day: day,
    time: time,
  })
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const handleClickCalculateButton = () => {
    const { cartValue, deliveryDistance, amountOfItems, day, time } = formValues;
    const deliveryPrice = calculate_delivery_fee({
      cartValue: parseFloat(cartValue),
      deliveryDistance: parseInt(deliveryDistance),
      cartItemsAmount: parseInt(amountOfItems),
      orderTime: new Date(`${day} ${time}`),
    })
    setDeliveryPrice(deliveryPrice)
  }

  const onSubmit = data => console.log(data);

  return (
    <div className="md:container md:mx-auto px-4 mt-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold w-full text-center" > 
        Delivery Fee Calculator
      </h1>
      <div className="mt-8 max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 form-simple">
          <label className="block">
            <span className="text-gray-700">Cart Value (€)</span>
            <input 
              type="number" 
              step="any"
              data-test-id="cartValue"
              aria-label='Input cart value in euros'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              {...register("cartValue", { required: true })}
              />
            <span className="text-gray-700"></span>
          </label>
          <label className="block">
            <span className="text-gray-700">Delivery Distance (m) </span>
            <input
              data-test-id="deliveryDistance"
              type="number"
              aria-label="Input delivery distance in meters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              {...register("deliveryDistance", { required: true })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Amount of items</span>
            <input 
              data-test-id="numberOfItems"
              aria-label="Input number of items for the order"
              type="number" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              placeholder=""
              {...register("amountOfItems", { required: true })}
              />
          </label>

          <label className="block">
            <span className="text-gray-700">Order Time</span>
            <span className='flex gap-x-2'>
              <input 
                type="date" 
                data-test-id="orderTimeDate"
                aria-label="Select date for the order time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                {...register("day", { required: true })}
                />
              <input 
                type="time" 
                aria-label="Select time for the order time"
                data-test-id="orderTime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                {...register("time", { required: true })}
                />
              </span>
          </label>
          
          <div className="block">
            <div className="mt-2">
              <button 
                className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md" 
                type="submit"
                aria-label="Calculate delivery price"
                onClick={handleClickCalculateButton}
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

export default App
