import React, { createContext, useEffect, useState } from 'react'
import style from './WishContext.module.css'
import axios from 'axios'
import toast from 'react-hot-toast';

export let WishContext = createContext();

export default function WishContextProvider({ children }) {

    const [product, setProduct] = useState([]);

    const headers = {
        token: localStorage.getItem('userToken')
    }

    async function getProductToWish(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId
                },
                {
                    headers
                }
            )
            getWishListProduct();
            toast.success(data.message, {
                duration: 1000
            })


        } catch (err) {
            console.log(err);
        }
    }


    async function getWishListProduct() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    headers
                })
            setProduct(data.data);


        } catch (err) {
            console.log(err);
        }
    }

    async function deleteWishList(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            getWishListProduct();
            toast.success(data.message, {
                duration: 1000
            })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getWishListProduct();
    }, [])

    return <>
        <WishContext.Provider value={{ getProductToWish, product, deleteWishList }} >
            {children}
        </WishContext.Provider>
    </>
}
