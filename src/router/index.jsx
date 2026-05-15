import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Mypage from '../pages/Mypage'
import AdminProductNew from '../pages/AdminProductNew'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'mypage', element: <PrivateRoute><Mypage /></PrivateRoute> },
      { path: 'admin/product/new', element: <AdminRoute><AdminProductNew /></AdminRoute> },
    ],
  },
  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: '/signup',
    element: <PublicRoute><Signup /></PublicRoute>,
  },
])

export default router
