import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'
import React from 'react'

export const AppToast = () => {
  const toast = useToastState()

  if (!toast || toast.isHandledNatively) return null

  return (
    <Toast
      key={toast.id}
      duration={toast.duration}
      animation="200ms"
      enterStyle={{ opacity: 0, transform: [{ translateY: 20 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: 20 }] }}
      opacity={1}
      scale={1}
      viewportName={toast.viewportName}
    >
      <YStack padding="$3" backgroundColor="white" borderRadius="$4">
        <Toast.Title fontWeight="600">
          {toast.title}
        </Toast.Title>

        {!!toast.message && (
          <Toast.Description color="$gray10">
            {toast.message}
          </Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
