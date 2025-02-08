import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../../components/Loading/Loading'
import { cartContext } from '../../context/cartContest';
import { WishContext } from '../wishContext/wishContext';

export default function ProductDetails() {
    let { getProductToCart } = useContext(cartContext);
    let { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState([]);
    let { getProductToWish } = useContext(WishContext);

    async function getProducts(productId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            setProduct(data.data);
            getCategories(data.data.category._id);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts(id);
    }, [id]);

    useEffect(() => {
        document.title = 'Product Details';
    }, []);

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const [categories, setCategories] = useState([]);

    async function getCategories(relatedProductId) {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${relatedProductId}`);
            setCategories(data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }
    }

    var settingSlider = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        lazyLoad: "ondemand",
        variableWidth: false,
        adaptiveHeight: true,
        accessibility: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return <>
        {loading ? <Loading /> : <>
            <div className="flex flex-col lg:flex-row p-4 lg:p-8 items-center">
                <div className='w-full lg:w-1/2 xl:w-1/4 mb-8 lg:mb-0'>
                    <Slider {...settings}>
                        {product.images.map((image, index) => (
                            <img key={index} className='w-full h-64 lg:h-96 object-cover rounded-lx' src={image} alt={product.title} />
                        ))}
                    </Slider>
                </div>
                <div className='w-full lg:w-1/2 xl:w-3/4 lg:ps-8'>
                    <h2>{product.title}</h2>
                    <p className='my-2 text-gray-600'>{product.description}</p>
                    <p className=''>{product.category.name}</p>
                    <div className="flex justify-between">
                        <span>{product.price} EGP</span>
                        <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={() => getProductToCart(product.id)} className='btn w-full'>Add to Cart</button>
                        <i
                            onClick={() => {
                                setLiked({ ...liked, [product.id]: !liked[product.id] });
                                getProductToWish(product.id);
                            }}
                            className={`fa-solid fa-heart fa-2x cursor-pointer ${liked[product.id] ? 'text-red-500' : 'text-gray-400'}`}
                        />
                    </div>
                </div>
            </div>
           
            <div className="py-10 bg-gray-50">
                <h3 className="text-center text-green-500 text-3xl font-bold mb-6">Related Products</h3>
                <Slider {...settingSlider}>
                    {categories.map((category, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg">
                            <img
                                src={category.images[0]}
                                alt={category.title}
                                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </>}
    </>
}
