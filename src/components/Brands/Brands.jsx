import React, { useEffect } from 'react'
import useBrands from '../../Hooks/useBrands'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'

export default function Brands() {
    let { data, isLoading, isFetching, isError } = useBrands();
      useEffect(() => {
            document.title = 'Brands'
        }, [])
    return <>
        <h1 className='text-center text-green-600 text-[40px] font-semibold'>All Brands</h1>
        
        {isLoading ? <Loading /> :
            <div className="container mx-auto px-4 sm:px-6 lg:px-28">
                <div className="flex flex-wrap py-8 gap-y-4 justify-center ">
                    {data?.map((brands) => <div key={brands._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                        <div className="product rounded-lg mx-3 border-2 ">
                           
                                <img src={brands.image} className='w-full h-[200px]  object-cover object-center' alt={brands.name} />
                                <h1 className='text-[16px] text-center  font-semibold p-5'>{brands.name}</h1>
                            
                        </div>
                    </div>
                    )}
                </div>
            </div>
        }
    </>
}
