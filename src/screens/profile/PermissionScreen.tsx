import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { PermissionDialog } from './PermissionDialogue';

export default function PermissionScreen({ navigation }: any) {
    const [open, setOpen] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={22} />
                    </Pressable>
                    <Text className="text-lg font-semibold">Permission</Text>
                </View>

                <View className="relative">
                    <Feather name="bell" size={22} />
                    <View className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </View>
            </View>

            {/* Permission List */}
            <View className="px-4 mt-4">
                <View className="border border-gray-300 rounded-2xl divide-y">
                    {[
                        'Location Permission',
                        'Message Permission',
                        'Contact Permission',
                    ].map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => setOpen(true)}
                            className="flex-row items-center justify-between px-4 py-4"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="h-8 w-8 rounded-full bg-gray-100 items-center justify-center">
                                    <Feather name="settings" size={16} />
                                </View>
                                <Text className="font-medium">{item}</Text>
                            </View>

                            <Feather name="chevron-right" size={18} color="#9CA3AF" />
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Permission Modal */}
            <PermissionDialog visible={open} onClose={() => setOpen(false)} />
        </SafeAreaView>
    );
}
