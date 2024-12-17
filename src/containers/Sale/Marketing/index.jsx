import HeaderPage from 'components/HeaderPage'
import React from 'react'
import { useTranslation } from 'react-i18next'

function MarketingPage() {
  const { t } = useTranslation()
  return <HeaderPage title={t('marketing')} />
}

export default MarketingPage
