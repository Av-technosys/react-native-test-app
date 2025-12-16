import { View, Text, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type TabParamList = {
  Home: undefined;
  Categories: {
    screen: 'Categories' | 'CategoryProducts' | 'ProductDetails';
    params?: any;
  };
  Event: undefined;
  Cart: undefined;
  Profile: undefined;
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
];

export default function HomeCategoriesSection() {
  return (
    <View className="mt-3 px-4">
      <View className="mt-6">
        <FlatList
          data={categories}
          numColumns={4}
          renderItem={({ item }) => <EventItem item={item} />}
        />
      </View>
    </View>
  );
}

const EventItem = ({ item }: any) => {
  const navigation = useNavigation<NavigationProp<TabParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Categories', {
          screen: 'CategoryProducts',
        })
      }
      key={item.id}
      className="mb-6  w-[25%] px-2 py-1 items-center"
    >
      <View className=" w-full px-1">
        <View className="w-full aspect-square rounded-3xl shadow bg-orange-50 items-center justify-center">
          <Icon name={item.iconName} size={25} color="#ff6b35" />
        </View>
      </View>

      <Text className="mt-2 text-xs text-center text-gray-700">
        {item.title}
      </Text>
    </Pressable>
  );
};
