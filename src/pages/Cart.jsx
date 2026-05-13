import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/cartSlice'

const FRUIT_CONFIG = {
  사과: { emoji: '🍎', accent: '#ef4444' },
  바나나: { emoji: '🍌', accent: '#f59e0b' },
  딸기: { emoji: '🍓', accent: '#ec4899' },
  포도: { emoji: '🍇', accent: '#a855f7' },
  오렌지: { emoji: '🍊', accent: '#f97316' },
  키위: { emoji: '🥝', accent: '#84cc16' },
  망고: { emoji: '🥭', accent: '#f59e0b' },
  수박: { emoji: '🍉', accent: '#10b981' },
  복숭아: { emoji: '🍑', accent: '#fb7185' },
  블루베리: { emoji: '🫐', accent: '#6366f1' },
}
const DEFAULT_CONFIG = { emoji: '🍑', accent: '#10b981' }

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const totalPrice = useSelector(selectCartTotalPrice)

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-7xl mb-5">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">장바구니가 비어 있어요</h2>
        <p className="text-gray-400 text-sm mb-8">신선한 과일을 담아보세요!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-green-200"
        >
          쇼핑하러 가기
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">장바구니</h1>
          <p className="text-sm text-gray-400 mt-0.5">{items.length}가지 상품</p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          전체 삭제
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 상품 목록 */}
        <div className="md:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => {
            const config = FRUIT_CONFIG[product.name] ?? DEFAULT_CONFIG
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 이미지 */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shrink-0 text-3xl"
                  style={{ backgroundColor: config.accent + '18' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <span className="hidden">{config.emoji}</span>
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-400">{product.origin} · {product.weight}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: config.accent }}>
                    {product.price.toLocaleString()}원
                  </p>
                </div>

                {/* 수량 조절 */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))
                    }
                    className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-500 transition-colors text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))
                    }
                    className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-500 transition-colors text-lg leading-none"
                  >
                    +
                  </button>
                </div>

                {/* 소계 + 삭제 */}
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-gray-800 text-sm">
                    {(product.price * quantity).toLocaleString()}원
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="text-[11px] text-gray-300 hover:text-red-400 mt-1 transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* 결제 요약 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <h3 className="font-bold text-gray-700 mb-4 text-sm">주문 요약</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>상품 금액</span>
                <span className="font-medium text-gray-700">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>배송비</span>
                <span className="text-green-500 font-semibold">무료</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-100 mt-4 pt-4">
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">총 결제금액</span>
                <span className="font-extrabold text-green-600 text-lg">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            <button className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-200 text-sm">
              결제하기
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full mt-2 text-gray-400 hover:text-gray-600 text-xs py-2 transition-colors"
            >
              쇼핑 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
