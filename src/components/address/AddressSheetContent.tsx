/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  DeviceEventEmitter,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import {
  Search,
  Plus,
  Home,
  Briefcase,
  Edit,
  Trash2,
  MoreVertical,
  Check,
} from 'lucide-react-native';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import { useCallback, useEffect, useState } from 'react';
import { getAddresses, deleteAddress, setCurrentAddress } from '../../api/user';
import AddressForm from '../../components/common/forms/AddressForm';
import { Modal } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import KeyboardWrapper from '../common/KeyboardWrapper';

import Animated, {
  FadeInRight,
  FadeOutRight,
} from 'react-native-reanimated';
import { showAndroidToast } from '../toast/androidToast';

type Address = {
  id: number;
  title: string;
  addressLineOne: string;
  addressLineTwo: string;
  reciverName: string;
  reciverNumber: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: string;
  longitude?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};


//  trigger the user back event 
// on every trigger we will check is he on form or list 
// if he is on list so close bottom sheet and else go to list mode

export default function AddressSheetContent({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  

  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await getAddresses();
      const list = res?.data ?? [];
      setAddresses(Array.isArray(list) ? list : []);
    } catch {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);


   const handleUserBack = useCallback(() => {
    // FORM → go back to list
    if (mode === 'form') {
      setMode('list');
      setSelectedAddress(null);
      return true;
    }

    // LIST → close bottom sheet
    onClose();
    return true;
  }, [mode, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      handleUserBack
    );

    return () => sub.remove();
  }, [isOpen, handleUserBack]);


  const handleDeletePress = (id: number) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      setDeleting(true);

      const res = await deleteAddress({ id: confirmDeleteId });

       showAndroidToast('Address deleted successfully');

       DeviceEventEmitter.emit('RELOAD_USER');

      setMenuOpenId(null);
      loadAddresses();
    } catch (error) {
       showAndroidToast('Failed to delete address');
    } finally {
      setDeleting(false);
    }
  };

  const handleSetCurrent = async (id: number) => {
    try {
      const res = await setCurrentAddress({ id });
 
      showAndroidToast('Current address updated');

      DeviceEventEmitter.emit('RELOAD_USER');

      setMenuOpenId(null);
      loadAddresses();
    } catch (error: any) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'Failed to set current address';

      showAndroidToast(message);
    }
  };

