import React, { useContext, useEffect, useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContest';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading'

export default function CheckOut() {
    useEffect(() => {
        document.title = 'CheckOut'
    }, [])
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    let { setUserToken } = useContext(userContext);
    let { cart, clearCart } = useContext(cartContext);
    const Navigate = useNavigate();

    const OnlinePayment = async (shippingAddress) => {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
                shippingAddress
            },
                {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                })
           
            window.location.href = data.session.url
            toast.success(data.status)

        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }

    const CashPayment = async (shippingAddress) => {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`, {
                shippingAddress
            },
                {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                })
           

            toast.success(data.status)
            Navigate('/');
            clearCart();
        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }
    

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: (values) => {  }
    })
    return <>

        <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">

            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your details</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your phone</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your city</label>
            </div>
           
           
           


            {loading ? <Loading /> : <><div className='text-center'>
                <button onClick={() => CashPayment(formik.values)}  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cash Payment</button>
                <button onClick={() => OnlinePayment(formik.values)}  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Online Payment</button>
            </div>
            </>}


        </form>
    </>
}
