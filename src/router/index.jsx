import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Mypage from '../pages/Mypage'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'mypage', element: <PrivateRoute><Mypage /></PrivateRoute> },
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
