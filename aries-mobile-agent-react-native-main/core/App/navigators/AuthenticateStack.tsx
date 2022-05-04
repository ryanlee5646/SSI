import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { useTheme } from '../contexts/theme'
import PinEnter from '../screens/PinEnter'
import { AuthenticateStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

interface AuthenticateStackProps {
  setAuthenticated: (auth: boolean) => void
}

const AuthenticateStack: React.FC<AuthenticateStackProps> = ({ setAuthenticated }) => {
  const Stack = createStackNavigator<AuthenticateStackParams>()
  const theme = useTheme()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions, presentation: 'transparentModal', headerShown: false }}>
      <Stack.Screen name={Screens.EnterPin} component={PinEnter} initialParams={{ setAuthenticated }} />
    </Stack.Navigator>
  )
}

export default AuthenticateStack
