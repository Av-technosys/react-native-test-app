/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import ScreenHeader from '../../components/common/ScreenHeader';
import Button from '../../components/common/Button';
import { OrderCardSkeleton } from '../../screens/profile/ManageBookings';
import { fetchBookingbyId } from '../../api/booking';

/* ---------------- Navigation Types ---------------- */
type OrderStackParamList = {
  OrderDetailsScreen: {
    bookingId: string;
    status: string;
  };
};

type OrderDetailsRouteProp = RouteProp<OrderStackParamList, 'OrderDetailsScreen'>;

/* ---------------- Component ---------------- */
export default function OrderDetailsScreen() {
  const route = useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const { bookingId } = route.params;

  const [loading, setLoading] = useState(true);
  const [bookingItems, setBookingItems] = useState<any[]>([]);

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchBookingbyId(bookingId);
        console.log(res)
        setBookingItems(res.data);
      } catch (err) {
        console.error('Failed to fetch booking details', err);
      } finally {
        setLoading(false);
      }
    };
    loadBookingDetails();
  }, [bookingId]);

  /* ---------------- Derived Data ---------------- */
  const booking = bookingItems[0];


  const isPaid = booking?.paymentStatus === 'PAID';

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        
        <ScreenHeader title="Order Summary" showBack />
        <View className="p-6 gap-4">
          <OrderCardSkeleton />
          <OrderCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  /* ---------------- Render ---------------- */
  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      <ScreenHeader
        title="Order Details"
        rightType="notification"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* -------- HEADER CARD -------- */}
        <View className="bg-white mx-5 mt-6 rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
          <View className="flex-row items-start">
            <View className="w-20 h-20 bg-orange-400 rounded-2xl items-center justify-center shadow-md">
              <Feather name="gift" size={32} color="white" />
            </View>

            <View className="ml-4 flex-1">
              <View className="flex-row justify-between items-start">
                <Text className="font-bold text-2xl text-gray-900 flex-1" numberOfLines={2}>
                  {booking?.contactName || 'N/A'}
                </Text>

                <View className={`px-4 py-1.5 rounded-full ${isPaid ? 'bg-green-100' : 'bg-amber-100'}`}>
                  <Text className={`font-semibold ${isPaid ? 'text-green-700' : 'text-amber-700'}`}>
                    {isPaid ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </View>

              <Text className="text-sm text-gray-500 mt-2">
                Order #{bookingId}
              </Text>

              {booking?.startTime && (
                <View className="mt-4">
                  <View className="flex-row items-center">
                    <Feather name="calendar" size={16} color="#6B7280" />
                    <Text className="ml-2 text-gray-700 font-medium">
                      {new Date(booking.startTime).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>

                  <View className="flex-row items-center mt-2">
                    <Feather name="clock" size={16} color="#6B7280" />
                    <Text className="ml-2 text-gray-700 font-medium">
                      {new Date(booking.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} - {new Date(booking.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* -------- SERVICES SECTION -------- */}
        <View className="mx-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">
              Services ({bookingItems.length})
            </Text>
          </View>

          <View className="gap-3">
            {bookingItems.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-gray-100"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-start flex-1">
                    <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                      <Feather name="coffee" size={20} color="#2563EB" />
                    </View>

                    <View className="flex-1">
                      <Text className="font-semibold text-gray-900 text-lg">
                        {item.productName}
                      </Text>
                      {item.minGuestCount && (
                        <Text className="text-sm text-gray-500 mt-1">
                          Guests: {item.minGuestCount} - {item.maxGuestCount}
                        </Text>
                      )}
                    </View>
                  </View>

                  <Text className="font-bold text-orange-500 text-lg">
                    ₹{item.productPrice || '0.00'}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 px-3 py-1.5 rounded-lg">
                      <Text className="text-gray-700 font-medium">
                        Qty: {item.quantity || 1}
                      </Text>
                    </View>
                  </View>

                  <View className="px-3 py-1.5 rounded-lg bg-amber-50">
                    <Text className="text-amber-700 font-medium">
                      {item.bookingStatus || 'HOLD'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* -------- PRICING BREAKDOWN -------- */}
        <View className="mx-5 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Pricing Breakdown
          </Text>

          {/* <View className="bg-white rounded-2xl p-5 border border-gray-100">
            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Subtotal</Text>
                <Text className="text-gray-900">₹{pricing.subtotal.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Service Fee</Text>
                <Text className="text-gray-600">₹{pricing.serviceFee.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">Tax</Text>
                <Text className="text-gray-600">₹{pricing.tax.toFixed(2)}</Text>
              </View>
            </View>

            <View className="h-[1px] bg-gray-200 my-4" />

            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-lg text-gray-900">Total Amount</Text>
              <Text className="font-bold text-2xl text-orange-500">
                ₹{pricing.total.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row items-center mt-4">
              <Feather name="info" size={16} color="#6B7280" />
              <Text className="ml-2 text-sm text-gray-500">
                Includes all taxes and service charges
              </Text>
            </View>
          </View> */}
        </View>

        {/* -------- REVIEWS CARD -------- */}
        <View className="mx-5 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Reviews & Feedback
          </Text>

          <Pressable
            onPress={() =>
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'AddReviewsScreen',
                params: {
                  eventId: bookingId,              // 👈 event identity
                  productIds: bookingItems.map(b => b.productId), // 👈 product identities
                },
              })
            }
            className="bg-orange-50 rounded-2xl p-5 border border-orange-200"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Feather name="star" size={20} color="#f97316" />
                  <Text className="ml-2 font-bold text-lg text-orange-600">
                    Share Your Experience
                  </Text>
                </View>
                <Text className="text-sm text-orange-700">
                  Rate this event and help us improve our services
                </Text>
              </View>

              <View className="w-12 h-12 bg-white rounded-xl items-center justify-center">
                <Feather name="chevron-right" size={24} color="#f97316" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* -------- ACTION BUTTONS -------- */}
        <View className="mx-5">
          {isPaid ? (
            <Pressable className="flex-row items-center justify-center bg-white border border-gray-300 rounded-2xl py-4">
              <Feather name="download" size={20} color="#374151" />
              <Text className="ml-3 font-semibold text-gray-800 text-lg">
                Download Invoice
              </Text>
            </Pressable>
          ) : (
            <Button
              label="Pay Now"
              variant="primary"
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }} />
          )}

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}