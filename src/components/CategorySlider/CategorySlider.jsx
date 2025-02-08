import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,  // Large devices (desktops)
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 992,   // Medium devices (tablets)
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,   // Small devices (tablets in portrait mode)
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,   // Extra small devices (phones)
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 400,   // Small screens (phones in portrait mode)
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="category-slider-container mt-2">
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-[200px] object-cover object-center transition-all duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                        <h3 className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300">{category.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
