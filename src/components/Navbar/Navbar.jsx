import React, { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContest';

export default function Navbar() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let { userToken, setUserToken } = useContext(userContext);
  let { cart } = useContext(cartContext);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <>
      <header className="fixed bg-gray-200 inset-x-0 top-0 z-50 capitalize">
        <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
          <div className="flex me-4">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <img className="w-32" src={logo} alt="FreshCart Logo" />
            </NavLink>
          </div>

          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center bg-gray-400 justify-center rounded-md p-2.5 text-gray-700">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {userToken && (
            <div className="hidden lg:flex lg:gap-x-3">
              <NavLink to="/" className="text-sm text-gray-600 hover:text-green-600">Home</NavLink>
              <NavLink to="/categories" className="text-sm text-gray-600 hover:text-green-600">Categories</NavLink>
              <NavLink to="/brands" className="text-sm text-gray-600 hover:text-green-600">Brands</NavLink>
              <NavLink to="/products" className="text-sm text-gray-600 hover:text-green-600">Products</NavLink>
              <NavLink to="/allorders" className="text-sm text-gray-600 hover:text-green-600">Orders</NavLink>
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3">
            {userToken ? (
              <div className="flex items-center gap-4">
                <NavLink to="/wishlist" className="text-sm text-gray-600 hover:text-black">
                  <i className="fa-solid fa-heart fa-2x cursor-pointer"></i>
                </NavLink>
                <NavLink to="/cart" className="relative text-gray-600 hover:text-black text-sm">
                  <i className="fas fa-shopping-cart fa-2xl"></i>
                  {cart?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {cart.numOfCartItems}
                    </span>
                  )}
                </NavLink>
                <span onClick={logOut} className="cursor-pointer font-bold text-gray-600 hover:text-green-600 text-sm">
                  Log out
                </span>
              </div>
            ) : (
              <>
                <NavLink to="/register" className="text-sm text-gray-600">Register</NavLink>
                <NavLink to="/login" className="text-sm text-gray-600">Log in <span aria-hidden="true">→</span></NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={isOpen ? 'lg:hidden' : 'hidden'} role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="/" className="-m-1.5 p-1.5">
                <img className="w-32" src={logo} alt="FreshCart Logo" />
              </NavLink>
              <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white hover:bg-light">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {userToken ? (
                  <>
                    <div className="space-y-2 py-6">
                      <NavLink to="/" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                      <NavLink to="/cart" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Cart</NavLink>
                      <NavLink to="/products" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                      <NavLink to="/categories" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                      <NavLink to="/brands" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                      <NavLink to="/allorders" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Orders</NavLink>
                    </div>
                    <div className="py-6">
                      <button
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-6 space-y-2">
                    <NavLink to="/register" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Register</NavLink>
                    <NavLink to="/login" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
