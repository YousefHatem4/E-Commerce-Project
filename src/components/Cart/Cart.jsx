import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../context/cartContest';
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom';

export default function Cart() {
    let { cart, updateProductCount, deleteProductCount } = useContext(cartContext);

    useEffect(() => {
        document.title = 'Cart';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {cart ? (
                <>
                    <h1 className='text-center text-4xl font-semibold text-gray-800 mb-8'>Cart</h1>
                    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mx-4">
                        <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.data.products.map((item, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {item.product.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={item.count > 1 ? () => updateProductCount(item.product.id, item.count - 1) : () => deleteProductCount(item.product.id)}
                                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                >
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <div>
                                                    <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1">
                                                        {item.count}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => updateProductCount(item.product.id, item.count + 1)}
                                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                >
                                                    <span className="sr-only">Quantity button</span>
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {item.price * item.count} EGP
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                onClick={() => deleteProductCount(item.product.id)}
                                                className="font-medium text-red-600 hover:text-red-800 cursor-pointer"
                                            >
                                                Remove
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
                            <h3 className='text-xl font-semibold text-gray-800'>Total Cart Price: <span className='text-green-600'>{cart.data.totalCartPrice} EGP</span></h3>
                            <Link to={'/checkout'}>
                                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}