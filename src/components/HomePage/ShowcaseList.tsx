import { View, FlatList, Text, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import ShowCaseCard from '../common/cards/ShowcaseCard';
import Icon from 'react-native-vector-icons/Feather';
import SectionHeader from '../common/SectionHeader';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getFeaturedEvents } from '../../api/event';

const FALLBACK_IMAGE = require('../../assets/images/party.png');
const { width } = Dimensions.get('window');

export default function ShowCaseList() {
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);

      const res = await getFeaturedEvents();
      const mapped = (res.data || []).map((item: any, index: number) => ({
        number: index + 1,
        price: item.priority ?? 0,
        title: item.name,
        image: FALLBACK_IMAGE,
        description: item.description,
        eventTypeId: item.eventTypeId,
      }));

      setFeaturedEvents(mapped);
    } catch (error) {
      console.error('Failed to fetch featured events', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-8">
      <SectionHeader
        left={
          <Text className="text-2xl font-bold text-black">
            Most Popular Now 🎈
          </Text>
        }
        right={<Icon name="chevron-right" size={22} color="#666" />}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={loading ? Array.from({ length: 4 }) : featuredEvents}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) =>
          loading ? (
            <SkeletonPlaceholder borderRadius={16}>
              <View style={{ width: width * 0.75, marginRight: 12 }}>
                {/* Image */}
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={180}
                  borderRadius={16}
                />
                {/* Title */}
                <SkeletonPlaceholder.Item
                  marginTop={10}
                  width="70%"
                  height={16}
                />
                {/* Subtitle */}
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width="50%"
                  height={12}
                />
              </View>
            </SkeletonPlaceholder>
          ) : (
            <ShowCaseCard item={item} />
          )
        }
      />
    </View>
  );
}
