import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function FAQScreen() {

  
const [expandedId, setExpandedId] = useState<number | null>(null);
const [search, setSearch] = useState('');
const [lastSearch, setLastSearch] = useState('');


  const filteredFAQs = FAQ_DATA.filter(item => {
    if (!search.trim()) return true;

    const query = search.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

useEffect(() => {
  if (search !== lastSearch) {
    if (search.trim() && filteredFAQs.length > 0) {
      setExpandedId(filteredFAQs[0].id);
    } else {
      setExpandedId(null);
    }

    setLastSearch(search);
  }
}, [search, filteredFAQs, lastSearch]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
  <ScreenHeader title="FAQs" rightType="notification" showBack={true} />


      {/* SEARCH */}
      <View className="px-4 mt-3">
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-16">
          <Feather name="search" size={18} color="#000" />
          <TextInput
            placeholder="Search your question"
            placeholderTextColor="#000"   // ✅ BLACK PLACEHOLDER
            className="ml-3 flex-1 text-black text-lg"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        <Text className="text-2xl font-semibold mb-4 py-4 text-black">
          Frequently Asked Questions
        </Text>

        <View className="gap-4">
          {filteredFAQs.map(item => {
            const isOpen = expandedId === item.id;

            return (
              <View
                key={item.id}
                className="border border-gray-200 rounded-2xl bg-white"
              >
<Pressable
  onPress={() =>
    setExpandedId(isOpen ? null : item.id)
  }
  className="flex-row items-center justify-between px-4 py-4"
>

                  <Text className="text-base font-medium text-black flex-1 pr-3">
                    {item.id}. {item.question}
                  </Text>

                  <Feather
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#000"
                  />
                </Pressable>

                {isOpen && (
                  <View className="px-4 pb-4">
                    <Text className="text-gray-600 leading-6 text-sm">
                      {item.answer}
                    </Text>
                  </View>
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
    question: 'How do I reset my password?',
    answer:
      `Here are the steps:\n
1. Go to the Login page
2. Tap "Forgot Password"
3. Enter your registered email or phone
4. Check your email/SMS for the code
5. Enter the code and set a new password
6. Log in with your new password`,
  },
  {
    id: 2,
    question: 'How do I contact customer support?',
    answer:
      'You can contact support via the Help section or email us at support@example.com.',
  },
  {
    id: 3,
    question: 'What payment methods are supported?',
    answer:
      'We support UPI, Credit/Debit Cards, and Net Banking.',
  },
  {
    id: 4,
    question: 'How do I see my order history?',
    answer:
      'Go to Profile → Orders to view your order history.',
  },
  {
    id: 5,
    question: 'How do I update my profile?',
    answer:
      'Navigate to Profile → Edit Profile to update your details.',
  },
  {
    id: 6,
    question: 'How can I connect with a vendor?',
    answer:
      'You can connect with vendors through the Vendors section.',
  },
];
