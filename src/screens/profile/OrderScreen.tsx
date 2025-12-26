import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../../components/common/cards/OrderCard';
import ScreenHeader from '../../components/common/ScreenHeader';

const ORDERS = [
  {
    id: '1',
    title: "Abhash's Birthday",
    date: 'Saturday, August 25, 2025',
    time: '6:00 PM - 11:00 PM',
    venue: 'XYZ',
    location: 'Jaipur',
    status: 'Paid',
  },
  {
    id: '2',
    title: "Abhash's Birthday",
    date: 'Saturday, August 25, 2025',
    time: '6:00 PM - 11:00 PM',
    venue: 'XYZ',
    location: 'Jaipur',
    status: 'Paid',
  },
  {
    id: '3',
    title: "Abhash's Birthday",
    date: 'Saturday, August 25, 2025',
    time: '6:00 PM - 11:00 PM',
    venue: 'XYZ',
    location: 'Jaipur',
    status: 'Paid',
  },
];

export default function OrdersScreen({ navigation }: any) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <ScreenHeader title="Orders" rightType="notification" />

      {/* Orders */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {ORDERS.map(order => (
            <OrderCard
              key={order.id}
              title={order.title}
              date={order.date}
              time={order.time}
              venue={order.venue}
              location={order.location}
              status={order.status}
              onPress={() =>
                navigation.navigate('OrderDetailsScreen', {
                  status: order.status,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
