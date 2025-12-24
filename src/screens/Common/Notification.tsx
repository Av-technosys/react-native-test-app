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

type Notification = {
    id: string;
    title: string;
    description: string;
    time: string;
    unreadCount?: number;
    iconBg: string;
};

const TODAY: Notification[] = [
    {
        id: '1',
        title: 'Reminder for your meetings',
        description: 'Learn more about managing account info and activity',
        time: '9min ago',
        unreadCount: 2,
        iconBg: 'bg-green-100',
    },
    {
        id: '2',
        title: 'Robert mention you!',
        description: 'Learn more about managing account info and activity',
        time: '14min ago',
        iconBg: 'bg-yellow-100',
    },
    {
        id: '3',
        title: 'Reminder for your serial',
        description: 'Learn more about managing account info and activity',
        time: '9min ago',
        unreadCount: 2,
        iconBg: 'bg-red-100',
    },
];

const YESTERDAY: Notification[] = [
    {
        id: '4',
        title: 'Reminder for your serial',
        description: 'Looking forward to it',
        time: '9min ago',
        unreadCount: 2,
        iconBg: 'bg-green-100',
    },
    {
        id: '5',
        title: 'Reminder for your serial',
        description: 'Learn more about managing account info and activity',
        time: '14min ago',
        iconBg: 'bg-yellow-100',
    },
    {
        id: '6',
        title: 'Reminder for your serial',
        description: 'Learn more about managing account info and activity',
        time: '9min ago',
        unreadCount: 2,
        iconBg: 'bg-red-100',
    },
];

export default function NotificationsScreen({
    navigation,
    hasNotifications = true,
}: {
    navigation: any;
    hasNotifications?: boolean;
}) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={22} />
                    </Pressable>
                    <Text className="text-lg font-semibold">Notifications</Text>
                </View>
            </View>

            {/* Empty State */}
            {!hasNotifications && (
                <View className="flex-1 items-center justify-center px-6">
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/726/726448.png',
                        }}
                        className="h-32 w-32 mb-6"
                    />
                    <Text className="text-lg font-semibold mb-2">
                        Oops! No notifications yet
                    </Text>
                    <Text className="text-gray-500 text-center">
                        It seems that you’ve got a blank state. We’ll let you
                        know when updates arrive!
                    </Text>
                </View>
            )}

            {/* Notifications List */}
            {hasNotifications && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
                >
                    {/* Today */}
                    <Text className="text-sm text-gray-500 mb-3">
                        Today
                    </Text>

                    <View className="gap-3 mb-6">
                        {TODAY.map((item) => (
                            <NotificationItem key={item.id} item={item} />
                        ))}
                    </View>

                    {/* Yesterday */}
                    <Text className="text-sm text-gray-500 mb-3">
                        Yesterday
                    </Text>

                    <View className="gap-3">
                        {YESTERDAY.map((item) => (
                            <NotificationItem key={item.id} item={item} />
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

/* ---------------------------------- */
/* Notification Card */
/* ---------------------------------- */

function NotificationItem({ item }: { item: Notification }) {
    return (
        <View className="flex-row items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            {/* Icon */}
            <View
                className={`h-10 w-10 rounded-full items-center justify-center ${item.iconBg}`}
            >
                <Feather name="bell" size={18} />
            </View>

            {/* Content */}
            <View className="flex-1">
                <View className="flex-row justify-between">
                    <Text className="font-medium flex-1 pr-2">
                        {item.title}
                    </Text>
                    <Text className="text-xs text-gray-400">
                        {item.time}
                    </Text>
                </View>

                <Text className="text-sm text-gray-500 mt-1">
                    {item.description}
                </Text>
            </View>

            {/* Badge */}
            {item.unreadCount && (
                <View className="h-5 w-5 rounded-full bg-orange-500 items-center justify-center">
                    <Text className="text-white text-xs font-semibold">
                        {item.unreadCount}
                    </Text>
                </View>
            )}
        </View>
    );
}
