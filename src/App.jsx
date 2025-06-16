import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import UserContextProvider from "./context/userContext";
import CartContestProvider from "./context/cartContest";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import WishList from "./components/WishList/WishList";
import WishContextProvider from './components/wishContext/wishContext';

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: 'register', element: <Register /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "Forget-pass", element: <ForgetPass /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const query = new QueryClient();
function App() {
  return <>
    <QueryClientProvider client={query}>
      <Provider store={store}>
        <WishContextProvider>
          <CartContestProvider>
            <UserContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster />
            </UserContextProvider>
          </CartContestProvider>
        </WishContextProvider>
      </Provider>
    </QueryClientProvider>



  </>;
}

export default App;
