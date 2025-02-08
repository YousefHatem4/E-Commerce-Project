import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../context/cartContest';

export default function useOrders() {
    let { cart, clearCart } = useContext(cartContext);
    function getOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cart?.data?.cartOwner}`);
    }

    let response = useQuery({
        queryKey: ['recentOrders'],
        queryFn: getOrders,
        // gcTime: 3000,
        // staleTime: 100000,
        refetchInterval: 100,
        // refetchOnMount:false
        
    })
    return response;
}
