import { useState } from 'react'
import Slider from '../components/ui/Slider'
import ProductCard from '../components/ui/ProductCard'
import products from '../data/products.json'

const CATEGORIES = ['전체', '국내산', '수입산']

function Home() {
  const [activeCategory, setActiveCategory] = useState('전체')

  const filtered =
    activeCategory === '전체'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 슬라이더 */}
      <section className="mb-14">
        <Slider />
      </section>

      {/* 특징 배너 */}
      <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '🌿', title: '산지 직송', desc: '농가에서 직접' },
          { icon: '🚚', title: '무료 배송', desc: '당일 출발' },
          { icon: '✅', title: '품질 보증', desc: '신선도 100%' },
          { icon: '♻️', title: '친환경', desc: '친환경 포장재' },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-sm font-bold text-gray-700">{item.title}</p>
              <p className="text-[11px] text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 상품 목록 */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">전체 상품</h2>
            <p className="text-sm text-gray-400 mt-0.5">신선한 과일 {filtered.length}종</p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-green-500 text-white shadow-sm shadow-green-200'
                    : 'bg-white text-gray-500 hover:bg-green-50 hover:text-green-600 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
