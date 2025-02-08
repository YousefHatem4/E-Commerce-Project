import React, { useContext, useEffect, useState } from 'react'
import style from './ForgetPass.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

export default function ForgetPass() {
    let navigate = useNavigate();

    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    let { setUserToken } = useContext(userContext)
    useEffect(() => {
        document.title = 'Forget-Password'
    }, [])
    async function HandleForgetPass(values) {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
                email: values.email,
            })
            setUserToken(data.token)
            navigate('/verify-code');
            localStorage.setItem('userToken', data.token);

        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }
  

    let validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required').email('email invalid'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: HandleForgetPass
    })
    return <>

        <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">
            <h2 className='mb-[20px] capitalize font-bold'>please enter your Email</h2>

            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your email</label>
            </div>
            {formik.errors.email && formik.touched.email && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.email}
            </div>}

           
            {loading ? <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className='fas fa-spinner fa-spin'></i>
            </button> : <button type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Verfiy</button>}


        </form>
    </>
}
