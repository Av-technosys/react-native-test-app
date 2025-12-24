import React from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

export default function OrderDetailsScreen({ navigation }: any) {
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            >
                {/* Event Info */}
                <View className="mb-4">
                    <Text className="text-lg font-semibold">
                        Piyush’s Birthday
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        Saturday, August 25, 2025
                    </Text>
                    <Text className="text-sm text-gray-500">
                        6:00 PM – 11:00 PM
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        XYZ • Jaipur
                    </Text>

                    <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-sm text-gray-500">
                            Orders ID: #6598569
                        </Text>
                        <Text className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                            Paid
                        </Text>
                    </View>
                </View>

                {/* Services */}
                <View className="gap-3 mb-6">
                    {[
                        { icon: 'coffee', title: 'Food & Drink', desc: '150 guests • Premium menu', price: '$4,500' },
                        { icon: 'music', title: 'DJ & Sound System', desc: '5 hours • Premium equipment', price: '$1,200' },
                        { icon: 'camera', title: 'Photography', desc: '8 hours • 2 photographers', price: '$2,800' },
                        { icon: 'feather', title: 'Decoration', desc: 'Centerpieces & ceremony arch', price: '$1,800' },
                    ].map((item, index) => (
                        <View
                            key={index}
                            className="flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="h-9 w-9 rounded-lg bg-gray-100 items-center justify-center">
                                    <Feather name={item.icon as any} size={18} />
                                </View>
                                <View>
                                    <Text className="font-medium">
                                        {item.title}
                                    </Text>
                                    <Text className="text-xs text-gray-500">
                                        {item.desc}
                                    </Text>
                                </View>
                            </View>
                            <Text className="font-semibold">
                                {item.price}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Reviews */}
                <View className="mb-6">
                    <Text className="font-semibold mb-2">Reviews</Text>

                    <View className="border border-gray-200 rounded-xl p-4">
                        <View className="flex-row items-center gap-3 mb-2">
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                                className="h-9 w-9 rounded-full"
                            />
                            <View className="flex-1">
                                <Text className="font-medium">Sarah Johnson</Text>
                                <Text className="text-xs text-gray-500">2 days ago</Text>
                            </View>
                            <Text className="text-yellow-500 font-semibold">
                                ★ 5.0
                            </Text>
                        </View>

                        <Text className="text-sm text-gray-600">
                            Excellent service! Michael was punctual and did an amazing job
                            cleaning our house. Highly recommend!
                        </Text>
                    </View>
                </View>

                {/* Pricing */}
                <View className="mb-6">
                    <Text className="font-semibold mb-3">
                        Pricing Breakdown
                    </Text>

                    {[
                        { label: 'Subtotal', value: '$10,300' },
                        { label: 'Service Fee (8%)', value: '$824' },
                        { label: 'Tax (10%)', value: '$1,030' },
                    ].map((row, idx) => (
                        <View
                            key={idx}
                            className="flex-row justify-between py-1"
                        >
                            <Text className="text-gray-600">{row.label}</Text>
                            <Text>{row.value}</Text>
                        </View>
                    ))}

                    <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-200">
                        <Text className="font-semibold text-base">Total</Text>
                        <Text className="font-semibold text-base">
                            $12,154
                        </Text>
                    </View>
                </View>

                {/* Invoice */}
                <Pressable className="border border-gray-400 rounded-xl py-3 items-center">
                    <Text className="font-medium">Download Invoice</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
