import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectProducts, deleteProduct } from '../store/productSlice'

function AdminProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(selectProducts)

  const handleDelete = (id, name) => {
    if (window.confirm(`"${name}" 상품을 삭제하시겠습니까?`)) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-text-main font-body"
            style={{ fontSize: '28px', fontWeight: 600 }}
          >
            🛠 상품 관리
          </h1>
          <p className="text-sm text-text-muted font-body mt-1">
            전체 상품 {products.length}개
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/product/new')}
          className="px-5 py-2.5 bg-primary text-white text-sm font-bold font-ui rounded-btn hover:opacity-90 active:scale-[0.98] transition-all"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
        >
          + 상품 등록
        </button>
      </div>

      <div
        className="bg-white rounded-card overflow-hidden"
        style={{ boxShadow: '0px 4px 17px rgba(0,0,0,0.07)' }}
      >
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border-line bg-bg-input">
              <th className="px-4 py-3 text-left text-text-sub font-semibold font-ui w-14">
                이미지
              </th>
              <th className="px-4 py-3 text-left text-text-sub font-semibold font-ui">상품명</th>
              <th className="px-4 py-3 text-left text-text-sub font-semibold font-ui w-20">
                카테고리
              </th>
              <th className="px-4 py-3 text-right text-text-sub font-semibold font-ui w-24">
                가격
              </th>
              <th className="px-4 py-3 text-right text-text-sub font-semibold font-ui w-16">
                재고
              </th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b border-border-line last:border-none transition-colors hover:bg-bg-input/50 ${
                  index % 2 === 0 ? '' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-4 py-3 text-center text-2xl">{product.image}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-text-main">{product.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{product.englishName}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold font-ui text-white"
                    style={{
                      backgroundColor: product.category === '국내산' ? '#4caf82' : '#5b8ee6',
                    }}
                  >
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-text-main">
                  {product.price.toLocaleString()}원
                </td>
                <td className="px-4 py-3 text-right text-text-main">{product.stock}개</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => navigate(`/admin/product/${product.id}/edit`)}
                      className="px-3 py-1.5 text-xs font-semibold font-ui rounded-btn border border-border-line text-text-sub hover:bg-bg-input transition-all"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="px-3 py-1.5 text-xs font-semibold font-ui rounded-btn border border-red-300 text-red-500 hover:bg-red-50 transition-all"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProductList
