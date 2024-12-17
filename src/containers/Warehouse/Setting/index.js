import HeaderPage from 'components/HeaderPage'
import { useTranslation } from 'react-i18next'

export default function WarehouseSettingPage() {
  const { t } = useTranslation()

  return (
    <>
      <HeaderPage title={t('setting')} />
    </>
  )
}
