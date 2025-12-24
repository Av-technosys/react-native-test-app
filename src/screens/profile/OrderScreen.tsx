import React from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

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
            <View className="flex-row items-center justify-between px-4 py-3">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={22} />
                    </Pressable>
                    <Text className="text-lg font-semibold">Orders</Text>
                </View>

                <View className="relative">
                    <Feather name="bell" size={22} />
                    <View className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </View>
            </View>

            {/* Orders */}
            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4">
                    {ORDERS.map((order) => (
                        <Pressable
                            key={order.id}
                            onPress={() => navigation.navigate('OrderDetailsScreen')}
                            className="flex-row rounded-2xl shadow-sm bg-white border border-gray-200 overflow-hidden"
                        >
                            {/* Left Icon */}
                            <View className="w-16 items-center justify-center bg-orange-300">
                                <Feather name="gift" size={24} color="white" />
                            </View>

                            {/* Content */}
                            <View className="flex-1 px-4 py-3">
                                <Text className="font-semibold text-base">
                                    {order.title}
                                </Text>
                                <Text className="text-xs text-gray-500 mt-1">
                                    {order.date}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    {order.time}
                                </Text>
                                <Text className="text-xs text-gray-500 mt-1">
                                    {order.venue} • {order.location}
                                </Text>
                            </View>

                            {/* Status */}
                            <View className="w-8 items-center justify-center bg-green-100">
                                <Text
                                    className="text-green-600 text-xs font-semibold rotate-90"
                                >
                                    Paid
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
