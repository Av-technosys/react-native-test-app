import { privateApi } from './axios';



export const getBanners = async () => {
  const response = await privateApi.get('/event/banner');
  return response.data;
};
