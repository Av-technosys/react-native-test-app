import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';

interface KeyboardWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}


const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
  children
}) => {
  return (
  <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className='px-4 pt-14'
          style={{ flex: 1 }}
        >
      {children}

      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
