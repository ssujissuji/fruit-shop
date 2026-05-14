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
    <div className="max-w-6xl mx-auto px-10 py-10">
      {/* 히어로 슬라이더 */}
      <section className="mb-20">
        <Slider />
      </section>

      {/* 특징 카드 */}
      <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: '🌿', title: '산지 직송', desc: '농가에서 직접' },
          { icon: '🚚', title: '무료 배송', desc: '당일 출발' },
          { icon: '✅', title: '품질 보증', desc: '신선도 100%' },
          { icon: '♻️', title: '친환경', desc: '친환경 포장재' },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 bg-white rounded px-5 py-5"
            style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold font-ui text-text-main">{item.title}</p>
              <p className="text-xs font-ui text-text-muted mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 추천 상품 */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-text-main font-body"
              style={{ fontSize: '30px', fontWeight: 500 }}
            >
              추천 상품
            </h2>
            <p className="text-sm text-text-muted font-body mt-1">신선한 과일 {filtered.length}종</p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold font-ui transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-sub hover:text-primary border border-border-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
