import { View, Text, Pressable } from 'react-native';
import ReviewCard from '../common/cards/ReviewCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
  ProductDetails: any;
};

const reviews = [
  {
    name: 'John Doe',
    daysAgo: '6 days ago',
    rating: 5,
    comment: 'Great service and quick delivery!',
    avatarColor: '#111827',
    images: [
      require('../../assets/images/event1.png'),
      require('../../assets/images/event1.png'),
      require('../../assets/images/event1.png'),
      require('../../assets/images/event1.png'),
    ],
  },
  {
    name: 'Jane Smith',
    daysAgo: '6 days ago',
    rating: 5,
    comment: 'Loved the quality of products.',
    avatarColor: '#020617',
    images: [
      require('../../assets/images/event2.png'),
      require('../../assets/images/event2.png'),
      require('../../assets/images/event2.png'),
      require('../../assets/images/event2.png'),
    ],
  },
];

export default function CustomerReviewsSection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="mt-6 px-4">
      {/* HEADER */}
      <View className="flex-row mb-6 justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-black">
            Customer Reviews
          </Text>
          <Text className="text-lg mt-1 text-gray-400">
            What our customers say
          </Text>
        </View>

        <Pressable
          onPress={() => {
            navigation.getParent()?.navigate('FlowStack', {
              screen: 'reviews',
            });
          }}
        >
          <Text className="text-lg text-gray-500">See All</Text>
        </Pressable>
      </View>

      {/* REVIEWS */}
      {reviews.map((item, index) => (
        <ReviewCard key={index} {...item} />
      ))}
    </View>
  );
}
