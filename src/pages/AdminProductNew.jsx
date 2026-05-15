import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../store/productSlice'
import ProductForm from '../components/ui/ProductForm'

function AdminProductNew() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (product) => {
    dispatch(addProduct(product))
    navigate('/admin/products')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1
          className="text-text-main font-body"
          style={{ fontSize: '28px', fontWeight: 600 }}
        >
          🛠 상품 등록
        </h1>
        <p className="text-sm text-text-muted font-body mt-1">관리자 전용 — 새 상품을 등록합니다.</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/products')}
        submitLabel="등록하기"
      />
    </div>
  )
}

export default AdminProductNew
