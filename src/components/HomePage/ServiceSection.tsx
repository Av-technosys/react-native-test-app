import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import ServiceCard from '../common/cards/ServiceCard';
import SectionHeader from '../common/SectionHeader';
import { getEvents } from '../../api/event';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// single fallback image
const FALLBACK_IMAGE = require('../../assets/images/service1.png');

const labels = {
  popular: 'Popular In Town',
  recent: 'Recently Added',
};

function ServiceCardSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={16}>
      <View style={{ width: 220, marginRight: 12 }}>
        {/* Image */}
        <SkeletonPlaceholder.Item width="100%" height={140} borderRadius={16} />
        {/* Title */}
        <SkeletonPlaceholder.Item marginTop={10} width="80%" height={14} />
        {/* Subtitle */}
        <SkeletonPlaceholder.Item marginTop={6} width="60%" height={12} />
        {/* Meta row */}
        <SkeletonPlaceholder.Item marginTop={8} width="40%" height={12} />
      </View>
    </SkeletonPlaceholder>
  );
}
export default function ServicesBlock() {
  const [popular, setPopular] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

const fetchEvents = async () => {
  try {
    setLoading(true);

    const res = await getEvents();
    const events = res.data || [];

    const mapped = events.map((item: any) => ({
      id: item.eventId,
      title: item.name,
      rating: '4.5',
      reviews: 0,
      price: item.minGuestCount,
      store: item.description,
      image: FALLBACK_IMAGE,
      eventDate: item.eventDate,
    }));

    setPopular(mapped.slice(0, 5));
    setRecent(mapped.slice(-5));
  } catch (error) {
    console.error('Failed to fetch events', error);
  } finally {
    setLoading(false);
  }
};


  const renderService = ({ item }: any) => (
    <ServiceCard item={item} />
  );

return (
  <View className="mt-6">

    {/* POPULAR */}
    <SectionHeader
      left={<Text className="text-2xl font-bold text-black">{labels.popular}</Text>}
    />
    {loading ? (
      <ServiceCardSkeleton />
    ) : (
      <FlatList
        horizontal
        data={popular}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    )}

 
    {/* RECENT */}
    <SectionHeader
      left={<Text className="text-2xl mt-4 font-bold text-black">{labels.recent}</Text>}
    />
    {loading ? (
      <ServiceCardSkeleton />
    ) : (
      <FlatList
        horizontal
        data={recent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    )}

  </View>
);

}
