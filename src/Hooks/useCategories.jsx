import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

export default function useCategories() {
    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let response = useQuery({
        queryKey: ['recentCategories'],
        queryFn: getCategories,
        // gcTime: 3000,
        // staleTime: 100000,
        // refetchInterval: 1000,
        // refetchOnMount:false
        select: (data) => data.data.data
    })
    return response;
}
