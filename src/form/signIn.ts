import {z} from 'zod';
export const loginSchema = z.object({
  username: z.string().min(1, {message: '請輸入帳號'}),
  password: z.string().min(1, {message: '請輸入密碼'}),
});
