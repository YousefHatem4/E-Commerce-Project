import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

export default function Register() {
    let navigate = useNavigate();

    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    let { setUserToken } = useContext(userContext)
    useEffect(() => {
        document.title = 'Register'
    }, [])
    async function register(values) {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            console.log(data);
            setUserToken(data.token)
            navigate('/login');
            localStorage.setItem('userToken', data.token);

        } catch (err) {
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }
    }
    // function validateForm(values) {
    //     let errors = {}
    //     if (!values.name) {
    //         errors.name = 'the name is required'
    //     } else if (!/^[A-Z]\w{3,15}$/.test(values.name)) {
    //         errors.name = 'name is invalid ex(Mohamed)'
    //     }
    //     if  (!values.phone) {
    //         errors.phone = 'the phone is required'
    //     } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
    //         errors.phone = 'we need an egyptian phone number'
    //     }
    //     return errors;
    // }

    let validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(3, 'min is 3').max(15, 'max is 15'),
        email: Yup.string().required('email is required').email('email invalid'),
        password: Yup.string().required('password is required').matches(/^[A-Z]\w{4,10}$/, 'invalid password ex(Ahmed123)'),
        rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')], 'password and repassword not matches'),
        phone: Yup.string().required('repassword is required').matches(/^01[0125][0-9]{8}$/, 'the phone is incorrect')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: register
    })
    return <>

        <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">
            {apiError && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {apiError}
            </div>}
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your Name</label>
            </div>
            {formik.errors.name && formik.touched.name && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.name}
            </div>}


            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your email</label>
            </div>
            {formik.errors.email && formik.touched.email && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.email}
            </div>}

            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your password</label>
            </div>
            {formik.errors.password && formik.touched.password && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.password}
            </div>}

            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your rePassword</label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.rePassword}
            </div>}

            <div className="relative z-0 w-full mb-5 group">
                <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Enter Your phone</label>
            </div>
            {formik.errors.phone && formik.touched.phone && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {formik.errors.phone}
            </div>}
            {loading ? <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <i className='fas fa-spinner fa-spin'></i>
            </button> : <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>}


        </form>
    </>
}
