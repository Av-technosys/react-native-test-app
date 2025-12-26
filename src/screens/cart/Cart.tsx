/* eslint-disable react/self-closing-comp */
// import EventSelector from '../components/Events/EventSelector/main';

import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import NotFound from '../../components/common/notFound/CartNotFound';
import CartProductsScreen from '../../screens/cart/CartProducts'

export default function CartScreen() {
  const booking:any = 1; // 0 = empty, >0 = has items

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Cart" rightType="menu" />

      <View className="flex-1">
        {booking === 0 ? <NotFound /> : <CartProductsScreen />}
      </View>
    </SafeAreaView>
  );
}

