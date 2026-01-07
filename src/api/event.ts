import { privateApi } from './axios';



export const getBanners = async () => {
  const response = await privateApi.get('/event/banner');
  return response.data;
};


export const getEventTypes = async () => {
  const response = await privateApi.get('/event/event_type');
  return response.data;
};

export const getEvents = async () => {
  const response = await privateApi.get('/event');
  return response.data;
};

export const getFeaturedEvents = async () => {
  const response = await privateApi.get('/event/featured');
  return response.data;
};