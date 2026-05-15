import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, '상품명(한글)을 입력해주세요.'),
  englishName: z.string().min(1, '상품명(영문)을 입력해주세요.'),
  price: z.coerce
    .number({ invalid_type_error: '가격을 입력해주세요.' })
    .min(1, '가격을 입력해주세요.'),
  description: z.string().min(1, '상품 설명을 입력해주세요.'),
  origin: z.string().min(1, '원산지를 입력해주세요.'),
  weightValue: z.coerce
    .number({ invalid_type_error: '중량을 입력해주세요.' })
    .positive('중량을 입력해주세요.'),
  weightUnit: z.enum(['g', 'kg'], { message: '단위를 선택해주세요.' }),
  stock: z.coerce
    .number({ invalid_type_error: '재고를 입력해주세요.' })
    .min(0, '재고를 입력해주세요.'),
  image: z.string().min(1, '이모지를 선택해주세요.'),
  category: z.enum(['국내산', '수입산'], { message: '카테고리를 선택해주세요.' }),
})
