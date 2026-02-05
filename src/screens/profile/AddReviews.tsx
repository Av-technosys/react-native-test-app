
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RNBlobUtil from 'react-native-blob-util';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreenHeader from '../../components/common/ScreenHeader';
import { getBucketUrl } from '../../api/user';
import Button from '../../components/common/Button';
import { showAndroidToast } from '../../components/toast/androidToast';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { getEventById } from '../../api/event';
import { getProductsByProductId } from '../../api/product';
import { addReview } from '../../api/review';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { ActivityIndicator } from 'react-native-paper';
import Video from 'react-native-video';
import Config from 'react-native-config';


const ReviewSkeleton = () => (
  <SkeletonPlaceholder>
    {/* EVENT CARD SKELETON */}
    <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 80, height: 80, borderRadius: 16 }} />

        <View style={{ marginLeft: 16, flex: 1 }}>
          <View style={{ width: '70%', height: 20, borderRadius: 4 }} />
          <View style={{ width: '40%', height: 14, borderRadius: 4, marginTop: 10 }} />
          <View style={{ width: '60%', height: 14, borderRadius: 4, marginTop: 10 }} />
        </View>
      </View>
    </View>

    {/* RATING BLOCK */}
    <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
      <View style={{ width: '50%', height: 20, borderRadius: 4, marginBottom: 12 }} />
      <View style={{ width: '100%', height: 120, borderRadius: 16 }} />
    </View>

    {/* SERVICES LIST */}
    {[1, 2, 3].map(i => (
      <View key={i} style={{ marginHorizontal: 16, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 56, height: 56, borderRadius: 12 }} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <View style={{ width: '60%', height: 16, borderRadius: 4 }} />
            <View style={{ width: '40%', height: 14, borderRadius: 4, marginTop: 8 }} />
          </View>
        </View>
        <View style={{ width: '100%', height: 40, borderRadius: 12, marginTop: 12 }} />
      </View>
    ))}
  </SkeletonPlaceholder>
);


// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


type AddReviewRouteParams = {
  AddReviewsScreen: {
    eventId: number;
    productIds: number[];
  };
};


