import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

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

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const config = FRUIT_CONFIG[product.name] ?? DEFAULT_CONFIG

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* 이미지 영역 */}
        <div className={`relative bg-gradient-to-br ${config.gradient} h-44 flex items-center justify-center overflow-hidden`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div
            className="hidden h-full w-full items-center justify-center"
            style={{ fontSize: '72px' }}
          >
            {config.emoji}
          </div>

          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: config.accent }}
          >
            {product.category}
          </span>
        </div>

        {/* 정보 영역 */}
        <div className="p-4">
          <p className="text-[11px] text-gray-400 mb-0.5">{product.origin}</p>
          <h3 className="font-bold text-gray-800 text-base leading-tight">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-green-600 font-extrabold text-lg">
              {product.price.toLocaleString()}
              <span className="text-sm font-semibold">원</span>
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              style={{ backgroundColor: config.accent }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              담기
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
