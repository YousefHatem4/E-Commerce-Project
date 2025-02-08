import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productsSlice';
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContest';
import { WishContext } from '../../components/wishContext/wishContext';

export default function Products() {
    let { isLoading, products } = useSelector((store) => store.products);
    let dispatch = useDispatch();
    const { getProductToCart } = useContext(cartContext);
    const { getProductToWish } = useContext(WishContext);

    const [liked, setLiked] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Products';
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>

                    <form className="flex justify-center my-8">
                        <div className="relative w-full max-w-md">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search for products..."
                                className="relative w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="absolute -right-1 -top-2 h-full px-4 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-all duration-300"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>


                    <div className="flex flex-wrap py-8 gap-y-4 justify-center">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product._id} className="sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/5 p-2">
                                    <div className="product p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <Link to={`/productdetails/${product._id}`}>
                                            <img
                                                src={product.imageCover}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                                alt={product.title}
                                            />
                                            <h3 className="text-main text-sm font-semibold mt-2">{product.category.name}</h3>
                                            <h3 className="text-xl font-bold">{product.title.split(' ', 2).join(' ')}</h3>
                                            <div className="flex justify-between mt-2">
                                                <span className="text-green-600 font-semibold">{product.price} EGP</span>
                                                <span className="text-yellow-500">
                                                    <i className="fas fa-star"></i> {product.ratingsAverage}
                                                </span>
                                            </div>
                                        </Link>
                                        <div className="flex justify-between items-center mt-4">
                                            <button
                                                onClick={() => getProductToCart(product._id)}
                                                className="btn w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                            >
                                                Add to Cart
                                            </button>
                                            <i
                                                onClick={() => {
                                                    setLiked({ ...liked, [product._id]: !liked[product._id] });
                                                    getProductToWish(product._id);
                                                }}
                                                className={`fa-solid fa-heart fa-2x cursor-pointer ${liked[product._id] ? 'text-red-500' : 'text-gray-400'
                                                    } hover:text-red-500 transition-all duration-300`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600">No products found.</div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
