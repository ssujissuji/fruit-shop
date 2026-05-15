import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectProducts, updateProduct } from '../store/productSlice'
import ProductForm from '../components/ui/ProductForm'

function AdminProductEdit() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(selectProducts)

  const product = products.find((p) => p.id === Number(id))

  useEffect(() => {
    if (!product) {
      navigate('/admin/products', { replace: true })
    }
  }, [product, navigate])

  if (!product) return null

  // weight 문자열("500g", "1.5kg")을 숫자+단위로 분리
  const weightMatch = product.weight.match(/^([\d.]+)(g|kg)$/)
  const weightValue = weightMatch ? Number(weightMatch[1]) : ''
  const weightUnit = weightMatch ? weightMatch[2] : 'g'

  const defaultValues = {
    name: product.name,
    englishName: product.englishName,
    price: product.price,
    description: product.description,
    origin: product.origin,
    weightValue,
    weightUnit,
    stock: product.stock,
    image: product.image,
    category: product.category,
  }

  const handleSubmit = (updated) => {
    dispatch(updateProduct({ ...updated, id: product.id }))
    navigate('/admin/products')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1
          className="text-text-main font-body"
          style={{ fontSize: '28px', fontWeight: 600 }}
        >
          🛠 상품 수정
        </h1>
        <p className="text-sm text-text-muted font-body mt-1">
          관리자 전용 — <span className="font-semibold text-text-main">{product.name}</span> 상품을 수정합니다.
        </p>
      </div>

      <ProductForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/products')}
        submitLabel="수정 완료"
      />
    </div>
  )
}

export default AdminProductEdit
