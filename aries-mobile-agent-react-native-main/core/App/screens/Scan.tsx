import type { BarCodeReadEvent } from 'react-native-camera'

import { Agent } from '@aries-framework/core'
import { useAgent } from '@aries-framework/react-hooks'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import QRScanner from '../components/misc/QRScanner'
import { DispatchAction } from '../contexts/reducers/store'
import { useStore } from '../contexts/store'
import { BifoldError, QrCodeScanError } from '../types/error'
import { ConnectStackParams, Screens, Stacks, TabStacks } from '../types/navigators'
import { isRedirection } from '../utils/helpers'

type ScanProps = StackScreenProps<ConnectStackParams>

const Scan: React.FC<ScanProps> = ({ navigation }) => {
  const { agent } = useAgent()
  const { t } = useTranslation()
  const [, dispatch] = useStore()
  const [qrCodeScanError, setQrCodeScanError] = useState<QrCodeScanError | null>(null)
  const [connectionId, setConnectionId] = useState<string>()

  const handleRedirection = async (url: string, agent?: Agent): Promise<void> => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      const message = await res.json()
      await agent?.receiveMessage(message)
    } catch (err: unknown) {
      const error = new BifoldError(
        'Unable to accept connection',
        'There was a problem while accepting the connection redirection',
        1024
      )
      dispatch({
        type: DispatchAction.ERROR_ADDED,
        payload: [{ error }],
      })
    } finally {
      navigation.getParent()?.navigate(TabStacks.HomeStack, { screen: Screens.Home })
    }
  }

  const handleInvitation = async (url: string): Promise<void> => {
    try {
      const connectionRecord = await agent?.connections.receiveInvitationFromUrl(url, {
        autoAcceptConnection: true,
      })
      if (!connectionRecord?.id) {
        throw new BifoldError(
          'Unable to accept connection',
          'There was a problem while accepting the connection.',
          1024
        )
      }
      setConnectionId(connectionRecord.id)
    } catch (err) {
      const error = new BifoldError(
        'Unable to accept connection',
        'There was a problem while accepting the connection.',
        1024
      )
      dispatch({
        type: DispatchAction.ERROR_ADDED,
        payload: [{ error }],
      })
      navigation.getParent()?.navigate(TabStacks.HomeStack, { screen: Screens.Home })
    }
  }

  const handleCodeScan = async (event: BarCodeReadEvent) => {
    setQrCodeScanError(null)

    try {
      const url = event.data
      if (isRedirection(url)) {
        await handleRedirection(url, agent)
      } else {
        await handleInvitation(url)
      }
    } catch (e: unknown) {
      const error = new QrCodeScanError(t('Scan.InvalidQrCode'), event.data)
      setQrCodeScanError(error)
    }
  }

  useEffect(() => {
    if (connectionId) {
      navigation.getParent()?.navigate(Stacks.ConnectionStack, { screen: Screens.Connection, params: { connectionId } })
    }
  }, [connectionId])

  return <QRScanner handleCodeScan={handleCodeScan} error={qrCodeScanError} enableCameraOnError={true} />
}

export default Scan
