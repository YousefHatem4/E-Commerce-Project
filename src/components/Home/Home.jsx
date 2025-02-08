import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import useProducts from '../../Hooks/useProducts'
import Loading from '../../components/Loading/Loading'




export default function Home() {
    let { data, isLoading, isFetching, isError } = useProducts();

  return <>
    {isLoading ? <Loading /> : <> <MainSlider />
    <CategorySlider />
      <RecentProducts />
    </>
    }
   
  </>
}
