import { View, Text, FlatList, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getEventTypes } from '../../api/event'; 
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions } from 'react-native';


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

const FALLBACK_ICON = 'calendar';

function CategoriesSkeleton() {
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = (width - 32) / 4; // 4 columns, px-4 = 16*2

  return (
    <View className="mt-6 px-4">
      <SkeletonPlaceholder
        backgroundColor="#ECECEC"
        highlightColor="#F5F5F5"
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={i}
              style={{
                width: ITEM_WIDTH,
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              {/* CATEGORY BOX */}
              <SkeletonPlaceholder.Item
                width={ITEM_WIDTH - 16}
                height={ITEM_WIDTH - 16}
                borderRadius={24}
              />

              {/* LABEL */}
              <SkeletonPlaceholder.Item
                marginTop={10}
                width={(ITEM_WIDTH - 16) * 0.7}
                height={12}
                borderRadius={6}
              />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}


export default function HomeCategoriesSection() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      setLoading(true);

      const res = await getEventTypes();

      const mapped = res.data.map((item: any) => ({
        ...item,
        iconName: FALLBACK_ICON, // event-matched fallback
      }));

      setEvents(mapped);
    } catch (error) {
      console.error('Failed to fetch event types', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CategoriesSkeleton />;
  }

  if (!events.length) {
    return (
      <View className="mt-6 px-4">
        <Text className="text-center text-gray-400">
          No event types found
        </Text>
      </View>
    );
  }

  return (
    <View className="mt-3 px-4">
      <View className="mt-6">
        <FlatList
          data={events}
          numColumns={4}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventItem item={item} />}
          ListEmptyComponent={
            !loading ? (
              <Text className="text-center text-gray-400">
                No event types found
              </Text>
            ) : null
          }
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
        navigation.getParent()?.navigate('FlowStack', {
          screen: 'CategoryProducts',
          params: {
            eventTypeId: item.id,
            eventName: item.name,
          },
        })
      }
      className="mb-6 w-[25%] px-2 py-1 items-center"
    >
      <View className="w-full px-1">
        <View className="w-full aspect-square rounded-3xl shadow bg-orange-50 items-center justify-center">
          <Icon name={item.iconName} size={25} color="#ff6b35" />
        </View>
      </View>

      <Text
        numberOfLines={2}
        className="mt-2 text-xs text-center text-gray-700"
      >
        {item.name}
      </Text>
    </Pressable>
  );
};