if (mode === 'form') {
  return (
    <Animated.View
      style={{ flex: 1 , paddingBottom:40}}
      entering={FadeInRight.duration(350)}
      exiting={FadeOutRight.duration(250)}
      
    >
      {/* <KeyboardWrapper> */}
      <View style={{ fontFamily: 'Inter-Regular', color: '#000' }}>

        <AddressForm
          initialData={selectedAddress}
          onSuccess={() => {
            setMode('list');
            setSelectedAddress(null);
            loadAddresses();
          }}
          onCancel={() => {
            setMode('list');
            setSelectedAddress(null);
          }}
        />
        </View>
      {/* </KeyboardWrapper> */}
    </Animated.View>
  );
}


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('Location permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        setCurrentAddress({ latitude, longitude });
      },
      err => {
        console.log('Location error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const truncateWords = (text: string, wordLimit = 2) => {
    if (!text) return '';

    const words = text.trim().split(/\s+/);

    if (words.length <= wordLimit) {
      return text;
    }

    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const filteredAddresses = addresses.filter(item => {
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();

    return (
      item.title?.toLowerCase().includes(q) ||
      item.addressLineOne?.toLowerCase().includes(q) ||
      item.city?.toLowerCase().includes(q) ||
      item.state?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* <KeyboardWrapper> */}
        <View style={{ flex: 1 }}>
          {/* HEADER */}
          <View className="flex-row items-center gap-2 mb-6">
            <Feather name="map-pin" size={20} color="#000" />
            <Text className="text-xl font-semibold text-black">Address</Text>
          </View>

          {/* Search */}
          <View className="border border-gray-200 rounded-xl flex-row items-center px-3 h-[45px] mb-3">
            <Search size={18} color="#555" />
            <TextInput
              placeholder="Search address, city, state"
              className="ml-2 flex-1 text-black"
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing" // iOS
            />
          </View>

          <TouchableOpacity
            onPress={fetchCurrentLocation}
            className="flex-row items-center gap-2 mt-4 pb-[15px] border-b border-gray-300"
          >
            <Feather name="navigation" size={18} color="#2563eb" />
            <Text className="text-blue-500 text-base">
              Use Current Location
            </Text>
          </TouchableOpacity>
          {/* Add New */}
          <TouchableOpacity
            className="flex-row items-center mt-2 pb-[15px] border-b border-gray-300"
            onPress={() => {
              setSelectedAddress(null);
              setMode('form');
            }}
          >
            <Plus size={18} color="#2b6ef2" />
            <Text className="ml-2 text-blue-500 text-base">
              Add New Address
            </Text>
          </TouchableOpacity>

          <Text className="mt-5 mb-4 text-sm text-gray-500">
            Saved Addresses
          </Text>

          <View className="gap-6">
            {loadingAddresses ? (
              <SkeletonPlaceholder
                backgroundColor="#EDEDED"
                highlightColor="#F6F6F6"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {/* LEFT SIDE */}
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      {/* Title row */}
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <SkeletonPlaceholder.Item
                          width={20}
                          height={20}
                          borderRadius={10}
                          marginRight={8}
                        />
                        <SkeletonPlaceholder.Item
                          width={80}
                          height={14}
                          borderRadius={6}
                        />
                      </View>

                      {/* Address line */}
                      <SkeletonPlaceholder.Item
                        marginTop={8}
                        marginLeft={28}
                        width="75%"
                        height={12}
                        borderRadius={6}
                      />
                    </View>

                    {/* RIGHT ACTION ICONS */}
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <SkeletonPlaceholder.Item
                        width={20}
                        height={20}
                        borderRadius={10}
                      />
                      <SkeletonPlaceholder.Item
                        width={20}
                        height={20}
                        borderRadius={10}
                      />
                    </View>
                  </View>
                ))}
              </SkeletonPlaceholder>
            ) : filteredAddresses.length === 0 ? (
              <Text className="text-gray-400 text-sm">No saved addresses</Text>
            ) : (
              filteredAddresses.map(item => (
                <View
                  key={item.id}
                  className="flex-row justify-between items-center"
                >
                  {/* LEFT */}
                  <View className="flex-1 pr-3">
                    <View className="flex-row items-center gap-2">
                      {item.title === 'Home' ? (
                        <Home size={20} />
                      ) : (
                        <Briefcase size={20} />
                      )}
                      <Text className="text-base font-semibold">
                        {item.title}
                      </Text>
                    </View>

                    <Text className="text-gray-500 ml-6 mt-1 text-sm">
                      {truncateWords(item.addressLineOne, 6)}
                    </Text>
                  </View>

                  {/* RIGHT ACTIONS */}
                  <View className="flex-row items-center gap-4">
                    {/* EDIT */}
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedAddress(item);
                        setMode('form');
                      }}
                    >
                      <Edit size={20} color="#f97316" />
                    </TouchableOpacity>

                    {/* MENU */}
                    <TouchableOpacity
                      onPress={() =>
                        setMenuOpenId(menuOpenId === item.id ? null : item.id)
                      }
                    >
                      <MoreVertical size={20} />
                    </TouchableOpacity>
                  </View>

                  {/* MENU DROPDOWN */}
                  {menuOpenId === item.id && (
                    <View className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                      <TouchableOpacity
                        onPress={() => handleSetCurrent(item.id)}
                        className="flex-row items-center gap-2 px-4 py-3"
                      >
                        <Check size={16} />
                        <Text>Set as current</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleDeletePress(item.id)}
                        className="flex-row items-center gap-2 px-4 py-3"
                      >
                        <Trash2 size={16} color="#f43f5e" />
                        <Text className="text-red-500">Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))
            )}
          </View>

          <View style={{ height: Platform.OS === 'ios' ? 34 : 20 }} />
        </View>
      {/* </KeyboardWrapper> */}
      <Modal
        visible={confirmDeleteId !== null}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white w-[85%] rounded-2xl p-5">
            <Text className="text-lg font-semibold text-black mb-2">
              Delete Address
            </Text>

            <Text className="text-gray-600 mb-5">
              Are you sure you want to delete this address?
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                disabled={deleting}
                onPress={() => setConfirmDeleteId(null)}
                className="flex-1 border border-gray-300 rounded-xl py-3 items-center"
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
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
