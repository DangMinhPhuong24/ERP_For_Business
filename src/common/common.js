import { colorCharts } from 'constants/colorCharts'
import { floor, isEmpty } from 'lodash'
import AWS from 'aws-sdk'

// @ts-nocheck
export function isNumeric(str) {
  return /^\d+$/.test(str)
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^(0[1-9]{1}[0-9]{8})$/
  return phoneRegex.test(phoneNumber)
}

export function isValidDimension(str) {
  const regex = /^\d+(\.\d+)?(,\d+)?$/
  return regex.test(str)
}

export function formatCurrency(value) {
  const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  return formattedValue.replace(/\s₫/, '₫')
}

export function decimalTwoPlacesRegex(str) {
  const regex = /^\d*(\.\d{0,2})?$/
  return regex.test(str)
}

export function formatCurrencyWithoutSymbol(value) {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numericValue)) {
    return
  }
  return new Intl.NumberFormat('vi-VN', { style: 'decimal', maximumFractionDigits: 0 }).format(numericValue)
}

export function isFirstCharacterZero(value) {
  return value.charAt(0) === '0'
}

export function formatPercentage(value) {
  return `${value ?? 0}%`
}

export function formatCurrencyRevenue(value) {
  const roundedValue = Math.round(value)
  return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(roundedValue)
}

export function isValidDate(dateString) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/
  return pattern.test(dateString)
}

export function formatNumber(value) {
  if (value === undefined || value === null) {
    return ''
  }

  let formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  }).format(value)

  if (formattedValue.includes(',')) {
    formattedValue = formattedValue.replace(/,?0+$/, '')
  }

  return formattedValue
}

export const urlRegex = (str) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/
  const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[a-zA-Z0-9(\.\?)?]/
  const normalUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/
  return normalUrlRegex.test(str) || facebookRegex.test(str)
}

export const formatPhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber === 'string' && phoneNumber.length === 10) {
    return `${phoneNumber.slice(0, 3)}.${phoneNumber.slice(3, 6)}.${phoneNumber.slice(6)}`
  }
  return phoneNumber
}

export const filterDigits = (str) => {
  return str.replace(/[^\d]/g, '')
}

export const filterDigitsLimit = (value, number = 13) => {
  return value.replace(/\D/g, '').slice(0, number)
}

export const isDigitOrEmpty = (str) => {
  return /^\d*$/.test(str) || str === ''
}

export const removeDots = (str) => {
  return str.replace(/\./g, '')
}

export const isIpad = /iPad/i.test(navigator.userAgent) && !/Macintosh/i.test(navigator.userAgent)
export const isIphone = /iPhone/i.test(navigator.userAgent)
export const isIpod = /iPod/i.test(navigator.userAgent)
export const isAndroid = /Android/i.test(navigator.userAgent)
export const isMobile = isIphone || isIpod || isAndroid || isIpad

export const generateUniqueFileName = (file) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '')
  const randomString = Math.random().toString(36).substring(2, 10)
  const extension = file.name.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

export function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}`
  }
}

export function checkAttributeValue(dataArray, attributeKey, attributeValue) {
  return dataArray.some((item) => item[attributeKey] === attributeValue)
}

export const convertDataPieChart = (dataPie) => {
  return floor((dataPie * -360) / 100)
}

export const checkStatusInWareHouse = (dataPie) => {
  if (dataPie <= 100 && dataPie > 75) {
    return colorCharts.orange
  } else if (dataPie <= 75) {
    return colorCharts.green
  } else {
    return colorCharts.red
  }
}

export const formatAbbreviatedCurrency = (value) => {
  const numberFormat = new Intl.NumberFormat('vi-VN')

  if (value >= 1e9) {
    return `${numberFormat.format(value / 1e9)} Tỷ`
  } else if (value >= 1e6) {
    return `${numberFormat.format(value / 1e6)} Tr`
  }

  return numberFormat.format(value)
}

export const formatFileSize = (size) => {
  if (size < 1024) {
    return size + ' Bytes'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  }
}

export const formatDate = (date) => {
  return date
    .toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false
    })
    .replace(',', ' ngày')
}

export const formatCreatedAt = (dateString) => {
  return dateString.replace(',', '').replace(/(\d{2}\/\d{2}\/\d{4})/, 'ngày $1')
}

export const renderUploadMessage = (uploadedFiles, titleMessage, fieldName) => {
  return (
    <div>
      <strong>{titleMessage}</strong>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{fieldName ? `${index + 1}. ${file[fieldName]}` : `${index + 1}. ${file}`}</li>
        ))}
      </ul>
    </div>
  )
}

export const maxDecimalsTest = (value) => {
  if (value === undefined || value === null) return true

  return /^\d+(\.\d{1,2})?$/.test(value.toString())
}

export const areaCalculation = (length, width, quantity) => {
  return (length * 0.01 * width * quantity).toFixed(2)
}

export function parseFormattedNumber(formattedValue) {
  if (!formattedValue) {
    return null
  }
  const normalizedValue = formattedValue.replace(/\./g, '').replace(/,/g, '.')

  const parsedValue = parseFloat(normalizedValue)
  return isNaN(parsedValue) ? null : parsedValue
}

export function checkObject(obj) {
  for (var o in obj) if (obj[o]) return true

  return false
}

export const formatDecimalNumber = (value) => {
  if (!value) return value
  const parts = value.toString().split(',')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return parts.join(',')
}

export const formatInputValue = (value) => {
  if (!value) return value

  value = value.replace(/[^0-9,\.]/g, '')

  value = value.replace(/\./g, '')

  const commaCount = (value.match(/,/g) || []).length
  if (commaCount > 1) {
    return value.slice(0, -1)
  }

  if (value.includes(',')) {
    const [integerPart, decimalPart] = value.split(',')

    if (decimalPart.length > 2) {
      value = `${integerPart},${decimalPart.substring(0, 2)}`
    }
  }

  return value
}

export const parsePricePerSquareMeter = (value, isZero) => {
  if (!value) return null

  const formattedValue = String(value).replace(/\./g, '').replace(',', '.')

  const numberValue = parseFloat(formattedValue)

  return numberValue > 0 ? numberValue : (isZero === undefined ? null : isZero)
}


export function normalizeLargeNumber(inputNumber) {
  if (typeof inputNumber === 'number' && inputNumber.toString().includes('e')) {
    return inputNumber.toLocaleString('fullwide', { useGrouping: false });
  }
  return inputNumber.toString();
}