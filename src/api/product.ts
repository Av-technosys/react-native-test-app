import { privateApi } from './axios';



export const getProductTypes = async () => {
  const response = await privateApi.get('/product/products_type');
  return response.data;
};

export const getProductsByCategoryId = async (categoryId: number) => {
  const response = await privateApi.get(
    `/product/products_by_categoryId/${categoryId}`,
  );
  return response.data; 
};


export const getProductsByProductId = async (productId: number) => {
  const response = await privateApi.get(
    `/product/info?productId=${productId}`,
  );
  return response.data; 
};

