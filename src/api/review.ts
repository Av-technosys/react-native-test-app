import { privateApi } from './axios';



export const getAllReviews = async () => {
  const response = await privateApi.get('/user/get_all_reviews');
  return response.data;
};
