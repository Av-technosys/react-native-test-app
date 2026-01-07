/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,

  DeviceEventEmitter,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../../components/common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import RNBlobUtil from 'react-native-blob-util';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
  userDetails,
  updateUserProfile,
  getBucketUrl,
  setProfilePicture,
} from '../../api/user';
import KeyboardWrapper from '../../components/common/KeyboardWrapper';

const S3_BASE_URL =
  'https://freaky-files.s3.ap-south-1.amazonaws.com';

export default function ProfileEditScreen() {
  const navigation = useNavigation<any>();
const [initialLoading, setInitialLoading] = useState(true);


const [user, setUser] = useState<any>({
  fullName: '',
  email: '',
  number: '',
  profileImage: null,       // saved image (from backend)
  tempProfileImage: null,   // preview image (new)
});

  const [loading, setLoading] = useState(false);


useEffect(() => {
  const loadUser = async () => {
    try {
      setInitialLoading(true);

      const res = await userDetails();
      const data = res.data;

      setUser({
        fullName: `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim(),
        email: data.email ?? '',
        number: data.number ?? '',
        profileImage: data.profileImage ?? null,
      });
    } catch (err) {
      showMessage({
        type: 'danger',
        message: 'Failed to load profile',
      });
    } finally {
      setInitialLoading(false);
    }
  };

  loadUser();
}, []);


const handleSave = async () => {
  try {
    setLoading(true);



await updateUserProfile({
      firstName: user.fullName,
      lastName: '',
      profileImage: user.tempProfileImage ?? user.profileImage,
        email: user.email,   // ← unchanged value
         number: user.number, // ← unchanged value

    });
    showMessage({
      type: 'success',
      message: 'Profile updated successfully',
    });

    DeviceEventEmitter.emit('RELOAD_USER');
    navigation.goBack();
  } catch (err) {
    showMessage({
      type: 'danger',
      message: 'Profile update failed',
    });
  } finally {
    setLoading(false);
  }
};


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

  const handlePickImage = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.assets?.[0]?.uri) return;

    const image = result.assets[0];
    setLoading(true);

    // 1️⃣ Get S3 URL
    const res = await getBucketUrl({
      fileName: image.fileName ?? `profile-${Date.now()}.jpg`,
      fileType: image.type ?? 'image/jpeg',
      path: 'userProfile',
    });

    const { uploadUrl, filePath } = res;

    // 2️⃣ Upload to S3
    const uploadRes = await uploadToS3(
      uploadUrl,
      image.uri!,
      image.type ?? 'image/jpeg',
    );

    if (uploadRes.info().status !== 200) {
      throw new Error('Upload failed');
    }

    // 3️⃣ ONLY update preview state
    setUser((prev: any) => ({
      ...prev,
      tempProfileImage: filePath,
    }));

    showMessage({
      type: 'success',
      message: 'Image selected. Save to apply.',
    });
  } catch (err) {
    showMessage({
      type: 'danger',
      message: 'Image upload failed',
    });
  } finally {
    setLoading(false);
  }
};


const avatarSource =
  user.tempProfileImage
    ? { uri: `${S3_BASE_URL}/${user.tempProfileImage}` }
    : user.profileImage
    ? { uri: `${S3_BASE_URL}/${user.profileImage}` }
    : require('../../assets/images/default-avtar.jpg');



  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      
      <KeyboardWrapper>
          {/* HEADER */}
          <View className="absolute top-0 left-0 right-0 z-20">
            <ScreenHeader title="Profile" rightType="notification" showBack={true} />
          </View>

       {initialLoading ? (
  <SkeletonPlaceholder
    backgroundColor="#EDEDED"
    highlightColor="#F5F5F5"
  >
    {/* AVATAR */}
    <View style={{ alignItems: 'center', marginTop: 64, marginBottom: 40 }}>
      <SkeletonPlaceholder.Item
        width={112}
        height={112}
        borderRadius={56}
      />
    </View>

    {/* FIELD 1 */}
    <View style={{ marginBottom: 20 }}>
      <SkeletonPlaceholder.Item
        width={90}
        height={12}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        height={48}
        borderRadius={14}
      />
    </View>

    {/* FIELD 2 */}
    <View style={{ marginBottom: 20 }}>
      <SkeletonPlaceholder.Item
        width={60}
        height={12}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        height={48}
        borderRadius={14}
      />
    </View>

    {/* FIELD 3 */}
    <View style={{ marginBottom: 28 }}>
      <SkeletonPlaceholder.Item
        width={80}
        height={12}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        height={48}
        borderRadius={14}
      />
    </View>

    {/* BUTTONS */}
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <SkeletonPlaceholder.Item
        flex={1}
        height={48}
        borderRadius={14}
      />
      <SkeletonPlaceholder.Item
        flex={1}
        height={48}
        borderRadius={14}
      />
    </View>
  </SkeletonPlaceholder>
) : (
  <> 
     {/* AVATAR */}
          <View className="items-center mt-16 mb-8">
            <View className="bg-white rounded-full border-4 border-orange-400 p-[3px]">
              <Image
                source={avatarSource}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
            </View>

            <Pressable
              onPress={handlePickImage}
              className="absolute bottom-1 right-[38%] bg-blue-600 w-7 h-7 rounded-full items-center justify-center border-2 border-white"
            >
              <Feather name="plus" size={14} color="#fff" />
            </Pressable>
          </View>

          {/* FULL NAME */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Text>
            <TextInput
              value={user.fullName}
              onChangeText={text =>
                setUser((prev: any) => ({ ...prev, fullName: text }))
              }
              className="h-12 w-[99%] border border-gray-300 rounded-xl px-4 text-black"
            />
          </View>

          {/* EMAIL */}
<View className="mb-4">
  <Text className="text-sm font-medium text-gray-700 mb-1">
    Email
  </Text>
  <TextInput
    value={user.email}
    editable={false}
    keyboardType="email-address"
    autoCapitalize="none"
    onChangeText={text =>
      setUser((prev: any) => ({ ...prev, email: text }))
    }
    className="h-12 border w-[99%] border-gray-300 rounded-xl px-4 text-black"
  />
</View>


          {/* PHONE */}
<View className="mb-4">
  <Text className="text-sm font-medium text-gray-700 mb-1">
    Contact No.
  </Text>
  <TextInput
    value={user.number}
    editable={false}
    keyboardType="phone-pad"
    onChangeText={text =>
      setUser((prev: any) => ({ ...prev, number: text }))
    }
    className="h-12 border w-[99%] border-gray-300 rounded-xl px-4  text-black"
  />
</View>

          {/* ACTIONS */}
          <View className="flex-row gap-4 mt-6">
            <Pressable
              onPress={() => navigation.goBack()}
              className="flex-1 h-12 rounded-xl border border-orange-500 items-center justify-center"
            >
              <Text className="text-orange-500 font-semibold">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={loading}
              className="flex-1 h-12 rounded-xl overflow-hidden"
            >
              <LinearGradient
                colors={['#F97316', '#FACC15']}
                className="flex-1 items-center justify-center"
              >
                <Text className="text-white font-semibold">
                  {loading ? 'Saving...' : 'Save'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View></> )}
</KeyboardWrapper>
    </SafeAreaView>
  );
}
