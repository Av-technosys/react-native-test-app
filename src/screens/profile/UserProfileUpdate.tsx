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
import { launchImageLibrary } from 'react-native-image-picker';
import RNBlobUtil from 'react-native-blob-util';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
  userDetails,
  updateUserProfile,
  getBucketUrl,
  setProfilePicture,
} from '../../api/user';

import FloatingInput from '../../components/common/FloatingInput';
import Button from '../../components/common/Button';
import { showAndroidToast } from '../../components/toast/androidToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const expiredToken = "eyJraWQiOiJrd1BVM3pJM0tCa01LRVM1OFZ0SjhHUnBLQUw5WTIrRlRPR1wvcVRCTnZCND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2MTMzYWQ3YS04MDQxLTcwYmEtMTg0MC1mMDU5NTZmMDM5OTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9sdW1RY2U2emQiLCJjdXN0b206dXNlcl9pZCI6IjgiLCJjb2duaXRvOnVzZXJuYW1lIjoiNjEzM2FkN2EtODA0MS03MGJhLTE4NDAtZjA1OTU2ZjAzOTkxIiwib3JpZ2luX2p0aSI6IjcyN2E5MWUwLTYzMWYtNGFiNS1iNTQ2LTAxOGRlZTIyZDc3MiIsImF1ZCI6IjY1amxkZ2o4MThpNzBiOWpsNWt0dmpmNWxwIiwiZXZlbnRfaWQiOiI0MzZlOWQyYi00ZmNjLTRiMTAtOTI1Yy01MjBlMmMyMWIwYmEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTc2ODQ1MDY3OSwiY3VzdG9tOnZlbmRvcl9pZHMiOiJ7XCJ2ZW5kb3JJZFwiOjMsIFwidmVuZG9yRW1wbG95ZWVzSWRcIjoyfSIsImV4cCI6MTc2ODQ1NDI3OSwiY3VzdG9tOnVzZXJfdHlwZSI6IjIiLCJpYXQiOjE3Njg0NTA2NzksImp0aSI6IjE1NGU5NWEzLWFmMDEtNDEzZS04NTc5LTE3MjQzYWFhNGY4OSIsImVtYWlsIjoicGl5dXNoa2hhcmU2NzFAZ21haWwuY29tIn0.lBQw9HTnHaAar_AsMhS4xE1K5n9vJap2e05aBVxN-VIw4rk1bU84X5tvaLtfj7xQov8G5YOHAlqbzuC3jBeX41SfX8ZW2mxT2qm6PaNEnHEx8AUBH9SDyuaHmLjyCNDHRQS7jUwrW7QmiKgljFegqwx7nYo6DazUODo6fSyNLFMBJwpf-UXCJUCyf10it3NPVCXB9RGzpRQQqjQf7zllNMTUGMQaEs7yjrhvbiRjRGeUZ5XlOL6e5RFdYH3-sRrAllTWSxUk7wY99bMFvpAZCQdLJaigKIbOZ4TTIjlL2j2MxWxCt9HfYoZupnMcLFnKht1yuzuI_4ERw2kY1sG9PQ"


  const S3_BASE_URL = Config.AWS_IMAGE_URL

export default function ProfileEditScreen() {

  AsyncStorage.setItem('idToken' , expiredToken)
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
      showAndroidToast('Failed to load user data.');
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
   showAndroidToast('Profile updated successfully');
    DeviceEventEmitter.emit('RELOAD_USER');
    navigation.goBack();
  } catch (err) {
    showAndroidToast('Failed to update profile. Please try again.');
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

  showAndroidToast('Image uploaded successfully. Save to apply changes.');
  } catch (err) {
    showAndroidToast('Failed to upload image. Please try again.');
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
    <SafeAreaView className="flex-1 bg-white px-4 ">
      
      
          {/* HEADER */}
          <View className="absolute top-0  left-0 right-0 z-20">
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

{/* FORM SECTION */}
<View className="space-y-5 px-1">
  <View>
    <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
      Full Name
    </Text>
    <FloatingInput
      size="small"
      placeholder="Enter your name"
      value={user.fullName}
      onChangeText={(text: any) =>
        setUser((prev: any) => ({ ...prev, fullName: text }))
      }
    />
  </View>

  <View>
    <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
      Email Address
    </Text>
    <FloatingInput
      size="small"
      value={user.email}
      editable={false}
      keyboardType="email-address"
      autoCapitalize="none"
      // Stylize non-editable fields if your FloatingInput supports it
      style={{ backgroundColor: '#F9FAFB' }} 
    />
  </View>

  <View>
    <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
      Contact Number
    </Text>
    <FloatingInput
      size="small"
      value={user.number}
      editable={false}
      keyboardType="phone-pad"
      style={{ backgroundColor: '#F9FAFB' }}
    />
  </View>
</View>

{/* ACTIONS */}
<View className="flex-row gap-4 mt-10 mb-10 px-1">
  <View className="flex-1">
    <Button
      label="Cancel"
      variant="outline"
      size="medium"
      onPress={() => navigation.goBack()}
    />
  </View>

  <View className="flex-1">
    <Button
      label={loading ? "Saving..." : "Save Changes"}
      variant="primary"
      size="medium"
      onPress={handleSave}
      disabled={loading}
    />
  </View>
          </View></> )}
    </SafeAreaView>
  );
}
