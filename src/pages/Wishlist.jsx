import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from '../store/wishlistSlice'
import { addToCart } from '../store/cartSlice'

const FRUIT_CONFIG = {
  사과:    { emoji: '🍎' },
  바나나:  { emoji: '🍌' },
  딸기:    { emoji: '🍓' },
  포도:    { emoji: '🍇' },
  오렌지:  { emoji: '🍊' },
  키위:    { emoji: '🥝' },
  망고:    { emoji: '🥭' },
  수박:    { emoji: '🍉' },
  복숭아:  { emoji: '🍑' },
  블루베리: { emoji: '🫐' },
}
const DEFAULT_CONFIG = { emoji: '🍑' }

function Wishlist() {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItems)

  const handleAddToCart = (item) => {
    dispatch(addToCart({ product: item }))
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-10 py-20 text-center">
        <p className="text-5xl mb-4">🤍</p>
        <p className="text-lg font-semibold text-text-main font-body mb-2">
          찜한 상품이 없습니다
        </p>
        <p className="text-sm text-text-muted font-body mb-8">
          마음에 드는 상품을 찜해보세요!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-primary text-white text-sm font-semibold font-ui rounded-btn hover:opacity-90 transition-opacity"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
        >
          홈으로 이동
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-text-main font-body"
            style={{ fontSize: '30px', fontWeight: 500 }}
          >
            찜 목록
          </h1>
          <p className="text-sm text-text-muted font-body mt-1">
            {items.length}개의 상품
          </p>
        </div>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="px-4 py-2 text-sm font-semibold font-ui text-text-sub border border-border-line rounded-btn hover:border-red-400 hover:text-red-400 transition-colors"
        >
          전체 삭제
        </button>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          const config = FRUIT_CONFIG[item.name] ?? DEFAULT_CONFIG
          return (
            <div
              key={item.id}
              className="bg-white rounded-card overflow-hidden"
              style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}
            >
              {/* 이미지 영역 */}
              <Link to={`/product/${item.id}`} className="block relative bg-bg-input h-44 flex items-center justify-center overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden h-full w-full items-center justify-center" style={{ fontSize: '72px' }}>
                  {config.emoji}
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(removeFromWishlist(item.id))
                  }}
                  aria-label="찜 해제"
                  className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  style={{ boxShadow: '0px 2px 6px rgba(0,0,0,0.12)' }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="#ef4444"
                    stroke="#ef4444"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </Link>

              {/* 정보 영역 */}
              <div className="p-4">
                <h3
                  className="text-text-main text-base leading-tight"
                  style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}
                >
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }} className="text-text-main text-lg">
                    {item.price.toLocaleString()}
                    <span className="text-sm ml-0.5">원</span>
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1 bg-primary text-white text-xs font-bold font-ui px-3 py-1.5 rounded-btn transition-all hover:opacity-90 active:scale-95"
                    style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    담기
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wishlist
