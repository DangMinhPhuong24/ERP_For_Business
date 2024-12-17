// @ts-nocheck
import { Box, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import HeaderPage from 'components/HeaderPage'
import ModalConfirmRedirect from 'components/Modal/Common/confirmRedirect'
import colors from 'constants/colors'
import { permissionActions } from 'constants/titlePermissions'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRoleCheck } from 'utils'
import { checkAttributeValue, formatNumber } from '../../../common/common'
import BasicTable from '../../../components/BasicTable'
import {getListOrderedProductAction, getListPurchaseOrderAlertAction} from '../../../redux/purchase/purchase.action'
import {getListOrderedProductState, getListPurchaseOrderAlertState} from '../../../redux/purchase/purchase.selectors'
import {
  totalPagesListOrderAlertState
} from '../../../redux/warehouse/warehouse.selectors'

export default function OrderWarning() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const listPurchaseOrderAlert = useSelector(getListPurchaseOrderAlertState)
  const listOrderedProduct = useSelector(getListOrderedProductState)
  const totalPagesListOrderAlert = useSelector(totalPagesListOrderAlertState)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getListPurchaseOrderAlertAction())
  }, [dispatch])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    setLoading(true)
    dispatch(getListPurchaseOrderAlertAction({ page })).then(() => setLoading(false))
  }

  const headers = useMemo(
    () => [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
        align: 'left'
      },
      {
        key: 'itemName',
        label: t('itemName'),
        align: 'left'
      },
      {
        key: 'detailedDescription',
        label: t('detailedDescription'),
        align: 'left',
        w: '35%'
      },
      {
        key: 'totalSquareMetersInInventory',
        label: t('totalSquareMetersInInventory'),
        align: 'right'
      },
      {
        key: 'warningSquareMeters',
        label: t('warningSquareMeters'),
        align: 'right',
        color: colors.redColor
      },
      {
        key: 'actions',
        label: t('create')
      }
    ],
    [t]
  )

  const handleConfirmRedirectPage = useCallback((productId, supplierId) => {
    navigate(`/purchase/quick-create?product_id=${productId}&supplier_id=${supplierId}`)
  }, [])

  const handleRedirectDetailPurchaseOrder = (id) => {
    const url = `/purchase/detail-purchase-view?id=${id}`
    window.open(url, '_blank')
  }

  useEffect(() => {
    dispatch(getListOrderedProductAction())
  }, [])

  const rows = useMemo(() => {
    return listPurchaseOrderAlert.map((row, index) => {
      const orderedProducts = listOrderedProduct.filter((order) => {
        return order.purchase_order_product?.some((product) => product.product_management_id === row.id);
      });
      return {
        commodityDode: {
          label: row.code
        },
        itemName: {
          label: row.product_name
        },
        detailedDescription: {
          label: (
            <Tooltip title={row.description || ''}>{`${row.description ? row.description.substring(0, 100) : ''}${row.description && row.description.length > 100 ? '...' : ''
              }`}</Tooltip>
          )
        },
        totalSquareMetersInInventory: {
          label: formatNumber(row.total_square_meter_product_children)
        },
        warningSquareMeters: {
          label: formatNumber(row.min_inventory)
        },
        actions: {
          label: (
            <>
              {(isSuperAdmin ||
                checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_PURCHASING_ORDER)) && (
                  <>
                    {orderedProducts.length ? (
                      <ModalConfirmRedirect
                        successMessage={false}
                        buttonName={t('delete')}
                        confirmAction={() => handleConfirmRedirectPage(row.id, row?.supplier?.id)}
                        disable={false}
                        orderedProducts={orderedProducts}
                      />
                    ) : (
                      <Button className="button-action" onClick={() => navigate(`/purchase/quick-create?product_id=${row.id}&supplier_id=${row?.supplier?.id}`)}>
                        <TbEdit style={{ color: colors.lightroyalblueColor }} />
                      </Button>
                    )}
                  </>
                )}
            </>
          )
        },
        id: {
          label: row.id
        }
      }
    })
  }, [listPurchaseOrderAlert, permissionsData, isSuperAdmin, permissionActions])

  return (
    <>
      <HeaderPage
        title={t('productsBelowMinimumInventory')}
        actionButton={
          <Box sx={{ minWidth: 250 }}>

          </Box>
        }
      />
      <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2 }}>
        {!loading && (
          <BasicTable
            loading={loading}
            headers={headers}
            rows={rows}
            totalPages={totalPagesListOrderAlert}
            currentPage={currentPage}
            showIndex
            handlePageChange={handlePageChange}
          />
        )}
      </Box>
    </>
  )
}
