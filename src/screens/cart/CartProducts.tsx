/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import OrderCard from '../../components/common/cards/OrderCard';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  orders: any[];
  loading: boolean;
  onDelete: (bookingDraftId: number) => Promise<void>;
};

function OrderCardSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={16}>
      <View style={{ padding: 16, borderRadius: 16 }}>
        <View style={{ width: '70%', height: 18 }} />
        <View style={{ marginTop: 8, width: '40%', height: 14 }} />
        <View style={{ marginTop: 6, width: '55%', height: 14 }} />
      </View>
    </SkeletonPlaceholder>
  );
}

export default function CartProductsScreen({
  orders,
  loading,
  onDelete,
}: Props) {


  const navigation = useNavigation();

  const [confirmDeleteId, setConfirmDeleteId] =
    useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      setDeleting(true);
      await onDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
          paddingTop: 30,
        }}
      >
        <View className="gap-4">
          {loading
            ? [1, 2, 3 , 4].map(i => <OrderCardSkeleton key={i} />)
          :orders.map(order => {
  const start = new Date(order.raw?.startTime ?? order.startTime);

  const datePart = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(start);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(start);

  return (
    <OrderCard
      key={order.id}
      title={order.title}
      venue={`${datePart} • ${timePart}`}
      status={order.status}
      variant="compact"
      onPress={() =>
        navigation.getParent()?.navigate('FlowStack', {
          screen: 'CartProductDetail',
          params: { bookingDraftId: order.id }
        })
      }
      onDelete={() => setConfirmDeleteId(order.id)}
    />
  );
})
}
        </View>
      </ScrollView>

      {/* DELETE CONFIRM MODAL */}
      <Modal
        visible={confirmDeleteId !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white w-[85%] rounded-2xl p-5">
            <Text className="text-lg font-semibold text-black mb-2">
              Delete Booking
            </Text>

            <Text className="text-gray-600 mb-5">
              Are you sure you want to delete this booking?
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                disabled={deleting}
                onPress={() => setConfirmDeleteId(null)}
                className="flex-1 border border-gray-300 rounded-xl py-3 items-center"
              >
                <Text className="text-gray-700 font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={deleting}
                onPress={confirmDelete}
                className="flex-1 bg-red-500 rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">
                  {deleting ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
