/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import OrderCard from '../../components/common/cards/OrderCard';
import { useNavigation } from '@react-navigation/native';





export default function CartProductScreen() {
    const ORDERS = [
    {
      id: '1',
      title: 'Abhash’s Birthday',
      location: 'Jaipur',
      date: 'Saturday, August 25, 2025',
    },
    {
      id: '2',
      title: 'Piyush’s Birthday',
      location: 'Jaipur',
      date: 'Saturday, August 25, 2025',
    },
  ];

  
  const navigation = useNavigation();
  const [orders, setOrders] = useState(ORDERS);

const handleDelete = (id: string) => {
  Alert.alert(
    'Delete booking',
    'Are you sure you want to delete this booking?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setOrders(prev => prev.filter(o => o.id !== id)),
      },
    ]
  );
};


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingBottom: 40, paddingTop: 30 }}
    >
      <View className="gap-4">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            title={order.title}
            location={order.location}
            date={order.date}
            variant="compact"
            onPress={() =>
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'CartProductDetail',
              })
            }
            onDelete={() => handleDelete(order.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
