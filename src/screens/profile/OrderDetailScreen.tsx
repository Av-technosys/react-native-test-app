/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute } from '@react-navigation/native';
import ScreenHeader from '../../components/common/ScreenHeader';
import Button from '../../components/common/Button';

type OrderStackParamList = {
  OrderDetailsScreen: {
    status: string;
  };
};

type OrderDetailsRouteProp = RouteProp<
  OrderStackParamList,
  'OrderDetailsScreen'
>;

const SERVICES = [
  {
    id: '1',
    title: 'Food & Drink',
    vendor: 'XYZ',
    location: 'Malviya Nagar, Jaipur',
    desc: '150 guests • Premium menu',
    price: 150,
  },
  {
    id: '2',
    title: 'Decoration',
    vendor: 'XYZ',
    location: 'Malviya Nagar, Jaipur',
    desc: 'Premium plan',
    price: 150,
  },
  {
    id: '3',
    title: 'Venue',
    vendor: 'XYZ',
    location: 'Malviya Nagar, Jaipur',
    desc: 'Hyatt Banquet Hall',
    price: 150,
  },
];

export default function OrderDetailsScreen() {
  const route = useRoute<OrderDetailsRouteProp>();
  const { status } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Order Summary" rightType="notification" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        {/* EVENT CARD (MATCHED) */}
        <View className="flex-row rounded-2xl mb-6">
          <View className="w-36 h-36 bg-orange-400 rounded-xl items-center justify-center">
            <Feather name="gift" size={60} color="white" />
          </View>

          <View className="ml-4 flex-1">
            <Text className="font-semibold text-2xl">Piyush’s Birthday</Text>
            <Text className="text-md text-gray-500 mt-2">Jaipur</Text>
            <Text className="text-md text-gray-500 mt-1">
              Saturday, August 25, 2025
            </Text>
            <Text className="text-md text-gray-500 mt-1">
              6:00 PM – 11:00 PM
            </Text>
          </View>
        </View>
        {/* ORDER ID + STATUS */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-sm text-gray-500">Order ID: #6598569</Text>

          <Text
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'Paid'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {status}
          </Text>
        </View>
        {/* SERVICES (MATCHED STYLE) */}
        <View className="gap-6 mb-8">
          {SERVICES.map((item, index) => (
            <View
              key={index}
              className="border border-gray-200 rounded-xl px-4 py-3"
            >
              <View className="flex-row justify-between">
                <View className="flex-row gap-3">
                  <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center">
                    <Feather name="coffee" size={24} color="#2563EB" />
                  </View>

                  <View>
                    <Text className="font-semibold">{item.vendor}</Text>
                    <Text className="text-sm text-gray-500">
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-between mt-4">
                <View>
                  <Text className="font-medium">{item.title}</Text>
                  <Text className="text-sm text-gray-500">{item.desc}</Text>
                </View>

                <Text className="font-semibold text-lg text-orange-500">
                  ₹{item.price}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mb-8">
     
          <Text className="font-semibold mb-3 text-gray-900">
         
            Reviews
          </Text>
  <View className="border border-gray-200 rounded-2xl px-4 py-4 bg-white">
  {/* TOP ROW */}
  <View className="flex-row items-center justify-between mb-3">
    <View className="flex-row items-center gap-3">
      <Image
        source={{
          uri: 'https://randomuser.me/api/portraits/women/44.jpg',
        }}
        className="w-10 h-10 rounded-full"
      />

      <Text className="font-semibold text-base text-gray-900">
        Sarah Johnson
      </Text>
    </View>

    {/* RATING */}
    <View className="flex-row items-center gap-1">
      <Text className="text-yellow-400 text-base">★</Text>
      <Text className="font-semibold text-gray-900">5.0</Text>
    </View>
  </View>

  {/* COMMENT */}
  <Text className="text-sm text-gray-600 leading-6 mb-3">
    Excellent service! Michael was punctual and did an amazing job
    cleaning our house. Highly recommend!
  </Text>

  {/* TIME */}
  <Text className="text-xs text-gray-400">
    2 days ago
  </Text>
</View>

        </View>
        {/* PRICING (MATCHED SPACING) */}
        <View className="mb-8">
          <Text className="font-semibold text-lg mb-6">Pricing Breakdown</Text>

          <View className="gap-4">
            <Row label="Subtotal" value="₹10,300" />
            <Row label="Service Fee (8%)" value="₹824" />
            <Row label="Tax (10%)" value="₹1,030" />
          </View>

          <View className="flex-row justify-between mt-4 pt-3 border-t border-gray-200">
            <Text className="font-semibold text-base">Total</Text>
            <Text className="font-semibold text-base text-orange-500">
              ₹12,154
            </Text>
          </View>
        </View>
        {/* CTA (SINGLE SOURCE OF TRUTH) */}

        {status === 'Paid' ? (
          <Pressable className="border border-gray-400 rounded-2xl py-3 items-center">
            <Text className="font-semibold text-gray-800">
              Download Invoice
            </Text>
          </Pressable>
        ) : (
          <Button
            label="Pay Now"
            className="mt-4"
            onPress={() => {
              console.log('Pay Now');
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* --------- Helper Row --------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-600">{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}
