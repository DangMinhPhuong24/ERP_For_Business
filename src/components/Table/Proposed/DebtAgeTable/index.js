import BasicTable from '../../../BasicTable/BasicTable'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { VisibilityOutlined } from '@mui/icons-material'
import colors from '../../../../constants/colors'
import selectedCase from '../../../../constants/selectedCase'

const DebtAgeTable = (props) => {
  const { totalPages, data, loading, navigateToDetail, currentPage, handlePageChange } = props
  const { t } = useTranslation()

  const headers = useMemo(
    () => [
      {
        key: 'customerName',
        label: t('customerName'),
        align: 'left'
      },
      {
        key: 'proposedDebtAge',
        label: t('proposedDebtAge')
      },
      {
        key: 'statusClaim',
        label: t('status'),
        align: 'center'
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return data.map((row, index) => ({
      customerName: {
        label: row.customer.customer_name,
        cellWithButton: true
      },
      proposedDebtAge: {
        label: row.debt_age.debt_age_name,
        cellWithButton: true
      },
      statusClaim: {
        label:
          row.proposal_status.id === selectedCase.pending ? (
            <span style={{ color: colors.slategrayColor }}>{row.proposal_status.proposal_status_name}</span>
          ) : row.proposal_status.id === selectedCase.approved ? (
            <span style={{ color: colors.greenColor }}>{row.proposal_status.proposal_status_name}</span>
          ) : (
            <span style={{ color: colors.redColor }}>{row.proposal_status.proposal_status_name}</span>
          ),
        cellWithButton: true
      },
      actions: {
        label: (
          <IconButton onClick={() => navigateToDetail(row.id)} color="primary">
            <VisibilityOutlined />
          </IconButton>
        ),
        cellWithButton: true
      },
      id: {
        label: row.id
      }
    }))
  }, [data])

  return (
    <>
      <BasicTable
        loading={loading}
        headers={headers}
        rows={rows}
        totalPages={totalPages}
        currentPage={currentPage}
        showIndex
        handlePageChange={handlePageChange}
        navigateToDetail={navigateToDetail}
      />
    </>
  )
}
export default DebtAgeTable
