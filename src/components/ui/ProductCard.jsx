import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

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

const CATEGORY_COLOR = {
  '전체':  '#DF4128',
  '국내산': '#059669',
  '수입산': '#7C5CBF',
}

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const config = FRUIT_CONFIG[product.name] ?? DEFAULT_CONFIG

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart({ product }))
  }

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div
        className="bg-white rounded-card overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}
      >
        {/* 이미지 영역 */}
        <div className="relative bg-bg-input h-44 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="hidden h-full w-full items-center justify-center" style={{ fontSize: '72px' }}>
            {config.emoji}
          </div>

          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-3 left-3 text-white text-[10px] font-bold font-ui px-2 py-0.5 rounded-full"
            style={{ backgroundColor: CATEGORY_COLOR[product.category] ?? CATEGORY_COLOR['전체'] }}
          >
            {product.category}
          </span>
        </div>

        {/* 정보 영역 */}
        <div className="p-4">
          <p className="text-[11px] text-text-muted font-body mb-0.5">{product.origin}</p>
          <h3
            className="text-text-main text-base leading-tight"
            style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }}
          >
            {product.name}
          </h3>
          <p className="text-xs text-text-muted font-body mt-0.5">{product.weight}</p>

          <div className="flex items-center justify-between mt-3">
            <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 500 }} className="text-text-main text-lg">
              {product.price.toLocaleString()}
              <span className="text-sm ml-0.5">원</span>
            </span>
            <button
              onClick={handleAddToCart}
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
    </Link>
  )
}

export default ProductCard