/* ---------------- SCREEN ---------------- */
export default function AddReview() {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<
    AddReviewRouteParams,
    'AddReviewsScreen'
  >>();
  const { eventId, productIds } = route.params;
  console.log('AddReview Route Params:', route.params);
  const [eventRating, setEventRating] = useState(0);
  const [eventComment, setEventComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false)
  const MAX_MEDIA = 4;
  const MAX_VIDEO = 1;
  const [event, setEvent] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
const [servicesLoading, setServicesLoading] = useState(true);

  const canAddImage = (media: { mediaType: string }[]) => {
    return media.length < MAX_MEDIA;
  };

  const canAddVideo = (media: { mediaType: string }[]) => {
    const videoCount = media.filter(m => m.mediaType === 'video').length;
    return videoCount < MAX_VIDEO && media.length < MAX_MEDIA;
  };


  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      const res = await getEventById(eventId);

      const eventData =
        Array.isArray(res?.data) && res.data.length > 0
          ? res.data[0]
          : null;

      setEvent(eventData);
      setLoading(false);
    };

    loadEvent();
  }, [eventId]);

  useEffect(() => {
    if (!productIds || productIds.length === 0) {
      setServices([]);
      setServicesLoading(false);
      return;
    }

    const loadServices = async () => {
        setServicesLoading(true);
      try {

        const results = await Promise.all(
          productIds.map(id => getProductsByProductId(id))
        );

        console.log('Products API results:', results);

        const mappedServices = results.map(r => ({
          productId: r.product.productId,
          title: r.product.title,
          description: r.product.description,
          rating: 0,
          comment: '',
          media: [],
          images: r.product.bannerImage ?? [],
          price: r.product.prices?.[0]?.salePrice ?? null,
        }));

        setServices(mappedServices);
          setServicesLoading(false);
      } catch (err) {
        console.error('Failed to load services', err);
      }
    };

    loadServices();
  }, [productIds]);


  useEffect(() => {
    if (!loading) {
      fadeAnim.setValue(0);
      screenTranslateY.setValue(30);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(screenTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);



  const handleRemoveMedia = (productId: number, index: number) => {
  setServices(prev =>
    prev.map(service =>
      service.productId === productId
        ? {
            ...service,
            media: service.media.filter((_: any, i: number) => i !== index),
          }
        : service
    )
  );
};


  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Screen entrance only
  const screenTranslateY = useRef(new Animated.Value(30)).current;

  // Event card micro-interactions
  const eventBounceAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(screenTranslateY, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const S3_BASE_URL = Config.AWS_IMAGE_URL


  const handleEventRatingChange = (rating: number) => {
    setEventRating(rating);

    Animated.sequence([
      Animated.timing(eventBounceAnim, {
        toValue: -6,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(eventBounceAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleServiceRatingChange = (productId: number, rating: number) => {
    setServices(prev =>
      prev.map(s =>
        s.productId === productId
          ? { ...s, rating }
          : s
      )
    );
  };

  /* ---------------- S3 ---------------- */
  const uploadToS3 = async (
    uploadUrl: string,
    fileUri: string,
    mimeType: string,
  ) => {
    return RNBlobUtil.fetch(
      'PUT',
      uploadUrl,
      { 'Content-Type': mimeType },
      RNBlobUtil.wrap(fileUri.replace('file://', '')),
    );
  };

  const getPreviewUri = (m: any) => {
    if (m.localUri) return m.localUri;
    return `${S3_BASE_URL}/${m.mediaUrl}`;
  };

  const handlePickMedia = async (productId: number) => {
    const service = services.find(s => s.productId === productId);
    if (!service) return;


    const result = await launchImageLibrary({
      mediaType: 'mixed', // 👈 IMPORTANT
      videoQuality: 'medium',
      quality: 0.8,
    });

    if (!result.assets?.[0]) return;

    const file = result.assets[0];
    const isVideo = file.type?.startsWith('video');

    //  Validation
    if (isVideo && !canAddVideo(service.media)) {
      showAndroidToast('You can upload only 1 video and max 4 media items.');
      return;
    }

    if (!isVideo && !canAddImage(service.media)) {
      showAndroidToast('You can upload only 4 images.');
      return;
    }

    setMediaLoading(true);

    try {
      const res = await getBucketUrl({
        fileName: file.fileName ?? `review-${Date.now()}`,
        fileType: file.type ?? '',
        path: 'reviews',
      });

      await uploadToS3(res.uploadUrl, file.uri!, file.type!);

      const localUri = file.uri;
      const s3Path = res.filePath;

      setServices(prev =>
        prev.map(s =>
          s.productId === productId
            ? {
              ...s,
              media: [
                ...s.media,
                {
                  localUri,          // 👈 for instant preview
                  mediaUrl: s3Path,  // 👈 for backend + reload
                  mediaType: isVideo ? 'video' : 'image',
                },
              ],
            }
            : s
        )
      );
    } finally {
      setMediaLoading(false);
    }
  };

  const payload = {
    eventId: Number(eventId),
    eventRating: eventRating,
    description: eventComment,

    products: services
      .filter(s => s.rating > 0)
      .map(s => ({
        productId: s.productId,
        rating: s.rating,
        description: s.comment,
        media: s.media.map((m: any) => ({
          mediaUrl: m.mediaUrl,
          mediaType: m.mediaType,
        })),
      })),
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Reviews" showBack rightType="menu" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: 16 }}
          >
            {loading && <ReviewSkeleton />}
            {!loading && (
              <Animated.View
                className="px-4"
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: screenTranslateY }],
                }}
              >

                {/* -------- EVENT CARD -------- */}
                <Animated.View className="bg-white rounded-3xl p-5 mb-6 border border-orange-100">
                  <View className="flex-row items-start">
                    {/* ICON */}
                    <View className="w-20 h-20 bg-orange-400 rounded-2xl items-center justify-center shadow-md">
                      <Feather name="gift" size={32} color="white" />
                    </View>

                    {/* CONTENT */}
                    <View className="ml-4 flex-1">
                      {/* TITLE ROW */}
                      <View className="flex-row justify-between items-start">
                        <Text
                          className="font-bold text-2xl text-gray-900 flex-1"
                          numberOfLines={2}
                        >
                          {event?.contactName || 'Event'}
                        </Text>

                        {/* STATUS (optional / neutral) */}
                        <View className="px-4 py-1.5 rounded-full bg-orange-100">
                          <Text className="font-semibold text-orange-700">
                            Event
                          </Text>
                        </View>
                      </View>

                      {/* EVENT ID */}
                      <Text className="text-sm text-gray-500 mt-2">
                        Event #{event?.eventId}
                      </Text>

                      {/* DATE + TIME */}
                      {event?.startTime && (
                        <View className="mt-4">
                          <View className="flex-row items-center">
                            <Feather name="calendar" size={16} color="#6B7280" />
                            <Text className="ml-2 text-gray-700 font-medium">
                              {new Date(event.startTime).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                          </View>

                          {event?.endTime && (
                            <View className="flex-row items-center mt-2">
                              <Feather name="clock" size={16} color="#6B7280" />
                              <Text className="ml-2 text-gray-700 font-medium">
                                {new Date(event.startTime).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                –{' '}
                                {new Date(event.endTime).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  </View>

                </Animated.View>
                {/* -------- EVENT RATING -------- */}
                <View>
                  <View className="flex-row items-center mb-4">
                    <View className="w-1 h-6 bg-orange-500 rounded-full mr-3" />
                    <Text className="font-bold text-2xl text-gray-900">
                      Rate this Event
                    </Text>
                  </View>

                  <View className="bg-white rounded-3xl mb-8 border border-gray-200">
                    <View className="my-4">
                      <StarRating
                        value={eventRating}
                        onChange={handleEventRatingChange}
                      />
                    </View>

                    {eventRating > 0 && (
                      <View className="px-5 pb-5 border-t border-orange-50">
                        <FloatingLabelInput
                          label="Share your overall experience"
                          value={eventComment}
                          onChangeText={setEventComment}
                          multiline
                          numberOfLines={4}
                        />
                      </View>
                    )}
                  </View>
                </View>

                {/* -------- SERVICES -------- */}
                {servicesLoading  ? (
  <>
    <ServiceSkeleton />
    <ServiceSkeleton />
  </>
) : (
                <View className="mb-8">
                  <View className="flex-row items-center mb-6">
                    <View className="w-1 h-6 bg-orange-500 rounded-full mr-3" />
                    <Text className="font-bold text-2xl text-gray-900">
                      Rate Specific Services
                    </Text>
                  </View>

                  {services.map((service, index) => {

                    const isExpanded = service.rating > 0;

                    return (
                      <Animated.View
                        key={service.productId}
                        className="bg-white rounded-3xl mb-6 border border-gray-200"
                        style={{
                          transform: [
                            {
                              translateY: screenTranslateY.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, index * 5],
                              }),
                            },
                          ],
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={1}
                          className="p-5"
                        >
                          <View className="flex-row items-center">
                           <Image
  source={
    service?.images
      ? { uri: `${S3_BASE_URL}/${service.images}` }
      : undefined
  }
  className="w-14 h-14 rounded-2xl mr-4 bg-gray-200"
/>

                            <View className="flex-1">
                              <Text className="font-bold text-lg text-gray-900">
                                {service.title}
                              </Text>
                              <Text className="text-sm text-gray-500 mt-1">
                                $ {service.price}
                              </Text>
                            </View>
                          </View>

                          <View className="mt-4">
                            <StarRating
                              value={service.rating}
                              onChange={(rating) =>
                                handleServiceRatingChange(
                                  service.productId,
                                  rating
                                )
                              }
                            />
                          </View>
                        </TouchableOpacity>

                        {isExpanded && (
                          <View className="px-5 pb-5 border-t border-orange-50">
                            <View className="mt-3">
                              <Text className="font-semibold text-gray-700 mb-3">
                                Add Media ({service.media.length}/4)
                              </Text>

                              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {service.media.map((m: { mediaType: string; }, i: React.Key | null | undefined) => (
  <View key={i} className="relative mt-3 mr-3">
    {/* PREVIEW */}
    {m.mediaType === 'video' ? (
      <Video
        source={{ uri: getPreviewUri(m) }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          backgroundColor: '#e5e7eb',
        }}
        paused
        resizeMode="cover"
      />
    ) : (
      <Image
        source={{ uri: getPreviewUri(m) }}
        className="w-20 h-20 rounded-2xl bg-gray-200"
      />
    )}

    {/* REMOVE BUTTON */}
    <TouchableOpacity
      onPress={() => handleRemoveMedia(service.productId, i)}
      className="absolute -top-2 -right-2 bg-black/70 rounded-full p-1"
      hitSlop={8}
    >
      <AntDesign name="close" size={14} color="white" />
    </TouchableOpacity>
  </View>
))}

                                {
                                  mediaLoading && (<ActivityIndicator size="small" color="#f97316" />)
                                }
                                {canAddImage(service.media) && (
                                  <TouchableOpacity
                                    onPress={() =>
                                      handlePickMedia(service.productId)
                                    }
                                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-orange-200 items-center justify-center bg-orange-50"
                                  >
                                    <AntDesign name="plus" size={24} color="#f97316" />
                                  </TouchableOpacity>
                                )}
                              </ScrollView>
                            </View>

                            <FloatingLabelInput
                              label={`Comments for ${service.title}`}
                              value={service.comment}
                              onChangeText={(text) =>
                                setServices(prev =>
                                  prev.map(s =>
                                    s.productId === service.productId
                                      ? { ...s, comment: text }
                                      : s
                                  )
                                )
                              }
                              multiline
                              numberOfLines={3}
                            />
                          </View>
                        )}
                      </Animated.View>
                    );
                  })}
                </View>
) }
                <Button
                  label="Submit Review"
                  onPress={async () => {
                    try {
                      if (eventRating === 0) {
                        showAndroidToast('Please rate the event');
                        return;
                      }
                      await addReview(payload);
                      showAndroidToast('Review submitted successfully');
                      navigation.goBack();
                    } catch (err) {
                      console.log(err)
                      showAndroidToast('Failed to submit review');
                    }
                  }}
                />
              </Animated.View>
            )
            }
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function StarRating({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const LABELS = ['Poor', 'Fair', 'Good', 'Great', 'Excellent'];
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (ratingValue: number) => {
    onChange(ratingValue);

    // Bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-row justify-between w-full px-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;
        const active = ratingValue <= value;

        return (
          <TouchableOpacity
            key={ratingValue}
            onPress={() => handlePress(ratingValue)}
            className="items-center flex-1"
            activeOpacity={0.6}
          >
            <Animated.View
              style={{
                transform: [{ scale: active ? scaleAnim : 1 }],
              }}
            >
              <AntDesign
                name={active ? 'star' : 'staro'}
                size={size}
                color={active ? '#f59e0b' : '#d1d5db'}
              />
            </Animated.View>
            <Text
              className={`text-xs mt-2 font-medium ${active ? 'text-orange-500' : 'text-gray-400'
                }`}
            >
              {LABELS[index]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function FloatingLabelInput({
  label,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [multiline ? 16 : 20, 0],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9ca3af', '#f97316'],
    }),
  };

  return (
    <View className="relative mt-6">
      <Animated.Text
        style={labelStyle}
        className="absolute left-4 font-medium bg-white px-2 z-10"
      >
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`
          pt-6 pb-4 px-4 text-base rounded-2xl border-2
          ${isFocused ? 'border-orange-300' : 'border-gray-200'}
          ${multiline ? 'min-h-[120px]' : 'h-16'}
          bg-white text-gray-900
        `}
        placeholderTextColor="#9ca3af"
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />

      {/* Character counter for multiline inputs */}
      {multiline && value.length > 0 && (
        <Animated.Text
          className="absolute right-4 bottom-2 text-xs"
          style={{
            color: value.length > 200 ? '#ef4444' : '#9ca3af',
            opacity: labelAnim,
          }}
        >
          {value.length}/500
        </Animated.Text>
      )}
    </View>
  );
}





const ServiceSkeleton = () => (
  <View className="bg-white rounded-3xl mb-6 border border-gray-200 p-5">
    <View className="flex-row items-center">
      <View className="w-14 h-14 rounded-2xl bg-gray-200 mr-4" />
      <View className="flex-1">
        <View className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
        <View className="h-3 w-1/3 bg-gray-200 rounded" />
      </View>
    </View>

    <View className="mt-4">
      <View className="h-6 w-32 bg-gray-200 rounded" />
    </View>
  </View>
);

