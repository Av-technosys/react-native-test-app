/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface BaseBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  backgroundStyle?: ViewStyle;
  scrollEnabled?: boolean;
}

const BaseBottomSheet = forwardRef<BottomSheet, BaseBottomSheetProps>(
  ({ children, snapPoints, backgroundStyle, scrollEnabled = true }, ref) => {
    const defaultSnapPoints = useMemo(() => snapPoints || ['70%'], []);

    return scrollEnabled ? (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={defaultSnapPoints}
        enablePanDownToClose
        backgroundStyle={[
          { borderRadius: 20, backgroundColor: 'white' },
          backgroundStyle,
        ]}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    ) : (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={defaultSnapPoints}
        enablePanDownToClose
        backgroundStyle={[
          { borderRadius: 20, backgroundColor: 'white' },
          backgroundStyle,
        ]}
      >
        {children}
      </BottomSheet>
    );
  },
);

export default BaseBottomSheet;
