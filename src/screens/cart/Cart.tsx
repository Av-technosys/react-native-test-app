/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import NotFound from '../../components/common/notFound/NotFound';
import CartProductsScreen from '../../screens/cart/CartProducts';
import Toast from 'react-native-toast-message';

import { fetchCartItems, deleteCartItem } from '../../api/cart';

export default function CartScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetchCartItems();
      setItems(res.items ?? []);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load cart',
      });
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (bookingDraftId: number) => {
  try {
    setItems(prev =>
      prev.filter(i => i.bookingDraftId !== bookingDraftId)
    );

    await deleteCartItem(bookingDraftId);

    Toast.show({
      type: 'success',
      text1: 'Item removed from cart',
    });
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: 'Failed to remove item',
    });

    loadCart();
    throw err; // IMPORTANT for modal to stop loading
  }
};


  const hasItems = items.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Cart" rightType="menu" showBack={false} />

      <View className="flex-1">
        {!loading && !hasItems ? (
          <NotFound
            title="Oops! No Booking yet"
            description="It seems that you’ve got a blank state. We’ll let you know when updates arrive!"
            ctaLabel="Book Now Event"
            navigateTo={{ parent: 'MainTabs', screen: 'Event' }}
          />
        ) : (
          <CartProductsScreen
            loading={loading}
            orders={items}
            onDelete={handleDelete}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
