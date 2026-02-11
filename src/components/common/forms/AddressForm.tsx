/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Keyboard,
  DeviceEventEmitter,
  StyleSheet
} from 'react-native';

import { US_STATES } from '../../../const/US_STATE';
import React, { useState, useRef } from 'react';
import { addAddress, editAddress } from '../../../api/user';
import Feather from 'react-native-vector-icons/Feather';
import FloatingInput from '../FloatingInput';
import { TextInput } from 'react-native';
import Button from '../Button';
import { showAndroidToast } from '../../toast/androidToast';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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

export default function AddressForm({ initialData, onSuccess }: Props) {

  const [form, setForm] = useState<Address>({
    title: initialData?.title ?? '',
    addressLineOne: initialData?.addressLineOne ?? '',
    addressLineTwo: initialData?.addressLineTwo ?? '',
    reciverName: initialData?.reciverName ?? '',
    reciverNumber: initialData?.reciverNumber ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    postalCode: initialData?.postalCode ?? '',
    country: initialData?.country ?? 'USA',
    latitude: '00',
    longitude: '00',
    id: initialData?.id,
  });

  const [isFocus, setIsFocus] = useState(false);
  const stateData = US_STATES.map(state => ({ label: state, value: state }));

  const titleRef = useRef<TextInput>(null);
  const address1Ref = useRef<TextInput>(null);
  const address2Ref = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const numbefRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);

  const onChange = (key: keyof Address, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    Keyboard.dismiss();

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
        await editAddress({ ...form, latitude: '00', longitude: '00' });
        DeviceEventEmitter.emit('ADDRESS_UPDATED');
        showAndroidToast('Address updated successfully.');
      } else {
        const { id, ...addPayload } = form;
        await addAddress({ ...addPayload, latitude: '00', longitude: '00' });
        DeviceEventEmitter.emit('ADDRESS_UPDATED');
        showAndroidToast('Address added successfully.');
      }
      onSuccess();
    } catch (error) {
      showAndroidToast('Failed to save address. Please try again.');
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={70}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={false}
      contentInsetAdjustmentBehavior="never"
      bounces={false}
      contentContainerStyle={styles.scrollContent}
    >

      <FloatingInput size='medium' label="Title" ref={titleRef} value={form.title} onChangeText={(v: string) => onChange('title', v)} />

      <FloatingInput size='medium' label="Street Address Line 1" value={form.addressLineOne} ref={address1Ref} onChangeText={(v: string) => onChange('addressLineOne', v)} />

      <FloatingInput size='medium' label="Street Address Line 2" ref={address2Ref} value={form.addressLineTwo} onChangeText={(v: string) => onChange('addressLineTwo', v)} />

      <FloatingInput size='medium' label="Receiver Name" ref={nameRef} value={form.reciverName} onChangeText={(v: string) => onChange('reciverName', v)} />

      <FloatingInput size='medium' ref={numbefRef} label="Contact Number" value={form.reciverNumber} onChangeText={(v: string) => onChange('reciverNumber', v)} keyboardType="phone-pad" />

      <FloatingInput size='medium' label="Country" value="United States" editable={false} />

      {/* STATE DROPDOWN */}
      <View style={styles.dropdownWrapper}>
        <Text style={styles.label}>State</Text>

        <Dropdown
          style={styles.dropdown}
        
          selectedTextStyle={styles.selectedText}
          data={stateData}
          labelField="label"
          valueField="value"
          placeholder="Select State"

          value={form.state}
          onFocus={() => {
            Keyboard.dismiss();
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChange('state', item.value);
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <Feather name={isFocus ? 'chevron-up' : 'chevron-down'} size={18} color="#F97316" />
          )}
          containerStyle={styles.dropdownContainer}

         placeholderStyle={{
        fontSize: 16,
        color: '#oooo',
      }}
        />
      </View>

      <FloatingInput size='medium' ref={cityRef} label="City" value={form.city} onChangeText={(v: string) => onChange('city', v)} />

      <FloatingInput size='medium' label="Zip Code" ref={codeRef} value={form.postalCode} onChangeText={(v: string) => onChange('postalCode', v)} keyboardType="numeric" />

      <View className="flex-row gap-3 mt-4 mb-8">
        <Button label={form.id ? 'Update' : 'Save'} size='medium' variant="primary" className="flex-1" onPress={onSubmit} />
      </View>

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical:24,
    justifyContent: 'flex-start',
  },

  label: {
    fontSize: 12,
    color: '#FB923C',
    marginBottom: 4,
    marginLeft: 4,
  },

  dropdownWrapper: {
    marginBottom: 10,
  },

  dropdown: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: '#FB923C',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  placeholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  selectedText: {
    fontSize: 14,
    color: '#111827',
    includeFontPadding: false,
  },

  dropdownContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
});
