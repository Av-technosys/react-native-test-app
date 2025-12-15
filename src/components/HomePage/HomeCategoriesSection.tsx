/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Categories: any;
};

const categories = [
  { id: '1', title: 'Bar Tender', iconName: 'bar-chart-2' },
  { id: '2', title: 'Cake', iconName: 'cake' },
  { id: '3', title: 'Decor', iconName: 'package' },
  { id: '4', title: 'Photography', iconName: 'camera' },
  { id: '5', title: 'Artist', iconName: 'palette' },
  { id: '6', title: 'Music', iconName: 'music' },
  { id: '7', title: 'Lightning', iconName: 'zap' },
  { id: '8', title: 'Kids Activity', iconName: 'users' },
  { id: '9', title: 'Face Painting', iconName: 'smile' },
  { id: '10', title: 'Magicians', iconName: 'wand-2' }
];

export default function HomeCategoriesSection() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View className="mt-3 px-4">
      <View className="mt-6 flex-row flex-wrap justify-between">
        {categories.map(item => (
          <Pressable
            key={item.id}
            className="w-[19%] mb-6 items-center "
            onPress={() => navigation.navigate('Categories')}
          >
            <View className="w-20 h-20 rounded-full bg-orange-50 items-center justify-center">
              <Icon name={item.iconName} size={28} color="#ff6b35" />
            </View>

            <Text className="mt-2 text-[10px] text-center text-gray-700">
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const EventItem = ({ item }: any) => {
  return (
    <View key={item.id} className="mb-6  w-[25%] px-2 py-1 items-center">
      <View className=" w-full px-1">
        <View className="w-full aspect-square rounded-3xl shadow bg-orange-50 items-center justify-center">
          <Icon name={item.iconName} size={25} color="#ff6b35" />
        </View>
      </View>

      <Text className="mt-2 text-xs text-center text-gray-700">
        {item.title}
      </Text>
    </View>
  );
};
