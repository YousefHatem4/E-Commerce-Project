import React, { useContext, useEffect } from 'react'
import style from './WishList.module.css'
import { WishContext } from '../wishContext/wishContext';
import Loading from '../../components/Loading/Loading'
import { cartContext } from '../../context/cartContest';
export default function WishList() {

    let { product, deleteWishList } = useContext(WishContext);

    useEffect(() => {
        document.title = 'Wish List'
    }, [])
    let { getProductToCart } = useContext(cartContext);

    
    return <>
        <h1 className='text-center  text-[40px] font-semibold'> Wish List</h1>

        {product.length > 0 ? <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <tbody>
                        {product?.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <div className='flex justify-between'>
                                        <div className='flex items-center'>
                                            <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full me-9" alt="Apple Watch" />
                                            <div>
                                                <h2 className='text-black dark:text-white text-[20px] py-1'>{item.title}</h2>
                                                <h2 className='text-green-600  text-[16px] py-1'>{item.price} EGP</h2>
                                                <div onClick={() => deleteWishList(item.id)} className='flex items-center'>
                                                    <i className="fa-solid fa-trash me-1 text-red-600 dark:text-red-500" />
                                                    <span className=" cursor-pointer font-medium text-red-600 dark:text-red-500 ">Remove</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center'> <button onClick={() => getProductToCart(item.id)} className='btn w-full'>Add to Cart</button> </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>

        </> : (
            <Loading />
        ) }
    </>
}
