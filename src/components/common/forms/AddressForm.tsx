/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Keyboard,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import {US_STATES} from '../../../const/US_STATE'

import React, { ReactNode } from 'react';
import { useState } from 'react';
import { addAddress, editAddress } from '../../../api/user';
import Feather from 'react-native-vector-icons/Feather';
import FloatingInput from '../FloatingInput';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import Button from '../Button'
import { showAndroidToast } from '../../toast/androidToast';

export type Address = {
  id?: number;
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
  initialData?: Address | null;
  onSuccess: () => void;
  onCancel: () => void;
};



export default function AddressForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  

//const keyboardVerticalOffset: number = Platform.OS === 'ios' ? 40 : 20;
  const [form, setForm] = useState<Address>({
    title: initialData?.title ?? '',
    addressLineOne: initialData?.addressLineOne ?? '',
    addressLineTwo: initialData?.addressLineTwo ?? '',
    reciverName: initialData?.reciverName ?? '',
    reciverNumber: initialData?.reciverNumber ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    postalCode: initialData?.postalCode ?? '',
    country: initialData?.country ?? 'India',
    latitude: '00',
    longitude: '00',
    id: initialData?.id,
  });
 const [showStatePicker, setShowStatePicker] = useState(false);

  const titleRef = useRef<TextInput>(null);
  const address1Ref = useRef<TextInput>(null);
  const address2Ref = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const numbefRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);

  const onChange = (key: keyof Address, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    // ✅ REQUIRED FIELD VALIDATION
    if (
      !form.title ||
      !form.addressLineOne ||
      !form.reciverName ||
      !form.reciverNumber ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.country
    ) {
      showAndroidToast('Please fill in all required fields');
      return;
    }

    try {
      if (form.id) {
        // -------- EDIT --------
        await editAddress({
          ...form,
          latitude: '00',
          longitude: '00',
        });
        // 🔔 Notify Header to refetch user + address
        DeviceEventEmitter.emit('ADDRESS_UPDATED');

        showAndroidToast('Address updated successfully.');
      } else {
        // -------- ADD --------
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...addPayload } = form;

        await addAddress({
          ...addPayload,
          latitude: '00',
          longitude: '00',
        });
        DeviceEventEmitter.emit('ADDRESS_UPDATED');

        showAndroidToast('Address added successfully.');
      }

      onSuccess();
    } catch (error) {
      console.log(error);
      showAndroidToast('Failed to save address. Please try again.');
    }
  };

  return (
    //keyboardVerticalOffset={keyboardVerticalOffset}
    <KeyboardAvoidingView  >

      <View className="flex-row items-center gap-2 mb-6">
        <Feather name="map-pin" size={20} color="#000" />
        <Text className="text-xl font-semibold text-black">Address</Text>
      </View>

      <FloatingInput
        label="Title"
        ref={titleRef}
        value={form.title}
        onChangeText={(v: string) => onChange('title', v)}
      />

      <FloatingInput
        label="Street Address Line 1"
        value={form.addressLineOne}
        ref={address1Ref}
        onChangeText={(v: string) => onChange('addressLineOne', v)}
      />

      <FloatingInput
        label="Street Address Line 2"
        ref={address2Ref}
        value={form.addressLineTwo}
        onChangeText={(v: string) => onChange('addressLineTwo', v)}
      />

      <FloatingInput
        label="Receiver Name"
        ref={nameRef}
        value={form.reciverName}
        onChangeText={(v: string) => onChange('reciverName', v)}
        icon="user"
      />

      <FloatingInput
        ref={numbefRef}
        label="Contact Number"
        value={form.reciverNumber}
        onChangeText={(v: string) => onChange('reciverNumber', v)}
        keyboardType="phone-pad"
        icon="phone"
      />

      <FloatingInput
        ref={cityRef}
        label="City"
        value={form.city}
        onChangeText={(v: string) => onChange('city', v)}
      />

   <FloatingInput
        label="Zip Code"
        ref={codeRef}
        value={form.postalCode}
        onChangeText={(v: string) => onChange('postalCode', v)}
        keyboardType="numeric"
      />


<Pressable onPress={() => setShowStatePicker(p => !p)}>
  <FloatingInput
    ref={stateRef}
    label="State"
    value={form.state ?? ''}
    placeholder="Select a state"
    icon={showStatePicker ? 'chevron-up' : 'chevron-down'}
    editable={false} // prevents typing, keeps style consistent
    onPress={() => setShowStatePicker(p => !p)}
  />
</Pressable>


   
  <FloatingInput
  label="Country"
  ref={countryRef}
  value="United States"        // always fixed
  editable={false}             // prevents typing
  placeholder="United States"  // optional, for consistency
/>


{/* ACTION BUTTONS */}
<View className="flex-row gap-3 mt-4 mb-8">
  <Button
    label="Cancel"
    variant="outline"
    className="flex-1"
    onPress={() => {
      Keyboard.dismiss();
      onCancel();
    }}
  />

  <Button
    label={form.id ? 'Update' : 'Save'}
    variant="primary"
    className="flex-1"
    onPress={onSubmit}
  />
</View>

{ showStatePicker && (

<Modal
  visible={showStatePicker}
  transparent
  animationType="slide"
  onRequestClose={() => setShowStatePicker(false)}
>
  <Pressable
    className="flex-1 bg-black/40 justify-end"
    onPress={() => setShowStatePicker(false)}
  >
    <View className="bg-white rounded-t-3xl px-5 pt-4 pb-6 max-h-[60%]">
      
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-black">
          Select State
        </Text>
        <Pressable onPress={() => setShowStatePicker(false)}>
          <Text className="text-gray-500 text-lg">✕</Text>
        </Pressable>
      </View>

      {/* Options */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {US_STATES.map(state => {
          const selected = form.state === state;

          return (
            <Pressable
              key={state}
              onPress={() => {
                onChange('state', state);
                setShowStatePicker(false);
              }}
              className={`py-4 px-3 rounded-xl mb-2 flex-row justify-between items-center ${
                selected ? 'bg-orange-50' : ''
              }`}
            >
              <Text
                className={`text-base ${
                  selected ? 'text-orange-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {state}
              </Text>

              {selected && (
                <Text className="text-orange-500 text-lg">✓</Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  </Pressable>
</Modal>


)

}
    </KeyboardAvoidingView>  );
}

