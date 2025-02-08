import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let response = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProducts,
        // gcTime: 3000,
        // staleTime: 100000,
        // refetchInterval: 1000,
        // refetchOnMount:false
        select: (data) => data.data.data
    })
    return response;
}
