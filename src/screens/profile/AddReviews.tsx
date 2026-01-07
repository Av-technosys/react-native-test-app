/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RNBlobUtil from 'react-native-blob-util';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreenHeader from '../../components/common/ScreenHeader';
import { getBucketUrl } from '../../api/user';
import Button from '../../components/common/Button';
import KeyboardWrapper from '../../components/common/KeyboardWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/* ---------------- TEMP DATA ---------------- */

const EVENT = {
  eventId: 2,
  title: "Piyush's Birthday",
  date: 'Saturday, August 25, 2026',
  services: [
    {
      productId: 7,
      name: 'Juice Junction',
      desc: '150 guests • Premium menu',
      price: 4500,
      icon:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200',
    },
    {
      productId: 12,
      name: 'LensCraft Studio',
      desc: '8 hours • 2 photographers',
      price: 2800,
      icon:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200',
    },
  ],
};

/* ---------------- SCREEN ---------------- */

export default function AddReview() {
  const [eventRating, setEventRating] = useState(0);
  const [eventComment, setEventComment] = useState('');
  const [loading, setLoading] = useState(false);

  const [services, setServices] = useState(
    EVENT.services.map(s => ({
      productId: s.productId,
      rating: 0,
      comment: '',
      media: [] as {
        mediaUrl: string;
        mediaType: 'image';
      }[],
    })),
  );

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

  const handlePickImage = async (productId: number) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.assets?.[0]?.uri) return;

    const file = result.assets[0];
    setLoading(true);

    try {
      const res = await getBucketUrl({
        fileName: file.fileName ?? `review-${Date.now()}.jpg`,
        fileType: file.type ?? 'image/jpeg',
        path: 'reviews',
      });

      await uploadToS3(res.uploadUrl, file.uri!, file.type!);

      setServices(prev =>
        prev.map(s =>
          s.productId === productId
            ? {
                ...s,
                media: [
                  ...s.media,
                  {
                    mediaUrl: res.filePath,
                    mediaType: 'image',
                  },
                ],
              }
            : s,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
          <SafeAreaView className="flex-1 bg-white">
    

      <ScreenHeader title="Reviews" showBack rightType="menu" />
               <KeyboardAwareScrollView
                  enableOnAndroid
                  keyboardShouldPersistTaps="handled"
                  extraScrollHeight={56}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
            
                  }}
                >
      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* EVENT CARD */}
        <View className="flex-row items-center bg-white rounded-2xl p-5 mb-8 shadow-lg border border-gray-100">
          <View className="w-14 h-14 bg-orange-400 rounded-xl items-center justify-center">
            <Feather name="gift" size={26} color="white" />
          </View>

          <View className="ml-4">
            <Text className="font-semibold text-2xl">
              {EVENT.title}
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              {EVENT.date}
            </Text>
          </View>
        </View>

        {/* EVENT RATING */}
        <Text className="font-semibold text-xl mb-3">
          Rate this Event
        </Text>

        <View className="items-center mb-4">
          <StarRating
            size={32}
            value={eventRating}
            onChange={setEventRating}
          />
        </View>

        <TextInput
          placeholder="Share your experience"
          placeholderTextColor="#111827"
          value={eventComment}
          onChangeText={setEventComment}
          className="border border-orange-200 rounded-2xl px-4 py-4 text-base"
          multiline
        />

        {/* SERVICES */}
        <Text className="font-semibold text-xl mt-10 mb-4">
          Rate Specific Services
        </Text>

        {EVENT.services.map(service => {
          const state = services.find(
            s => s.productId === service.productId,
          )!;

          return (
            <View
              key={service.productId}
              className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100"
            >
              {/* HEADER */}
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: service.icon }}
                    className="w-12 h-12 rounded-xl mr-3"
                  />
                  <View>
                    <Text className="font-semibold text-lg">
                      {service.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-0.5">
                      {service.desc}
                    </Text>
                  </View>
                </View>

                <Text className="font-semibold text-lg text-orange-500">
                  $ {service.price}
                </Text>
              </View>

              <View className="items-center mb-4">
                <StarRating
                  value={state.rating}
                  onChange={rating =>
                    setServices(prev =>
                      prev.map(s =>
                        s.productId === service.productId
                          ? { ...s, rating }
                          : s,
                      ),
                    )
                  }
                />
              </View>

              {/* MEDIA GRID */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {state.media.map((m, i) => (
                  <Image
                    key={i}
                    source={{ uri: m.mediaUrl }}
                    className="w-20 h-20 rounded-xl mr-3"
                  />
                ))}

                {state.media.length < 4 && (
                  <TouchableOpacity
                    onPress={() =>
                      handlePickImage(service.productId)
                    }
                    className="w-20 h-20 rounded-xl border border-dashed border-gray-300 items-center justify-center"
                  >
                    <AntDesign
                      name="plus"
                      size={22}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                )}
              </ScrollView>

              <TextInput
                placeholder="Add a comment for this service"
                placeholderTextColor="#111827"
                value={state.comment}
                onChangeText={text =>
                  setServices(prev =>
                    prev.map(s =>
                      s.productId === service.productId
                        ? { ...s, comment: text }
                        : s,
                    ),
                  )
                }
                className="border border-orange-200 rounded-2xl px-4 py-4 mt-4 text-base"
                multiline
              />
            </View>
          );
        })}

        {/* SUBMIT */}
        <Button label='Submit Review'>
     
        </Button>
        
      </ScrollView>
                  </KeyboardAwareScrollView>

    </SafeAreaView>
  );
}

/* ---------------- STAR ---------------- */

function StarRating({
  value,
  onChange,
  size = 28,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const LABELS = ['Bad', 'Okay', 'Good', 'Like it', 'Loved it'];

  return (
    <View className="flex-row justify-between w-full">
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;
        const active = ratingValue <= value;

        return (
          <TouchableOpacity
            key={ratingValue}
            onPress={() => onChange(ratingValue)}
            className="items-center flex-1"
            activeOpacity={0.7}
          >
            <AntDesign
              name="star"
              size={size}
              color={active ? '#FACC15' : '#E5E7EB'}
            />
            <Text
              className={`text-xs mt-1 ${
                active ? 'text-gray-900' : 'text-gray-400'
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
