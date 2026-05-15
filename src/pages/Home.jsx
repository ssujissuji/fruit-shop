import { useState, useEffect } from 'react';
import Slider from '../components/ui/Slider';
import ProductCard from '../components/ui/ProductCard';
import products from '../data/products.json';
import useDebounce from '../hooks/useDebounce';
import useProductFilter from '../hooks/useProductFilter';

const CATEGORIES = [
  { label: '전체', color: '#DF4128' },
  { label: '국내산', color: '#059669' },
  { label: '수입산', color: '#7C5CBF' },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [inputValue, setInputValue] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const debouncedInput = useDebounce(inputValue, 300);

  useEffect(() => {
    setFilterQuery(debouncedInput);
  }, [debouncedInput]);

  const filtered = useProductFilter(products, activeCategory, filterQuery);
  const activeCategoryColor = CATEGORIES.find((c) => c.label === activeCategory)?.color;

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
            style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold font-ui text-text-main">
                {item.title}
              </p>
              <p className="text-xs font-ui text-text-muted mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 추천 상품 */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-text-main font-body"
              style={{ fontSize: '30px', fontWeight: 500 }}>
              추천 상품
            </h2>
            <p className="text-sm text-text-muted font-body mt-1">
              신선한 과일 {filtered.length}종
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {CATEGORIES.map(({ label, color }) => {
              const isActive = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold font-ui transition-all border"
                  style={
                    isActive
                      ? {
                          backgroundColor: color,
                          color: '#fff',
                          borderColor: color,
                        }
                      : { backgroundColor: '#fff', color, borderColor: color }
                  }>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 검색 입력 */}
        <div className="flex items-center gap-2 mb-8">
          {activeCategory !== '전체' && (
            <button
              onClick={() => setActiveCategory('전체')}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold font-ui whitespace-nowrap"
              style={{ backgroundColor: activeCategoryColor, color: '#fff' }}
              aria-label={`${activeCategory} 필터 해제`}>
              {activeCategory}
              <span className="opacity-75">✕</span>
            </button>
          )}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={(e) => {
                setIsComposing(false);
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isComposing) {
                  setFilterQuery(inputValue);
                }
              }}
              placeholder="상품명으로 검색"
              className="w-full border border-gray-200 rounded-full px-4 py-2 pr-9 text-sm font-ui text-text-main placeholder:text-text-muted focus:outline-none focus:border-gray-400"
            />
            {inputValue && (
              <button
                onClick={() => {
                  setInputValue('');
                  setFilterQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                aria-label="검색어 초기화">
                ✕
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-text-muted py-20 font-body">
            검색 결과가 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
