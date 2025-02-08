import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import useCategories from '../../Hooks/useCategories';
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Categories() {
    let { data, isLoading, isFetching, isError } = useCategories();
    useEffect(() => {
        document.title = 'Categories'
    }, [])
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);  
    const [categoryName, setCategoryName] = useState("")
    async function getSubCategories(categoryId,categoryName) {
        try {
            setLoading(true);
            let { data } =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
            console.log(data.data);
            setCategory(data.data);
            setCategoryName(categoryName);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
   
    
    return <>
        {isLoading ? <Loading /> :
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-28">
                <div className="flex flex-wrap py-8 gap-y-4 justify-center ">
                    {data?.map((categories) => <div key={categories._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                        <div onClick={() => getSubCategories(categories._id , categories.name)} className="product rounded-lg mx-3 border-2 ">
                            {/* <Link to={`/relatedproduct/${categories._id}`}> */}
                                <img src={categories.image} className='w-full h-[300px]  object-cover object-center' alt={categories.name} />
                                <h1 className='text-[28px] text-center text-black font-semibold p-5'>{categories.name}</h1>
                            {/* </Link> */}
                        </div>
                    </div>
                    )}
                </div>
                <h1 className='text-center text-green-600 text-[32px] font-semibold'>{categoryName} SubCategories</h1>
                <div className="flex flex-wrap py-12 gap-y-4 justify-center ">
                {loading? <Loading/> :category?.map((subCategory) => <>
                    <div key={subCategory._id} className=" sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                        <div className="product rounded-lg mx-3 border-2 ">
                            <h1 className='text-[20px] text-center font-sans  font-semibold xl:py-3 p-3 '>{subCategory.name}</h1>
                        </div>
                    </div>
                </>)}
                </div>
            </div>
        }
    </>
}
