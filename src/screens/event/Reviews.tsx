/* eslint-disable react/self-closing-comp */
// import EventSelector from '../components/Events/EventSelector/main';

import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import ReviewCard from '../../components/common/cards/ReviewCard';
import Icon from 'react-native-vector-icons/Feather';

export default function Reviews() {
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

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <ScreenHeader
        title="Reviews"
        right={
          <View className="relative">
            <Icon name="bell" size={22} color="#000" />
            <View className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
          </View>
        }
      />
      <ScrollView
        className="flex-1 m-4"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {reviews.map((item, index) => (
          <ReviewCard key={index} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
