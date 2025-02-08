import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export default function useBrands() {
    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let response = useQuery({
        queryKey: ['useBrands'],
        queryFn: getBrands,
        // gcTime: 3000,
        // staleTime: 100000,
        // refetchInterval: 1000,
        // refetchOnMount:false
        select: (data) => data.data.data
    })
    return response;
}
