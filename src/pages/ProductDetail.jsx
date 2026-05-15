import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import products from '../data/products.json'

const FRUIT_CONFIG = {
  사과: { emoji: '🍎', gradient: 'from-red-100 to-rose-50', accent: '#ef4444' },
  바나나: { emoji: '🍌', gradient: 'from-yellow-100 to-amber-50', accent: '#f59e0b' },
  딸기: { emoji: '🍓', gradient: 'from-pink-100 to-rose-50', accent: '#ec4899' },
  포도: { emoji: '🍇', gradient: 'from-purple-100 to-violet-50', accent: '#a855f7' },
  오렌지: { emoji: '🍊', gradient: 'from-orange-100 to-amber-50', accent: '#f97316' },
  키위: { emoji: '🥝', gradient: 'from-lime-100 to-green-50', accent: '#84cc16' },
  망고: { emoji: '🥭', gradient: 'from-amber-100 to-yellow-50', accent: '#f59e0b' },
  수박: { emoji: '🍉', gradient: 'from-green-100 to-emerald-50', accent: '#10b981' },
  복숭아: { emoji: '🍑', gradient: 'from-rose-100 to-pink-50', accent: '#fb7185' },
  블루베리: { emoji: '🫐', gradient: 'from-blue-100 to-indigo-50', accent: '#6366f1' },
}
const DEFAULT_CONFIG = { emoji: '🍑', gradient: 'from-green-100 to-emerald-50', accent: '#10b981' }

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😢</p>
        <p className="text-gray-500 text-xl mb-4">상품을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    )
  }

  const config = FRUIT_CONFIG[product.name] ?? DEFAULT_CONFIG

  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1))
  const handleIncrease = () => setQuantity((q) => Math.min(product.stock, q + 1))

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }))
    alert(`${product.name}이(가) 장바구니에 담겼습니다.`)
  }

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }))
    navigate('/cart')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 뒤로 가기 */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 mb-6 text-sm font-medium transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden md:flex">
        {/* 상품 이미지 */}
        <div className={`relative bg-gradient-to-br ${config.gradient} md:w-5/12 flex items-center justify-center min-h-72 overflow-hidden`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="hidden w-full h-72 md:h-full items-center justify-center text-9xl">
            {config.emoji}
          </div>

          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
            style={{ backgroundColor: config.accent }}
          >
            {product.category}
          </span>
        </div>

        {/* 상품 정보 */}
        <div className="p-8 md:w-7/12 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-gray-400 text-sm mt-1">{product.englishName}</p>
            </div>

            {/* 가격 */}
            <div className="mb-6">
              <p className="text-4xl font-extrabold" style={{ color: config.accent }}>
                {product.price.toLocaleString()}
                <span className="text-2xl">원</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">배송비 무료</p>
            </div>

            {/* 상품 정보 테이블 */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 mb-5">
              {[
                { icon: '📍', label: '원산지', value: product.origin },
                { icon: '⚖️', label: '중량', value: product.weight },
                { icon: '📦', label: '재고', value: `${product.stock}개` },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <span className="text-base w-5">{item.icon}</span>
                  <span className="text-gray-400 w-12">{item.label}</span>
                  <span className="text-gray-700 font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* 수량 선택 */}
          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm font-semibold text-gray-500">수량</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-bold text-gray-800">{quantity}</span>
              <button
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400">재고 {product.stock}개</span>
          </div>

          {/* 구매 버튼 */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              style={{ borderColor: config.accent, color: config.accent }}
            >
              🛒 장바구니 담기
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm"
              style={{ backgroundColor: config.accent }}
            >
              바로 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
