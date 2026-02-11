export type RootStackParamList = {
  MainTabs: undefined;
  AuthStack: undefined;

  // auth screens
  Login: undefined;
  SignUp: undefined;
  SendOtp: { email?: string };

  // address
  AddressFormScreen: { initialData?: any | null };
};
