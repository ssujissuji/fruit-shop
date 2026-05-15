import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})

export const signupSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })
