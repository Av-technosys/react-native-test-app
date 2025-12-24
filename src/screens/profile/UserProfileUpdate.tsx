import React from 'react';
import {
    View,
    Text,
    Pressable,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

export default function ProfileEditScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <View className="flex-row items-center gap-2">
                    <Pressable>
                        <Feather name="arrow-left" size={22} />
                    </Pressable>
                    <Text className="text-lg font-semibold">Profile</Text>
                </View>

                <View className="relative">
                    <Feather name="bell" size={22} />
                    <View className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Profile Image */}
                <View className="items-center mt-6 mb-8">
                    <LinearGradient
                        colors={['#F97316', '#FACC15']}
                        className="p-1 rounded-full"
                    >
                        <View className="bg-white p-1 rounded-full">
                            <Image
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                                }}
                                className="h-28 w-28 rounded-full"
                            />
                        </View>
                    </LinearGradient>

                    <Pressable className="absolute bottom-1 right-[38%] bg-blue-600 h-7 w-7 rounded-full items-center justify-center">
                        <Feather name="plus" size={16} color="white" />
                    </Pressable>
                </View>

                {/* Form */}
                <View className="px-5 gap-4">
                    {/* Username */}
                    <View>
                        <Text className="text-sm font-semibold mb-1 text-gray-700">
                            Username
                        </Text>
                        <TextInput
                            placeholder="Michael Chen"
                            className="border border-gray-300 rounded-xl px-4 py-3"
                        />
                    </View>

                    {/* Email */}
                    <View>
                        <Text className="text-sm font-semibold mb-1 text-gray-700">
                            Email
                        </Text>
                        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 gap-2">
                            <Feather name="mail" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="xyz@gmail.com"
                                className="flex-1"
                            />
                        </View>
                    </View>

                    {/* Contact */}
                    <View>
                        <Text className="text-sm font-semibold mb-1 text-gray-700">
                            Contact No.
                        </Text>
                        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3">
                            <Feather name="phone" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="+91 XXXXXXXXXX"
                                className="flex-1 ml-2"
                            />
                            <Pressable>
                                <Text className="text-orange-500 font-semibold">
                                    Verify
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Location */}
                    <View>
                        <Text className="text-sm font-semibold mb-1 text-gray-700">
                            Location
                        </Text>
                        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 gap-2">
                            <Feather name="map-pin" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="Jaipur"
                                className="flex-1"
                            />
                        </View>
                    </View>

                    {/* Actions */}
                    <View className="flex-row gap-4 mt-6">
                        <Pressable className="flex-1 border border-orange-500 rounded-xl py-3 items-center">
                            <Text className="text-orange-500 font-semibold">
                                Cancel
                            </Text>
                        </Pressable>

                        <LinearGradient
                            colors={['#F97316', '#FACC15']}
                            className="flex-1 rounded-xl"
                        >
                            <Pressable className="py-3 items-center">
                                <Text className="text-white font-semibold">
                                    Save
                                </Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
