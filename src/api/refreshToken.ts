import axios from 'axios';
import { tokenStorage } from '../api/services/tokenStorage';

const BASE_URL ='https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1';

export const refreshIdToken = async () => {

  console.log('he is calling to refersh')
  const refreshToken = await tokenStorage.getRefreshToken();
  const username = await tokenStorage.getUsername();


  if (!refreshToken || !username) {
    throw new Error('Missing refresh credentials');
  }

  const { data } = await axios.post(
    `${BASE_URL}/auth/refresh_token`,
    { refreshToken, username },
  );
  const newIdToken =
    data?.response?.AuthenticationResult?.IdToken;

  if (!newIdToken) {
    throw new Error('Invalid refresh response');
  }

  await tokenStorage.setIdToken(newIdToken);
  return newIdToken;
};
