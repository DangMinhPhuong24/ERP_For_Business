import BasicTable from '../../../BasicTable/BasicTable'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { VisibilityOutlined } from '@mui/icons-material'
import colors from '../../../../constants/colors'
import selectedCase from '../../../../constants/selectedCase'
import {formatNumber} from "../../../../common/common";

const PurchaseProposalTable = (props) => {
  const { totalPages, data, loading, navigateToDetail, currentPage, handlePageChange } = props
  const { t } = useTranslation()

  const headers = useMemo(
    () => [
      {
        key: 'codeOrder',
        label: t('codeOrder'),
        align: 'left'
      },
      {
        key: 'supplier',
        label: t('supplier'),
        align: 'left'
      },
      {
        key: 'totalValueBeforeTax',
        label: t('totalValueBeforeTax'),
        align: 'right'
      },
      {
        key: 'creationTime',
        label: t('creationTime')
      },
      {
        key: 'status',
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
      codeOrder: {
        label: row.code,
        cellWithButton: true
      },
      supplier: {
        label: row?.supplier?.supplier_name,
        cellWithButton: true
      },
      totalValueBeforeTax: {
        label: formatNumber(row.purchase_order_product_total),
        cellWithButton: true
      },
      creationTime: {
        label: row.created_at,
        cellWithButton: true
      },
      status: {
        label:
          row.status.id === selectedCase.pending ? (
            <span style={{ color: colors.slategrayColor }}>{row.status.name}</span>
          ) : row.status.id === selectedCase.canceled ? (
            <span style={{ color: colors.redColor }}>{row.status.name}</span>
          ) : (
            <span style={{color: colors.greenColor}}>{t('isApproved')}</span>
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
export default PurchaseProposalTable
