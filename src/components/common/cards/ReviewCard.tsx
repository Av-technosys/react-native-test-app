import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMemo, useState } from 'react';
import Video from 'react-native-video';
import Feather from 'react-native-vector-icons/Feather';
import Config from 'react-native-config';

type ReviewCardProps = {
  title: string;
  rating: number;
  comment: string;
  createdAt: string;
  images: { uri: string }[];
  videos: string[];
  onDelete?: () => void;
};

export default function ReviewCard({
  title,
  rating,
  comment,
  createdAt,
  images,
  videos,
  onDelete,
}: ReviewCardProps) {
  const S3_BASE_URL = Config.AWS_IMAGE_URL
  console.log(images);
  const WORD_LIMIT = 10;
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState<{
    type: 'image' | 'video';
    uri: string;
  } | null>(null);

  const words = useMemo(() => comment.trim().split(/\s+/), [comment]);
  const shouldTruncate = words.length > WORD_LIMIT;

  const previewText = shouldTruncate
    ? words.slice(0, WORD_LIMIT).join(' ')
    : comment;

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete?.();
  };


  return (
    <>
      <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100 shadow-sm">
        {/* HEADER ROW */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-lg font-bold text-gray-900">
                {title}
              </Text>
              {/* RATING STARS */}
              <View className="flex-row">
                {[...Array(5)].map((_, i) => (
                  <AntDesign
                    key={i}
                    name="star"
                    size={14}
                    color={i < rating ? '#F59E0B' : '#D1D5DB'}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text className="text-sm text-gray-500">
              {createdAt}
            </Text>
          </View>

          {/* DELETE BUTTON */}
          {onDelete && (
            <Pressable
              onPress={() => setShowConfirm(true)}
              className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center"
              hitSlop={10}
            >
              <AntDesign name="delete" size={16} color="#EF4444" />
            </Pressable>
          )}
        </View>

        {/* COMMENT TEXT */}
        <Text className="text-base text-gray-800 leading-5 mb-4">
          {expanded || !shouldTruncate ? comment : previewText + '...'}
        </Text>

        {/* READ MORE/LESS */}
        {shouldTruncate && (
          <Pressable
            onPress={() => setExpanded(v => !v)}
            className="mb-4"
          >
            <Text className="text-sm font-medium text-amber-600">
              {expanded ? 'Read less' : 'Read more'}
            </Text>
          </Pressable>
        )}

        {/* MEDIA SECTION */}
        {(images.length > 0 || videos.length > 0) && (
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 mb-3">
              Media ({images.length + videos.length})
            </Text>

            {/* IMAGES */}
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                keyExtractor={(_, i) => `img-${i}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, marginBottom: videos.length > 0 ? 8 : 0 }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      setPreview({
                        type: 'image',
                        uri: item.uri.startsWith('http')
                          ? item.uri
                          : `${S3_BASE_URL}/${item.uri}`,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: item.uri.startsWith('http')
                          ? item.uri
                          : `${S3_BASE_URL}/${item.uri}`,
                      }}
                      className="w-28 h-28 rounded-lg bg-gray-100"
                      resizeMode="cover"
                    />
                  </Pressable>

                )}
              />
            )}

            {/* VIDEOS */}
            {videos.length > 0 && (
              <FlatList
                data={videos}
                horizontal
                keyExtractor={(_, i) => `vid-${i}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                renderItem={({ item }) => {
                  const videoUrl = item.startsWith('http')
                    ? item
                    : `${S3_BASE_URL}/${item}`;

                  return (
                    <Pressable
                      onPress={() =>
                        setPreview({
                          type: 'video',
                          uri: videoUrl,
                        })
                      }
                      className="w-28 h-28 rounded-lg overflow-hidden bg-black relative"
                    >

                      {/* IMPORTANT: pointerEvents="none" */}
                      <View style={{ width: '100%', height: '100%' }} pointerEvents="none">
                        <Video
                          source={{ uri: videoUrl }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                          paused={false}
                          muted
                          repeat
                        />
                      </View>

                      {/* play overlay */}
                      <View className="absolute inset-0 items-center justify-center">
                        <View className="w-10 h-10 bg-black/60 rounded-full items-center justify-center">
                          <Feather name="play" size={18} color="white" />
                        </View>
                      </View>

                    </Pressable>
                  );
                }}
              />
            )}
          </View>
        )}
      </View>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            {/* ICON */}
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center self-center mb-4">
              <AntDesign name="delete" size={28} color="#EF4444" />
            </View>

            {/* TITLE */}
            <Text className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Review?
            </Text>

            {/* DESCRIPTION */}
            <Text className="text-base text-gray-600 text-center mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </Text>

            {/* BUTTONS */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300 rounded-xl py-3.5"
              >
                <Text className="text-center font-semibold text-gray-700">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmDelete}
                className="flex-1 bg-red-500 rounded-xl py-3.5"
              >
                <Text className="text-center font-semibold text-white">
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={preview !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreview(null)}
      >
        <View className="flex-1 bg-black justify-center items-center">

          {/* CLOSE BUTTON */}
          <Pressable
            onPress={() => setPreview(null)}
            className="absolute top-14 right-6 z-10"
          >
            <Feather name="x" size={28} color="white" />
          </Pressable>

          {/* IMAGE PREVIEW */}
          {preview?.type === 'image' && (
            <Image
              source={{ uri: preview.uri }}
              style={{ width: '100%', height: '70%' }}
              resizeMode="contain"
            />
          )}

          {/* VIDEO PREVIEW */}
          {preview?.type === 'video' && (
            <Video
              source={{ uri: preview.uri }}
              style={{ width: '100%', height: '70%' }}
              controls
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </>
  );
}