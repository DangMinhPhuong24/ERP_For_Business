// @ts-nocheck
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import SouthRoundedIcon from '@mui/icons-material/SouthRounded'
import { Box, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import BasicTable from 'components/BasicTable'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit, TbEye } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import NoSortIcon from '../../../../asset/icon/NoSort.svg'
import SortDownIcon from '../../../../asset/icon/SortDown.svg'
import SortUpIcon from '../../../../asset/icon/SortUp.svg'
import { checkAttributeValue, formatCurrency } from '../../../../common/common'
import colors from '../../../../constants/colors'
import { permissionActions } from '../../../../constants/titlePermissions'
import '../../../../resource/style/common.css'
import ModalDelete from '../../../Modal/Common/delete'
import PositionedTooltips from '../../../PositionedTooltips'
import { useStyles } from './styles'

const ListCustomerTable = (props) => {
  const {
    titleTable,
    data,
    handlerDelete,
    handleGetDetail,
    handleCreateOder,
    sortDataAzTotalRevenue,
    sortDataZaTotalRevenue,
    successFlag,
    sortDataAzMonthRevenue,
    sortDataZaMonthRevenue,
    isShowMobile,
    getListCustomer,
    permissionsData,
    isSuperAdmin,
    totalPages,
    handlePageChange,
    currentPagePagination,
    loading
  } = props

  const { t } = useTranslation()
  const navigate = useNavigate()
  const classes = useStyles()

  const [sortStates, setSortStates] = useState({})

  useEffect(() => {
    const initialSortStates = titleTable?.reduce((acc, item) => {
      if (item.sortable) {
        acc[item.label] = { az: false, za: false }
      }
      return acc
    }, {})
    setSortStates(initialSortStates)
  }, [titleTable])

  const handleView = useCallback(
    (customerId) => {
      navigate(`/sale/information/customer-detail?id=${customerId}`)
    },
    [navigate]
  )

  const handleOpenUpdateModal = useCallback(
    (customerId, disabled) => {
      if (isShowMobile) {
        navigate(`/update-customer?id=${customerId}`)
      } else {
        if (disabled === false) {
          return
        }
        handleGetDetail(customerId)
      }
    },
    [handleGetDetail, isShowMobile, navigate]
  )

  const handleCreateOderModal = useCallback(
    (customerId) => {
      handleCreateOder(customerId)
    },
    [handleCreateOder]
  )

  const calculatePercentage = useCallback((actualRevenue) => {
    const direction = actualRevenue < 0 ? 'down' : 'up'
    const color = direction === 'down' ? 'red' : 'green'
    const tooltip = direction === 'down' ? t('decreaseComparedLastMonth') : t('growthComparedLastMonth')
    return { direction, color, tooltip }
  }, [])

  const handleSort = useCallback(
    (columnName) => {
      const currentSortState = sortStates[columnName]

      switch (columnName) {
        case 'totalRevenue':
          if (!currentSortState.az && !currentSortState.za) {
            sortDataAzTotalRevenue()
            sortStates[columnName] = { az: true, za: false }
          } else if (currentSortState.az) {
            sortDataZaTotalRevenue()
            sortStates[columnName] = { az: false, za: true }
          } else {
            getListCustomer()
            sortStates[columnName] = { az: false, za: false }
          }
          break
        case 'RevenueDuringTheMonth':
          if (!currentSortState.az && !currentSortState.za) {
            sortDataAzMonthRevenue()
            sortStates[columnName] = { az: true, za: false }
          } else if (currentSortState.az) {
            sortDataZaMonthRevenue()
            sortStates[columnName] = { az: false, za: true }
          } else {
            getListCustomer()
            sortStates[columnName] = { az: false, za: false }
          }
          break
        default:
          break
      }
      setSortStates(sortStates)
    },
    [
      getListCustomer,
      sortDataAzMonthRevenue,
      sortDataAzTotalRevenue,
      sortDataZaMonthRevenue,
      sortDataZaTotalRevenue,
      sortStates
    ]
  )

  const getSortIcon = useCallback(
    (item) => {
      if (sortStates[item]?.az) {
        return <SortUpIcon />
      } else if (sortStates[item]?.za) {
        return <SortDownIcon />
      } else {
        return <NoSortIcon />
      }
    },
    [sortStates]
  )

  const headers = useMemo(() => {
    if (isShowMobile) {
      return [
        {
          key: 'customerName',
          label: t('customerName'),
          align: 'left',
          fontWeight: '700'
        },
        {
          key: 'actions',
          label: t('actions'),
          fontWeight: '700'
        }
      ]
    }

    return [
      {
        key: 'customerCode',
        label: t('customerCode'),
        fontWeight: '700'
      },
      {
        key: 'customerName',
        label: t('customerName'),
        align: 'left',
        fontWeight: '700'
      },
      {
        key: 'totalRevenue',
        label: (
          <Box className={classes.wrapperHeader}>
            {t('totalRevenue')}
            <IconButton className={classes.btnSort} onClick={() => handleSort('totalRevenue')}>
              {getSortIcon('totalRevenue')}
            </IconButton>
          </Box>
        ),
        fontWeight: '700',
        align: 'right'
      },
      {
        key: 'RevenueDuringTheMonth',
        label: (
          <Box className={classes.wrapperHeader}>
            {t('RevenueDuringTheMonth')}
            <IconButton className={classes.btnSort} onClick={() => handleSort('RevenueDuringTheMonth')}>
              {getSortIcon('RevenueDuringTheMonth')}
            </IconButton>
          </Box>
        ),
        fontWeight: '700',
        align: 'right'
      },
      {
        key: 'overdueDebt',
        label: t('overdueDebt'),
        fontWeight: '700',
        align: 'right'
      },
      {
        key: 'overdueAmount',
        label: t('overdueAmount'),
        fontWeight: '700',
        align: 'right'
      },
      {
        key: 'actions',
        label: t('actions'),
        fontWeight: '700'
      }
    ]
  }, [isShowMobile, classes.btnSort, classes.wrapperHeader, getSortIcon, handleSort, t])

  const rows = useMemo(() => {
    return data.map((row) => ({
      customerCode: {
        label: row.code,
        cellWithButton: true
      },
      customerName: {
        label: (
          <>
            <PositionedTooltips data={row?.claims} />
            {row.customer_name}
          </>
        ),
        cellWithButton: true
      },
      totalRevenue: {
        label: formatCurrency(row.total_revenue),
        cellWithButton: true
      },
      RevenueDuringTheMonth: {
        label: (
          <>
            {formatCurrency(row.month_revenue)}
            {row.percent_month_revenue && (
              <Tooltip title={calculatePercentage(row.percent_month_revenue).tooltip}>
                <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                  <span style={{ color: calculatePercentage(row.percent_month_revenue).color }}>
                    {calculatePercentage(row.percent_month_revenue).direction === 'down' ? (
                      <SouthRoundedIcon style={{ fontSize: 14 }} />
                    ) : (
                      <ArrowUpwardRoundedIcon style={{ fontSize: 14 }} />
                    )}
                    {Math.abs(row.percent_month_revenue)}%
                  </span>
                </div>
              </Tooltip>
            )}
          </>
        ),
        cellWithButton: true
      },
      overdueDebt: {
        label: '' + row.number_day_overdue,
          cellWithButton: true
      },
      overdueAmount: {
        label: formatCurrency(row.overdue_amount),
          cellWithButton: true
      },
      actions: {
        label: (
          <>
            {!isShowMobile && (
              <Button
                className={`button-action ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_ORDER) ? 'disabled-cursor' : ''}`}
                disabled={!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_ORDER)}
                onClick={() => handleCreateOderModal(row.id)}
              >
                <TbEdit style={{ color: colors.lightroyalblueColor }} />
              </Button>
            )}
            <Button
              onClick={() => handleView(row.id)}
              className={`button-action ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.SHOW_CUSTOMER) ? 'disabled-cursor' : ''}`}
              disabled={!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.SHOW_CUSTOMER)}
            >
              <TbEye style={{ color: colors.lightroyalblueColor }} />
            </Button>
            <Button
              className={`button-action ${
                (!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_CUSTOMER)) ||
                row.disable_update
                  ? 'disabled-cursor'
                  : ''
              }`}
              disabled={
                (!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_CUSTOMER)) ||
                row.disable_update
              }
              onClick={() => handleOpenUpdateModal(row.id, row.disable)}
            >
              <TbEdit style={{ color: colors.amberColor }} />
            </Button>
            {!isShowMobile && (
              <ModalDelete
                disable={
                  (!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_CUSTOMER)) ||
                  row.disable_delete
                }
                successFlag={successFlag}
                id={row.id}
                handleDelete={handlerDelete}
              />
            )}
          </>
        ),
      },
      id: {
        label: row.id
      },
      overdue_amount: {
        label: row.overdue_amount
      }
    }))
  }, [
    calculatePercentage,
    data,
    handleCreateOderModal,
    handleOpenUpdateModal,
    handleView,
    handlerDelete,
    isSuperAdmin,
    permissionsData,
    successFlag
  ])

  return (
    <>
      {!loading && (
        <BasicTable
          headers={headers}
          rows={rows}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPagePagination}
          navigateToDetail={handleView}
          showIndex
          {...(isShowMobile && { minWidth: 300 })}
        />
      )}
    </>
  )
}

export default ListCustomerTable
