import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import OrderCard from '../../components/common/cards/OrderCard';
import { fetchBookings } from '../../api/booking';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  variant?: 'default' | 'compact';
};

export default function ManageBookings({ navigation }: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadBookings(1);
  }, []);

  const loadBookings = async (pageNumber = 1) => {
    if (loading || loadingMore) return;

    pageNumber === 1 ? setLoading(true) : setLoadingMore(true);

    try {
      const res = await fetchBookings();
      console.log(res);

      const mappedOrders = res.data.map((item: any) => ({
        id: String(item.id),
        price: item.productPrice,
        title: item.productName,
        venue: item.contactName,
        status: item.bookingStatus,
      }));

      setOrders(prev =>
        pageNumber === 1 ? mappedOrders : [...prev, ...mappedOrders]
      );

      setHasMore(pageNumber < res.pagination.total_pages);
      setPage(pageNumber);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Cart" rightType="menu" showBack={true} />

      {loading ? (
        <View className="gap-4 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderCard
              title={item.title}
              price={item.price}
              venue={item.venue}
              status={item.status}
              onPress={() =>
                navigation.navigate('OrderDetailsScreen', {
                  bookingId: item.id,
                  status: item.status,
                })
              }
            />
          )}
          onEndReached={() => {
            if (hasMore && !loadingMore) {
              loadBookings(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ marginTop: 16 }} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

export function OrderCardSkeleton({ variant = 'default' }: Props) {
  return (
    <SkeletonPlaceholder>
      {variant === 'compact' ? (
        /* -------- COMPACT VARIANT -------- */
        <View style={{ borderRadius: 16, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', padding: 16 }}>
            {/* ICON */}
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                marginRight: 16,
              }}
            />

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: '70%',
                  height: 14,
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              />
              <View
                style={{
                  width: '50%',
                  height: 12,
                  borderRadius: 4,
                  marginBottom: 6,
                }}
              />
              <View
                style={{
                  width: '40%',
                  height: 12,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        /* -------- DEFAULT VARIANT -------- */
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* LEFT ICON STRIP */}
          <View style={{ width: 64, height: 80 }} />

          {/* CONTENT */}
          <View style={{ flex: 1, padding: 12 }}>
            <View
              style={{
                width: '60%',
                height: 14,
                borderRadius: 4,
                marginBottom: 8,
              }}
            />
            <View
              style={{
                width: '40%',
                height: 12,
                borderRadius: 4,
                marginBottom: 6,
              }}
            />
            <View
              style={{
                width: '70%',
                height: 12,
                borderRadius: 4,
              }}
            />
          </View>

          {/* STATUS STRIP */}
          <View style={{ width: 40 }} />
        </View>
      )}
    </SkeletonPlaceholder>
  );
}