import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '../../schemas/productSchema'
import { FRUIT_EMOJIS } from '../../constants/emojis'

function ProductForm({ defaultValues, onSubmit, onCancel, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: '',
      englishName: '',
      price: '',
      description: '',
      origin: '',
      weightValue: '',
      weightUnit: 'g',
      stock: '',
      image: '',
      category: '',
    },
  })

  const handleFormSubmit = ({ weightValue, weightUnit, ...rest }) => {
    onSubmit({ ...rest, weight: `${weightValue}${weightUnit}` })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="bg-white rounded-card px-8 py-8 space-y-5"
      style={{ boxShadow: '0px 4px 17px rgba(0,0,0,0.07)' }}
    >
      {/* 상품명 (한글) */}
      <Field label="상품명 (한글)" error={errors.name}>
        <input
          type="text"
          placeholder="예: 사과"
          {...register('name')}
          className={inputClass(errors.name)}
        />
      </Field>

      {/* 상품명 (영문) */}
      <Field label="상품명 (영문)" error={errors.englishName}>
        <input
          type="text"
          placeholder="예: Apple"
          {...register('englishName')}
          className={inputClass(errors.englishName)}
        />
      </Field>

      {/* 가격 / 재고 — 2열 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="가격 (원)" error={errors.price}>
          <input
            type="number"
            placeholder="예: 3000"
            {...register('price', {})}
            className={inputClass(errors.price)}
          />
        </Field>
        <Field label="재고 (개)" error={errors.stock}>
          <input
            type="number"
            placeholder="예: 50"
            {...register('stock', {})}
            className={inputClass(errors.stock)}
          />
        </Field>
      </div>

      {/* 원산지 / 중량 — 2열 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="원산지" error={errors.origin}>
          <input
            type="text"
            placeholder="예: 경북 안동"
            {...register('origin')}
            className={inputClass(errors.origin)}
          />
        </Field>
        <div>
          <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
            중량
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="예: 500"
              {...register('weightValue', {})}
              className={inputClass(errors.weightValue, 'flex-1 min-w-0')}
            />
            <select
              {...register('weightUnit')}
              className={inputClass(errors.weightUnit, 'w-16 flex-none')}
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
          {errors.weightValue && (
            <p className="mt-1.5 text-xs text-red-500 font-body">{errors.weightValue.message}</p>
          )}
        </div>
      </div>

      {/* 이모지 / 카테고리 — 2열 */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="이모지" error={errors.image}>
          <select {...register('image')} className={inputClass(errors.image)}>
            <option value="">이모지 선택</option>
            {FRUIT_EMOJIS.map(({ emoji, label }) => (
              <option key={emoji} value={emoji}>
                {emoji} {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="카테고리" error={errors.category}>
          <select {...register('category')} className={inputClass(errors.category)}>
            <option value="">카테고리 선택</option>
            <option value="국내산">국내산</option>
            <option value="수입산">수입산</option>
          </select>
        </Field>
      </div>

      {/* 상품 설명 */}
      <Field label="상품 설명" error={errors.description}>
        <textarea
          rows={4}
          placeholder="상품에 대한 상세 설명을 입력해주세요."
          {...register('description')}
          className={`${inputClass(errors.description)} resize-none`}
        />
      </Field>

      {/* 버튼 */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-btn border border-border-line text-sm font-semibold font-ui text-text-sub hover:bg-bg-input transition-all"
        >
          취소
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-primary text-white text-sm font-bold font-ui rounded-btn hover:opacity-90 active:scale-[0.98] transition-all"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold font-ui text-text-main mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-body">{error.message}</p>
      )}
    </div>
  )
}

function inputClass(error, width = 'w-full') {
  return `${width} px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
    error ? 'border-red-400 focus:border-red-400' : 'border-transparent focus:border-primary'
  }`
}

export default ProductForm
