'use client'

import { useState } from 'react'
import { ScanResult, ScannerState } from '../types/scanner'
import { uploadImage } from '../actions/upload-image'
import { processScan } from '../actions/process-scan'
import { saveProduct } from '../actions/save-product'

export function useAiScanner() {
  const [state, setState] = useState<ScannerState>('IDLE')
  const [image, setImage] = useState<{ url: string; path: string } | null>(null)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function startScan(formData: FormData) {
    setState('UPLOADING')
    setError(null)
    try {
      const uploadRes = await uploadImage(formData)
      setImage(uploadRes)

      setState('SCANNING')
      const scanRes = await processScan(uploadRes.url)

      if (scanRes.success && scanRes.data) {
        setScanResult(scanRes.data)
        setState('REVIEWING')
      } else {
        throw new Error(scanRes.error || 'AI analysis failed')
      }
    } catch (e: any) {
      setError(e.message)
      setState('ERROR')
    }
  }

  async function confirmProduct(confirmedData: ScanResult, userId: string) {
    if (!image) throw new Error('No image found')

    setState('SAVING')
    try {
      const saveRes = await saveProduct(userId, confirmedData, image.path)
      if (saveRes.success) {
        setState('COMPLETED')
      } else {
        throw new Error(saveRes.error)
      }
    } catch (e: any) {
      setError(e.message)
      setState('ERROR')
    }
  }

  function reset() {
    setState('IDLE')
    setImage(null)
    setScanResult(null)
    setError(null)
  }

  return {
    state,
    setState,
    image,
    scanResult,
    setScanResult,
    error,
    setError,
    startScan,
    confirmProduct,
    reset,
  }
}
