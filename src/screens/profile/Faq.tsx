import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

export default function FAQScreen() {
    const [expandedId, setExpandedId] = useState<number | null>(1);
    const [search, setSearch] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                <View className="flex-row items-center gap-2">
                    <Pressable>
                        <Feather name="arrow-left" size={22} />
                    </Pressable>
                    <Text className="text-lg font-semibold">FAQs</Text>
                </View>

                <View className="relative">
                    <Feather name="bell" size={22} />
                    <View className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                </View>
            </View>

            {/* Search */}
            <View className="px-4 py-3">
                <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2">
                    <Feather name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        placeholder="Search your question"
                        className="ml-2 flex-1 text-gray-700"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
            >
                <Text className="text-base font-semibold mb-3">
                    Frequently Asked Questions
                </Text>

                <View className="gap-3">
                    {FAQ_DATA.map((item) => {
                        const isOpen = expandedId === item.id;

                        return (
                            <View
                                key={item.id}
                                className="border border-gray-300 rounded-xl px-4 py-3"
                            >
                                <Pressable
                                    onPress={() =>
                                        setExpandedId(isOpen ? null : item.id)
                                    }
                                    className="flex-row items-center justify-between"
                                >
                                    <Text className="font-medium flex-1 pr-2">
                                        {item.id}. {item.question}
                                    </Text>
                                    <Feather
                                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                                        size={18}
                                        color="#6B7280"
                                    />
                                </Pressable>

                                {isOpen && (
                                    <Text className="text-gray-600 mt-3 leading-6">
                                        {item.answer}
                                    </Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

type FAQItem = {
    id: number;
    question: string;
    answer: string;
};



const FAQ_DATA: FAQItem[] = [
    {
        id: 1,
        question: 'How do i reset my password ?',
        answer:
            `Here are the step-by-step instructions you can give for that line:\n
1. Go to the Login Page.
2. Click on "Forgot Password" below the login form.
3. Enter your registered email address or phone number.
4. Check your inbox (or SMS) for a password reset link/code.
5. Click the link or enter the code on the reset page.
6. Create a new password and confirm it.
7. Click "Submit" to save your new password.
8. Now, log in using your new password.`,
    },
    {
        id: 2,
        question: 'How do i contact customer support ?',
        answer: 'You can contact customer support via the Help section or email us at support@example.com.',
    },
    {
        id: 3,
        question: 'What payment method do you use ?',
        answer: 'We support UPI, Credit/Debit Cards, and Net Banking.',
    },
    {
        id: 4,
        question: 'How do i see order history',
        answer: 'Go to Profile → Orders to view your complete order history.',
    },
    {
        id: 5,
        question: 'How do i update my profile ?',
        answer: 'Navigate to Profile → Edit Profile and update your details.',
    },
    {
        id: 6,
        question: 'How can i connect vendor ?',
        answer: 'You can connect with vendors from the Vendors section in the app.',
    },
];
