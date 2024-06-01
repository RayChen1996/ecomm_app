import axios from 'axios';

import {api_path} from '../../client';

axios.defaults.baseURL = 'https://vue3-course-api.hexschool.io';

export const getProducts = async () => {
  try {
    const res = await axios.get(`/V2/api/${api_path}/products/all`, {});
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
