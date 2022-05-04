import type { ConnectionRecord } from '@aries-framework/core'

import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { dateFormatOptions } from '../../constants'
import { useTheme } from '../../contexts/theme'
import { Screens, SettingStackParams, Stacks } from '../../types/navigators'
import Text from '../texts/Text'
import Title from '../texts/Title'

interface Props {
  contact: ConnectionRecord
  navigation: StackNavigationProp<SettingStackParams, Screens.Settings>
}

const ContactListItem: React.FC<Props> = ({ contact, navigation }) => {
  const { ColorPallet, borderRadius } = useTheme()
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      marginHorizontal: 15,
      padding: 10,
      borderRadius,
      backgroundColor: ColorPallet.brand.secondaryBackground,
    },
    date: {
      textAlign: 'right',
    },
  })
  return (
    <TouchableOpacity
      onPress={() =>
        navigation
          .getParent()
          ?.navigate(Stacks.ContactStack, { screen: Screens.Chat, params: { connectionId: contact.id } })
      }
    >
      <View key={contact.id} style={styles.container}>
        <Title>{contact?.alias || contact?.invitation?.label}</Title>
        <Text>{contact.did}</Text>
        <Text style={styles.date}>{contact.createdAt.toLocaleDateString('en-CA', dateFormatOptions)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ContactListItem
