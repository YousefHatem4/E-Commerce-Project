import React, { useContext, useEffect } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios'
import { cartContext } from '../../context/cartContest';
import useOrders from '../../Hooks/useOrders';
import Loading from '../../components/Loading/Loading'
export default function AllOrders() {
    let { data, isLoading, isFetching, isError } = useOrders();
    console.log(data);

    useEffect(() => {
        document.title = 'Orders';
    }, [])

    return <>

        {isLoading ? <Loading /> : data?.data?.map((order, index) => (
            <div
                key={index}
                className="container mx-auto p-6 rounded-lg my-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-200 bg-white"
            >
                {/* Order Header */}
                <div className="flex flex-col md:justify-between md:items-center md:flex-row mb-6 border-b-2 pb-4 border-gray-300">
                    <h1 className="text-xl text-blue-600 font-semibold">
                        <span className="font-bold text-gray-800">Transaction Number:</span> #{order.id}
                    </h1>
                    <p className="text-lg text-gray-600">
                        <span className="font-bold text-black">Placed on:</span> {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-lg text-gray-600">
                        <span className="font-bold text-black">Payment Method: </span> {order.paymentMethodType}
                    </p>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {order?.cartItems?.map((product, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <img
                                src={product.product.imageCover}
                                alt={product.product.title}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {product.product.title.split(' ').slice(0, 3).join(' ')}
                                </h2>
                                <p className="text-green-600">
                                    <span className="font-semibold text-black">Price:</span> {product.price} EGP
                                </p>
                                <p className="text-green-600">
                                    <span className="font-semibold text-black">Quantity:</span> {product.count}
                                </p>
                                <p className="text-gray-500">{product.product.category.name}</p>
                                <p className="text-gray-500">{product.product.brand.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg text-green-600">
                        <span className="font-semibold text-black">Products Quantity:</span> {order?.cartItems.reduce((total, item) => total + item.count, 0)}
                    </p>
                    <p className="text-lg text-blue-600">
                        <span className="font-semibold text-black">Shipping Price:</span> {order.shippingPrice} EGP
                    </p>
                    <p className="text-lg text-yellow-600">
                        <span className="font-semibold text-black">Taxes:</span> {order.taxPrice} EGP
                    </p>
                    <p className="text-lg font-semibold text-green-700">
                        <span className="font-semibold text-black">Total Order Price:</span> {order.totalOrderPrice + order.taxPrice} EGP
                    </p>
                </div>
            </div>
        ))}

    </>
}
