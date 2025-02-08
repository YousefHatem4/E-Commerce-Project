import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export let cartContext = createContext();

export default function CartContestProvider({ children }) {

    const [cart, setCart] = useState(null);

    const headers = {
        token: localStorage.getItem('userToken')
    }
    async function getProductToCart(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            },
                {
                    headers
                })
            getProductCart();
            toast.success(data.message, {
                duration: 2000
            })


        } catch (err) {
            console.log(err);
        }
    }


    async function getProductCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                })
            setCart(data);

        } catch (err) {
            console.log(err);
        }
    }

    async function updateProductCount(productId, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count
            },
                {
                    headers
                })
            setCart(data);
            toast.success(data.status, {
                duration: 1000
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteProductCount(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers
                })
            setCart(data);
            toast.success(data.status, {
                duration: 1000
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function clearCart() {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart, ${ headers }`);
            setCart(null);
        } catch (e) {
            console.log(e);
        }
    }
 
    useEffect(() => {
        getProductCart();
    }, [])

    return <cartContext.Provider value={{ getProductToCart, cart, updateProductCount, deleteProductCount ,clearCart }} >
        {children}
    </cartContext.Provider>
}
