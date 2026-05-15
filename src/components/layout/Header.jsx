import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalCount } from '../../store/cartSlice';
import { selectIsLoggedIn, selectUser, selectIsAdmin, logout } from '../../store/authSlice';
import { selectWishlistCount } from '../../store/wishlistSlice';

function Header() {
  const dispatch = useDispatch();
  const cartTotalCount = useSelector(selectCartTotalCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-border-line"
      style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)' }}>
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-lg">🍊</span>
          </div>
          <div className="leading-tight">
            <span className="block text-base font-bold text-text-main font-ui">
              과일가게
            </span>
            <span className="block text-[10px] text-text-muted font-medium tracking-wide font-ui">
              FRESH FRUIT SHOP
            </span>
          </div>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold font-ui transition-colors ${
              isActive('/')
                ? 'text-primary'
                : 'text-text-sub hover:text-text-main'
            }`}>
            홈
          </Link>

          {/* 찜 목록 */}
          <Link
            to="/wishlist"
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-ui transition-colors ${
              isActive('/wishlist')
                ? 'text-primary'
                : 'text-text-sub hover:text-text-main'
            }`}>
            <svg
              className="w-4 h-4"
              fill={isActive('/wishlist') ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            찜
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold font-ui transition-colors ${
              isActive('/cart')
                ? 'text-primary'
                : 'text-text-sub hover:text-text-main'
            }`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            장바구니
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                {cartTotalCount}
              </span>
            )}
          </Link>

          {/* admin 상품 관리 링크 */}
          {isAdmin && (
            <Link
              to="/admin/products"
              className={`px-4 py-2 rounded-lg text-sm font-semibold font-ui transition-colors ${
                location.pathname.startsWith('/admin')
                  ? 'text-primary'
                  : 'text-text-sub hover:text-text-main'
              }`}>
              🛠 상품 관리
            </Link>
          )}

          {/* 로그인/로그아웃 */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 ml-1 pl-3 ">
              <Link to="/mypage" className="text-xs text-text-muted font-body hover:text-primary transition-colors">
                <span className="text-text-main font-semibold hover:text-primary">
                  {user.name}
                </span>
                님
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="px-3 py-1.5 rounded-btn text-xs font-semibold font-ui text-text-sub border border-border-line hover:border-primary hover:text-primary transition-colors">
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 px-4 py-1.5 rounded-btn text-sm font-semibold font-ui bg-primary text-white hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}>
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
