import axios from 'axios';
import {FormData as SignInData} from '@/../../src/schema/login';
import {SignInResponse} from '@/../../src/schema/login';

axios.defaults.baseURL = 'https://vue3-course-api.hexschool.io';

export const signIn = async (data: SignInData): Promise<SignInResponse> => {
  try {
    const res = await axios.post('/V2/admin/signin', {
      username: data.username,
      password: data.password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const api_path = 'raychen';
