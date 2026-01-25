/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { View, Text, Image, Pressable } from 'react-native';
import EventProductCard from '../../common/cards/EventProductCard';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../common/forms/FilterForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addProduct, removeProduct } from '../../../store/slices/eventSlice';
import { useNavigation } from '@react-navigation/native';
import {
  getProductsByProductTypeId,
  getProductTypes,
} from '../../../api/product';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { deleteEventItem, saveInBookingDraft } from '../../../api/event';
import  {addItemToBooking, createBooking}  from '../../../api/booking';
import { TimePickerModal } from 'react-native-paper-dates';
import dayjs from 'dayjs';
import { showAndroidToast } from '../../toast/androidToast';
type Step = {
  id: number;
  key: string;
  label: string;
};

type StepStatus = 'initial' | 'green' | 'yellow' | 'red';

export default function EventProductSection() {
  const navigation = useNavigation();
  const eventId = useAppSelector(state => state.event.eventId);
const bookingDetails = useAppSelector(
  state => state.event.bookingDetails
);
const selections = useAppSelector(
  state => state.event.selections
);

  const [steps, setSteps] = useState<Step[]>([]);
  const filterSheetRef = useRef<BottomSheet>(null);
  const [activeStep, setActiveStep] = useState<string>('');
  const insets = useSafeAreaInsets();
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;
  const [enabledSteps, setEnabledSteps] = useState<string[]>([]);
  const [tempEnabledSteps, setTempEnabledSteps] = useState<string[]>([]);
const [showAddProductModal, setShowAddProductModal] = useState(false);
const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
const [startTime, setStartTime] = useState<Date | null>(null);
const [endTime, setEndTime] = useState<Date | null>(null);

const [showStartPicker, setShowStartPicker] = useState(false);
const [showEndPicker, setShowEndPicker] = useState(false);

const [quantity, setQuantity] = useState(1);

  const activeProductTypeId = steps.find(step => step.key === activeStep)?.id;


  const removeProductFromDraft = async (eventItemId: number) => {
  if (!eventItemId) {
    console.warn('eventItemId missing, skipping draft delete');
    return;
  }

  try {
    await deleteEventItem(eventItemId);
  } catch (error) {
    console.error('Failed to remove booking draft', error);
  }
};


const handleConfirmAddProduct = async () => {
  if (!eventId || !selectedProductId) {
   showAndroidToast('Missing event or product information.');
    return;
  }

  if (!startTime || !endTime) {
    showAndroidToast('Please select start and end times.');
    return;
  }

  try {
    await saveInBookingDraft({
      eventId,
      productId: selectedProductId,
      quantity,
      startTime,
      endTime,
    });

    dispatch(
      addProduct({
        step: activeStep,
        productId: selectedProductId,
      }),
    );

    setShowAddProductModal(false);
  } catch (error) {
    console.error(error);
   showAndroidToast('Failed to add product. Please try again.');
  }
};



  const fetchProducts = useCallback(
    async (productTypeId: number, pageNumber: number) => {
      setLoading(prev => {
        if (prev) return prev; // already loading
        return true;
      });

      try {
        const res = await getProductsByProductTypeId(
          productTypeId,
          pageNumber,
          PAGE_SIZE,
        );

        const newProducts = res.data ?? [];

        setProducts(prev =>
          pageNumber === 1 ? newProducts : [...prev, ...newProducts],
        );


        setHasMore(pageNumber < res.pagination.total_pages);
        setPage(pageNumber);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!activeProductTypeId) return;

    setProducts([]);
    setPage(1);
    setHasMore(true);

    fetchProducts(activeProductTypeId, 1);
  }, [activeProductTypeId, fetchProducts]);

  const loadMore = () => {
    if (!hasMore || loading || !activeProductTypeId) return;
    fetchProducts(activeProductTypeId, page + 1);
  };

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const res = await getProductTypes();

        const apiSteps: Step[] = res.data.map((item: any) => ({
          id: item.id,
          key: item.name,
          label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        }));

        setSteps(apiSteps);

        const keys = apiSteps.map(s => s.key);

        const initialEnabled = keys.slice(0, 4);

        setEnabledSteps(initialEnabled);
        setTempEnabledSteps(initialEnabled);
        setActiveStep(initialEnabled[0]);
      } catch (error) {
        console.error('Failed to fetch product types', error);
      }
    };

    loadProductTypes();
  }, []);

  useEffect(() => {
    if (!steps.length) return;

    type SelectionsState = Record<string, string[]>;

    const initialStatus: Record<string, StepStatus> = {};
    steps.forEach(step => {
      initialStatus[step.key] = 'initial';
    });

    setStepStatus(initialStatus);
  }, [steps]);

  const STEPS = steps.filter(step => enabledSteps.includes(step.key));

  const [showServiceModal, setShowServiceModal] = useState(false);

  const dispatch = useAppDispatch();

  const activeIndex = STEPS.findIndex(
    (s: { key: string }) => s.key === activeStep,
  );
  const isLastStep = activeIndex === STEPS.length - 1;


  const handleContinue = async () => {
  const currentSelections = selections[activeStep] ?? [];
  const hasItems = currentSelections.length > 0;

  setStepStatus(prev => ({
    ...prev,
    [activeStep]: hasItems ? 'green' : 'red',
  }));

  if (!isLastStep) {
    setActiveStep(STEPS[activeIndex + 1].key);
    return;
  }

  try {
    if (!bookingDetails) {
      throw new Error('Booking details missing');
    }


    const bookingRes = await createBooking({
      eventTypeId: bookingDetails.eventTypeId,
      source: 'EVENT',
      contactName: bookingDetails.contactName,
      contactNumber: bookingDetails.contactNumber,
      description: bookingDetails.description,
      startTime: bookingDetails.startTime,
      endTime: bookingDetails.endTime,
      minGuestCount: bookingDetails.minGuestCount,
      maxGuestCount: bookingDetails.maxGuestCount,
      latitude: bookingDetails.latitude,
      longitude: bookingDetails.longitude,
    });

    const bookingId = bookingRes.data.bookingId;

const allProductIds = Object.values(selections).flat();

const bookingItems = allProductIds.map(productId => ({
  productId,
  quantity: 1,
  contactName: bookingDetails.contactName,
  contactNumber: bookingDetails.contactNumber,
  startTime: bookingDetails.startTime,
  endTime: bookingDetails.endTime,
  minGuestCount: bookingDetails.minGuestCount,
  maxGuestCount: bookingDetails.maxGuestCount,
  latitude: bookingDetails.latitude,
  longitude: bookingDetails.longitude,
}));

console.log('sending payload to db', {
  bookingId,
  items: bookingItems,
})
await addItemToBooking({
  bookingId,
  items: bookingItems,
});

    // 4️⃣ NAVIGATE
    navigation.getParent()?.navigate('FlowStack', {
      screen: 'TestingPayment',

    });
  } catch (error: any) {
   showAndroidToast('Failed to create booking. Please try again.');
  }
};

  const handleSkip = () => {
    const currentSelections = selections[activeStep] ?? [];

    setStepStatus(prev => ({
      ...prev,
      [activeStep]: currentSelections.length > 0 ? 'green' : 'red',
    }));
    const next = STEPS[activeIndex + 1];
    setActiveStep(next.key);
  };

  const S3_BASE_URL = 'https://freaky-files.s3.ap-south-1.amazonaws.com';

  return (
    <>
    <View className="flex-1 bg-white">
      {/* HEADER SECTION */}
      <View className="flex-row items-center justify-between gap-2 mx-3 pt-2">
        {/* STEPS BAR */}
        <View className="flex-row items-center justify-between bg-white p-2 flex-1">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 12,
            }}
          >
            {STEPS.map((step, index) => (
              <Pressable
                key={step.key}
                onPress={() => setActiveStep(step.key)}
                className="flex-row items-center"
              >
                <Text
                  className={`text-md font-semibold ${
                    step.key === activeStep
                      ? 'text-yellow-500 underline'
                      : stepStatus[step.key] === 'green'
                        ? 'text-green-600'
                        : stepStatus[step.key] === 'red'
                          ? 'text-red-500'
                          : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </Text>

                {index < STEPS.length - 1 && (
                  <Text className="mx-2 text-gray-700">{'>'}</Text>
                )}
              </Pressable>
            ))}
          </ScrollView>
          {/* FILTER ICON */}
          <Pressable
            onPress={() => filterSheetRef.current?.expand()}
            className="ml-3"
          >
            <Feather name="sliders" size={20} color="#00000" />
          </Pressable>
        </View>

        {/* PLUS BUTTON */}
        <Pressable
          onPress={() => {
            setTempEnabledSteps(enabledSteps);
            setShowServiceModal(true);
          }}
          className="ml-3 w-9 h-9 rounded-full bg-orange-500 items-center justify-center shadow"
        >
          <AntDesign name="plus" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* MAIN CONTENT - Takes all available space */}
      <View style={{ flex: 1, minHeight: '100%' }}>
        {loading && products.length === 0 ? (
          <ProductSkeleton />
        ) : products.length === 0 ? (
          <EmptyProductsState />
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.productId.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 16, // Keep enough padding for bottom buttons
            }}
            onEndReached={() => {
              if (products.length > 0) loadMore();
            }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <EventProductCard
                id={item?.productId}
                title={item.title}
                guests={`${item.minQuantity ?? 1} - ${item.maxQuantity ?? '∞'}`}
                menuType={item.pricingType}
                rating={item.rating}
                price={item.currentPriceBook}
                image={
                  item.bannerImage
                    ? { uri: `${S3_BASE_URL}/${item.bannerImage}` }
                    : require('../../../assets/images/image_not_found.jpg')
                }
                added={(selections[activeStep] ?? []).includes(item.productId)}
                disabled={!item.isAvailable}
onAdd={() => {
  setSelectedProductId(item.productId);
  setStartTime('');
  setEndTime('');
  setQuantity(1);
  setShowAddProductModal(true);
}}

                onRemove={() =>
                {
                  removeProductFromDraft(item.eventItemId);

                  dispatch(
                    removeProduct({
                      step: activeStep,
                      productId: item.productId,
                    }),
                  )
                }}
              />
            )}
            ListFooterComponent={
              loading ? (
                <View className="py-4">
                  <ActivityIndicator size="small" />
                </View>
              ) : null
            }
          />
        )}
        <View
          style={{
            paddingBottom: insets.bottom + 20 || 16,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
          }}
        >
          <View className="px-4 pt-3">
            <View className="flex-row justify-between items-center gap-8 pb-3">
              {/* SKIP BUTTON */}
{!isLastStep && (
  <Pressable
    onPress={handleSkip}
    className="flex-1 h-14 rounded-2xl border-2 bg-white border-yellow-400 justify-center"
  >
    <Text className="text-center text-base font-semibold text-black">
      Skip
    </Text>
  </Pressable>
)}

              {/* CONTINUE BUTTON */}
              <Pressable
                onPress={handleContinue}
                className="flex-1 h-14 rounded-2xl overflow-hidden"
              >
                <LinearGradient
                  colors={['#F97316', '#FACC15']}
                  className="flex-1 justify-center"
                >
                  <Text className="text-white text-center text-lg font-bold">
                    Continue
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </View>


<Modal
  visible={showAddProductModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowAddProductModal(false)}
>
  <View className="flex-1 items-center justify-center bg-black/40">
    <View className="w-[90%] bg-white rounded-2xl p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-black">
          Add Product Details
        </Text>
        <Pressable onPress={() => setShowAddProductModal(false)}>
          <Text className="text-xl">✕</Text>
        </Pressable>
      </View>

{/* Start Time */}
<Text className="text-sm text-gray-500 mb-1">Start Time</Text>

<Pressable
  className="border border-gray-300 rounded-xl p-3 mb-3"
  onPress={() => setShowStartPicker(true)}
>
  <Text>
    {startTime
      ? dayjs(startTime).format('hh:mm A')
      : 'Select start time'}
  </Text>
</Pressable>

<TimePickerModal
  visible={showStartPicker}
  use24HourClock={false}
  onDismiss={() => setShowStartPicker(false)}
  onConfirm={({ hours, minutes }) => {
    const base = dayjs();
    setStartTime(
      base.hour(hours).minute(minutes).second(0).toDate()
    );
    setShowStartPicker(false);
  }}
  
/>


     {/* End Time */}
<Text className="text-sm text-gray-500 mb-1">End Time</Text>

<Pressable
  className="border border-gray-300 rounded-xl p-3 mb-3"
  onPress={() => setShowEndPicker(true)}
>
  <Text>
    {endTime
      ? dayjs(endTime).format('hh:mm A')
      : 'Select end time'}
  </Text>
</Pressable>

<TimePickerModal
  visible={showEndPicker}
  use24HourClock={false}
  onDismiss={() => setShowEndPicker(false)}
  onConfirm={({ hours, minutes }) => {
    const base = dayjs();
    setEndTime(
      base.hour(hours).minute(minutes).second(0).toDate()
    );
    setShowEndPicker(false);
  }}
 
/>


      {/* Quantity */}
      <Text className="text-sm text-gray-500 mb-1">Quantity</Text>
      <View className="flex-row items-center gap-4 mb-5">
        <Pressable
          onPress={() => setQuantity(q => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center"
        >
          <Text className="text-lg">−</Text>
        </Pressable>

        <Text className="text-lg font-semibold">{quantity}</Text>

        <Pressable
          onPress={() => setQuantity(q => q + 1)}
          className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center"
        >
          <Text className="text-lg">+</Text>
        </Pressable>
      </View>

      {/* Confirm */}
      <Pressable onPress={handleConfirmAddProduct}>
        <LinearGradient
          colors={['#F97316', '#FACC15']}
          style={{ height: 48, borderRadius: 14, justifyContent: 'center' }}
        >
          <Text className="text-white text-center font-bold">
            Add Product
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  </View>
</Modal>

      {/* MODALS AND SHEETS */}
      <Modal
        visible={showServiceModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowServiceModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-[90%] bg-white rounded-2xl p-5">
            {/* CLOSE */}
            <View className="items-end">
              <Pressable onPress={() => setShowServiceModal(false)}>
                <Text className="text-2xl">✕</Text>
              </Pressable>
            </View>

            {/* TITLE */}
            <View className="relative items-center mb-4">
              <View className="absolute left-0 right-0 top-1/2 h-[1px] bg-orange-400" />
              <Text className="px-4 text-lg font-semibold text-orange-500 bg-white">
                Choose Your Services
              </Text>
            </View>

            {/* SERVICES */}
            <View className="mt-2">
              {steps.map(step => {
                const checked = tempEnabledSteps.includes(step.key);

                return (
                  <Pressable
                    key={step.key}
                    onPress={() => {
                      setTempEnabledSteps(prev =>
                        prev.includes(step.key)
                          ? prev.filter(k => k !== step.key)
                          : [...prev, step.key],
                      );
                    }}
                    className="flex-row items-center justify-between px-3 py-2 rounded-xl mb-2"
                  >
                    <Text
                      className={`text-lg font-medium ${
                        checked ? 'text-orange-600' : 'text-orange-500'
                      }`}
                    >
                      {step.label}
                    </Text>

                    <View
                      className={`w-6 h-6 rounded-md border items-center justify-center ${
                        checked
                          ? 'bg-orange-500 border-orange-500'
                          : 'border-gray-400'
                      }`}
                    >
                      {checked && (
                        <Feather name="check" size={16} color="#fff" />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* CONFIRM */}
            <Pressable
              onPress={() => {
                setEnabledSteps(tempEnabledSteps);
                if (!tempEnabledSteps.includes(activeStep)) {
                  setActiveStep(tempEnabledSteps[0]);
                }
                setShowServiceModal(false);
              }}
              className="mt-6"
            >
              <LinearGradient
                colors={['#F97316', '#FACC15']}
                style={{
                  height: 48,
                  borderRadius: 14,
                  justifyContent: 'center',
                }}
              >
                <Text className="text-white text-center font-bold">
                  Confirm
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>

      <FilterBottomSheet ref={filterSheetRef} />

      </>
  );
}

const ProductSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <SkeletonPlaceholder>
      {[...Array(count)].map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginHorizontal: 12,
            marginTop: 12,
            borderRadius: 16,
            padding: 12,
          }}
        >
          {/* LEFT CONTENT */}
          <View style={{ flex: 1 }}>
            {/* Title */}
            <View
              style={{
                width: '70%',
                height: 24,
                borderRadius: 6,
              }}
            />

            {/* Guests + MenuType */}
            <View
              style={{
                marginTop: 10,
                width: '55%',
                height: 14,
                borderRadius: 4,
              }}
            />

            {/* Rating stars */}
            <View
              style={{
                marginTop: 10,
                width: 90,
                height: 16,
                borderRadius: 4,
              }}
            />

            {/* Price */}
            <View
              style={{
                marginTop: 12,
                width: 60,
                height: 18,
                borderRadius: 4,
              }}
            />

            {/* Button */}
            <View
              style={{
                marginTop: 14,
                width: 96,
                height: 36,
                borderRadius: 8,
              }}
            />
          </View>

          {/* RIGHT IMAGE */}
          <View
            style={{
              width: 176,
              height: 160,
              borderRadius: 12,
              marginLeft: 12,
            }}
          />
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

const EmptyProductsState = ({
  title = 'No services available',
  subtitle = 'Try another category or check back later.',
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-6">
        <Text className="text-3xl">📦</Text>
      </View>

      <Text className="text-2xl font-bold text-black text-center mb-3">
        {title}
      </Text>

      <Text className="text-gray-600 text-base text-center max-w-[280px]">
        {subtitle}
      </Text>
    </View>
  );
};


